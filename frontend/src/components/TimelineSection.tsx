import React from "react";
import "./TimelineSection.css";

export interface TimelineItem {
  title: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

const icons = [
  <span role="img" aria-label="university" style={{ fontSize: "1.5rem" }}>🎓</span>,
  <span role="img" aria-label="briefcase" style={{ fontSize: "1.5rem" }}>💼</span>,
  <span role="img" aria-label="graduation" style={{ fontSize: "1.5rem" }}>🏅</span>,
  <span role="img" aria-label="developer" style={{ fontSize: "1.5rem" }}>💻</span>
];

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  // Use intersection observer to animate items on scroll in a real app
  // For now, simple vertical layout
  return (
    <div className="timeline-container">
      <h2 className="timeline-section-title">My Journey</h2>
      <div className="timeline-vertical">
        <div className="timeline-line"></div>
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx} className={`timeline-row ${isLeft ? "left" : "right"}`}>
              <div className="timeline-dot-wrapper">
                 <div className="timeline-dot-inner" />
                 <div className="timeline-dot-glow" />
              </div>
              <div className="timeline-content-card glass-panel">
                <div className="timeline-header">
                  <div className="timeline-icon-box">
                    {item.icon || icons[idx % icons.length]}
                  </div>
                  <div className="timeline-date-badge">{item.date}</div>
                </div>
                <h3 className="timeline-content-title">{item.title}</h3>
                {item.description && <p className="timeline-content-desc">{item.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
