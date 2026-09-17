/**
 * NEXO-TECHNOLOGIES — Holographic Command Palette v5.0
 * Universal Quick Launcher & Action HUD (Ctrl+K / Cmd+K)
 */

'use strict';

(function() {
  const COMMANDS = [
    // --- FLAGSHIP CENTERPIECE ---
    { id: 'flagship-asterix-os', title: 'ASTERIX-OS [COMPANY PRIDE]', subtitle: 'NEXO Custom Cyber Operating System & Hardened Kernel', icon: 'fa-crown', category: 'Flagship OS', action: () => navigateOrScroll('index.html', '#asterix-os-spotlight') },
    { id: 'flagship-asterix-gh', title: 'ASTERIX-OS on GitHub', subtitle: 'https://github.com/NEXO-TECHNOLOGIES/ASTERIX-OS.git', icon: 'fa-github', category: 'Flagship OS', action: () => window.open('https://github.com/NEXO-TECHNOLOGIES/ASTERIX-OS.git', '_blank') },
    { id: 'flagship-asterix-gl', title: 'ASTERIX-OS on GitLab', subtitle: 'https://gitlab.com/nexo-technologies-group/asterix-os.git', icon: 'fa-gitlab', category: 'Flagship OS', action: () => window.open('https://gitlab.com/nexo-technologies-group/asterix-os.git', '_blank') },

    // --- New Arsenal Cyber Tools ---
    { id: 'tool-asterix-def', title: 'Asterix-Anti-Network-Attack', subtitle: 'Autonomous DDoS mitigation & traffic scrubber daemon', icon: 'fa-shield-halved', category: 'Arsenal', action: () => window.open('https://github.com/alexhack235-code/Asterix-Anti-Network-Attack.git', '_blank') },
    { id: 'tool-apex', title: 'APEX-OVERDRIVE', subtitle: 'High-concurrency async load & stress benchmark', icon: 'fa-tachometer-alt', category: 'Arsenal', action: () => window.open('https://github.com/alexhack235-code/APEX-OVERDRIVE-.git', '_blank') },
    { id: 'tool-lightning', title: 'LIGHTNING Packet Dispatcher', subtitle: 'Low-latency async UDP socket driver', icon: 'fa-bolt', category: 'Arsenal', action: () => window.open('https://github.com/alexhack235-code/LIGHTNING-.git', '_blank') },
    { id: 'tool-redox', title: 'REDOX-PY_SCANNER', subtitle: 'Python network vulnerability & port auditor', icon: 'fa-search', category: 'Arsenal', action: () => window.open('https://github.com/alexhack235-code/REDOX-PY_SCANNER.git', '_blank') },
    { id: 'tool-thunder', title: 'THUNDER Concurrency Driver', subtitle: 'High-throughput parallel socket performance suite', icon: 'fa-cloud-bolt', category: 'Arsenal', action: () => window.open('https://github.com/alexhack235-code/THUNDER.git', '_blank') },

    // --- Navigation ---
    { id: 'nav-home', title: 'Command Center', subtitle: 'Main Portfolio & System Overview', icon: 'fa-home', category: 'Navigation', url: 'index.html' },
    { id: 'nav-tools', title: 'NEXO Arsenal & Tools', subtitle: 'Weapon Cache, Flooder, WhatsApp Bot', icon: 'fa-wrench', category: 'Navigation', url: 'tools.html' },
    { id: 'nav-term', title: 'Cyber Terminal Console', subtitle: 'Virtual Linux OS, htop, nmap, exploit', icon: 'fa-terminal', category: 'Navigation', url: 'terminal.html' },
    { id: 'nav-hack', title: 'Threat Hub & Penetration', subtitle: 'Global Attack Radar, Ciphers, CVEs', icon: 'fa-shield-virus', category: 'Navigation', url: 'hacking.html' },
    { id: 'nav-learn', title: 'NEXO Cyber Academy', subtitle: 'Interactive CTF Challenges & Wireshark', icon: 'fa-graduation-cap', category: 'Navigation', url: 'learn-hacking.html' },
    { id: 'nav-prog', title: 'Polyglot Architecture', subtitle: '15+ Languages, Code Runner & 3D Prism', icon: 'fa-code', category: 'Navigation', url: 'programming.html' },
    { id: 'nav-lab', title: 'Innovation Lab', subtitle: 'Quantum Encryption & Neural Perceptron', icon: 'fa-flask', category: 'Navigation', url: 'lab.html' },

    // --- Live Simulators & Cyber Tools ---
    { id: 'tool-flooder', title: 'Launch Packet Flooder Simulator', subtitle: 'Multi-threaded stress test particle beam', icon: 'fa-bolt', category: 'Simulators', action: () => navigateOrScroll('tools.html', '#flooder-simulator') },
    { id: 'tool-bot', title: 'WhatsApp Demonic-Bot Sandbox', subtitle: 'Simulated smartphone with interactive .commands', icon: 'fa-robot', category: 'Simulators', action: () => navigateOrScroll('tools.html', '#bot-simulator') },
    { id: 'tool-linux', title: 'Demonic Tools Linux Console', subtitle: 'Subnet audits, WiFi handshake, kernel checks', icon: 'fa-linux', category: 'Simulators', action: () => navigateOrScroll('tools.html', '#tools-console') },
    { id: 'tool-radar', title: 'Global Cyber Threat Radar', subtitle: 'Real-time ballistic attack map & incident ticker', icon: 'fa-satellite-dish', category: 'Simulators', action: () => navigateOrScroll('hacking.html', '#threat-radar') },
    { id: 'tool-crypto', title: 'Hash & Cryptography Cracker', subtitle: 'MD5, SHA-256, Base64, Hex, ROT13, XOR', icon: 'fa-key', category: 'Simulators', action: () => navigateOrScroll('hacking.html', '#crypto-cracker') },
    { id: 'tool-entropy', title: 'Password Entropy Calculator', subtitle: 'RTX 4090 crack time & brute-force audit', icon: 'fa-lock', category: 'Simulators', action: () => navigateOrScroll('hacking.html', '#password-entropy') },
    { id: 'tool-cve', title: 'CVE Threat Intelligence Database', subtitle: 'Search Log4j, Heartbleed, EternalBlue & fixes', icon: 'fa-database', category: 'Simulators', action: () => navigateOrScroll('hacking.html', '#cve-database') },
    { id: 'tool-ctf', title: 'Play CTF Hacker Challenges', subtitle: '3-Level Capture The Flag: Ciphers & SQLi', icon: 'fa-flag', category: 'Simulators', action: () => navigateOrScroll('learn-hacking.html', '#ctf-section') },
    { id: 'tool-wireshark', title: 'Wireshark Packet Dissector', subtitle: 'Interactive TCP/IP & TLS packet byte inspector', icon: 'fa-network-wired', category: 'Simulators', action: () => navigateOrScroll('learn-hacking.html', '#wireshark-section') },
    { id: 'tool-runner', title: 'Polyglot Code Playground', subtitle: 'Run Python, Rust, Go, JS, C++ in-browser', icon: 'fa-play-circle', category: 'Simulators', action: () => navigateOrScroll('programming.html', '#code-playground') },
    { id: 'tool-quantum', title: 'Quantum Lattice Visualizer', subtitle: 'Quantum-resistant key distribution simulation', icon: 'fa-atom', category: 'Simulators', action: () => navigateOrScroll('lab.html', '#quantum-section') },
    { id: 'tool-neural', title: 'Neural Weight Stream', subtitle: 'Interactive deep learning propagation canvas', icon: 'fa-brain', category: 'Simulators', action: () => navigateOrScroll('lab.html', '#neural-section') },

    // --- System Actions ---
    { id: 'sys-audio', title: 'Toggle Cyber Audio FX', subtitle: 'Mute / Unmute procedural UI synthesizer', icon: 'fa-volume-up', category: 'System', action: () => window.NexoAudio && window.NexoAudio.toggleMute() },
    { id: 'sys-drone', title: 'Toggle Synth Drone Ambience', subtitle: 'Oscillating background sci-fi soundscape', icon: 'fa-wave-square', category: 'System', action: () => window.NexoAudio && window.NexoAudio.toggleDrone() },
    { id: 'sys-theme', title: 'Switch Dark / Light Theme', subtitle: 'Toggle between Cyber Dark and Cyber Light', icon: 'fa-adjust', category: 'System', action: toggleTheme },
    { id: 'sys-ai', title: 'Chat with NEXO-AI Assistant', subtitle: 'Open floating neural chat dialog', icon: 'fa-comment-dots', category: 'System', action: openAiChat },
    { id: 'sys-wa', title: 'Contact HQ via WhatsApp', subtitle: 'Direct hotline: +234 704 4339 491', icon: 'fa-phone', category: 'System', action: () => window.open('https://wa.me/2347044339491', '_blank') }
  ];

  let paletteEl = null;
  let inputEl = null;
  let resultsEl = null;
  let selectedIndex = 0;
  let filteredCommands = [];

  function navigateOrScroll(targetPage, hash) {
    const currentPath = window.location.pathname;
    const isCurrentPage = currentPath.endsWith(targetPage) || (targetPage === 'index.html' && (currentPath.endsWith('/') || currentPath === ''));
    if (isCurrentPage && hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = `${targetPage}${hash || ''}`;
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexo_theme', next);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      const icon = toggle.querySelector('i');
      if (icon) icon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (window.NexoAudio) window.NexoAudio.playClick();
  }

  function openAiChat() {
    if (typeof window.toggleAiFloatPanel === 'function') {
      window.toggleAiFloatPanel();
    } else {
      window.location.href = 'index.html#ai-chat';
    }
  }

  function createPaletteDOM() {
    if (document.getElementById('nexo-cmd-palette')) return;

    paletteEl = document.createElement('div');
    paletteEl.id = 'nexo-cmd-palette';
    paletteEl.innerHTML = `
      <div class="cmd-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="cmd-search-wrap">
          <i class="fas fa-search cmd-search-icon"></i>
          <input type="text" class="cmd-input" id="cmdInput" placeholder="Search pages, tools, simulators, commands..." autocomplete="off" spellcheck="false">
          <span class="cmd-esc-badge" id="cmdCloseBtn">ESC</span>
        </div>
        <div class="cmd-results" id="cmdResults"></div>
        <div class="cmd-footer">
          <div class="cmd-footer-keys">
            <span class="cmd-key-hint"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span class="cmd-key-hint"><kbd>↵</kbd> Execute</span>
            <span class="cmd-key-hint"><kbd>ESC</kbd> Close</span>
          </div>
          <span style="color:var(--neon-cyan,#00f5ff)">NEXO // HUD LAUNCHER</span>
        </div>
      </div>
    `;

    document.body.appendChild(paletteEl);

    inputEl = document.getElementById('cmdInput');
    resultsEl = document.getElementById('cmdResults');

    document.getElementById('cmdCloseBtn').addEventListener('click', closePalette);

    paletteEl.addEventListener('click', (e) => {
      if (e.target === paletteEl) closePalette();
    });

    inputEl.addEventListener('input', () => {
      filterCommands(inputEl.value);
    });

    inputEl.addEventListener('keydown', handleKeyNavigation);
  }

  function openPalette() {
    createPaletteDOM();
    paletteEl.classList.add('active');
    inputEl.value = '';
    filterCommands('');
    setTimeout(() => inputEl.focus(), 50);
    if (window.NexoAudio) window.NexoAudio.playLaser();
  }

  function closePalette() {
    if (!paletteEl) return;
    paletteEl.classList.remove('active');
    if (window.NexoAudio) window.NexoAudio.playClick();
  }

  function filterCommands(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      filteredCommands = [...COMMANDS];
    } else {
      filteredCommands = COMMANDS.filter(cmd => 
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderResults();
  }

  function renderResults() {
    if (!resultsEl) return;
    resultsEl.innerHTML = '';

    if (filteredCommands.length === 0) {
      resultsEl.innerHTML = `
        <div style="text-align:center;padding:2.5rem 1rem;color:#4a6680;font-family:'JetBrains Mono',monospace;font-size:0.85rem">
          <i class="fas fa-exclamation-triangle" style="color:var(--neon-magenta,#ff006e);font-size:1.5rem;margin-bottom:0.8rem;display:block"></i>
          NO COMMANDS MATCHED // TYPE A DIFFERENT QUERY
        </div>
      `;
      return;
    }

    // Group by category
    const groups = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });

    let overallIdx = 0;
    Object.keys(groups).forEach(cat => {
      const groupLabel = document.createElement('div');
      groupLabel.className = 'cmd-group-label';
      groupLabel.textContent = `// ${cat}`;
      resultsEl.appendChild(groupLabel);

      groups[cat].forEach(cmd => {
        const itemIdx = overallIdx;
        const item = document.createElement('div');
        item.className = `cmd-item ${itemIdx === selectedIndex ? 'selected' : ''}`;
        item.setAttribute('data-idx', itemIdx);

        item.innerHTML = `
          <div class="cmd-item-left">
            <div class="cmd-item-icon"><i class="fas ${cmd.icon}"></i></div>
            <div class="cmd-item-text">
              <h4>${cmd.title}</h4>
              <p>${cmd.subtitle}</p>
            </div>
          </div>
          <span class="cmd-item-tag">${cmd.category}</span>
        `;

        item.addEventListener('mouseenter', () => {
          selectedIndex = itemIdx;
          updateSelectedVisual();
          if (window.NexoAudio) window.NexoAudio.playHover();
        });

        item.addEventListener('click', () => {
          executeCommand(cmd);
        });

        resultsEl.appendChild(item);
        overallIdx++;
      });
    });

    scrollToSelected();
  }

  function updateSelectedVisual() {
    const items = resultsEl.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) item.classList.add('selected');
      else item.classList.remove('selected');
    });
  }

  function scrollToSelected() {
    const selected = resultsEl.querySelector('.cmd-item.selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }

  function handleKeyNavigation(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        updateSelectedVisual();
        scrollToSelected();
        if (window.NexoAudio) window.NexoAudio.playHover();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedVisual();
        scrollToSelected();
        if (window.NexoAudio) window.NexoAudio.playHover();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  }

  function executeCommand(cmd) {
    closePalette();
    if (window.NexoAudio) window.NexoAudio.playSuccess();
    if (typeof cmd.action === 'function') {
      cmd.action();
    } else if (cmd.url) {
      window.location.href = cmd.url;
    }
  }

  // Global Keyboard Shortcut
  window.addEventListener('keydown', (e) => {
    // Ctrl + K or Cmd + K or pressing '/' when not in input
    const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if (isCmdK || isSlash) {
      e.preventDefault();
      if (paletteEl && paletteEl.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  window.openNexoCommandPalette = openPalette;
  window.closeNexoCommandPalette = closePalette;
})();
