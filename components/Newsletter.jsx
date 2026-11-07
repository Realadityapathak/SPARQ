import React, { useState } from 'react';

import Reveal from './Reveal';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="newsletter-section" aria-label="Newsletter subscription">
      <div className="section-inner newsletter-layout">
        <Reveal className="newsletter-copy">
          <h2 className="newsletter-heading">Notes from the studio.</h2>
          <p className="newsletter-copy-text">
            Occasional product notes from the SPARQ demo. No spam, no discount promises — just a
            look at what a real newsletter would feel like.
          </p>
        </Reveal>

        <Reveal className="newsletter-card" delay={100}>
          <span className="newsletter-stamp" aria-hidden="true">SPARQ</span>
          <h3 className="newsletter-card-title">Stay in the loop.</h3>

          {status === 'success' ? (
            <div className="newsletter-success" role="status" aria-live="polite">
              <span className="newsletter-success-mark" aria-hidden="true">✓</span>
              <span>You&apos;re on the list. This is a demo, so nothing is stored or sent.</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <label htmlFor="newsletter-email-input" className="contact-field-label">
                Email address
              </label>
              <div className="newsletter-field-row">
                <input
                  id="newsletter-email-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className="newsletter-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="btn-primary newsletter-btn"
                  disabled={status === 'loading'}
                >
                  <span>{status === 'loading' ? 'Joining…' : 'Join the list'}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}

          <p className="newsletter-note">Demo form. Nothing is sent or stored.</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;
