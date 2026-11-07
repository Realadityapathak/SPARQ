import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster
          position="top-center"
          containerStyle={{
            top: 92,
            left: 0,
            right: 0,
            bottom: 'auto',
            height: 0
          }}
          toastOptions={{
            duration: 3200,
            style: {
              background: '#141414',
              color: '#f0efec',
              borderRadius: '0',
              boxShadow: 'none',
              fontFamily: "'Literata', Georgia, 'Times New Roman', serif",
              fontSize: '15px',
              lineHeight: '1.45',
              padding: '12px 16px',
              maxWidth: '420px'
            },
            success: {
              iconTheme: { primary: '#c8261c', secondary: '#f0efec' }
            }
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
