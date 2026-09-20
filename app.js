/**
 * ARSHAD AYOOB — PORTFOLIO APPLICATION CORE
 * Founder of CodeNest Security & Digital Solutions
 */

// 1. PROJECT DATA REPOSITORY (REAL PROJECTS ONLY)
// Strictly NO Sneham Office! NO Lakshmi Services!
const REAL_PROJECTS = [
  {
    id: 'codenest',
    number: '01',
    name: 'CodeNest Security & Digital Solutions',
    category: 'CCTV & Digital Infrastructure',
    tags: ['CCTV Systems', 'IP Cameras', 'NVR/DVR', '4G Surveillance', 'Digital Solutions'],
    image: 'assets/arshad-poster.jpg',
    summary: 'Comprehensive physical security, intelligent IP surveillance networking, and custom enterprise digitalization across Kodagu.',
    description: 'CodeNest is a premier technology firm founded by Arshad Ayoob in Gonikoppal, Coorg. We engineer, deploy, and maintain commercial-grade surveillance ecosystems including high-resolution IP cameras, NVR matrices, 4G solar standalone cameras for remote estates, and end-to-end digital infrastructure for local enterprises.',
    stats: [
      { label: 'System Uptime', value: '99.98%' },
      { label: 'Cameras Deployed', value: '150+' },
      { label: 'Security Grade', value: 'Enterprise' }
    ]
  },
  {
    id: 'elora',
    number: '02',
    name: 'Elora Boutique POS',
    category: 'Retail / Fashion POS & Digital System',
    tags: ['JavaScript', 'IndexedDB', 'Barcode Scanning', 'Inventory', 'Thermal Printing'],
    image: 'assets/arshad-banner.jpg',
    summary: 'High-speed retail point-of-sale platform featuring real-time barcode decoding, automated inventory alerts, and customer purchase logs.',
    description: 'A custom retail management software designed specifically for the apparel and boutique sector. Built with an offline-first architecture powered by IndexedDB, Elora Boutique POS guarantees seamless billing even during network dropouts, automated stock categorization, barcode tag printing, customer purchase history, and daily profit analytics.',
    stats: [
      { label: 'Checkout Speed', value: '< 2.5s' },
      { label: 'Data Architecture', value: 'Offline-First' },
      { label: 'Inventory SKU Cap', value: '10,000+' }
    ]
  },
  {
    id: 'sln',
    number: '03',
    name: 'SLN Computers Billing & Service Suite',
    category: 'Computer Sales & Service System',
    tags: ['Web Application', 'Service Ticketing', 'Invoicing', 'Hardware Tracking', 'LocalStorage'],
    image: 'assets/design-mockup.jpg',
    summary: 'Custom digital service ticketing, hardware component tracking, and client invoicing system for computer sales and maintenance operations.',
    description: 'Developed for SLN Computers to streamline hardware repair queues, component warranties, technician worklogs, and instant GST-compliant invoicing. Provides transparent repair lifecycle tracking from intake to diagnostic completion and customer pickup.',
    stats: [
      { label: 'Ticket Resolution', value: '+45% Faster' },
      { label: 'Invoice Generation', value: 'Instant PDF' },
      { label: 'Audit Log', value: '100% Tracked' }
    ]
  },
  {
    id: 'shoecorner',
    number: '04',
    name: 'Shoe Corner Retail POS',
    category: 'Footwear Retail POS',
    tags: ['POS Systems', 'Size Matrix', 'Sales Reports', 'Barcode Engine', 'IndexedDB'],
    image: 'assets/arshad-banner.jpg',
    summary: 'Tailored footwear inventory and POS solution handling dynamic size/color variants, fast barcode scanning, and multi-payment reconciliation.',
    description: 'Designed to solve the unique inventory complexity of footwear retail. Shoe Corner POS handles size-run matrix tracking, seasonal markdown management, instant cash/UPI splits, and low-stock reorder alerts, eliminating stockout errors in high-volume retail environments.',
    stats: [
      { label: 'Barcode Scan Latency', value: '< 50ms' },
      { label: 'Variant Matrix', value: 'Multi-Size/Color' },
      { label: 'Reliability', value: 'Zero Dropouts' }
    ]
  },
  {
    id: 'portfolio',
    number: '05',
    name: 'Arshad Ayoob Creative Portfolio',
    category: 'Personal Portfolio / 3D Web Experience',
    tags: ['Three.js', 'Spring Physics', 'WebGL', 'Cyberpunk UI', 'Web Audio API'],
    image: 'assets/arshad-lake.jpg',
    summary: 'Futuristic 3D personal digital identity showcasing creative developer capabilities, physics-driven interactive Spider-Man, and sci-fi command console.',
    description: 'A signature creative development project engineered from scratch. Features an interactive WebGL Three.js digital core, custom spring-damper physics simulation for a hanging Spider-Man toy with elastic cable tension, live CCTV telemetry simulation, and responsive holographic design systems.',
    stats: [
      { label: 'Frame Rate', value: '60/120 FPS' },
      { label: 'Physics Loop', value: 'Spring-Damper' },
      { label: 'Design Theme', value: 'Cyber Infrared' }
    ]
  }
];

