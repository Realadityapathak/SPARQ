/**
 * Clean, human-written editorial product descriptions and customer reviews
 * Fallbacks when Sanity only has brief summary text.
 */

export const PRODUCT_INFO = {
  'headphones-gen-b': {
    paragraphs: [
      'The Headphones Gen B are crafted for people who love listening to music all day. We tuned the custom 40mm acoustic drivers to deliver crisp vocals, rich instruments, and deep, punchy bass that stays clean at every volume. Whether you are listening to acoustic melodies, podcasts, or upbeat tracks, every note comes through natural and clear.',
      'Comfort was our top focus. The ear cups are wrapped in ultra-soft memory foam that gently cushions your ears, distributing pressure evenly so you can wear them during work, study, or travel without any soreness. With up to 40 hours of battery life and quick USB-C charging, one charge easily powers your entire week.'
    ]
  },
  'headphones-gen-c': {
    paragraphs: [
      'Headphones Gen C deliver an honest, studio-grade listening experience. Built with a wide soundstage and balanced acoustic tuning, they let you hear tracks exactly the way the artist recorded them. The highs are crisp without harshness, and the bass is tight and responsive.',
      'The lightweight aluminum frame is paired with breathable ear cushions for a snug, fatigue-free fit. You can listen wirelessly with low-latency Bluetooth or connect directly with the included 3.5mm audio cable whenever you want a pure wired connection.'
    ]
  },
  'gaming-headphones': {
    paragraphs: [
      'Designed specifically for long gaming sessions and competitive play. The 50mm dynamic drivers deliver realistic positional audio so you can pinpoint enemy footsteps, reloads, and directional sound cues with complete accuracy.',
      'The headset features cooling memory foam ear pads that keep your ears cool during intense matches. The flexible noise-canceling microphone transmits your voice clearly to teammates while filtering out background keyboard clicks and ambient noise.'
    ]
  },
  'earbuds': {
    paragraphs: [
      'These wireless earbuds give you freedom and studio-grade sound in a compact, pocket-sized design. Active noise cancellation quietly filters out ambient street sounds, train hums, and office chatter so you can stay fully focused on your music and calls.',
      'The ergonomic silicone tips seal comfortably in your ears for workouts and daily commute, while IPX5 water resistance shields against sweat and sudden rain. Enjoy up to 30 hours of total playtime with the compact charging case.'
    ]
  },
  'speaker': {
    paragraphs: [
      'This portable Bluetooth speaker brings rich, room-filling sound wherever you go. Dual acoustic drivers and passive bass radiators create 360-degree sound with deep low ends and clear highs, perfect for living rooms, terraces, and outdoor hangouts.',
      'The rugged, waterproof body easily withstands splashes, rain, and travel bumps. With up to 16 hours of continuous playback and a built-in carry strap, your favorite music travels with you all day long.'
    ]
  },
  'wired-earphones': {
    paragraphs: [
      'Precision wired in-ear earphones made for listeners who value direct, zero-latency sound quality. The tuned micro-drivers provide rich bass and clear mids without any digital compression or audio delay.',
      'Built with a durable, tangle-resistant braided cable and an in-line HD microphone for crisp phone calls. The angled ear nozzles sit securely and comfortably inside your ear canal for hours of fatigue-free listening.'
    ]
  },
  'neckband-earphones': {
    paragraphs: [
      'Lightweight and flexible, this wireless neckband is built for morning runs, workouts, and busy workdays. The soft silicone band rests gently on your collar, while magnetic earbuds snap together neatly around your neck when not in use.',
      'Fast charging gives you hours of music from just a quick 10-minute top-up, with up to 24 hours of total battery life. Dual-device pairing lets you switch smoothly between laptop video calls and mobile phone calls.'
    ]
  },
  'smart-watch': {
    paragraphs: [
      'A sleek, lightweight smartwatch designed to keep you connected and active every day. The vibrant color display shows your daily activity, heart rate, sleep quality, and incoming notifications clearly under bright sunlight.',
      'With over 100 sports modes and IP68 water resistance, it tracks your runs, walks, workouts, and health metrics effortlessly. A single charge provides up to a full week of regular use so you rarely need to think about recharging.'
    ]
  }
};

export const DEFAULT_REVIEWS = [
  {
    name: 'Rohan Mehta',
    date: '3 days ago',
    rating: 5,
    avatar: '/avatars/rohan.jpg',
    text: 'Bass is deep and vocals are super clean. Wearing them for 6 to 8 hours daily for office work and they never hurt my ears. Best purchase in this price range.'
  },
  {
    name: 'Priya Sundaram',
    date: '1 week ago',
    rating: 5,
    avatar: '/avatars/priya.jpg',
    text: 'Sound quality feels like flagship headphones. Delivered in 2 days to Bengaluru. Very happy with the build and battery life.'
  },
  {
    name: 'Aarav Sharma',
    date: '2 weeks ago',
    rating: 5,
    avatar: '/avatars/aarav.jpg',
    text: 'Clear sound and very comfortable fit. Connects instantly with both my laptop and phone. 10/10 recommendation for music and work.'
  }
];

