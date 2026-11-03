import React from 'react';

export default function About() {
  const highlights = [
    {
      title: 'React Developer',
      subtitle: 'Modern & Interactive Web Apps',
    },
    {
      title: 'Vibe Coder',
      subtitle: 'Creative Coding & Fast Prototyping',
    },
    {
      title: 'Video Grapher & Editor',
      subtitle: 'Cinematic Visuals & Video Editing',
    },
    {
      title: 'Graphic Designer',
      subtitle: 'UI/UX & Visual Branding',
    },
    {
      title: 'Gamer',
      subtitle: 'Strategic Mindset & Gaming Enthusiast',
    },
  ];

  return (
    <section id="about">
      <div className="container">
        <div className="section-tag reveal">About Me</div>
        <div className="about-grid">
          <div className="about-visual reveal">
            <div className="about-img-wrapper">
              <img src="/IMG_20260321_104727.jpg" alt="Chethan" className="about-photo" />
              <div className="about-glow"></div>
              <div className="about-card-2 floating-alt">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <div>
                  <span className="card-num">MCA</span>
                  <span className="card-label">Student</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-text reveal">
            <h2>
              Passionate about building
              <br />
              <span className="text-gradient">digital masterpieces</span>
            </h2>
            <p>
              I'm an MCA student and creative developer with a deep love for crafting experiences
              that are both visually stunning and functionally flawless. I blend the worlds of
              design and development to bring fresh ideas to life.
            </p>
            <p>
              Driven by creativity, my passions include being a videographer and editor, graphic
              designer, and gamer. Whether it's an interactive web app, a motion-rich UI, or
              creative visual storytelling — I'm always pushing the boundaries of what's possible on
              the web.
            </p>
            <div className="about-highlights">
              {highlights.map((item, index) => (
                <div className="highlight-item" key={index}>
                  <span className="highlight-icon"></span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-primary">
              <span>Get In Touch</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

