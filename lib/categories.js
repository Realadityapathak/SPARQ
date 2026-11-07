/**
 * Single Authoritative Source of Truth for SPARQ Product Categories
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Products', navLabel: 'All Products', href: '/#catalog' },
  { id: 'headphones', label: 'Over-Ear Headphones', navLabel: 'Headphones', href: '/?category=headphones#catalog' },
  { id: 'earbuds', label: 'Wireless Earbuds', navLabel: 'Earbuds', href: '/?category=earbuds#catalog' },
  { id: 'speakers', label: 'Speakers & Audio', navLabel: 'Speakers', href: '/?category=speakers#catalog' },
  { id: 'wearables', label: 'Smart Wearables', navLabel: 'Wearables', href: '/?category=wearables#catalog' },
  { id: 'gaming', label: 'Gaming', navLabel: 'Gaming', href: '/?category=gaming#catalog' },
];

export const SHOP_NAV_LINKS = CATEGORIES.map((cat) => ({
  href: cat.href,
  label: cat.navLabel,
  category: cat.id,
}));

/**
 * Authoritative category matching based on product name and slug
 */
export const matchCategory = (product, catId) => {
  if (!catId || catId === 'all') return true;
  const name = (product?.name || '').toLowerCase();
  const slug = (product?.slug?.current || '').toLowerCase();
  const text = `${name} ${slug}`;

  if (catId === 'headphones') return text.includes('headphone') && !text.includes('earbud');
  if (catId === 'earbuds') return text.includes('earbud') || text.includes('earphone') || text.includes('neckband');
  if (catId === 'speakers') return text.includes('speaker');
  if (catId === 'wearables') return text.includes('watch') || text.includes('wearable');
  if (catId === 'gaming') return text.includes('gaming');
  return true;
};

/**
 * Resolves a readable category pill label for display on product cards
 */
export const getProductCategory = (name = '', slug = '') => {
  const text = `${name} ${slug}`.toLowerCase();
  if (text.includes('gaming')) return 'Gaming Headset';
  if (text.includes('headphone')) return 'Over-Ear Headphones';
  if (text.includes('earbud')) return 'Wireless Earbuds';
  if (text.includes('neckband')) return 'Wireless Neckband';
  if (text.includes('wired')) return 'In-Ear Earphones';
  if (text.includes('speaker')) return 'Bluetooth Speaker';
  if (text.includes('watch') || text.includes('wearable')) return 'Smart Watch';
  return 'Audio';
};

