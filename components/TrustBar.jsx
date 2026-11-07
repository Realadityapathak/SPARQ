import React from 'react';

import Reveal from './Reveal';

const TRUST_ITEMS = [
  {
    title: 'Free shipping',
    desc: 'Every order across India, with no threshold to clear.'
  },
  {
    title: 'One-year warranty',
    desc: 'Direct replacement for functional defects, handled by the brand.'
  },
  {
    title: 'Seven-day returns',
    desc: 'A week to decide, with a refund to the original payment method.'
  },
  {
    title: 'Secure checkout',
    desc: 'Payments run through Stripe. Card details never touch this store.'
  }
];

const TrustBar = () => {
  return (
    <section className="promise-section" aria-label="Store promises">
      <div className="section-inner promise-layout">
        <Reveal className="promise-intro">
          <h2 className="section-title promise-title">The promise.</h2>
          <p className="promise-copy">
            Four things that come with every SPARQ piece. This is the intended policy for a
            production launch; the demo ships nothing.
          </p>
        </Reveal>

        <ul className="promise-list">
          {TRUST_ITEMS.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              className="promise-item"
              delay={index * 70}
            >
              <h3 className="promise-item-title">{item.title}</h3>
              <p className="promise-item-copy">{item.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustBar;
