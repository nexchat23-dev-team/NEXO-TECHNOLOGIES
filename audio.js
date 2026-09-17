/**
 * NEXO-TECHNOLOGIES — Cyberpunk Web Audio Procedural Synthesizer v5.0
 * Pure Web Audio API — Zero External MP3s / Zero Dependencies
 * Generates futuristic sci-fi sound effects & ambient synth soundscapes on-the-fly.
 */

'use strict';

class NexoAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneFilter = null;
    this.isMuted = localStorage.getItem('nexo_audio_muted') === 'true';
    this.droneActive = localStorage.getItem('nexo_drone_active') === 'true';
    this.volume = parseFloat(localStorage.getItem('nexo_audio_vol') || '0.35');
    this.analyser = null;
    this.dataArray = null;
    this.animFrame = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

      // Master Analyser for visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.initialized = true;
      if (this.droneActive && !this.isMuted) {
        this.startDrone();
      }
    } catch (e) {
      console.warn('Web Audio API not permitted or supported:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    localStorage.setItem('nexo_audio_muted', muted);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (muted && this.droneActive) {
      this.stopDrone();
    } else if (!muted && this.droneActive) {
      this.startDrone();
    }
    this.updateHudState();
  }

  toggleMute() {
    this.ensureContext();
    this.setMuted(!this.isMuted);
    if (!this.isMuted) this.playSuccess();
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    localStorage.setItem('nexo_audio_vol', this.volume);
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // --- Sound FX: Subtle Hover / Tech Chirp ---
  playHover() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // --- Sound FX: Cyber Button Click ---
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // --- Sound FX: Keyboard Typing Click ---
  playType() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      const freqs = [850, 920, 980, 1050, 1120, 1200];
      const f = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {}
  }

  // --- Sound FX: Laser Sweep / Scan ---
  playLaser() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2600, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {}
  }

  // --- Sound FX: Success Chime / Flag Capture ---
  playSuccess() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.1, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 0.26);
      });
    } catch (e) {}
  }

  // --- Sound FX: Security Intrusion Alarm ---
  playAlarm() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.15);
      osc.frequency.linearRampToValueAtTime(900, now + 0.3);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  }

  // --- Procedural Ambient Drone (Subtle Sci-Fi Background) ---
  startDrone() {
    if (this.isMuted || !this.ctx) return;
    if (this.droneOsc1) return; // already active

    try {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 3);

      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(280, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 + detune beat

      this.droneOsc1.connect(this.droneFilter);
      this.droneOsc2.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.droneActive = true;
      localStorage.setItem('nexo_drone_active', 'true');
      this.updateHudState();
    } catch (e) {}
  }

  stopDrone() {
    if (!this.droneOsc1) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        try {
          if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); }
          if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); }
          this.droneOsc1 = null;
          this.droneOsc2 = null;
          this.droneActive = false;
          localStorage.setItem('nexo_drone_active', 'false');
          this.updateHudState();
        } catch (e) {}
      }, 1050);
    } catch (e) {
      this.droneOsc1 = null;
      this.droneOsc2 = null;
    }
  }

  toggleDrone() {
    this.ensureContext();
    if (this.droneActive) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
  }

  // --- Auto-Wire DOM Events ---
  bindInteractions() {
    // Resume context on first user interaction anywhere
    const unlock = () => {
      this.ensureContext();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });

    // Buttons, links, interactable hovers & clicks
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('button, .btn, .nav-link, .tool-card, .lab-card, .social-link, .quick-chip, .tool-btn, .command-card');
      if (target) this.playHover();
    }, { passive: true });

    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, .btn, .nav-link, .tool-btn, .quick-chip, .theme-toggle');
      if (target) this.playClick();
    }, { passive: true });

    // Keystroke clicks in inputs & terminal
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, .term-input') && !['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        this.playType();
      }
    }, { passive: true });
  }

  // --- Build Floating Audio HUD Control Widget ---
  injectHud() {
    if (document.getElementById('nexo-audio-hud')) return;

    const hud = document.createElement('div');
    hud.id = 'nexo-audio-hud';
    hud.innerHTML = `
      <div class="audio-hud-inner">
        <button id="nexoAudioToggleBtn" class="audio-hud-btn" title="Toggle Cyber Sound FX [Mute/Unmute]">
          <i class="fas ${this.isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
          <span class="audio-bars">
            <span class="a-bar"></span>
            <span class="a-bar"></span>
            <span class="a-bar"></span>
            <span class="a-bar"></span>
          </span>
        </button>
        <div class="audio-hud-popover" id="audioHudPopover">
          <div class="popover-title">CYBER AUDIO HUD</div>
          <div class="popover-row">
            <span>FX SOUNDS</span>
            <button id="audioMuteToggle" class="pill-btn ${!this.isMuted ? 'active' : ''}">${this.isMuted ? 'OFF' : 'ON'}</button>
          </div>
          <div class="popover-row">
            <span>SYNTH DRONE</span>
            <button id="droneToggle" class="pill-btn ${this.droneActive && !this.isMuted ? 'active' : ''}">${this.droneActive && !this.isMuted ? 'ACTIVE' : 'MUTED'}</button>
          </div>
          <div class="popover-slider-row">
            <span>VOLUME</span>
            <input type="range" id="audioVolSlider" min="0" max="1" step="0.05" value="${this.volume}">
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(hud);

    // CSS Styling for Audio HUD
    const style = document.createElement('style');
    style.textContent = `
      #nexo-audio-hud {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 9998;
        font-family: 'JetBrains Mono', monospace;
      }
      .audio-hud-inner {
        position: relative;
      }
      .audio-hud-btn {
        background: rgba(5, 13, 26, 0.85);
        border: 1px solid rgba(0, 245, 255, 0.25);
        color: var(--neon-cyan, #00f5ff);
        padding: 8px 14px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 245, 255, 0.15);
        transition: all 0.3s ease;
      }
      .audio-hud-btn:hover {
        border-color: var(--neon-cyan, #00f5ff);
        box-shadow: 0 0 25px rgba(0, 245, 255, 0.4);
        transform: translateY(-2px);
      }
      .audio-bars {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        height: 12px;
      }
      .a-bar {
        width: 2.5px;
        background: var(--neon-cyan, #00f5ff);
        border-radius: 1px;
        height: 3px;
        transition: height 0.1s ease;
      }
      .audio-bars.active .a-bar:nth-child(1) { animation: barWave 0.8s ease-in-out infinite; }
      .audio-bars.active .a-bar:nth-child(2) { animation: barWave 0.6s ease-in-out 0.2s infinite; }
      .audio-bars.active .a-bar:nth-child(3) { animation: barWave 0.7s ease-in-out 0.4s infinite; }
      .audio-bars.active .a-bar:nth-child(4) { animation: barWave 0.9s ease-in-out 0.1s infinite; }
      @keyframes barWave {
        0%, 100% { height: 3px; }
        50% { height: 12px; }
      }
      .audio-hud-popover {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 0;
        width: 220px;
        background: rgba(5, 13, 26, 0.95);
        border: 1px solid rgba(0, 245, 255, 0.3);
        border-radius: 14px;
        padding: 14px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 245, 255, 0.15);
        backdrop-filter: blur(20px);
        display: none;
        flex-direction: column;
        gap: 10px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .audio-hud-popover.open {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }
      .popover-title {
        font-size: 0.65rem;
        letter-spacing: 0.15em;
        color: var(--neon-cyan, #00f5ff);
        border-bottom: 1px solid rgba(0, 245, 255, 0.15);
        padding-bottom: 6px;
      }
      .popover-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.72rem;
        color: var(--text-secondary, #8baac9);
      }
      .pill-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: var(--text-muted, #4a6680);
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 0.65rem;
        cursor: pointer;
        transition: 0.2s;
        font-family: inherit;
      }
      .pill-btn.active {
        background: rgba(0, 255, 136, 0.15);
        border-color: #00ff88;
        color: #00ff88;
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
      }
      .popover-slider-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.68rem;
        color: var(--text-muted, #4a6680);
      }
      .popover-slider-row input[type="range"] {
        width: 100%;
        accent-color: var(--neon-cyan, #00f5ff);
        cursor: pointer;
      }
      @media (max-width: 600px) {
        #nexo-audio-hud { bottom: 16px; left: 16px; }
      }
    `;
    document.head.appendChild(style);

    // Bind HUD controls
    const toggleBtn = document.getElementById('nexoAudioToggleBtn');
    const popover = document.getElementById('audioHudPopover');
    const muteToggle = document.getElementById('audioMuteToggle');
    const droneToggle = document.getElementById('droneToggle');
    const volSlider = document.getElementById('audioVolSlider');

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hud.contains(e.target)) popover.classList.remove('open');
    });

    muteToggle.addEventListener('click', () => {
      this.toggleMute();
    });

    droneToggle.addEventListener('click', () => {
      this.toggleDrone();
    });

    volSlider.addEventListener('input', (e) => {
      this.setVolume(parseFloat(e.target.value));
    });

    this.updateHudState();
  }

  updateHudState() {
    const toggleBtn = document.getElementById('nexoAudioToggleBtn');
    const muteToggle = document.getElementById('audioMuteToggle');
    const droneToggle = document.getElementById('droneToggle');
    const bars = document.querySelector('.audio-bars');

    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = `fas ${this.isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`;
    }
    if (muteToggle) {
      muteToggle.textContent = this.isMuted ? 'OFF' : 'ON';
      muteToggle.className = `pill-btn ${!this.isMuted ? 'active' : ''}`;
    }
    if (droneToggle) {
      const active = this.droneActive && !this.isMuted;
      droneToggle.textContent = active ? 'ACTIVE' : 'MUTED';
      droneToggle.className = `pill-btn ${active ? 'active' : ''}`;
    }
    if (bars) {
      if (!this.isMuted) bars.classList.add('active');
      else bars.classList.remove('active');
    }
  }
}

// Global Singleton Instance
window.NexoAudio = new NexoAudioEngine();
window.addEventListener('DOMContentLoaded', () => {
  window.NexoAudio.bindInteractions();
  window.NexoAudio.injectHud();
});
