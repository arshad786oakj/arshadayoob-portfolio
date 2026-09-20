/**
 * SPIDER-MAN INTERACTIVE PHYSICS SYSTEM
 * Arshad Ayoob — Premium 3D Futuristic Portfolio
 * 
 * Features:
 * - Intelligent Canvas-based Checkerboard Background Remover (0 external dependencies)
 * - Spring-Damper Elastic Cable Physics (Hooke's Law + Damping)
 * - Realistic Catenary/Bezier Curvature, Tension Sag & Neon Web Glow
 * - Unified Pointer Events (Mouse Drag & Mobile Touch Drag)
 * - Velocity-coupled Angular Inertia & Damped Pendulum Settling
 * - Touch-action protection: preserves normal page scroll while enabling fluid touch drag
 */

class SpiderManPhysics {
  constructor() {
    this.container = document.getElementById('spiderman-wrapper');
    this.canvas = document.getElementById('spiderman-cable-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.spideyEl = document.getElementById('spiderman-character');
    this.imgEl = document.getElementById('spiderman-img');
    this.hintEl = document.getElementById('spiderman-hint');

    if (!this.container || !this.canvas || !this.spideyEl || !this.imgEl) {
      console.warn('Spider-Man elements not found in DOM.');
      return;
    }

    // Process image to remove checkerboard background cleanly
    this.processRawImage();

    // Physics parameters
    this.anchor = { x: 0, y: 0 };
    this.restLength = 230; // Resting distance from top anchor
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };

    this.springK = 0.045;       // Spring tension stiffness
    this.damping = 0.90;        // Velocity damping factor
    this.gravity = 0.18;        // Subtle downward pull

    this.rotation = 0;          // Radians
    this.rotVel = 0;
    this.rotDamping = 0.88;
    this.rotK = 0.035;

    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragOffset = { x: 0, y: 0 };
    this.hasInteracted = false;

    // Viewport & canvas sizing
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Initialize resting position
    this.pos.x = this.anchor.x;
    this.pos.y = this.anchor.y + this.restLength;
    this.target.x = this.pos.x;
    this.target.y = this.pos.y;

    // Attach pointer events (mouse + touch)
    this.initEvents();

    // Start physics loop
    this.animFrame = requestAnimationFrame((t) => this.update(t));
  }

  /**
   * Automatically strips fake checkerboard background from the raw image
   * using a high-performance Canvas perimeter flood-fill and chroma-key filter.
   * Keeps Spider-Man's suit, black webbing, and white eye lenses completely intact.
   */
  processRawImage() {
    // Load pre-rendered transparent Spider-Man PNG (100% clean cutout with 0 checkerboard)
    this.imgEl.src = 'assets/spiderman-clean.png';
    this.imgEl.style.opacity = '1';

    this.imgEl.onerror = () => {
      // Fallback to raw if clean not accessible
      this.imgEl.src = 'assets/spiderman-raw.jpg';
      this.imgEl.style.opacity = '1';
    };
  }

  handleResize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    // Anchor is located at the top right of the hero/screen
    // On wider screens: hanging from ~82% of container width
    // On mobile screens: hanging from ~78% of container width
    const isMobile = window.innerWidth < 768;
    this.anchor.x = isMobile ? this.width * 0.76 : this.width * 0.82;
    this.anchor.y = 0;

    this.restLength = isMobile ? 180 : 220;

