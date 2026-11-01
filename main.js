/* ============================================
   MAIN.JS — Scroll-Driven Portfolio
   Hero animation: frame advances with scroll.
   When all frames are shown → scroll unlocks
   to reveal the rest of the page.
   ============================================ */

/* ─── Constants ─── */
const TOTAL_FRAMES = 120;   // use first 120 frames — cuts the tail end off
const FRAME_PATH = (n) => `portfolio-assets/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
const SCROLL_PAGES = 2;     // 2× viewport height of scroll to finish animation

/* ─────────────────────────────────────────────
   SCROLL-DRIVEN FRAME ANIMATOR
   ─────────────────────────────────────────── */
class ScrollFrameAnimator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.frames = new Array(TOTAL_FRAMES);   // sparse array, filled as images load
    this.loadedCount = 0;
    this.currentFrame = 0;
    this.targetFrame = 0;
    this.rafId = null;
    this.isReady = false;   // true once at least frame 0 is loaded

    this.progressFill = document.getElementById('frame-progress-fill');
    this.container = document.getElementById('hero-scroll-container');
    this.scrollIndicator = document.querySelector('.scroll-indicator');

    // Set CSS variable so container height is correct
    document.documentElement.style.setProperty('--scroll-pages', SCROLL_PAGES);

    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._preloadAll();
    this._bindScroll();
    this._renderLoop();
  }

  /* ── Resize canvas to wrapper ── */
  _resize() {
    const wrapper = this.canvas.parentElement;
    this.canvas.width = wrapper.clientWidth;
    this.canvas.height = wrapper.clientHeight;
    // Redraw current frame after resize
    if (this.frames[Math.round(this.currentFrame)]) {
      this._drawFrame(this.frames[Math.round(this.currentFrame)]);
    }
  }

  /* ── Preload all images in parallel ── */
  _preloadAll() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        this.frames[i] = img;
        this.loadedCount++;
        if (i === 0 && !this.isReady) {
          // Draw frame 0 immediately so hero isn't blank
          this.isReady = true;
          this._drawFrame(img);
        }
      };
    }
  }

  /* ── Map scroll position → frame index ── */
  _bindScroll() {
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });
    // Initial call in case page reloads mid-scroll
    this._onScroll();
  }

  _onScroll() {
    if (!this.container) return;

    const containerTop = this.container.offsetTop;
    const containerHeight = this.container.offsetHeight;   // SCROLL_PAGES * 100vh
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // How far have we scrolled INTO the hero zone?
    // scrollable distance = containerHeight - viewportHeight
    const scrollable = containerHeight - viewportHeight;
    const scrolled = Math.max(0, scrollY - containerTop);
    const progress = Math.min(1, scrolled / scrollable);  // 0 → 1

    // Map progress to frame index
    this.targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));

    // Update progress bar
    if (this.progressFill) {
      this.progressFill.style.width = (progress * 100) + '%';
    }

    // Hide scroll indicator once user starts scrolling into hero
    if (this.scrollIndicator) {
      this.scrollIndicator.style.opacity = scrolled > 50 ? '0' : '';
    }
  }

  /* ── Draw a single image covering the canvas (object-fit: cover) ── */
  _drawFrame(img) {
    const { canvas, ctx } = this;
    const iw = img.naturalWidth || img.width || 1;
    const ih = img.naturalHeight || img.height || 1;
    const scale = Math.max(canvas.width / iw, canvas.height / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  /* ── RAF loop: smoothly lerp to targetFrame ── */
  _renderLoop() {
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      this.rafId = requestAnimationFrame(tick);

      // Smooth interpolation toward target frame
      const smoothed = lerp(this.currentFrame, this.targetFrame, 0.15);
      const frameIdx = Math.round(smoothed);

      if (frameIdx !== this.currentFrame || Math.abs(smoothed - this.targetFrame) > 0.5) {
        this.currentFrame = smoothed;

        const img = this.frames[frameIdx];
        if (img) this._drawFrame(img);
      }
    };
    tick();
  }
}

/* ─────────────────────────────────────────────
   PARTICLE BACKGROUND
   ─────────────────────────────────────────── */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._init();
    this._loop();
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _init() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 18000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 60, 40, ${p.alpha})`;
      ctx.fill();
    });
  }
}

