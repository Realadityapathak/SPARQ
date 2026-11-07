import Stripe from 'stripe';
import { client } from '../../lib/client';

// Rate limiting state (in-memory sliding window per IP)
const ipRequests = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = ipRequests.get(ip) || [];
  
  // Filter out expired timestamps
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  validTimestamps.push(now);
  ipRequests.set(ip, validTimestamps);
  return false;
}

// Clean up stale rate-limiting entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipRequests.entries()) {
      const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequests.delete(ip);
      } else {
        ipRequests.set(ip, active);
      }
    }
  }, 5 * 60 * 1000);
}

// Resolve and validate request origin
function getTrustedOrigin(req) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const rawOrigin = req.headers.origin || req.headers.referer;

  if (rawOrigin) {
    try {
      const parsed = new URL(rawOrigin);
      const originBase = `${parsed.protocol}//${parsed.host}`;
      
      // Permit local development and configured canonical domain
      if (
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        (configuredSiteUrl && originBase === configuredSiteUrl)
      ) {
        return originBase;
      }
    } catch {
      // Malformed URL, fallback to default
    }
  }

  return configuredSiteUrl || 'http://localhost:3000';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Anti-abuse rate limiting check
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1')
    .toString()
    .split(',')[0]
    .trim();

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many checkout requests. Please wait a moment before trying again.',
    });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(400).json({
      error: 'STRIPE_NOT_CONFIGURED',
      message: 'Stripe API keys are not configured in .env.local.',
    });
  }

  const cartItems = req.body;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({
      error: 'EMPTY_CART',
      message: 'Cart cannot be empty.',
    });
  }

  if (cartItems.length > 20) {
    return res.status(400).json({
      error: 'CART_OVERFLOW',
      message: 'Maximum cart items limit (20) exceeded.',
    });
  }

  try {
    const stripe = new Stripe(secretKey);

    // 2. Server-side price verification (SEC-01):
    // Never trust client prices! Fetch authoritative prices directly from Sanity DB.
    const productIds = cartItems
      .map((item) => item?._id)
      .filter((id) => typeof id === 'string' && id.length > 0);

    if (productIds.length === 0) {
      return res.status(400).json({
        error: 'INVALID_PAYLOAD',
        message: 'Cart contains invalid product references.',
      });
    }

    // Parameterized GROQ query to prevent injection and draft leakage
    const query = '*[_type == "product" && !(_id in path("drafts.**")) && _id in $productIds]{ _id, name, price, image }';
    const dbProducts = await client.fetch(query, { productIds });
    const dbProductMap = new Map(dbProducts.map((p) => [p._id, p]));

    const line_items = [];

    for (const item of cartItems) {
      const dbProduct = dbProductMap.get(item?._id);

      if (!dbProduct) {
        return res.status(400).json({
          error: 'PRODUCT_UNAVAILABLE',
          message: `One or more items in your cart are no longer available.`,
        });
      }

      // Enforce strict quantity clamping: 1 to 20 units per item
      const quantity = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));

      // Authoritative image URL extraction
      let imageUrl = '';
      if (dbProduct?.image?.[0]?.asset?._ref) {
        const imgRef = dbProduct.image[0].asset._ref;
        imageUrl = imgRef
          .replace('image-', `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jruyr6l6'}/production/`)
          .replace('-webp', '.webp')
          .replace('-png', '.png')
          .replace('-jpg', '.jpg');
      }

      // Authoritative unit price from Sanity CMS database
      const verifiedUnitPrice = Math.round(Number(dbProduct.price) * 100);
      if (verifiedUnitPrice <= 0 || isNaN(verifiedUnitPrice)) {
        return res.status(400).json({
          error: 'INVALID_PRICE',
          message: `Invalid product pricing configuration for ${dbProduct.name}.`,
        });
      }

      line_items.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: dbProduct.name || 'SPARQ Acoustic System',
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: verifiedUnitPrice,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 20,
        },
        quantity,
      });
    }

    const origin = getTrustedOrigin(req);

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'inr' },
            display_name: 'Complimentary Express Delivery',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 4 },
            },
          },
        },
      ],
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    };

    const session = await stripe.checkout.sessions.create(params);
    return res.status(200).json(session);
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    return res.status(500).json({
      error: 'CHECKOUT_PROCESSING_ERROR',
      message: 'Unable to initiate payment session. Please try again later.',
    });
  }
}