// 2. BOOT SEQUENCE INITIALIZER
class BootSequence {
  constructor() {
    this.screen = document.getElementById('boot-screen');
    this.consoleEl = document.getElementById('boot-console');
    this.progressBar = document.getElementById('boot-progress');
    this.skipBtn = document.getElementById('boot-skip');

    this.lines = [
      { text: '> INITIALIZING CODENEST CORE SYSTEM...', class: 'red', delay: 100 },
      { text: '> LOADING DIGITAL IDENTITY MATRIX...', class: '', delay: 400 },
      { text: '> SECURITY MODULE ................ [ ONLINE ]', class: 'cyan', delay: 700 },
      { text: '> CREATIVE 3D ENGINE ............. [ ONLINE ]', class: 'cyan', delay: 1000 },
      { text: '> CCTV TELEMETRY NETWORK ......... [ CONNECTED ]', class: '', delay: 1300 },
      { text: '> SYSTEM READY: ARSHAD AYOOB VERIFIED.', class: 'red', delay: 1600 }
    ];

    if (!this.screen) return;
    this.init();
  }

  init() {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      if (this.progressBar) this.progressBar.style.width = `${Math.min(100, progress)}%`;
      if (progress >= 100) clearInterval(progressInterval);
    }, 90);

    this.lines.forEach((line) => {
      setTimeout(() => {
        if (!this.screen.classList.contains('boot-done')) {
          const p = document.createElement('p');
          p.className = `boot-line ${line.class}`;
          p.textContent = line.text;
          if (this.consoleEl) this.consoleEl.appendChild(p);
        }
      }, line.delay);
    });

    // Auto finish after 2.1 seconds
    this.timeout = setTimeout(() => this.finish(), 2100);

    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => this.finish());
    }
  }

  finish() {
    clearTimeout(this.timeout);
    if (this.screen) {
      this.screen.classList.add('boot-done');
      setTimeout(() => {
        if (this.screen) this.screen.remove();
      }, 800);
    }
    // Trigger terminal in About section
    new TerminalTyping();
  }
}

// 3. INTERACTIVE TERMINAL TYPING (ABOUT SECTION)
class TerminalTyping {
  constructor() {
    this.bodyEl = document.getElementById('terminal-content');
    if (!this.bodyEl) return;

    this.content = [
      { cmd: 'boot arshad.system', type: 'cmd' },
      { cmd: 'loading identity matrix...', type: 'dim' },
      { label: 'IDENTITY', val: 'ARSHAD AYOOB', color: 'red' },
      { label: 'ROLE', val: 'CREATIVE DEVELOPER • SECURITY • DIGITAL SOLUTIONS', color: 'white' },
      { label: 'ORGANIZATION', val: 'CODENEST SECURITY & DIGITAL SOLUTIONS', color: 'cyan' },
      { label: 'SECURITY STATUS', val: 'ACTIVE & ENCRYPTED (AES-256)', color: 'green' },
      { label: 'LOCATION', val: 'GONIKOPPAL / COORG, KARNATAKA, INDIA', color: 'white' },
      { label: 'SYSTEM AVAILABILITY', val: 'READY FOR COMMERCIAL PROJECTS', color: 'green' }
    ];

    this.run();
  }

  async run() {
    this.bodyEl.innerHTML = '';
    for (const item of this.content) {
      const line = document.createElement('div');
      line.className = 'term-line';

      if (item.type === 'cmd') {
        line.innerHTML = `<span class="term-cmd">> ${item.cmd}</span>`;
        this.bodyEl.appendChild(line);
        await this.sleep(250);
      } else if (item.type === 'dim') {
        line.innerHTML = `<span class="term-label">> ${item.cmd}</span>`;
        this.bodyEl.appendChild(line);
        await this.sleep(200);
      } else {
        line.innerHTML = `<span class="term-label">[${item.label}]</span> <span class="term-val ${item.color}">${item.val}</span>`;
        this.bodyEl.appendChild(line);
        await this.sleep(150);
      }
    }
    // Append final blinking cursor
    const cursorLine = document.createElement('div');
    cursorLine.className = 'term-line';
    cursorLine.innerHTML = `<span class="term-cmd">> _</span><span class="cursor-blink"></span>`;
    this.bodyEl.appendChild(cursorLine);
  }

  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

// 4. CCTV SECURITY NETWORK SIMULATOR
class CCTVSimulator {
  constructor() {
    this.clockEl = document.getElementById('cctv-live-clock');
    this.feeds = [
      { id: 'cam1', name: 'CAM-01: HQ ENTRANCE', canvas: document.getElementById('cam-canvas-1') },
      { id: 'cam2', name: 'CAM-02: SERVER ROOM', canvas: document.getElementById('cam-canvas-2') },
      { id: 'cam3', name: 'CAM-03: PERIMETER NORTH', canvas: document.getElementById('cam-canvas-3') },
      { id: 'cam4', name: 'CAM-04: TECH LAB', canvas: document.getElementById('cam-canvas-4') }
    ];
    this.mainCanvas = document.getElementById('main-cctv-canvas');
    this.mainCamTitle = document.getElementById('main-cam-title');
    this.activeFeedIndex = 0;

    this.initClocks();
    this.initFeeds();
  }

