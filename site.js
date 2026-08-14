document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      metaTitle: 'Caelis',
      metaDescription: 'See what happens when every intelligence finds its orbit. Mix DeepSeek, Grok, ChatGPT, Claude, and local ACP agents in a single guarded workspace.',
      controls: {
        skip: 'Skip to content',
        languageAria: 'Select language',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      hero: {
        title: 'See what happens when every intelligence<br>finds its orbit.',
        ctaMac: 'Download for macOS',
        ctaWin: 'Download for Windows',
        ctaLinux: 'Download for Linux',
        ctaGithub: 'GitHub',
      },
      cli: {
        title: 'Caelis CLI',
        badge: 'Latest',
        desc: 'Work with Caelis directly in your codebase. Build, debug, and orchestrate specialist agents safely from your terminal.',
        macLabel: 'macOS',
        linuxLabel: 'Linux',
        winLabel: 'Windows PowerShell',
        npmLabel: 'npm (Cross-platform)',
        copyAria: 'Copy command',
        copied: 'Copied',
      },
      binding: {
        title: 'Bind the right intelligence<br>to every specialist role',
        desc: 'Within a single workspace, bind specialist subagents, Guardian, Reviewer, and custom roles to connected Provider Models or external ACP Agents. Let diverse intelligences collaborate seamlessly in one guarded session.',
        breezeSub: 'Fast retrieval agent',
        orbitSub: 'Tool execution agent',
        zenithSub: 'Deep reasoning agent',
        guardianSub: 'System safety guardian',
        reviewerSub: 'Code audit agent',
        customSub: 'Custom defined role',
        pillProvider: 'Provider Model',
        pillAcp: 'ACP Agent',
      },
      security: {
        title: 'System-grade sandboxing & zero trust',
        subtitle: 'Code stays local, execution stays bounded. Protected by native OS kernels and auto-review guards.',
        c1Title: 'Guardian Auto-Review',
        c1Desc: 'Carefully fine-tuned on security prompts and workspace context, Guardian deeply inspects commands with an LLM before execution to block destructive actions.',
        c1Chip: 'Auto review approved',
        c2Title: 'Native OS Sandboxes',
        c2Desc: 'Leverages native OS kernel primitives to enforce strict filesystem boundaries without heavy containers.',
        c3Title: '100% Local & Open Source',
        c3Desc: 'All sessions and credentials remain 100% on your machine. Fully open source and zero telemetry.',
        c3Chip: 'Apache-2.0 · Local-First',
      },
      faq: {
        title: 'FAQ',
        subtitle: 'Everything you need to know about Caelis, multi-provider workflows, and local runtime safety.',
        q1Question: 'What makes Caelis different from single AI coding assistants?',
        q1Answer: 'Traditional tools lock you into a single model or provider. Caelis acts as an orchestration runtime that coordinates multiple models (DeepSeek, Grok, GPT, Claude, local Ollama) in the same session, assigning different models to specialized subagents.',
        q2Question: 'How do provider bindings and custom roles work?',
        q2Answer: 'You can configure bindings via /subagent. Assign cheap/fast models to Breeze for search & quick edits, reasoning models to Orbit for feature coding, and frontier models to Zenith for review.',
        q3Question: 'Can I use existing subscriptions or local models?',
        q3Answer: 'Yes. Caelis supports OAuth sign-in for eligible ChatGPT Codex and Grok subscriptions, standard API keys, and local zero-cost models via Ollama.',
        q4Question: 'Where is my code and data stored?',
        q4Answer: 'Everything is saved locally under ~/.caelis. Your files and credentials never leave your machine.',
      },
      footer: {
        license: 'Apache-2.0 Open Source',
        releases: 'Releases',
        docs: 'Docs',
        github: 'GitHub',
      },
    },
    zh: {
      metaTitle: 'Caelis',
      metaDescription: '当群星各循其轨，天空便有了新的模样。聚合主流模型与外部 Agent，自由组合专家角色，在安全受控的本地环境中高效协作。',
      controls: {
        skip: '跳转到正文',
        languageAria: '选择语言',
        switchToLight: '切换到浅色主题',
        switchToDark: '切换到深色主题',
      },
      hero: {
        title: '当群星各循其轨<br>天空便有了新的模样',
        ctaMac: '下载适用于 macOS',
        ctaWin: '下载适用于 Windows',
        ctaLinux: '下载适用于 Linux',
        ctaGithub: 'GitHub 仓库',
      },
      cli: {
        title: 'Caelis CLI',
        badge: '最新版本',
        desc: '直接在本地代码库中使用 Caelis。通过终端编排专家智能体，在系统级沙箱内安全执行开发任务。',
        macLabel: 'macOS',
        linuxLabel: 'Linux',
        winLabel: 'Windows PowerShell',
        npmLabel: 'npm (全平台)',
        copyAria: '复制安装指令',
        copied: '已复制',
      },
      binding: {
        title: '为每个角色，<br>绑定最合适的智能',
        desc: '在同一个工作空间中，你可以为子代理、Guardian、Reviewer 与自定义角色分别绑定已连接的 Provider Model，或接入支持 ACP 的外部 Agent。让不同智能各司其职，在同一任务流中协同运行。',
        breezeSub: '轻量检索代理',
        orbitSub: '工具调用代理',
        zenithSub: '深度推理代理',
        guardianSub: '系统安全守护',
        reviewerSub: '代码审查代理',
        customSub: '自定义角色',
        pillProvider: 'Provider Model',
        pillAcp: 'ACP Agent',
      },
      security: {
        title: '系统级安全与本地沙箱',
        subtitle: '代码不离机，执行有界限。原生沙箱与自动审批双重守护。',
        c1Title: 'Guardian 智能自动审批',
        c1Desc: '针对安全 Prompt 与会话上下文精心调优，在指令执行前由 LLM 深度审查，智能拦截高危与破坏性行为。',
        c1Chip: 'Auto review approved',
        c2Title: '三大原生系统沙箱',
        c2Desc: '深度对接底层系统隔离内核，限定文件系统读写边界，无需依赖笨重容器。',
        c3Title: '100% 开源与本地运行',
        c3Desc: '所有会话与凭证 100% 本地留存，开源透明无遥测。',
        c3Chip: 'Apache-2.0 · 本地优先',
      },
      faq: {
        title: '常见问题',
        subtitle: '快速了解 Caelis 多模型组合、角色绑定与安全机制。',
        q1Question: 'Caelis 相比其他单一 AI 工具最大的优势是什么？',
        q1Answer: '传统工具将你限制在单一模型或提供商。Caelis 允许你在同一个会话中同时调用 DeepSeek、Grok、GPT、Claude 以及本地 Ollama，并将它们按需绑定到不同子代理角色进行分工协作。',
        q2Question: 'Provider 绑定与自定义角色如何工作？',
        q2Answer: '通过 /subagent 指令即可随时调整绑定关系。例如将高性价比模型分配给 Breeze 处理琐碎微调，将高推理模型分配给 Orbit 编写业务，将顶尖模型分配给 Zenith 做把关。',
        q3Question: '可以使用现有的模型订阅或本地模型吗？',
        q3Answer: '完全可以。Caelis 支持 ChatGPT Codex 与 Grok 订阅的免配置 OAuth 登录，支持各厂商 API Key，并原生支持本地 Ollama 零成本离线运行。',
        q4Question: '我的代码和会话数据存放在哪里？',
        q4Answer: '所有会话历史、模型密钥与配置均 100% 保存在本地目录（~/.caelis），完全开源透明且绝无云端遥测，保障核心代码资产安全。',
      },
      footer: {
        license: 'Apache-2.0 开源协议',
        releases: '版本发布',
        docs: '技术文档',
        github: 'GitHub 仓库',
      },
    },
  };

  const getByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  };

  const updateI18n = (lang) => {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = getByPath(dict, key);
      if (typeof val === 'string') {
        if (val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const val = getByPath(dict, key);
      if (typeof val === 'string') {
        el.setAttribute('aria-label', val);
      }
    });

    if (dict.metaTitle) document.title = dict.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.metaDescription) metaDesc.setAttribute('content', dict.metaDescription);

    const langCurrent = document.querySelector('[data-language-current]');
    if (langCurrent) langCurrent.textContent = lang === 'zh' ? '中文' : 'English';

    document.querySelectorAll('[data-language-option]').forEach((btn) => {
      const isSelected = btn.getAttribute('data-language-option') === lang;
      btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    updateHeroDownloadButton(lang);
  };

  /* Platform Detection */
  const detectPlatform = () => {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'mac';
    if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'windows';
    if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'linux';
    return 'mac';
  };

  const currentPlatform = detectPlatform();

  const updateHeroDownloadButton = (lang) => {
    const heroBtn = document.querySelector('[data-hero-download]');
    const heroLabel = document.querySelector('[data-hero-download-label]');
    if (!heroBtn || !heroLabel) return;

    const dict = translations[lang] || translations.en;
    if (currentPlatform === 'windows') {
      heroLabel.textContent = dict.hero.ctaWin;
    } else if (currentPlatform === 'linux') {
      heroLabel.textContent = dict.hero.ctaLinux;
    } else {
      heroLabel.textContent = dict.hero.ctaMac;
    }
  };

  /* Highlight relevant CLI block */
  const highlightCliBlock = () => {
    document.querySelectorAll('.install-block').forEach((b) => b.classList.remove('highlight'));
    if (currentPlatform === 'windows') {
      const winBlock = document.querySelector('[data-platform-block="windows"]');
      if (winBlock) winBlock.classList.add('highlight');
    } else {
      const unixBlock = document.querySelector('[data-platform-block="unix"]');
      if (unixBlock) unixBlock.classList.add('highlight');
    }
  };
  highlightCliBlock();

  /* Language Selector Interaction */
  const langMenu = document.querySelector('[data-language-menu]');
  const langTrigger = document.querySelector('[data-language-trigger]');
  const langOptions = document.querySelector('[data-language-options]');

  const toggleLangMenu = (open) => {
    const shouldOpen = open !== undefined ? open : langOptions.hasAttribute('hidden');
    if (shouldOpen) {
      langOptions.removeAttribute('hidden');
      langTrigger.setAttribute('aria-expanded', 'true');
    } else {
      langOptions.setAttribute('hidden', '');
      langTrigger.setAttribute('aria-expanded', 'false');
    }
  };

  if (langTrigger && langOptions) {
    langTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLangMenu();
    });

    document.querySelectorAll('[data-language-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-language-option');
        localStorage.setItem('caelis_lang', lang);
        updateI18n(lang);
        toggleLangMenu(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (langMenu && !langMenu.contains(e.target)) {
        toggleLangMenu(false);
      }
    });
  }

  /* Theme Toggle */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('caelis_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  let isCurrentThemeDark = true;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      isCurrentThemeDark = false;
    } else {
      document.documentElement.removeAttribute('data-theme');
      isCurrentThemeDark = true;
    }
    localStorage.setItem('caelis_theme', theme);
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  /* Initial Language */
  const getPreferredLang = () => {
    const saved = localStorage.getItem('caelis_lang');
    if (saved === 'en' || saved === 'zh') return saved;
    const browserLang = (navigator.language || '').toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  };

  const initialLang = getPreferredLang();
  updateI18n(initialLang);

  /* Copy Code Buttons */
  document.querySelectorAll('[data-copy-trigger]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const codeBox = btn.closest('.install-code-box');
      if (!codeBox) return;
      const code = codeBox.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText.trim());
        btn.classList.add('copied');
        const toast = codeBox.querySelector('.block-toast');
        if (toast) toast.classList.add('show');

        setTimeout(() => {
          btn.classList.remove('copied');
          if (toast) toast.classList.remove('show');
        }, 1800);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  });

  /* ==========================================================================
     CELESTIAL SKY CANVAS:
     ☀️ Light Theme: Natural Ambient Floating Particles with Global Mouse Flow Direction
     🌙 Dark Theme: Pure Serene Slow Meteors + Subtle Twinkling Starfield ONLY
     ========================================================================== */
  const initHeroCelestialCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const heroSection = document.getElementById('top');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId = null;
    let isVisible = false;

    // Mouse flow direction tracker (-1.0 to 1.0)
    const mouseFlow = {
      normX: 0,
      normY: 0,
      smoothNormX: 0,
      smoothNormY: 0,
      isActive: false,
    };

    const onPointerMove = (clientX, clientY) => {
      // Normalizing mouse across the screen to compute the global drift bias (-1 to 1)
      mouseFlow.normX = (clientX / window.innerWidth - 0.5) * 2;
      mouseFlow.normY = (clientY / window.innerHeight - 0.5) * 2;
      mouseFlow.isActive = true;
    };

    window.addEventListener('mousemove', (e) => {
      onPointerMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouseFlow.normX = 0;
      mouseFlow.normY = 0;
      mouseFlow.isActive = false;
    });

    // ------------------------------------------------------------------------
    // ☀️ LIGHT THEME: AMBIENT FLOATING MOTES (Natural Floating + Mouse Drift Direction)
    // ------------------------------------------------------------------------
    class AmbientFloatingParticle {
      constructor(isInit = false) {
        this.reset(isInit);
      }

      reset(isInit = false) {
        // Naturally scattered across the screen
        this.x = isInit ? Math.random() * width : Math.random() * (width + 60) - 30;
        this.y = isInit ? Math.random() * height : (Math.random() > 0.5 ? -20 : height + 20);

        // Constant serene natural drift velocity
        this.baseVx = (Math.random() - 0.5) * 0.45; // slight horizontal float
        this.baseVy = -0.25 - Math.random() * 0.4;  // gentle upward ambient rise

        // Organic wobble phase
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.6 + Math.random() * 1.2;

        // Clean capsule shape
        this.length = 5.0 + Math.random() * 6.5;
        this.width = 1.6 + Math.random() * 1.4;

        // Antigravity Clean Palette (Blue, Violet, Crimson Coral, Amber, Sky)
        const colors = [
          { r: 37, g: 99, b: 235 },   // Royal Blue
          { r: 147, g: 51, b: 234 },  // Violet
          { r: 244, g: 63, b: 94 },   // Coral
          { r: 245, g: 158, b: 11 },  // Amber
          { r: 2, g: 132, b: 199 },   // Sky
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = 0.35 + Math.random() * 0.45;
        this.phase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.8 + Math.random() * 1.5;
      }

      update(time) {
        // Natural wobble
        const wobbleX = Math.sin(time * this.wobbleSpeed + this.wobblePhase) * 0.35;
        const wobbleY = Math.cos(time * this.wobbleSpeed + this.wobblePhase) * 0.2;

        // Mouse position determines the OVERALL drift direction of the particle field
        const mouseDriftX = mouseFlow.smoothNormX * 1.2;
        const mouseDriftY = mouseFlow.smoothNormY * 0.8;

        const totalVx = this.baseVx + wobbleX + mouseDriftX;
        const totalVy = this.baseVy + wobbleY + mouseDriftY;

        this.x += totalVx;
        this.y += totalVy;

        // Tangent smoothly aligns with the actual floating trajectory
        this.angle = Math.atan2(totalVy, totalVx);

        // Screen edge wrapping (continuous seamless drifting)
        const pad = 40;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;

        // Breathing Alpha
        const breath = Math.sin(time * this.twinkleSpeed + this.phase);
        this.curAlpha = Math.max(0.12, Math.min(0.85, this.baseAlpha * (0.8 + 0.25 * breath)));
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.curAlpha})`;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.moveTo(-this.length * 0.5, 0);
        ctx.lineTo(this.length * 0.5, 0);
        ctx.stroke();

        ctx.restore();
      }
    }

    // ------------------------------------------------------------------------
    // 🌙 DARK THEME: PURE SERENE SLOW METEORS & STARFIELD ONLY
    // ------------------------------------------------------------------------
    class SereneMeteor {
      constructor(isInit = false) {
        this.reset(isInit);
      }

      reset(isInit = false) {
        this.x = Math.random() * (width + 300) - 150;
        this.y = isInit ? Math.random() * height : -Math.random() * 120 - 40;

        this.baseAngle = Math.PI * 0.28 + (Math.random() - 0.5) * 0.12;

        // Slow, elegant cosmic velocity (~1.0 to 1.8 px/frame)
        this.speed = 1.0 + Math.random() * 0.9;
        this.tailLength = 65 + Math.random() * 75;
        this.thickness = 1.3 + Math.random() * 1.2;

        const colors = [
          { r: 56, g: 189, b: 248 },  // Cyan
          { r: 129, g: 140, b: 248 }, // Indigo
          { r: 192, g: 132, b: 252 }, // Nebula Purple
          { r: 251, g: 191, b: 36 },  // Gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.35 + Math.random() * 0.45;
      }

      update() {
        // Global mouse direction slight bias
        const vx = Math.cos(this.baseAngle) * this.speed + mouseFlow.smoothNormX * 0.3;
        const vy = Math.sin(this.baseAngle) * this.speed + mouseFlow.smoothNormY * 0.2;

        this.x += vx;
        this.y += vy;
        this.currentAngle = Math.atan2(vy, vx);

        if (this.y > height + 100 || this.x < -200 || this.x > width + 200) {
          this.reset(false);
        }
      }

      draw(ctx) {
        const headX = this.x;
        const headY = this.y;
        const tailX = headX - Math.cos(this.currentAngle) * this.tailLength;
        const tailY = headY - Math.sin(this.currentAngle) * this.tailLength;

        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(0.2, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.18})`);
        grad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(headX, headY, this.thickness * 0.85, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    class StarField {
      constructor(count) {
        this.stars = [];
        for (let i = 0; i < count; i++) {
          this.stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.8 + Math.random() * 1.4,
            baseAlpha: 0.18 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.7 + Math.random() * 1.5,
          });
        }
      }

      updateAndDraw(ctx, time) {
        for (const s of this.stars) {
          const breath = Math.sin(time * s.twinkleSpeed + s.phase);
          const alpha = Math.max(0.08, Math.min(0.85, s.baseAlpha * (0.75 + 0.35 * breath)));

          const px = (s.x + mouseFlow.smoothNormX * 18 + width) % width;
          const py = (s.y + mouseFlow.smoothNormY * 12 + height) % height;

          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = alpha;
          ctx.arc(px, py, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
    }

    // Instances
    let floatingParticles = [];
    let meteors = [];
    let starField = null;

    const resize = () => {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Initialize Light Theme naturally distributed floating particles (no rigid crescent)
      const count = width < 600 ? 45 : width < 1024 ? 75 : 100;
      floatingParticles = [];
      for (let i = 0; i < count; i++) {
        floatingParticles.push(new AmbientFloatingParticle(true));
      }

      // Initialize Dark Theme Meteors & Starfield
      meteors = [];
      const meteorCount = width < 600 ? 5 : 8;
      for (let i = 0; i < meteorCount; i++) {
        meteors.push(new SereneMeteor(true));
      }
      starField = new StarField(width < 600 ? 40 : 75);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Animation Loop
    let startTime = performance.now();

    const render = (now) => {
      if (!isVisible) return;

      const time = (now - startTime) * 0.001;

      // Smooth mouse flow interpolation
      mouseFlow.smoothNormX += (mouseFlow.normX - mouseFlow.smoothNormX) * 0.04;
      mouseFlow.smoothNormY += (mouseFlow.normY - mouseFlow.smoothNormY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDark = isCurrentThemeDark;

      if (isDark) {
        // 🌙 Dark Theme: ONLY Serene Meteors & Subtle Starfield
        if (starField) starField.updateAndDraw(ctx, time);
        for (let i = 0; i < meteors.length; i++) {
          meteors[i].update();
          meteors[i].draw(ctx);
        }
      } else {
        // ☀️ Light Theme: Naturally scattered floating particles whose overall drift is steered by mouse position
        for (let i = 0; i < floatingParticles.length; i++) {
          floatingParticles[i].update(time);
          floatingParticles[i].draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!animationFrameId) {
        isVisible = true;
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    startAnimation();

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(heroSection);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      stopAnimation();
      setTimeout(() => {
        ctx.clearRect(0, 0, width, height);
        if (isCurrentThemeDark) {
          if (starField) starField.updateAndDraw(ctx, 1.0);
        } else {
          floatingParticles.forEach((p) => p.draw(ctx));
        }
      }, 100);
    }
  };

  initHeroCelestialCanvas();

  /* Screen Reveal Intersection Observer */
  const revealElements = document.querySelectorAll('.screen-reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
