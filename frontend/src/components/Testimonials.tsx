import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import { fetchTestimonials } from "../services/api";

interface Testimonial {
  id?: number;
  name: string;
  text?: string;
  status?: string;
  approved?: boolean;
  avatar?: string;
  role?: string;
  date?: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    fetchTestimonials().then((data) => {
      const normalized = Array.isArray(data)
        ? data.map(t => ({ ...t, status: t.approved ? 'APPROVED' : 'REJECTED' }))
        : [];
      setTestimonials(normalized.filter((t) => t.status === 'APPROVED'));
    });
  }, []);
  if (!testimonials || testimonials.length === 0) {
    return <div className="testimonials-empty">No testimonials available.</div>;
  }
  const handlePrev = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const testimonial = testimonials[current];
  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">Testimonials</h2>
      <div className="testimonials-slider">
        <button className="slider-arrow left" onClick={handlePrev} aria-label="Previous testimonial">&#8592;</button>
        <div className="testimonial-card" key={current}>
          <div className="testimonial-header">
            {testimonial.avatar ? (
              <img className="testimonial-avatar" src={testimonial.avatar} alt={testimonial.name} />
            ) : (
              <div className="testimonial-avatar-placeholder">{testimonial.name[0]}</div>
            )}
            <div className="testimonial-meta">
              <span className="testimonial-author">{testimonial.name}</span>
              {testimonial.role && <span className="testimonial-role">{testimonial.role}</span>}
              {testimonial.date && <span className="testimonial-date">{testimonial.date}</span>}
            </div>
          </div>
          <div className="testimonial-body">{testimonial.text}</div>
          {testimonial.approved && <div className="testimonial-status">Approved</div>}
        </div>
        <button className="slider-arrow right" onClick={handleNext} aria-label="Next testimonial">&#8594;</button>
      </div>
      <div className="slider-indicators">
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            className={"slider-dot" + (idx === current ? " active" : "")}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