  initClocks() {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      if (this.clockEl) {
        this.clockEl.textContent = `${timeStr}.${ms} IST`;
      }
      requestAnimationFrame(updateTime);
    };
    requestAnimationFrame(updateTime);
  }

  initFeeds() {
    this.feedCards = document.querySelectorAll('.sec-feed-card');
    this.feedCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.activeFeedIndex = idx;
        this.feedCards.forEach(c => c.classList.remove('active-feed'));
        card.classList.add('active-feed');
        if (this.mainCamTitle) {
          this.mainCamTitle.textContent = this.feeds[idx].name;
        }
      });
    });

    // Start CCTV canvas noise and simulation loops
    this.renderLoop();
  }

  renderLoop() {
    const render = (time) => {
      // 1. Render thumbnails
      this.feeds.forEach((feed, i) => {
        if (!feed.canvas) return;
        const ctx = feed.canvas.getContext('2d');
        const w = feed.canvas.width = 160;
        const h = feed.canvas.height = 100;

        // Dark CCTV background
        ctx.fillStyle = i === 1 ? '#040b10' : '#070a0e';
        ctx.fillRect(0, 0, w, h);

        // Security grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 20) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 20) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Motion bounding box simulation
        const boxX = 40 + Math.sin(time * 0.001 + i) * 30;
        const boxY = 30 + Math.cos(time * 0.0015 + i) * 15;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.strokeRect(boxX, boxY, 28, 28);

        // Scanline
        const scanY = (time * 0.05 + i * 40) % h;
        ctx.fillStyle = 'rgba(255, 26, 53, 0.15)';
        ctx.fillRect(0, scanY, w, 2);
      });

      // 2. Render Main Screen
      if (this.mainCanvas) {
        const ctx = this.mainCanvas.getContext('2d');
        const w = this.mainCanvas.width = 640;
        const h = this.mainCanvas.height = 360;

        ctx.fillStyle = '#04070c';
        ctx.fillRect(0, 0, w, h);

        // Floor perspective grid in camera
        ctx.strokeStyle = 'rgba(255, 26, 53, 0.12)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Animated target crosshair
        const curX = w * 0.5 + Math.sin(time * 0.0012) * 100;
        const curY = h * 0.5 + Math.cos(time * 0.001) * 50;

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(curX, curY, 20, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(curX - 28, curY); ctx.lineTo(curX + 28, curY);
        ctx.moveTo(curX, curY - 28); ctx.lineTo(curX, curY + 28);
        ctx.stroke();

        ctx.fillStyle = '#00f0ff';
        ctx.font = '10px monospace';
        ctx.fillText(`TARGET LOCKED: T-0${this.activeFeedIndex + 1}`, curX + 26, curY - 10);
        ctx.fillText(`COORD: ${Math.floor(curX)}, ${Math.floor(curY)}`, curX + 26, curY + 6);

        // Scan bar
        const scanBarY = (time * 0.08) % h;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, scanBarY, w, 4);
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}

// 5. PROJECT CARDS RENDERER & LIGHTBOX MODAL
class ProjectManager {
  constructor() {
    this.grid = document.getElementById('projects-grid');
    this.modal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-project-details');
    this.modalClose = document.getElementById('modal-close');

    if (!this.grid) return;
    this.renderCards();
    this.initModal();
  }

  renderCards() {
    this.grid.innerHTML = '';
    REAL_PROJECTS.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-thumb-box">
          <img src="${proj.image}" alt="${proj.name}" class="project-thumb-img" loading="lazy" />
          <div class="project-hologram-tag">PROJ // ${proj.number}</div>
        </div>
        <div class="project-body">
          <div>
            <div class="project-cat">${proj.category}</div>
            <h3 class="project-name">${proj.name}</h3>
            <p class="project-summary">${proj.summary}</p>
            <div class="project-tags">
              ${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="project-footer">
            <button class="project-view-btn" data-id="${proj.id}">
              VIEW SPECIFICATIONS &rarr;
            </button>
          </div>
        </div>
      `;
      this.grid.appendChild(card);
    });

    // Attach click listeners to view buttons
    this.grid.querySelectorAll('.project-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openModal(id);
      });
    });
  }

  initModal() {
    if (!this.modal) return;
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  openModal(id) {
    const proj = REAL_PROJECTS.find(p => p.id === id);
    if (!proj || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--color-red); font-size: 0.8rem; margin-bottom: 0.5rem;">
        // ARCHITECTURE SPECIFICATION &bull; SYSTEM ${proj.number}
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">
        ${proj.name}
      </h2>
      <div style="color: var(--color-cyan); font-family: var(--font-tech); font-size: 1rem; margin-bottom: 1.5rem;">
        ${proj.category}
      </div>
      <div style="position: relative; aspect-ratio: 16/9; border-radius: 8px; overflow: hidden; margin-bottom: 1.8rem; border: 1px solid rgba(255,255,255,0.15);">
        <img src="${proj.image}" alt="${proj.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <p style="color: var(--color-gray-200); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.8rem;">
        ${proj.description}
      </p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.8rem; padding: 1.2rem; background: rgba(15,20,32,0.8); border: 1px solid var(--color-border-red); border-radius: 8px;">
        ${proj.stats.map(s => `
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-gray-500);">${s.label}</div>
            <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-white); font-weight: 800;">${s.value}</div>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
        ${proj.tags.map(t => `<span class="tech-tag" style="border-color: var(--color-red); color: #fff;">${t}</span>`).join('')}
      </div>
    `;

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 6. CUSTOM CURSOR & MAGNETIC HOVER
class CyberCursor {
  constructor() {
    this.dot = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    if (!this.dot || !this.ring) return;

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ringPos = { x: this.pos.x, y: this.pos.y };

    this.init();
  }

  init() {
    window.addEventListener('pointermove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      this.dot.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }, { passive: true });

    // Smooth ring trailing
    const render = () => {
      this.ringPos.x += (this.pos.x - this.ringPos.x) * 0.18;
      this.ringPos.y += (this.pos.y - this.ringPos.y) * 0.18;
      this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Interactive element hover detection
    const interactables = 'a, button, input, textarea, .service-card, .project-card, .sec-feed-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.add('cursor-hover');
      }
      if (e.target.closest('#spiderman-character')) {
        document.body.classList.add('cursor-grab');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.remove('cursor-hover');
      }
      if (e.target.closest('#spiderman-character')) {
        document.body.classList.remove('cursor-grab');
      }
    });
  }
}

// 7. NAVIGATION & SCROLL TRACKING
class NavigationController {
  constructor() {
    this.nav = document.querySelector('.header-nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section, header');
    this.hamburger = document.getElementById('hamburger-toggle');
    this.drawer = document.getElementById('mobile-drawer');
    this.drawerClose = document.getElementById('drawer-close');
    this.mobileLinks = document.querySelectorAll('.mobile-nav-link');

    this.init();
  }

  init() {
    // Sticky nav styling on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.nav?.classList.add('scrolled');
      } else {
        this.nav?.classList.remove('scrolled');
      }
      this.highlightActiveSection();
    }, { passive: true });

    // Mobile Drawer
    if (this.hamburger && this.drawer) {
      this.hamburger.addEventListener('click', () => this.drawer.classList.add('open'));
    }
    if (this.drawerClose && this.drawer) {
      this.drawerClose.addEventListener('click', () => this.drawer.classList.remove('open'));
    }
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.drawer?.classList.remove('open'));
    });

    // Animate skill bars when in view
    this.initSkillObserver();
  }

  highlightActiveSection() {
    const scrollPos = window.scrollY + 180;
    this.sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  initSkillObserver() {
    const skillBars = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const pct = target.getAttribute('data-percent') || '85';
          target.style.width = `${pct}%`;
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
  }
}

// 8. CONTACT FORM WHATSAPP BUILDER
class ContactInquiry {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Visitor';
      const service = document.getElementById('form-service')?.value || 'General Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      const fullText = `Hi Arshad, I'm reaching out from your portfolio website.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Project Type:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(message)}`;
      const waUrl = `https://wa.me/918296338576?text=${fullText}`;
      window.open(waUrl, '_blank');
    });
  }
}

// 9. 3D CARD TILT EFFECT (DESKTOP)
class TiltCards {
  constructor() {
    if (window.innerWidth < 1024) return;
    const cards = document.querySelectorAll('.service-card, .holographic-id-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// BOOT APPLICATION
document.addEventListener('DOMContentLoaded', () => {
  new BootSequence();
  new CCTVSimulator();
  new ProjectManager();
  new CyberCursor();
  new NavigationController();
  new ContactInquiry();
  new TiltCards();
});