/* ─────────────────────────────────────────────
   NAVBAR
   ─────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ─────────────────────────────────────────────
   SCROLL REVEALS
   ─────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Skill bars
  document.querySelectorAll('.skill-card').forEach(card => {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.skill-fill');
          if (bar) bar.style.width = bar.dataset.pct + '%';
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    ro.observe(card);
  });
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
   ─────────────────────────────────────────── */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const step = target / (1500 / 16);
        let current = 0;
        const tick = () => {
          current += step;
          if (current < target) { el.textContent = Math.floor(current); requestAnimationFrame(tick); }
          else { el.textContent = target; }
        };
        tick();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(n => obs.observe(n));
}

/* ─────────────────────────────────────────────
   CURSOR GLOW
   ─────────────────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    will-change: left, top;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ─────────────────────────────────────────────
   TILT EFFECT
   ─────────────────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // Skill cards come-front 3D hover tilt
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.transform = `perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateY(-10px) scale(1.05)`;
      card.style.zIndex = '35';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '';
    });
  });
}

/* ─────────────────────────────────────────────
   SKILL CATEGORY FILTER
   ─────────────────────────────────────────── */
function initSkillFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.skill-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            if (btn.classList.contains('active') && btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────
   CONTACT FORM
   ─────────────────────────────────────────── */
function initForm() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.classList.add('sending');
    btn.querySelector('span').textContent = 'Sending…';
    setTimeout(() => {
      btn.classList.remove('sending');
      btn.classList.add('sent');
      btn.querySelector('span').textContent = 'Message Sent! ✓';
      form.reset();
      setTimeout(() => {
        btn.classList.remove('sent');
        btn.querySelector('span').textContent = 'Send Message';
      }, 4000);
    }, 1500);
  });
}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL for anchor links
   ─────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─────────────────────────────────────────────
   TYPEWRITER (hero role)
   ─────────────────────────────────────────── */
function initTypeWriter() {
  const roles = ['React Developer', 'Vibe Coder', 'Graphic Designer', 'Videographer & Editor', 'UI/UX Designer'];
  const el = document.querySelector('.hero-title .line-reveal:last-child');
  if (!el) return;

  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const role = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = role.substring(0, ci);
      if (ci === role.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      ci--;
      el.textContent = role.substring(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 50 : 90);
  }
  setTimeout(tick, 2000);
}

/* ─────────────────────────────────────────────
   INIT
   ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('particleCanvas');
  new ScrollFrameAnimator('frameCanvas');
  initNavbar();
  initReveal();
  initCounters();
  initCursorGlow();
  initTilt();
  initSkillFilter();
  initForm();
  initSmoothScroll();
  initTypeWriter();
});
// DESIGN PROJECTS 3D CAROUSEL

const carousel = document.getElementById("designCarousel");

if (carousel) {
  const cards = carousel.querySelectorAll(".design-card");
  let activeIndex = 0;

  function updateCarousel() {
    const total = cards.length;

    cards.forEach((card, index) => {
      let offset = index - activeIndex;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const distance = Math.abs(offset);

      const x = offset * 220;
      const z = -distance * 100;
      const rotateY = offset * -12;
      const scale = Math.max(0.55, 1 - distance * 0.12);

      card.style.transform = `
  translate(-50%, -50%)
  translateX(${x}px)
  translateZ(${z}px)
  rotateY(${rotateY}deg)
  scale(${scale})
`;

      card.style.filter =
        distance === 0 ? "blur(0px)" : `blur(${Math.min(distance * 2, 5)}px)`;

      card.style.opacity = distance > 4 ? "0" : "1";
      card.style.zIndex = total - distance;
    });
  }

  carousel.addEventListener("wheel", (event) => {
    event.preventDefault();

    activeIndex += event.deltaY > 0 ? 1 : -1;

    if (activeIndex >= cards.length) activeIndex = 0;
    if (activeIndex < 0) activeIndex = cards.length - 1;

    updateCarousel();
  }, { passive: false });

  updateCarousel();
}