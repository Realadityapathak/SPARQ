import React from 'react';

import { PolicyLayout } from '../components';

const TOC = [
  { id: 'what-the-demo-collects', label: 'What the demo collects' },
  { id: 'payments', label: 'Payments' },
  { id: 'local-storage', label: 'Local storage' },
  { id: 'third-parties', label: 'Third parties' },
  { id: 'your-choices', label: 'Your choices' },
  { id: 'changes', label: 'Changes to this page' },
];

const PrivacyPolicy = () => {
  return (
    <PolicyLayout
      metaTitle="Privacy Policy — SPARQ Demo"
      description="How the SPARQ demonstration storefront handles information, payments, and local storage."
      title="Privacy Policy"
      summary="What this demo storefront does and does not do with your information."
      updated="2 November 2026"
      toc={TOC}
    >
      <section id="what-the-demo-collects" className="policy-section">
        <h2>What the demo collects</h2>
        <p>
          This storefront is a demonstration. It does not create customer accounts and it does
          not write orders to a database. The only information handled during a visit is:
        </p>
        <ul>
          <li>The contents of your cart, held in browser memory for the current visit.</li>
          <li>Checkout details you enter on Stripe&apos;s hosted page, handled by Stripe.</li>
          <li>Basic request logs produced by the hosting platform.</li>
        </ul>
      </section>

      <section id="payments" className="policy-section">
        <h2>Payments</h2>
        <p>
          Checkout runs on Stripe in test mode. Card details are entered on Stripe&apos;s page
          and are never received or stored by SPARQ. Test-mode payments do not move real money.
          If live Stripe keys were used, Stripe&apos;s own privacy terms would apply to the
          payment data it processes.
        </p>
      </section>

      <section id="local-storage" className="policy-section">
        <h2>Local storage</h2>
        <p>
          Cart state is kept in the browser and can be cleared at any time. The confirmation page
          removes the demo cart keys after a successful checkout. This site does not run
          advertising trackers or third-party analytics scripts.
        </p>
      </section>

      <section id="third-parties" className="policy-section">
        <h2>Third parties</h2>
        <ul>
          <li>Sanity serves the product catalog used to render these pages.</li>
          <li>Stripe hosts checkout and processes test payments.</li>
          <li>The hosting provider serves the application and keeps standard access logs.</li>
        </ul>
      </section>

      <section id="your-choices" className="policy-section">
        <h2>Your choices</h2>
        <p>
          Because no customer records or orders are stored, there is no profile to export or
          delete. Clearing your browser storage removes the demo cart. Questions can be sent to
          the support address below.
        </p>
      </section>

      <section id="changes" className="policy-section">
        <h2>Changes to this page</h2>
        <p>
          This page is updated when the demo&apos;s behavior changes. The date at the top reflects
          the most recent revision.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
