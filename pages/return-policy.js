import React from 'react';

import { PolicyLayout } from '../components';

const TOC = [
  { id: 'demo-scope', label: 'Demo scope' },
  { id: 'returns', label: 'Returns' },
  { id: 'warranty', label: 'Warranty' },
  { id: 'refunds', label: 'Refunds' },
  { id: 'how-to-contact', label: 'How to get in touch' },
];

const ReturnPolicy = () => {
  return (
    <PolicyLayout
      metaTitle="Return Policy — SPARQ Demo"
      description="Return, replacement, and refund terms for the SPARQ demonstration storefront."
      title="Return & Exchange Policy"
      summary="What returns, replacements, and refunds mean on a demo storefront."
      updated="2 November 2026"
      toc={TOC}
    >
      <section id="demo-scope" className="policy-section">
        <h2>Demo scope</h2>
        <p>
          SPARQ does not ship physical orders, so there is nothing to return and no refund to
          process today. The terms below describe the intended policy for a production launch
          and are included so the checkout flow has a complete reference.
        </p>
      </section>

      <section id="returns" className="policy-section">
        <h2>Returns</h2>
        <p>
          The intended production policy is a 7-day return window from delivery. A returned item
          would need to be in its original cosmetic condition, with the original packaging,
          cables, ear tips, and included accessories.
        </p>
      </section>

      <section id="warranty" className="policy-section">
        <h2>Warranty</h2>
        <p>
          The intended production policy is a 1-year manufacturer replacement warranty covering
          functional defects, driver faults, battery failures, and connectivity issues. This
          demo provides no warranty service of any kind.
        </p>
      </section>

      <section id="refunds" className="policy-section">
        <h2>Refunds</h2>
        <p>
          Checkout uses Stripe test mode, so no real payment is captured and no refund is owed.
          In a live store, refunds would be returned to the original payment method within 5–7
          business days after inspection.
        </p>
      </section>

      <section id="how-to-contact" className="policy-section">
        <h2>How to get in touch</h2>
        <p>
          For questions about the demo, write to{' '}
          <a href="mailto:support@sparq.tech" className="policy-inline-link">
            support@sparq.tech
          </a>
          . The inbox is part of the demo and is not a live customer-care desk.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default ReturnPolicy;
