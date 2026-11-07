import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity Client
// Security Note: Never expose write tokens to the browser bundle.
// SANITY_API_TOKEN is strictly private for server-side environments.
const serverToken = typeof window === 'undefined' 
  ? (process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN)
  : undefined;

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jruyr6l6',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: serverToken,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
