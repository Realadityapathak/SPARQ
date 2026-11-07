import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="success-wrapper">
      <Head>
        <title>Page not found — SPARQ</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>

      <div className="success-card success-card-404">
        <p className="success-code" aria-hidden="true">404</p>
        <h1 className="success-title">Page not found.</h1>
        <p className="success-description">
          The page, product, or link you followed could not be found. It may have moved, or the
          catalogue may have changed since it was shared.
        </p>

        <Link href="/">
          <a className="btn-primary success-continue">
            <span>Return to the catalogue</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
