import React, { useEffect, useRef, useState } from 'react';

const DESIGN_POSTERS = [
  { src: '/Design-Project/AI Image to Video by(2).jpg', alt: 'AI Image to Video' },
  { src: '/Design-Project/fire base Wrokshop copy 2-01.jpg', alt: 'Firebase Workshop' },
  { src: '/Design-Project/Formal- Poster 5.jpg', alt: 'Formal Event Poster' },
  { src: '/Design-Project/Gantigravity 3.jpg', alt: 'Antigravity Poster' },
  { src: '/Design-Project/Git 2.jpg', alt: 'Git & GitHub Workshop' },
  { src: '/Design-Project/Ideathon Poster RGB-FNL-01.jpg', alt: 'Ideathon Poster' },
  { src: '/Design-Project/Intro To rag 2.jpg', alt: 'Intro to RAG Workshop' },
  { src: '/Design-Project/Invitaion and Events FNL.jpg', alt: 'Invitation & Events' },
  { src: '/Design-Project/Poster 2.jpg', alt: 'Design Poster 2' },
  { src: '/Design-Project/poster 4.jpg', alt: 'Tech Poster 4' },
  { src: '/Design-Project/Poster 9.jpg', alt: 'Design Poster 9' },
  { src: '/Design-Project/poster.jpg', alt: 'Featured Poster' },
  { src: '/Design-Project/power bi BCOM FNL.jpg', alt: 'Power BI Workshop' },
  { src: '/Design-Project/Vc diwali last fnl-01.jpg', alt: 'Diwali Celebration Event' },
  { src: '/Design-Project/web event poster[27052025]-01.jpg', alt: 'Web Event Poster' },
  { src: '/Design-Project/women in tech Poster fnl-01.jpg', alt: 'Women in Tech Poster' },
];

const CODING_PROJECTS = [
  {
    title: 'Larks By Lekhani',
    desc: 'An e-commerce business platform for bouquets and custom frames, allowing customers to book orders and complete purchases with integrated payment gateways.',
    tags: ['E-Commerce', 'React', 'Payment Gateway'],
    image: '/larks-by-lekhani.jpg',
    github: 'https://github.com/chethu14hub',
    demo: 'https://larks-by-lekhani.vercel.app/',
  },
  {
    title: 'Hostel Management System',
    desc: 'A comprehensive management portal for student attendance, home departure/return tracking, and a warden admin dashboard with complete oversight.',
    tags: ['Full Stack', 'Authentication', 'Admin Dashboard'],
    gradient: 'linear-gradient(135deg, #0a1a3b, #15387b)',
    github: 'https://github.com/chethu14hub/Hostel-Manegment-System',
    demo: 'https://github.com/chethu14hub/Hostel-Manegment-System',
  },
  {
    title: 'DraftFlow',
    desc: 'A visual node-based project architecture and planning tool helping developers map blueprints, connect system workflows, and organize tech stacks and databases.',
    tags: ['System Design', 'Node Workflow', 'Dev Tool'],
    image: '/draftflow.png',
    github: 'https://github.com/chethu14hub/DraftFlow',
    demo: 'https://github.com/chethu14hub/DraftFlow',
  },
];

export default function Projects() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wheel and Touch listeners for 3D carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onWheel = (e) => {
      e.preventDefault();
      setActiveIndex((prev) => {
        const delta = e.deltaY > 0 ? 1 : -1;
        let next = prev + delta;
        if (next >= DESIGN_POSTERS.length) next = 0;
        if (next < 0) next = DESIGN_POSTERS.length - 1;
        return next;
      });
    };

    // Mobile touch swipe gesture
    let touchStartX = 0;
    let touchEndX = 0;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 35) {
        setActiveIndex((prev) => {
          let next = prev + (diff > 0 ? 1 : -1);
          if (next >= DESIGN_POSTERS.length) next = 0;
          if (next < 0) next = DESIGN_POSTERS.length - 1;
          return next;
        });
      }
    };

    carousel.addEventListener('wheel', onWheel, { passive: false });
    carousel.addEventListener('touchstart', onTouchStart, { passive: true });
    carousel.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      carousel.removeEventListener('wheel', onWheel);
      carousel.removeEventListener('touchstart', onTouchStart);
      carousel.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const handleCardMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  const totalPosters = DESIGN_POSTERS.length;

  return (
    <section id="projects">
      <div className="container">
        <div className="design-projects">
          {/* LEFT: headings */}
          <div className="projects-side">
            <div className="section-tag reveal">My Work</div>
            <h2 className="section-title reveal">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="section-subtitle reveal">
              A selection of my design work and coding projects.
            </p>

            <div className="design-heading">
              <h2 className="section-title">
                Design <span className="text-gradient">Projects</span>
              </h2>
              <p>A collection of my graphic design and creative works.</p>
            </div>
          </div>

          {/* RIGHT: carousel */}
          <div className="projects-stage">
            <div className="design-carousel" id="designCarousel" ref={carouselRef}>
              <div className="carousel-track">
                {DESIGN_POSTERS.map((poster, index) => {
                  let offset = index - activeIndex;
                  if (offset > totalPosters / 2) offset -= totalPosters;
                  if (offset < -totalPosters / 2) offset += totalPosters;

                  const distance = Math.abs(offset);
                  const cardSpacing = isMobile ? 140 : 220;
                  const x = offset * cardSpacing;
                  const z = -distance * (isMobile ? 70 : 100);
                  const rotateY = offset * (isMobile ? -10 : -12);
                  const scale = Math.max(isMobile ? 0.65 : 0.55, 1 - distance * (isMobile ? 0.15 : 0.12));
                  const filterVal = distance === 0 ? 'blur(0px)' : `blur(${Math.min(distance * 2, 5)}px)`;
                  const opacityVal = distance > (isMobile ? 3 : 4) ? 0 : 1;
                  const zIndexVal = totalPosters - distance;

                  return (
                    <div
                      className="design-card"
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      style={{
                        transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                        filter: filterVal,
                        opacity: opacityVal,
                        zIndex: zIndexVal,
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={encodeURI(poster.src)}
                        alt={poster.alt}
                        onError={(e) => {
                          if (!e.target.dataset.triedRelative) {
                            e.target.dataset.triedRelative = 'true';
                            e.target.src = encodeURI(poster.src.replace(/^\//, ''));
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="carousel-hint">Scroll to explore my designs ↔</p>
        </div>
      </div>

      {/* CODING PROJECTS */}
      <div className="project-category">
        <h3 className="section-title reveal">
          Coding <span className="text-gradient">Projects</span>
        </h3>
        <p className="section-subtitle reveal">Web development and software projects.</p>

        <div className="projects-grid">
          {CODING_PROJECTS.map((proj, idx) => (
            <div
              className="project-card reveal"
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="project-img-wrapper">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="project-img"
                    onError={(e) => {
                      if (!e.target.dataset.triedRelative) {
                        e.target.dataset.triedRelative = 'true';
                        e.target.src = proj.image.replace(/^\//, '');
                      }
                    }}
                  />
                ) : (
                  <div className="project-placeholder" style={{ background: proj.gradient }}>
                    <div className="project-lines">
                      <div className="p-line"></div>
                      <div className="p-line"></div>
                      <div className="p-line"></div>
                    </div>
                    <span className="project-code">&lt;/&gt;</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    <a
                      href={proj.github}
                      className="project-link"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={proj.demo}
                      className="project-link"
                      aria-label="Live demo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {proj.tags.map((t, tidx) => (
                    <span className="tag" key={tidx}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