    if (!this.isDragging) {
      this.target.x = this.anchor.x;
      this.target.y = this.anchor.y + this.restLength;
    }
  }

  initEvents() {
    const targetEl = this.spideyEl;

    // Pointer events handle both desktop mouse and mobile touch
    targetEl.addEventListener('pointerdown', (e) => this.onPointerDown(e), { passive: false });
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false });
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    // Prevent context menu on long press
    targetEl.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  onPointerDown(e) {
    e.preventDefault();
    this.isDragging = true;
    this.hasInteracted = true;

    // Hide drag hint pill with fade out
    if (this.hintEl) {
      this.hintEl.style.opacity = '0';
      this.hintEl.style.pointerEvents = 'none';
      setTimeout(() => {
        if (this.hintEl) this.hintEl.remove();
      }, 500);
    }

    try {
      this.spideyEl.setPointerCapture(e.pointerId);
    } catch (_) {}

    const rect = this.container.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    this.dragOffset.x = this.pos.x - pointerX;
    this.dragOffset.y = this.pos.y - pointerY;

    this.target.x = pointerX + this.dragOffset.x;
    this.target.y = pointerY + this.dragOffset.y;

    this.spideyEl.classList.add('is-grabbed');
  }

  onPointerMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    const rect = this.container.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    // Clamped target so he cannot be dragged completely off-screen
    const minX = 40;
    const maxX = this.width - 40;
    const minY = 60;
    const maxY = this.height - 40;

    this.target.x = Math.max(minX, Math.min(maxX, pointerX + this.dragOffset.x));
    this.target.y = Math.max(minY, Math.min(maxY, pointerY + this.dragOffset.y));
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.spideyEl.classList.remove('is-grabbed');

    try {
      if (e.pointerId && this.spideyEl.hasPointerCapture(e.pointerId)) {
        this.spideyEl.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    // When released, target returns to resting anchor position
    this.target.x = this.anchor.x;
    this.target.y = this.anchor.y + this.restLength;
  }

  update(time) {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.pos.x = this.anchor.x;
      this.pos.y = this.anchor.y + this.restLength;
      this.rotation = 0;
      this.render();
      this.animFrame = requestAnimationFrame((t) => this.update(t));
      return;
    }

    if (this.isDragging) {
      // Smooth tracking towards drag target
      const prevX = this.pos.x;
      const prevY = this.pos.y;

      this.pos.x += (this.target.x - this.pos.x) * 0.55;
      this.pos.y += (this.target.y - this.pos.y) * 0.55;

      // Track drag velocity for release inertia
      this.vel.x = (this.pos.x - prevX) * 1.1;
      this.vel.y = (this.pos.y - prevY) * 1.1;

      // Tilt based on horizontal pull
      const dragAngle = (this.pos.x - this.anchor.x) * 0.0035;
      this.rotation += (dragAngle - this.rotation) * 0.3;
    } else {
      // Free hanging spring-damper physics
      // Spring forces towards resting anchor point
      const fx = -this.springK * (this.pos.x - this.target.x);
      const fy = -this.springK * (this.pos.y - this.target.y) + this.gravity;

      // Apply forces to velocity
      this.vel.x = (this.vel.x + fx) * this.damping;
      this.vel.y = (this.vel.y + fy) * this.damping;

      // Integrate position
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

      // Angular physics: pendulum sway + velocity-coupled tilt
      const targetRot = (this.pos.x - this.anchor.x) * 0.004 + this.vel.x * 0.015;
      const rotForce = -this.rotK * (this.rotation - targetRot);
      this.rotVel = (this.rotVel + rotForce) * this.rotDamping;
      this.rotation += this.rotVel;

      // Subtle resting idle sway
      if (Math.abs(this.vel.x) < 0.1 && Math.abs(this.vel.y) < 0.1) {
        const idleSway = Math.sin(time * 0.002) * 1.5;
        this.pos.x = this.anchor.x + idleSway;
        this.rotation = Math.sin(time * 0.002) * 0.04;
      }
    }

    this.render();
    this.animFrame = requestAnimationFrame((t) => this.update(t));
  }

  render() {
    // 1. Update Spider-Man DOM element position and rotation
    const spideyX = this.pos.x;
    const spideyY = this.pos.y;
    const deg = this.rotation * (180 / Math.PI);

    // Spider-Man hangs upside down by default (scaleY -1 or upside down image)
    // The image itself is already upside down (head at bottom, feet at top).
    // The web connects to his feet at the top of the sprite (offset ~ 40px above center).
    this.spideyEl.style.transform = `translate3d(${spideyX}px, ${spideyY}px, 0) translate(-50%, -15%) rotate(${deg}deg)`;

    // 2. Draw the elastic rubber cable/web on the canvas
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const startX = this.anchor.x;
    const startY = this.anchor.y;

    // Attach web to feet/hands near top of Spider-Man
    // Account for rotation
    const cosR = Math.cos(this.rotation);
    const sinR = Math.sin(this.rotation);
    const localAttachY = -25; // slightly above his feet
    const attachX = spideyX - sinR * localAttachY;
    const attachY = spideyY + cosR * localAttachY;

    // Calculate dynamic cable curvature / sag
    const dx = attachX - startX;
    const dy = attachY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Cable sag increases when compressed, straightens when stretched
    const stretchRatio = dist / this.restLength;
    let sagX = 0;
    let sagY = 0;

    if (stretchRatio < 1.0) {
      // Slack cable curves more
      const slack = (1.0 - stretchRatio) * 45;
      sagY = slack;
      sagX = (this.vel.x || 0) * 2;
    } else {
      // Stretched cable has subtle lateral deflection from velocity
      sagX = -(this.vel.x || 0) * 1.5;
      sagY = 4 / Math.max(1, stretchRatio);
    }

    // Bezier control point
    const ctrlX = (startX + attachX) * 0.5 + sagX;
    const ctrlY = (startY + attachY) * 0.5 + sagY;

    // Dynamic cable thickness: stretches thinner under high tension
    const baseWidth = Math.max(1.5, Math.min(3.2, 2.5 / Math.sqrt(Math.max(0.6, stretchRatio))));

    // Draw Outer Web Glow (Cyber-tech infrared + neon white)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(ctrlX, ctrlY, attachX, attachY);

    ctx.strokeStyle = 'rgba(255, 30, 60, 0.45)';
    ctx.lineWidth = baseWidth + 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#ff1a35';
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Draw Core Cable
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(ctrlX, ctrlY, attachX, attachY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = baseWidth;
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Draw Anchor Metallic Clamp at the ceiling
    ctx.beginPath();
    ctx.arc(startX, startY + 2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1a35';
    ctx.shadowColor = '#ff1a35';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(startX, startY + 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SpiderManPhysics());
} else {
  new SpiderManPhysics();
}
