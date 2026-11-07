import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    // Clear only e-commerce cart data, never wipe the entire origin storage.
    try {
      localStorage.removeItem('sparq_cart');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cart');
    } catch {
      // LocalStorage access can be restricted in private browsing.
    }

    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  // Ask Stripe for the real payment status when a session id is present.
  useEffect(() => {
    if (!session_id || typeof session_id !== 'string') return undefined;

    let isMounted = true;
    fetch(`/api/verify-session?session_id=${encodeURIComponent(session_id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.verified) {
          setSessionDetails(data);
        }
      })
      .catch((err) => {
        console.warn('Session verification notice:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [session_id]);

  return (
    <div className="success-wrapper">
      <Head>
        <title>Payment received — SPARQ</title>
        <meta name="description" content="Stripe confirmed a test payment on the SPARQ demo storefront." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="success-card">
        <span className="success-mark" aria-hidden="true">✓</span>

        <h1 className="success-title">Payment received.</h1>

        {sessionDetails?.amount_total ? (
          <p className="success-amount">
            <span>Amount paid</span>
            <strong>₹{Number(sessionDetails.amount_total).toLocaleString('en-IN')}</strong>
          </p>
        ) : null}

        <p className="success-description">
          Stripe confirmed the test payment. SPARQ is a demonstration storefront, so no physical
          order is created, nothing is shipped, and no order record is stored.
        </p>

        <p className="success-description success-description-muted">
          Questions about the demo? Write to <a href="mailto:support@sparq.tech">support@sparq.tech</a>.
        </p>

        <Link href="/">
          <a className="btn-primary success-continue">
            <span>Continue shopping</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Success;
