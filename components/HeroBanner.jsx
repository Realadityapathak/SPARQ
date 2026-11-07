import React, { useState } from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ bannerData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = Array.isArray(bannerData) ? bannerData : [];

  const slides = banners.map((banner, index) => {
    const imageUrl = banner.image
      ? urlFor(banner.image).width(720).format('webp').quality(80).url()
      : '';
    const productSlug = banner.product || '';
    const productLink = productSlug.startsWith('/') ? productSlug : `/product/${productSlug}`;

    return {
      id: banner._id || `slide-${index}`,
      titleLine1: banner.titleLine1 || '',
      titleAccent: banner.titleAccent || '',
      desc: banner.desc || '',
      btnPrimaryText: banner.buttonText || 'Shop the collection',
      btnPrimaryLink: productSlug ? productLink : '/#catalog',
      image: imageUrl,
      alt: banner.productName || `${banner.titleLine1 || ''} ${banner.titleAccent || ''}`.trim() || 'Featured product',
      productName: banner.productName || 'Featured piece',
      productPrice: banner.productPrice,
    };
  });

  if (!slides.length) return null;

  const slide = slides[Math.min(activeIndex, slides.length - 1)];
  const priceLabel = typeof slide.productPrice === 'number'
    ? `₹${slide.productPrice.toLocaleString('en-IN')}`
    : '';

  return (
    <section className="hero-section" aria-label="Featured product">
      <div className="hero-inner">
        <div className="hero-masthead">
          {slides.length > 1 && (
            <div className="hero-switcher" role="group" aria-label="Choose a featured product">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`hero-switch${index === activeIndex ? ' is-active' : ''}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {item.productName}
                </button>
              ))}
            </div>
          )}
        </div>

        <article className="hero-cover" key={slide.id}>
          <span className="hero-spine" aria-hidden="true" />

          <div className="hero-cover-content">
            <h1 className="hero-title">
              <span className="hero-title-line">{slide.titleLine1}</span>
              {slide.titleAccent && (
                <span className="hero-title-line hero-title-line-accent">{slide.titleAccent}</span>
              )}
            </h1>
          </div>

          <div className="hero-cover-body">
            <div className="hero-copy">
              <p className="hero-description">{slide.desc}</p>

              <div className="hero-cta-group">
                <Link href={slide.btnPrimaryLink}>
                  <a className="btn-primary">
                    <span>{slide.btnPrimaryText}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </a>
                </Link>
                <Link href="/#catalog">
                  <a className="text-link">View the collection</a>
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <img
                src={slide.image}
                alt=""
                className="hero-banner-image"
                width="600"
                height="600"
                loading="eager"
                // @ts-ignore
                fetchpriority="high"
              />
            </div>
          </div>


        </article>
      </div>
    </section>
  );
};

export default HeroBanner;
