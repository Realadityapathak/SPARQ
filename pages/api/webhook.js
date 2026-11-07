import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBodyBuffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const stripe = new Stripe(secretKey);
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const rawBody = await getRawBodyBuffer(req);

    if (webhookSecret && signature) {
      // Cryptographically verify webhook signature against tampering
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Development fallback without secret
      event = JSON.parse(rawBody.toString('utf8'));
    }
  } catch (err) {
    console.error('Stripe Webhook Signature Verification Failed:', err.message);
    return res.status(400).json({ error: `Webhook Signature Verification Failed: ${err.message}` });
  }

  // Handle verified events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`[SPARQ Webhook] Payment confirmed for Session: ${session.id}, Total: ₹${(session.amount_total || 0) / 100}`);
      // Fulfillment logic here (e.g., trigger warehouse notification, invoice email)
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.warn(`[SPARQ Webhook] Payment failed for Intent: ${paymentIntent.id}`);
      break;
    }

    default:
      // Acknowledge unhandled event types
      break;
  }

  return res.status(200).json({ received: true });
}

