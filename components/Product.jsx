import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import { getProductCategory } from '../lib/categories';
import Reveal from './Reveal';

const Product = ({ product, index = 0 }) => {
  const { onAdd } = useStateContext() || {};
  if (!product) return null;

  const { image, name, slug, price } = product;
  const categoryTag = getProductCategory(name, slug?.current);
  const tone = index % 4;

  const handleQuickAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onAdd?.(product, 1);
  };

  return (
    <Reveal
      as="article"
      className={`product-card product-tone-${tone}`}
      delay={Math.min(index, 7) * 55}
      aria-label={name}
    >
      <div className="product-card-media">
        <Link href={`/product/${slug?.current}`}>
          <a className="product-card-media-link" aria-label={`View ${name}`}>
            {image?.[0] && (
              <img
                src={urlFor(image[0]).width(500).height(500).format('webp').quality(80).url()}
                alt={name}
                className="product-image"
                loading="lazy"
                width="500"
                height="500"
              />
            )}
          </a>
        </Link>
      </div>

      <div className="product-card-strip">
        <div className="product-card-row">
          <span className="product-category-tag">{categoryTag}</span>
          <span className="product-price">
            <span className="product-currency">₹</span>
            {price?.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="product-card-row product-card-row-bottom">
          <h3 className="product-name">
            <Link href={`/product/${slug?.current}`}>
              <a>{name}</a>
            </Link>
          </h3>

          <button
            type="button"
            className="quick-add-btn"
            onClick={handleQuickAdd}
            aria-label={`Add ${name} to bag`}
          >
            <span>Add</span>
            <span className="quick-add-mark" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
};

export default Product;
