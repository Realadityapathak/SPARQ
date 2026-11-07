import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { session_id } = req.query;
  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid session_id parameter' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(200).json({ verified: true, demo: true });
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return res.status(200).json({
      verified: session.payment_status === 'paid',
      customer_email: session.customer_details?.email || null,
      amount_total: session.amount_total ? session.amount_total / 100 : null,
      currency: session.currency || 'inr',
      status: session.payment_status,
    });
  } catch (err) {
    console.error('Session retrieval error:', err.message);
    return res.status(400).json({ 
      error: 'INVALID_SESSION', 
      verified: false,
      message: 'Checkout session could not be verified.' 
    });
  }
}

