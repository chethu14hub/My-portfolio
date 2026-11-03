import React, { useState } from 'react';

const SKILLS_DATA = [
  {
    id: 'react',
    name: 'React',
    category: 'dev',
    desc: 'Component-based UI library for building reactive and scalable modern web applications.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(0, 216, 255, 0.1)', borderColor: 'rgba(0, 216, 255, 0.25)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#00D8FF" strokeWidth="1.6">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
        </svg>
      </div>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'dev',
    desc: 'Semantic markup and structure for modern, accessible, and standards-compliant web pages.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(227, 79, 38, 0.1)', borderColor: 'rgba(227, 79, 38, 0.25)' }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" />
          <path fill="#EF652A" d="M12 22.17l6.885-1.957L20.5 3.33H12V22.17z" />
          <path fill="#EBEBEB" d="M12 9.75H8.531l-.232-2.718h7.402l.233-2.622H5.259l.699 8.272H12V9.75zm0 7.538l-2.48-.681-.16-1.815H7.308l.32 3.708 4.37 1.223.002-2.435z" />
          <path fill="#FFFFFF" d="M12 9.75h3.498l-.374 3.97L12 14.401v-2.081h.001zm0 7.538v2.435l4.22-1.173.38-4.186h-2.122l-.188 2.243-2.29.681z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'dev',
    desc: 'Dynamic scripting language powering interactive user experiences and modern web logic.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(247, 223, 30, 0.1)', borderColor: 'rgba(247, 223, 30, 0.25)' }}>
        <svg viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path fill="#000000" d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'dev',
    desc: 'Styling language that brings life to web pages with colors, layouts, and responsive designs.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(38, 77, 228, 0.1)', borderColor: 'rgba(38, 77, 228, 0.25)' }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fill="#264DE4" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" />
          <path fill="#2965F1" d="M12 22.17l6.885-1.957L20.5 3.33H12V22.17z" />
          <path fill="#EBEBEB" d="M12 9.75H8.531l-.232-2.718h7.402l.233-2.622H5.259l.699 8.272H12V9.75zm0 7.538l-2.48-.681-.16-1.815H7.308l.32 3.708 4.37 1.223.002-2.435z" />
          <path fill="#FFFFFF" d="M12 9.75h3.498l-.374 3.97L12 14.401v-2.081h.001zm0 7.538v2.435l4.22-1.173.38-4.186h-2.122l-.188 2.243-2.29.681z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'dev',
    desc: 'Versatile programming language for backend automation, scripting, and data algorithms.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(53, 114, 165, 0.1)', borderColor: 'rgba(53, 114, 165, 0.25)' }}>
        <svg viewBox="0 0 24 24">
          <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.869s-.109-3.403 3.351-3.403h5.766s3.24.052 3.24-3.132V3.302S18.28 0 11.914 0zM8.708 1.909a1.034 1.034 0 1 1 0 2.069 1.034 1.034 0 0 1 0-2.069z" />
          <path fill="#FFD43B" d="M12 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H11.893v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.869s.109 3.403-3.351 3.403H9.449s-3.24-.052-3.24 3.132v5.226S5.72 24 12.086 24H12zm3.206-1.909a1.034 1.034 0 1 1 0-2.069 1.034 1.034 0 0 1 0 2.069z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'c',
    name: 'C Programming',
    category: 'dev',
    desc: 'Foundational low-level systems programming, memory management, and data structures.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(0, 89, 156, 0.12)', borderColor: 'rgba(0, 89, 156, 0.28)' }}>
        <svg viewBox="0 0 24 24">
          <path fill="#00599C" d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.3l8.5 4.9v9.6L12 21.7 3.5 16.8V7.2L12 2.3z" />
          <path fill="#659AD2" d="M15.5 8.2c-.8-.7-1.8-1-2.9-1-2.6 0-4.6 2.1-4.6 4.8s2 4.8 4.6 4.8c1.1 0 2.1-.4 2.9-1.1l1.4 1.6c-1.1 1.1-2.7 1.7-4.3 1.7-3.9 0-7-3.1-7-7s3.1-7 7-7c1.7 0 3.2.6 4.3 1.7l-1.4 1.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'git',
    name: 'Git',
    category: 'dev',
    desc: 'Distributed version control for source code tracking, branching, and team workflows.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(240, 80, 50, 0.1)', borderColor: 'rgba(240, 80, 50, 0.25)' }}>
        <svg viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.67 .45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
        </svg>
      </div>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'dev',
    desc: 'Cloud repository management, collaborative open-source workflows, and CI/CD pipelines.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        <svg viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'dev',
    desc: 'Primary developer editor customized with debugging tools, snippets, and fast extensions.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(0, 122, 204, 0.12)', borderColor: 'rgba(0, 122, 204, 0.28)' }}>
        <svg viewBox="0 0 24 24">
          <path fill="#007ACC" d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.26a.999.999 0 0 0-.022 1.434L4.16 12 .305 15.306a.999.999 0 0 0 .022 1.434l1.322 1.201a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'dev',
    desc: 'Advanced agentic AI coding environment for paired full-stack engineering and rapid prototyping.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(231, 76, 60, 0.12)', borderColor: 'rgba(231, 76, 60, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="url(#agGrad)" />
          <circle cx="18.5" cy="5.5" r="2.5" fill="#FF8C69" />
          <circle cx="5.5" cy="18.5" r="2" fill="#E74C3C" />
          <defs>
            <linearGradient id="agGrad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E74C3C" />
              <stop offset="0.5" stopColor="#FF5252" />
              <stop offset="1" stopColor="#FF9E80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'dev',
    desc: 'Node-based workflow automation connecting APIs, webhooks, databases, and microservices.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(234, 75, 113, 0.12)', borderColor: 'rgba(234, 75, 113, 0.28)' }}>
        <svg viewBox="0 0 24 24">
          <path fill="#EA4B71" d="M2.5 12a4.5 4.5 0 0 1 8.84-1.2h2.82A4.5 4.5 0 1 1 21.5 12a4.5 4.5 0 0 1-7.34 3.5h-2.82A4.5 4.5 0 0 1 2.5 12zm4.5 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <circle cx="7" cy="12" r="1.5" fill="#FFFFFF" />
          <circle cx="17" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    ),
  },
  {
    id: 'flowise',
    name: 'Flowise',
    category: 'dev',
    desc: 'Visual drag-and-drop orchestration for LLM pipelines, autonomous agents, and LangChain apps.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="7" height="6" rx="2" fill="#6366F1" />
          <rect x="15" y="3" width="7" height="6" rx="2" fill="#06B6D4" />
          <rect x="8.5" y="15" width="7" height="6" rx="2" fill="#8B5CF6" />
          <path d="M5.5 9v3a2 2 0 0 0 2 2h2m9-5v3a2 2 0 0 1-2 2h-2m0 0v1" stroke="#A5B4FC" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    category: 'design',
    desc: 'Industry-standard raster graphics, image retouching, advanced compositing, and visual art.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(49, 168, 255, 0.12)', borderColor: 'rgba(49, 168, 255, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#001E36" />
          <path fill="#31A8FF" d="M4.5 7h4.8c1.6 0 2.8.4 3.6 1.1.8.8 1.2 1.8 1.2 3.1 0 1.4-.4 2.4-1.2 3.2-.8.8-2 1.1-3.6 1.1H7.1v4H4.5V7zm2.6 6.3h2c.8 0 1.4-.2 1.8-.5.4-.4.6-.9.6-1.6 0-.7-.2-1.2-.6-1.6-.4-.3-1-.5-1.8-.5h-2v4.2zM15 13.8c.4-.7.9-1.2 1.5-1.6.6-.4 1.3-.6 2-.6.7 0 1.3.2 1.8.5.5.3.8.8 1 1.4l-1.8.8c-.2-.4-.5-.6-.9-.6s-.7.1-.9.4c-.2.2-.4.6-.4 1.1 0 .6.2 1 .5 1.3.3.3.8.6 1.4.9.8.4 1.4.8 1.8 1.3.4.5.6 1.1.6 1.9 0 1-.4 1.8-1.1 2.4-.7.6-1.7.9-2.8.9-1 0-1.8-.3-2.5-.8-.7-.6-1.1-1.3-1.2-2.3l2-.6c.1.5.3.9.7 1.2.4.3.8.4 1.4.4.6 0 1-.1 1.4-.4.4-.3.5-.6.5-1 0-.4-.1-.7-.4-.9-.3-.2-.7-.5-1.3-.8-.8-.4-1.4-.8-1.8-1.3-.4-.5-.6-1.1-.6-1.8 0-.9.3-1.7.9-2.3z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'design',
    desc: 'Vector graphics creation for high-precision branding, logos, custom typography, and icons.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(255, 154, 0, 0.12)', borderColor: 'rgba(255, 154, 0, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#330000" />
          <path fill="#FF9A00" d="M4.5 19.5L9 6.5h2.8l4.5 13h-2.7l-1-3.3H8.2l-1 3.3H4.5zm4.4-5.4h3.1L10.4 9.8h-.1l-1.4 4.3zM18.2 6.5h2.6v2.6h-2.6V6.5zm0 4h2.6v9h-2.6v-9z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    desc: 'Collaborative UI/UX wireframing, high-fidelity prototypes, and cohesive design systems.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(162, 89, 255, 0.12)', borderColor: 'rgba(162, 89, 255, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
          <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
          <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
          <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
          <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
        </svg>
      </div>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'design',
    desc: 'Rapid visual design, branded promotional assets, presentation decks, and social banners.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(0, 196, 204, 0.12)', borderColor: 'rgba(0, 196, 204, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="url(#canvaGrad)" />
          <path
            d="M14.5 8c-.6 0-1.2.2-1.7.5-.8.5-1.3 1.4-1.5 2.3-.6 2.3-1.8 4.2-3.3 5.5-.4.4-.9.7-1.4.7-.6 0-1.1-.3-1.1-.9 0-.4.2-.8.4-1.2.7-1.4 1.7-3.4 1.7-5.1 0-1.8-1.2-2.8-2.6-2.8C3.1 7 2 8.7 2 11.2c0 3.3 2.3 5.8 5.4 5.8 2.2 0 4.1-1.2 5.5-3.2.9 1.4 2.2 2.2 3.8 2.2 2.4 0 4.3-1.8 4.3-4.3 0-2.2-1.8-3.7-4-3.7h-.5z"
            fill="#FFFFFF"
          />
          <defs>
            <linearGradient id="canvaGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    id: 'adobe-express',
    name: 'Adobe Express',
    category: 'design',
    desc: 'Quick multimedia editing, fast video snips, marketing animations, and content creation.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(235, 16, 0, 0.12)', borderColor: 'rgba(235, 16, 0, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#1E1E24" />
          <path
            d="M12.8 4.4a3.6 3.6 0 0 0-4.4.8L4.6 9.4a3.6 3.6 0 0 0 0 4.8l3.8 4.2a3.6 3.6 0 0 0 4.4.8l-1.8-2.6a1.5 1.5 0 0 1-1.8-.3L6.8 13a1.5 1.5 0 0 1 0-2l2.4-2.7a1.5 1.5 0 0 1 1.8-.3l1.8-2.6z"
            fill="#EB1000"
          />
          <path
            d="M11.2 19.6a3.6 3.6 0 0 0 4.4-.8l3.8-4.2a3.6 3.6 0 0 0 0-4.8l-3.8-4.2a3.6 3.6 0 0 0-4.4-.8l1.8 2.6a1.5 1.5 0 0 1 1.8.3l2.4 2.7a1.5 1.5 0 0 1 0 2l-2.4 2.7a1.5 1.5 0 0 1-1.8.3l-1.8 2.6z"
            fill="#7B2CBF"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 'lightroom',
    name: 'Lightroom',
    category: 'design',
    desc: 'Professional color grading, exposure tuning, and advanced RAW photographic processing.',
    icon: (
      <div className="skill-icon" style={{ background: 'rgba(49, 168, 255, 0.12)', borderColor: 'rgba(49, 168, 255, 0.28)' }}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#001D26" />
          <path
            fill="#31A8FF"
            d="M5 7h2.8v9.4h4.6v2.6H5V7zm9.4 6.7c0-1.4.3-2.5.9-3.2.6-.7 1.5-1.1 2.6-1.1 1.1 0 1.9.4 2.5 1.1.6.7.9 1.8.9 3.2v6.3h-2.6v-6c0-.8-.1-1.3-.4-1.7-.3-.4-.7-.5-1.3-.5s-1.1.2-1.4.6c-.3.4-.4 1-.4 1.8v5.8h-2.6v-6.3z"
          />
        </svg>
      </div>
    ),
  },
];

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateY(-10px) scale(1.05)`;
    card.style.zIndex = '35';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.zIndex = '';
  };

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (filter === 'all') return true;
    return skill.category === filter;
  });

  return (
    <section id="skills">
      <div className="container">
        <div className="section-tag reveal">Tech Stack</div>
        <h2 className="section-title reveal">
          Skills & <span className="text-gradient">Technologies</span>
        </h2>
        <p className="section-subtitle reveal">
          I work with a wide range of modern technologies, creative tools, and AI workflows.
        </p>

        {/* Skill Filter Tabs (no count badges) */}
        <div className="skills-filter reveal">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Skills
          </button>
          <button
            className={`filter-btn ${filter === 'dev' ? 'active' : ''}`}
            onClick={() => setFilter('dev')}
          >
            Development & AI
          </button>
          <button
            className={`filter-btn ${filter === 'design' ? 'active' : ''}`}
            onClick={() => setFilter('design')}
          >
            Design & Creative
          </button>
        </div>

        <div className="skills-grid reveal">
          {filteredSkills.map((skill) => (
            <div
              className="skill-card"
              key={skill.id}
              data-category={skill.category}
              data-skill={skill.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="skill-header">
                {skill.icon}
                <span className="skill-name">{skill.name}</span>
              </div>
              <p className="skill-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

