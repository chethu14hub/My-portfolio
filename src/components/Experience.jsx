import React from 'react';

export default function Experience() {
  const experiences = [
    {
      role: 'GDG Design Team Lead',
      badge: 'GDG Member',
      org: 'Google Developer Groups (GDG)',
      period: '2025 – 2026',
      logo: '/gdg-logo.png',
      desc: 'Spearheading creative and visual design initiatives for the Google Developer Groups (GDG) community. Crafting event branding, digital graphics, UI/UX designs, and engaging promotional media for developer workshops, tech events, and community activities.',
      tags: [
        'UI/UX Design',
        'Design Team Lead',
        'Visual Branding',
        'Event Graphics',
        'Community Growth',
      ],
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <div className="section-tag reveal">Experience</div>
        <h2 className="section-title reveal">
          My <span className="text-gradient">Experience</span>
        </h2>
        <p className="section-subtitle reveal">
          My journey in leadership, development, and community impact.
        </p>

        <div className="experience-timeline reveal">
          {experiences.map((exp, index) => (
            <div className="experience-card" key={index}>
              {/* Logo at side */}
              <div className="exp-logo-wrapper">
                <img src={exp.logo} alt={`${exp.org} Logo`} className="exp-logo-img" />
              </div>

              <div className="exp-content">
                <div className="exp-header">
                  <div>
                    <span className="exp-badge">{exp.badge}</span>
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-org">{exp.org}</h4>
                  </div>
                  <div className="exp-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="exp-desc">{exp.desc}</p>

                <div className="exp-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span className="exp-tag" key={tIdx}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

