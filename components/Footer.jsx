import React from 'react';
import Link from 'next/link';

import Newsletter from './Newsletter';
import { SHOP_NAV_LINKS } from '../lib/categories';

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrapper" aria-label="Site footer">
      <Newsletter />

      <div className="footer-container section-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <p className="footer-signoff">Sound, stripped back.</p>
            <p className="footer-brand-copy">
              A studio catalogue of headphones, earbuds, speakers and wearables for everyday
              listening in India.
            </p>
          </div>

          <nav className="footer-nav-grid" aria-label="Footer navigation">
            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Shop</h3>
              <ul className="footer-nav-list">
                {SHOP_NAV_LINKS.map((link) => (
                  <li key={link.category}>
                    <Link href={link.href}><a>{link.label}</a></Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Support</h3>
              <ul className="footer-nav-list">
                <li><Link href="/#faq"><a>FAQs</a></Link></li>
                <li><Link href="/#contact"><a>Contact</a></Link></li>
                <li><Link href="/return-policy#warranty"><a>Shipping &amp; returns</a></Link></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Legal</h3>
              <ul className="footer-nav-list">
                <li><Link href="/privacy-policy"><a>Privacy policy</a></Link></li>
                <li><Link href="/terms-of-use"><a>Terms of use</a></Link></li>
                <li><Link href="/return-policy"><a>Return policy</a></Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-signature" aria-hidden="true">SPARQ</div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">© 2026 SPARQ — Demo store. All rights reserved.</p>
          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
