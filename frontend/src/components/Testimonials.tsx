

import React from "react";
import "./Testimonials.css";

// Placeholder for dynamic testimonials (to be fetched from backend)
const testimonials: Array<{
  name: string;
  text: string;
  role?: string;
  avatar?: string;
}> = [];

const Testimonials: React.FC = () => {
  // In production, fetch testimonials from backend and filter for approved only
  if (!testimonials.length) {
    return (
      <section className="testimonials-section minimal-testimonials" aria-label="Testimonials">
        <h2>Testimonials</h2>
        <p className="testimonials-empty">No testimonials yet. Be the first to leave one!</p>
      </section>
    );
  }

  return (
    <section className="testimonials-section minimal-testimonials" aria-label="Testimonials">
      <h2>Testimonials</h2>
      <div className="testimonials-list minimal-list">
        {testimonials.map((t, i) => (
          <div className="testimonial-card minimal-card" key={i} tabIndex={0} aria-label={`Testimonial from ${t.name}`}>
            {t.avatar && <img src={t.avatar} alt={t.name} className="testimonial-avatar" />}
            <p className="testimonial-text">“{t.text}”</p>
            <div className="testimonial-author">
              <strong>{t.name}</strong>
              {t.role && <span>{t.role}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
