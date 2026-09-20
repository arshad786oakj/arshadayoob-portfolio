/**
 * THREE.JS 3D FUTURISTIC HERO ENVIRONMENT
 * Arshad Ayoob — Creative Developer & Security Architect
 * 
 * Features:
 * - Glowing Digital Core (Wireframe Geosphere with pulsating inner energy nexus)
 * - Triple Counter-rotating Holographic Orbital Rings (Torus with holographic dashed materials)
 * - Constellation of Floating Data Nodes & Particles (Additive cyber particles)
 * - 3D Perspective Cyber-Grid receding into deep infrared atmospheric fog
 * - Mouse-driven Interactive Parallax Tilt with Smooth Lerp Damping
 * - Dynamic Infrared Scanning Light Beam
 * - Performance-Optimized: pauses when off-screen or tab hidden, auto DPR scaling
 */

class FuturisticHeroScene {
  constructor() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;

    // Check WebGL availability
    if (!this.isWebGLAvailable()) {
      console.warn('WebGL not available, falling back to CSS cyber grid.');
      this.canvas.style.display = 'none';
      return;
    }

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();
    this.isVisible = true;

    this.init();
    this.createObjects();
    this.addEvents();
    this.animate();
  }

  isWebGLAvailable() {
    try {
      const glCanvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05070a, 0.028);

    // 2. Camera
    const width = this.canvas.parentElement.clientWidth || window.innerWidth;
    const height = this.canvas.parentElement.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 24);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x1a050a, 1.5);
    this.scene.add(ambientLight);

    this.coreLight = new THREE.PointLight(0xff1a35, 3.5, 50);
    this.coreLight.position.set(0, 0, 0);
    this.scene.add(this.coreLight);

    const cyanRimLight = new THREE.PointLight(0x00f0ff, 2.0, 60);
    cyanRimLight.position.set(-15, 12, 10);
    this.scene.add(cyanRimLight);
  }

  createObjects() {
    this.group = new THREE.Group();
    // Shift slightly to right/center on desktop to harmonize with hero text on the left
    if (window.innerWidth > 992) {
      this.group.position.set(4.5, 0, 0);
    }
    this.scene.add(this.group);

    // 1. Core Energy Nexus (Pulsating inner sphere)
    const coreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff0026,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    this.innerCore = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.innerCore);

    // Solid glowing center orb
    const solidCoreGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const solidCoreMat = new THREE.MeshBasicMaterial({
      color: 0xff4d63,
      transparent: true,
      opacity: 0.85
    });
    this.solidCore = new THREE.Mesh(solidCoreGeo, solidCoreMat);
    this.group.add(this.solidCore);

    // 2. Geometric Holographic Polyhedron Outer Shield
    const icosaGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0xff1a35,
      emissive: 0x660011,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    this.outerShield = new THREE.Mesh(icosaGeo, icosaMat);
    this.group.add(this.outerShield);

    // 3. Holographic Orbital Rings
    // Ring A
    const ringGeoA = new THREE.TorusGeometry(6.2, 0.05, 16, 100);
    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0xff1a35,
      transparent: true,
      opacity: 0.75
    });
    this.ringA = new THREE.Mesh(ringGeoA, ringMatA);
    this.ringA.rotation.x = Math.PI * 0.35;
    this.ringA.rotation.y = Math.PI * 0.15;
    this.group.add(this.ringA);

    // Ring B (Cyan accent)
    const ringGeoB = new THREE.TorusGeometry(7.8, 0.04, 16, 100);
    const ringMatB = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.55
    });
    this.ringB = new THREE.Mesh(ringGeoB, ringMatB);
    this.ringB.rotation.x = -Math.PI * 0.25;
    this.ringB.rotation.z = Math.PI * 0.2;
    this.group.add(this.ringB);

    // Ring C (Outer infrared perimeter)
    const ringGeoC = new THREE.TorusGeometry(9.4, 0.03, 16, 120);
    const ringMatC = new THREE.MeshBasicMaterial({
      color: 0xff3355,
      transparent: true,
      opacity: 0.4
    });
    this.ringC = new THREE.Mesh(ringGeoC, ringMatC);
    this.ringC.rotation.y = Math.PI * 0.45;
    this.group.add(this.ringC);

    // 4. Floating Data Nodes on Rings
    const nodeGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const nodeMatRed = new THREE.MeshBasicMaterial({ color: 0xff1a35 });
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    this.nodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? nodeMatRed : nodeMatCyan);
      node.position.set(Math.cos(angle) * 6.2, Math.sin(angle) * 6.2, 0);
      this.ringA.add(node);
      this.nodes.push(node);
    }

    // 5. Ambient Cyber Particle Constellation
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cRed = new THREE.Color(0xff1a35);
    const cCyan = new THREE.Color(0x00f0ff);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 65;
      positions[idx + 1] = (Math.random() - 0.5) * 45;
      positions[idx + 2] = (Math.random() - 0.5) * 40;

      const rChoice = Math.random();
      const col = rChoice < 0.6 ? cRed : (rChoice < 0.85 ? cCyan : cWhite);
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);

    // 6. 3D Perspective Cyber-Floor Grid
    const gridHelper = new THREE.GridHelper(90, 45, 0xff1a35, 0x15202e);
    gridHelper.position.set(0, -9, 0);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.45;
    this.scene.add(gridHelper);

    // 7. Scanning Laser Beam Line
    const scanGeo = new THREE.BufferGeometry();
    scanGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      -35, 0, 0,
      35, 0, 0
    ]), 3));
    const scanMat = new THREE.LineBasicMaterial({
      color: 0xff1a35,
      transparent: true,
      opacity: 0.55
    });
    this.scanBeam = new THREE.Line(scanGeo, scanMat);
    this.scanBeam.position.set(0, -9, 0);
    this.scene.add(this.scanBeam);
  }

  addEvents() {
    window.addEventListener('resize', () => this.onResize());

    // Mouse movement parallax
    window.addEventListener('pointermove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    // Page visibility to save GPU resources
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });

    // IntersectionObserver to pause rendering when hero is scrolled out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    if (this.canvas.parentElement) {
      observer.observe(this.canvas.parentElement);
    }
  }

  onResize() {
    if (!this.renderer || !this.camera || !this.canvas.parentElement) return;
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Re-adjust group position
    if (this.group) {
      this.group.position.x = width > 992 ? 4.5 : 0;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // 1. Mouse Lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 2. Camera Parallax
    this.camera.position.x = this.mouse.x * 2.2;
    this.camera.position.y = this.mouse.y * 1.5;
    this.camera.lookAt(0, 0, 0);

    // 3. Core & Shield Rotations
    if (this.innerCore) {
      this.innerCore.rotation.y += delta * 0.45;
      this.innerCore.rotation.x += delta * 0.25;

      // Pulsate scale
      const pulse = 1 + Math.sin(time * 3.0) * 0.07;
      this.innerCore.scale.set(pulse, pulse, pulse);
    }

    if (this.outerShield) {
      this.outerShield.rotation.y -= delta * 0.2;
      this.outerShield.rotation.z += delta * 0.15;
    }

    // 4. Orbital Rings Counter-Rotations
    if (this.ringA) {
      this.ringA.rotation.z += delta * 0.35;
    }
    if (this.ringB) {
      this.ringB.rotation.z -= delta * 0.25;
      this.ringB.rotation.x += delta * 0.15;
    }
    if (this.ringC) {
      this.ringC.rotation.y += delta * 0.18;
      this.ringC.rotation.z += delta * 0.12;
    }

    // 5. Particles slow drift
    if (this.particles) {
      this.particles.rotation.y += delta * 0.04;
      this.particles.rotation.x += delta * 0.02;
    }

    // 6. Laser Scan Beam sweep along the grid
    if (this.scanBeam) {
      this.scanBeam.position.z = (Math.sin(time * 1.2) * 20);
    }

    // 7. Light Intensity Breathing
    if (this.coreLight) {
      this.coreLight.intensity = 3.0 + Math.sin(time * 4) * 1.2;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when THREE is ready
window.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    new FuturisticHeroScene();
  } else {
    // Retry in 200ms if script loaded async
    setTimeout(() => {
      if (typeof THREE !== 'undefined') new FuturisticHeroScene();
    }, 200);
  }
});
