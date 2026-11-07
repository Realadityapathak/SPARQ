import React from 'react';

import { PolicyLayout } from '../components';

const TOC = [
  { id: 'demo-scope', label: 'Demo scope' },
  { id: 'orders-and-pricing', label: 'Orders and pricing' },
  { id: 'shipping-and-delivery', label: 'Shipping and delivery' },
  { id: 'acceptable-use', label: 'Acceptable use' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'liability', label: 'Liability' },
  { id: 'changes', label: 'Changes to these terms' },
];

const TermsOfUse = () => {
  return (
    <PolicyLayout
      metaTitle="Terms of Use — SPARQ Demo"
      description="The rules that apply to the SPARQ demonstration storefront."
      title="Terms of Use"
      summary="The ground rules for using this demonstration storefront."
      updated="2 November 2026"
      toc={TOC}
    >
      <section id="demo-scope" className="policy-section">
        <h2>Demo scope</h2>
        <p>
          SPARQ is a demonstration storefront built to show a product catalog, cart, and Stripe
          checkout flow. Nothing on this site constitutes a real commercial offer, and no
          physical products are sold or delivered through it.
        </p>
      </section>

      <section id="orders-and-pricing" className="policy-section">
        <h2>Orders and pricing</h2>
        <p>
          Prices are shown in Indian Rupees (₹) and are read from the Sanity product catalog at
          checkout time. Checkout uses Stripe test keys, so a completed flow does not charge a
          real card. No order record is created after payment.
        </p>
      </section>

      <section id="shipping-and-delivery" className="policy-section">
        <h2>Shipping and delivery</h2>
        <p>
          This demo ships nothing. Copy about delivery windows and returns describes the
          intended policy for a future production launch, not a service that is running today.
        </p>
      </section>

      <section id="acceptable-use" className="policy-section">
        <h2>Acceptable use</h2>
        <p>
          Use the demo as intended: browse the catalog, test the cart, and step through checkout.
          Do not attempt to disrupt the site, probe its infrastructure, or use it to process real
          payments.
        </p>
      </section>

      <section id="intellectual-property" className="policy-section">
        <h2>Intellectual property</h2>
        <p>
          The SPARQ name, page copy, and visual design in this repository are demonstration
          material. Product names and imagery are used for illustrative purposes only.
        </p>
      </section>

      <section id="liability" className="policy-section">
        <h2>Liability</h2>
        <p>
          The demo is provided as-is, without warranties of any kind. It should not be relied on
          for real purchases, payments, or fulfillment.
        </p>
      </section>

      <section id="changes" className="policy-section">
        <h2>Changes to these terms</h2>
        <p>
          These terms may change as the demo evolves. The date at the top shows the most recent
          revision.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default TermsOfUse;
