import React from 'react';

import Reveal from './Reveal';

const REVIEWS = [
  {
    name: 'Aarav Sharma',
    city: 'Mumbai',
    avatar: '/avatars/aarav.jpg',
    text: 'The noise cancellation is remarkable. Mumbai local trains are suddenly quiet enough to actually enjoy acoustic tracks in peace.'
  },
  {
    name: 'Priya Sundaram',
    city: 'Bengaluru',
    avatar: '/avatars/priya.jpg',
    text: 'Clean, punchy bass without clouding vocals. The build feels like a much more expensive pair. Delivered in two days to Indiranagar.'
  },
  {
    name: 'Rohan Mehta',
    city: 'Delhi NCR',
    avatar: '/avatars/rohan.jpg',
    text: 'The memory foam cushions are the softest I have worn. Zero ear fatigue even after eight-hour coding sessions.'
  }
];

const ReviewMarquee = () => {
  return (
    <section className="reviews-section" aria-label="Sample listener reviews">
      <div className="section-inner reviews-layout">
        <Reveal className="reviews-header">
          <h2 className="section-title">Listener notes.</h2>
          <p className="reviews-note">
            Sample reviews written for this demo. They are not verified customer feedback.
          </p>
        </Reveal>

        <div className="reviews-list">
          {REVIEWS.map((review, index) => (
            <Reveal
              as="article"
              key={review.name}
              className="review-entry"
              delay={index * 70}
            >
              <blockquote className="review-quote">
                <p>{review.text}</p>
              </blockquote>

              <div className="review-person">
                <img
                  src={review.avatar}
                  alt=""
                  className="review-avatar"
                  width="44"
                  height="44"
                  loading="lazy"
                />
                <div>
                  <p className="review-user-name">{review.name}</p>
                  <p className="review-user-meta">{review.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewMarquee;
