import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 120;
const FRAME_PATH = (n) => `portfolio-assets/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
const SCROLL_PAGES = 2;

export default function Hero() {
  const containerRef = useRef(null);
  const frameCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const progressFillRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Typewriter state
  const [typedRole, setTypedRole] = useState('React Developer');

  // 1. Particle Background System
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.floor((canvas.width * canvas.height) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 60, 40, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Scroll-Driven Frame Animator
  useEffect(() => {
    const canvas = frameCanvasRef.current;
    const container = containerRef.current;
    const progressFill = progressFillRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const frames = new Array(TOTAL_FRAMES);
    let currentFrame = 0;
    let targetFrame = 0;
    let rafId = null;
    let isReady = false;

    document.documentElement.style.setProperty('--scroll-pages', SCROLL_PAGES);

    const drawFrame = (img) => {
      if (!img || !canvas) return;
      const iw = img.naturalWidth || img.width || 1;
      const ih = img.naturalHeight || img.height || 1;
      const scale = Math.max(canvas.width / iw, canvas.height / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      const wrapper = canvas.parentElement;
      if (!wrapper) return;
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
      const activeImg = frames[Math.round(currentFrame)];
      if (activeImg) {
        drawFrame(activeImg);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Preload frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        frames[i] = img;
        if (i === 0 && !isReady) {
          isReady = true;
          drawFrame(img);
        }
      };
    }

    const onScroll = () => {
      if (!container) return;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const scrollable = containerHeight - viewportHeight;
      const scrolled = Math.max(0, scrollY - containerTop);
      const progress = Math.min(1, Math.max(0, scrolled / (scrollable || 1)));

      targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));

      if (progressFill) {
        progressFill.style.width = progress * 100 + '%';
      }

      if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 50 ? '0' : '1';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const lerp = (a, b, t) => a + (b - a) * t;
    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop);
      const smoothed = lerp(currentFrame, targetFrame, 0.15);
      const frameIdx = Math.round(smoothed);

      if (frameIdx !== currentFrame || Math.abs(smoothed - targetFrame) > 0.5) {
        currentFrame = smoothed;
        const img = frames[frameIdx];
        if (img) drawFrame(img);
      }
    };
    renderLoop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 3. Typewriter Effect
  useEffect(() => {
    const roles = [
      'React Developer',
      'Vibe Coder',
      'Graphic Designer',
      'Videographer & Editor',
      'UI/UX Designer',
    ];

    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const role = roles[ri];
      if (!deleting) {
        ci++;
        setTypedRole(role.substring(0, ci));
        if (ci === role.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1800);
          return;
        }
      } else {
        ci--;
        setTypedRole(role.substring(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 50 : 90);
    };

    timeoutId = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="hero-scroll-container" ref={containerRef}>
      <section id="hero">
        {/* Animated canvas background particles */}
        <canvas id="particleCanvas" ref={particleCanvasRef}></canvas>

        {/* Frame-sequence animation */}
        <div className="hero-animation-wrapper">
          <canvas id="frameCanvas" ref={frameCanvasRef}></canvas>
        </div>

        {/* Hero text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for work
          </div>
          <h1 className="hero-title">
            <span className="line-reveal" data-delay="0">
              Hi, I'm
            </span>
            <span className="line-reveal name-gradient" data-delay="200">
              Chethan
            </span>
            <span className="line-reveal" data-delay="400">
              {typedRole}
            </span>
          </h1>
          <p className="hero-subtitle line-reveal" data-delay="600">
            Hello! ,I'm Chethan, an MCA student and tech enthusiast passionate about frontend
            development, UI/UX, and graphic design. I also love videography and video editing,
            combining creativity and technology to bring ideas to life.
          </p>
          <div className="hero-buttons line-reveal" data-delay="800">
            <a href="#projects" className="btn-primary">
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              Let's Talk
            </a>
          </div>
        </div>

        {/* Frame progress bar */}
        <div id="frame-progress-bar">
          <div id="frame-progress-fill" ref={progressFillRef}></div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </section>
    </div>
  );
}

