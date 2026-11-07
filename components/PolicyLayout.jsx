import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

const PolicyLayout = ({ metaTitle, description, title, summary, updated, toc, children }) => {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="policy-page-wrapper section-inner">
        <nav className="policy-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/"><a>Home</a></Link>
          <span className="separator" aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        <header className="policy-header">
          <h1 className="policy-title">{title}</h1>
          <p className="policy-summary">{summary}</p>
          <span className="policy-updated">Last updated: {updated}</span>
        </header>

        <div className="policy-demo-notice" role="note">
          <strong>Demo notice.</strong> SPARQ is a demonstration storefront, not a registered
          business. This page describes how the demo actually behaves. It is not a legal
          agreement, and no real orders are fulfilled through this site.
        </div>

        <div className="policy-body">
          <nav className="policy-toc" aria-label="On this page">
            <h2>On this page</h2>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="policy-content">
            {children}

            <div className="policy-contact-box">
              <div>
                <h3>Still have a question?</h3>
                <p>The demo support inbox is the only contact channel that exists today.</p>
              </div>
              <a href="mailto:support@sparq.tech" className="btn-primary btn-light">
                <span>Contact support</span>
                <BsArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyLayout;
