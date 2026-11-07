import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';

import { client, urlFor } from '../../lib/client';
import { Product, Reveal } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { PRODUCT_INFO, DEFAULT_REVIEWS } from '../../lib/productEditorial';

const ProductDetails = ({ product, products = [] }) => {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

  useEffect(() => {
    setIndex(0);
    setQty?.(1);
  }, [product?._id, setQty]);

  if (!product) return null;

  const { image, name, details, price, slug } = product;
  const currentSlug = slug?.current || '';
  const currentInfo = PRODUCT_INFO[currentSlug] || {
    paragraphs: [
      details || 'Pure sound, premium acoustic drivers, and all-day comfort built for music lovers.',
      'Designed with durable lightweight materials and intuitive controls for an effortless everyday audio experience.'
    ]
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const scrollToTabs = (tabName) => {
    setActiveTab(tabName);
    if (typeof window !== 'undefined') {
      document.getElementById('pdp-tabs-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const relatedProducts = products.filter((item) => item._id !== product._id).slice(0, 4);

  return (
    <div className="pdp-wrapper">
      <Head>
        <title>{`${name} — SPARQ`}</title>
        <meta name="description" content={details || `${name} — precision acoustics by SPARQ.`} />
        {image?.[0] && (
          <link
            rel="preload"
            as="image"
            href={urlFor(image[0]).width(800).height(800).format('webp').quality(85).url()}
            // @ts-ignore
            fetchpriority="high"
          />
        )}
      </Head>

      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/"><a>Home</a></Link>
        <span className="separator" aria-hidden="true">/</span>
        <Link href="/#catalog"><a>Catalogue</a></Link>
        <span className="separator" aria-hidden="true">/</span>
        <span className="current" aria-current="page">{name}</span>
      </nav>

      <div className="pdp-grid">
        <Reveal className="pdp-gallery">
          <div className="pdp-stage">
            {image?.[index] && (
              <img
                src={urlFor(image[index]).width(800).height(800).format('webp').quality(85).url()}
                alt={`${name}, view ${index + 1}`}
                className="product-detail-image"
                width="600"
                height="600"
                loading="eager"
                // @ts-ignore
                fetchpriority="high"
              />
            )}
          </div>

          {image?.length > 1 && (
            <div className="small-images-container" aria-label="Product images">
              {image.map((item, imageIndex) => (
                <button
                  key={item._key || imageIndex}
                  type="button"
                  className={`small-image-button${imageIndex === index ? ' selected-image' : ''}`}
                  onClick={() => setIndex(imageIndex)}
                  aria-label={`View ${name}, image ${imageIndex + 1}`}
                  aria-pressed={imageIndex === index}
                >
                  <img
                    src={urlFor(item).width(160).height(160).format('webp').quality(80).url()}
                    alt=""
                    className="small-image"
                    width="78"
                    height="78"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className="pdp-details" delay={100}>
          <h1 className="pdp-title">{name}</h1>

          <p className="pdp-price-group">
            <span className="pdp-price">₹{price?.toLocaleString('en-IN')}</span>
          </p>

          {details && (
            <p className="pdp-details-text">{details}</p>
          )}

          <button
            type="button"
            className="pdp-rating-snippet"
            onClick={() => scrollToTabs('reviews')}
            aria-label="Read the three sample reviews for this product"
          >
            <span className="pdp-stars" aria-hidden="true">
              <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
            </span>
            <span className="pdp-rating-count">Three sample reviews</span>
          </button>

          <ul className="pdp-assurances">
            <li>Free delivery across India</li>
            <li>One-year warranty</li>
            <li>Seven-day returns</li>
          </ul>

          <div className="pdp-actions-row">
            <div className="quantity-control-group">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-desc">
                <button type="button" onClick={decQty} aria-label="Decrease quantity">
                  <AiOutlineMinus />
                </button>
                <span className="num" aria-live="polite">{qty}</span>
                <button type="button" onClick={incQty} aria-label="Increase quantity">
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className="pdp-buttons">
              <button
                type="button"
                className="btn-primary btn-secondary-fill"
                onClick={() => onAdd(product, qty)}
              >
                <BsBagCheck aria-hidden="true" />
                <span>Add to bag</span>
              </button>

              <button
                type="button"
                className="btn-primary btn-red"
                onClick={handleBuyNow}
              >
                <span>Buy now</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <p className="pdp-demo-note">
            Demo storefront — checkout runs in Stripe test mode and ships nothing.
          </p>
        </Reveal>
      </div>

      <section
        id="pdp-tabs-anchor"
        className="pdp-tabs-section"
        aria-label="Product description and reviews"
      >
        <div className="pdp-tabs-nav" role="tablist">
          <button
            type="button"
            role="tab"
            id="tab-description"
            aria-selected={activeTab === 'description'}
            aria-controls="panel-description"
            className={`pdp-tab-btn${activeTab === 'description' ? ' active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            type="button"
            role="tab"
            id="tab-reviews"
            aria-selected={activeTab === 'reviews'}
            aria-controls="panel-reviews"
            className={`pdp-tab-btn${activeTab === 'reviews' ? ' active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({DEFAULT_REVIEWS.length})
          </button>
        </div>

        <div className="pdp-tab-content">
          {activeTab === 'description' && (
            <div
              id="panel-description"
              role="tabpanel"
              aria-labelledby="tab-description"
              className="pdp-tab-panel"
            >
              <div className="pdp-desc-container">
                {currentInfo.paragraphs.map((para, paragraphIndex) => (
                  <p key={paragraphIndex} className="pdp-desc-paragraph">{para}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div
              id="panel-reviews"
              role="tabpanel"
              aria-labelledby="tab-reviews"
              className="pdp-tab-panel"
            >
              <p className="pdp-review-note">
                Sample reviews. These are placeholder testimonials written for this demo, not
                verified customer feedback.
              </p>

              <div className="pdp-reviews-list">
                {DEFAULT_REVIEWS.map((review, reviewIndex) => (
                  <article className="pdp-review-item" key={reviewIndex}>
                    <div className="pdp-review-top">
                      <div className="pdp-reviewer-info">
                        <img
                          src={review.avatar}
                          alt=""
                          className="pdp-reviewer-avatar"
                          width={44}
                          height={44}
                          loading="lazy"
                        />
                        <div>
                          <span className="pdp-reviewer-name">{review.name}</span>
                          <span className="pdp-review-date">{review.date}</span>
                        </div>
                      </div>

                      <span className="pdp-sample-tag">Sample review</span>
                    </div>

                    <div className="pdp-stars pdp-review-stars" aria-label="5 out of 5 stars">
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <AiFillStar key={starIndex} aria-hidden="true" />
                      ))}
                    </div>

                    <p className="pdp-review-text">{review.text}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pdp-related" aria-label="More from the collection">
          <div className="section-inner">
            <h2 className="section-title">More from the collection.</h2>
            <div className="pdp-related-grid">
              {relatedProducts.map((item, relatedIndex) => (
                <Product key={item._id} product={item} index={relatedIndex} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = '*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug][0]';
  const productsQuery = '*[_type == "product" && !(_id in path("drafts.**"))]';

  const [product, products] = await Promise.all([
    client.fetch(query, { slug: String(slug || '') }),
    client.fetch(productsQuery),
  ]);

  if (!product) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: { products, product },
    revalidate: 60,
  };
};

export default ProductDetails;
