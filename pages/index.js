import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';

import { client, urlFor } from '../lib/client';
import { Product, HeroBanner, TrustBar, ContactForm, ReviewMarquee, FAQ, Reveal } from '../components';
import { CATEGORIES, matchCategory } from '../lib/categories';

const Home = ({ products = [], bannerData = [] }) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!router.isReady) return;

    const category = router.query.category;
    const isValidCategory = typeof category === 'string'
      && CATEGORIES.some((cat) => cat.id === category);

    setActiveCategory(isValidCategory ? category : 'all');
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    if (!router.isReady || router.query.focus !== 'search') return;

    const input = searchInputRef.current;
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus({ preventScroll: true });
    }

    const remainingQuery = { ...router.query };
    delete remainingQuery.focus;
    router.replace(
      { pathname: '/', query: remainingQuery, hash: 'catalog' },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [router, router.isReady, router.query.focus]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    router.replace(
      {
        pathname: '/',
        query: categoryId === 'all' ? {} : { category: categoryId },
        hash: 'catalog',
      },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCat = matchCategory(product, activeCategory);
      const matchesSearch = searchQuery.trim() === ''
        || product.name.toLowerCase().includes(searchQuery.toLowerCase())
        || (product.details && product.details.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const bannersWithProducts = useMemo(() => {
    return bannerData.map((banner) => {
      const match = products.find((product) => product.slug?.current === banner.product);
      return {
        ...banner,
        productName: match?.name || '',
        productPrice: match?.price,
      };
    });
  }, [bannerData, products]);

  const featureBanner = bannersWithProducts.find((banner) => banner.product === 'gaming-headphones')
    || bannersWithProducts[1];

  const heroImage = bannersWithProducts?.[0]?.image;
  const heroImageUrl = heroImage
    ? urlFor(heroImage).width(720).format('webp').quality(80).url()
    : null;

  return (
    <>
      <Head>
        <title>SPARQ | Precision Audio &amp; Wearables</title>
        {heroImageUrl && (
          <link
            rel="preload"
            as="image"
            href={heroImageUrl}
            // @ts-ignore
            fetchpriority="high"
          />
        )}
      </Head>

      <HeroBanner bannerData={bannersWithProducts} />

      <TrustBar />

      <section id="catalog" className="catalog-section" aria-label="Product catalogue">
        <div className="section-inner">
          <Reveal className="catalog-header">
            <div className="catalog-heading">
              <h2 className="section-title">The collection.</h2>
              <p className="catalog-intro">
                Eight pieces, one idea: nothing between you and the music.
              </p>
            </div>

            <div className="catalog-tools">
              <div className="catalog-search-box">
                <BsSearch className="search-icon" aria-hidden="true" />
                <label htmlFor="catalog-search" className="sr-only">Search products</label>
                <input
                  id="catalog-search"
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search the catalogue"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="category-tabs" role="tablist" aria-label="Filter products by category">
                {CATEGORIES.map((cat) => {
                  const count = products.filter((product) => matchCategory(product, cat.id)).length;
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      className={`category-tab${isActive ? ' active' : ''}`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <span className="count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="products-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Product key={product._id} product={product} index={index} />
              ))
            ) : (
              <div className="empty-catalog">
                <h3>Nothing matched that listen.</h3>
                <p>Try another category, or clear the search to see the full catalogue.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
                >
                  <span>Reset filters</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {featureBanner && (
        <section className="feature-section" aria-label="Gaming collection">
          <div className="section-inner feature-layout">
            <Reveal className="feature-copy">
              <h2 className="feature-title">
                <span>{featureBanner.titleLine1}</span>
                {featureBanner.titleAccent && (
                  <span className="feature-title-line">{featureBanner.titleAccent}</span>
                )}
              </h2>

              <p className="feature-description">{featureBanner.desc}</p>

              <ul className="feature-specs" aria-label="Highlights">
                <li>Immersive 3D audio</li>
                <li>Memory foam cushions</li>
                <li>Noise-cancelling mic</li>
              </ul>

              <Link href={`/product/${featureBanner.product}`}>
                <a className="btn-primary btn-on-dark">
                  <span>{featureBanner.buttonText || 'Explore the headset'}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>
              </Link>
            </Reveal>

            <Reveal className="feature-visual" delay={120}>
              <img
                src={featureBanner.image ? urlFor(featureBanner.image).width(720).format('webp').quality(80).url() : ''}
                alt={featureBanner.productName || 'Gaming headset'}
                width="600"
                height="600"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
      )}

      <ReviewMarquee />

      <FAQ />

      <ContactForm />
    </>
  );
};

export const getServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );
  }

  const [products, bannerData] = await Promise.all([
    client.fetch('*[_type == "product" && !(_id in path("drafts.**"))]'),
    client.fetch('*[_type == "banner" && !(_id in path("drafts.**"))] | order(_createdAt asc)'),
  ]);

  return {
    props: { products, bannerData },
  };
};

export default Home;
