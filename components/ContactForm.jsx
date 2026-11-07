import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Reveal from './Reveal';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // The form is a UI demo: it does not send or store anything.
    setTimeout(() => {
      toast.success('Demo only — this form does not send or store messages.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact and support">
      <div className="section-inner">
        <Reveal className="contact-coupon">
          <span className="coupon-notch coupon-notch-top" aria-hidden="true" />
          <span className="coupon-notch coupon-notch-bottom" aria-hidden="true" />

          <div className="coupon-info">
            <h2 className="coupon-title">Talk to us.</h2>
            <p className="coupon-copy">
              This form is part of the demo. It does not send, store, or forward anything. For
              questions about the project, write to the address below.
            </p>
            <a href="mailto:support@sparq.tech" className="coupon-email">
              support@sparq.tech
            </a>
            <p className="coupon-note">
              SPARQ is a demonstration storefront, not a registered business. There is no live
              support desk.
            </p>
          </div>

          <div className="coupon-form-col">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-field-label">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="contact-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-field-label">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="contact-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-field-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="contact-textarea"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary coupon-submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending…' : 'Send message'}</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactForm;
