import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="layout">
      <Head>
        <title>SPARQ — Shop</title>
        <meta name="description" content="SPARQ is a studio catalogue of headphones, earbuds, speakers and wearables, tuned for everyday listening in India." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#f0efec" />
        <link rel="icon" type="image/png" href="/brand/sparq-app-icon.png" />
        <link rel="apple-touch-icon" href="/brand/sparq-app-icon.png" />
        <meta property="og:title" content="SPARQ — Studio catalogue" />
        <meta property="og:description" content="Headphones, earbuds and wearables, tuned for the everyday listen." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/brand/sparq-app-icon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/brand/sparq-app-icon.png" />
      </Head>
      <header className="header-wrapper">
        <Navbar />
      </header>
      <main className="main-container">
        <div className="page-transition" key={router.pathname}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
