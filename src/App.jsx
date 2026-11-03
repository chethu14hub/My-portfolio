import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // 1. Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // 2. Interactive Cursor Glow
    let glow = null;
    let moveHandler = null;

    if (!window.matchMedia('(pointer: coarse)').matches) {
      glow = document.createElement('div');
      glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
        will-change: left, top;
      `;
      document.body.appendChild(glow);

      moveHandler = (e) => {
        if (glow) {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
        }
      };
      document.addEventListener('mousemove', moveHandler);
    }

    // 3. Smooth scrolling for internal anchor links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      observer.disconnect();
      if (glow && glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
      if (moveHandler) {
        document.removeEventListener('mousemove', moveHandler);
      }
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

