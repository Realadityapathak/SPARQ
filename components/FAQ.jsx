import React from 'react';

import Reveal from './Reveal';

const FAQ_ITEMS = [
  {
    question: 'What makes SPARQ audio products different?',
    answer: 'SPARQ is tuned for listeners who want studio-grade sound without the markup. Custom 40mm drivers, aluminium hardware, and hybrid active noise cancellation are built for everyday comfort and durability.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'Write to support@sparq.tech. SPARQ is a demo storefront, so the inbox is not a live customer-care desk and replies are not guaranteed.'
  },
  {
    question: 'How do I find the right product for me?',
    answer: 'Use the category filters in the collection. For travel and focus, the over-ear headphones with hybrid ANC are the place to start. For workouts and portability, look at the wireless earbuds.'
  },
  {
    question: 'Can I return a product if I am not satisfied?',
    answer: 'The intended policy is a seven-day return window on unused items in their original packaging. Because this demo ships nothing, there is nothing to return today; the return page documents how a production store would handle it.'
  },
  {
    question: 'Where do you ship?',
    answer: 'SPARQ is a demonstration storefront, so no orders ship anywhere. The intended production policy is free express delivery across India within two to four business days.'
  },
  {
    question: 'How can I track my order?',
    answer: 'There is no fulfillment pipeline in this demo, so there is no tracking to share. A production launch would provide dispatch updates after a courier handoff.'
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="faq-section" aria-label="Frequently asked questions">
      <div className="section-inner faq-layout">
        <Reveal className="faq-aside">
          <h2 className="section-title">Questions, answered.</h2>
          <p className="faq-intro">
            Everything we can answer about the demo, the products, and the intended store
            policy, in one place.
          </p>
          <a href="mailto:support@sparq.tech" className="text-link">
            support@sparq.tech
          </a>
        </Reveal>

        <Reveal className="faq-columns" delay={100}>
          {FAQ_ITEMS.map((item) => (
            <p className="faq-entry" key={item.question}>
              <span className="faq-question">{item.question}</span>{' '}
              {item.answer}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
