document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      metaTitle: 'Caelis',
      metaDescription: 'Caelis is a local collaboration workspace where models and ACP agents work together in one session.',
      controls: {
        skip: 'Skip to content',
        languageAria: 'Select language',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      hero: {
        title: 'See what happens when every intelligence<br>finds its orbit.',
        subtitle: 'A local collaboration workspace where models and ACP agents share work, exchange findings, and complete tasks together.',
        ctaInstall: 'Install Caelis',
        ctaDemo: 'Watch demo',
        ctaGithub: 'GitHub',
      },
      demo: {
        videoAria: 'Caelis multi-agent collaboration demo',
      },
      cli: {
        title: 'Caelis CLI',
        badge: 'Latest',
        desc: 'Explore code, make changes, run tests, and review results from your terminal. Resume local sessions to continue earlier work.',
        macLabel: 'macOS',
        linuxLabel: 'Linux',
        winLabel: 'Windows PowerShell',
        npmLabel: 'npm (Cross-platform)',
        copyAria: 'Copy command',
        copied: 'Copied',
      },
      binding: {
        title: 'Bind the right intelligence<br>to every specialist role',
        desc: 'Bind models or ACP agents to participants and custom roles, and configure Guardian, Reviewer, and Memory Steward separately. Follow each conversation and send text or images directly from the same workspace.',
        breezeSub: 'Lookup & focused edits',
        orbitSub: 'Implementation & review',
        zenithSub: 'Architecture & debugging',
        guardianSub: 'Tool approval review',
        reviewerSub: 'Workspace change review',
        customSub: 'Custom role',
        breezeTarget: 'MiMo',
        orbitTarget: 'Grok',
        zenithTarget: 'GPT',
        guardianTarget: 'DeepSeek',
        reviewerTarget: 'Codex',
        customTarget: 'Yours',
        pillProvider: 'Provider',
        pillAcp: 'ACP',
      },
      security: {
        title: 'Tool approvals & OS sandboxing',
        subtitle: 'Tool requests follow the selected approval mode. Local commands run under the configured sandbox policy.',
        c1Title: 'Guardian Auto-Review',
        c1Desc: 'Guardian reviews tool requests against the session context and approval policy. Switch to manual mode to make approval decisions yourself.',
        c1Chip: 'Auto review approved',
        c2Title: 'Native OS Sandboxes',
        c2Desc: 'Operating-system isolation limits filesystem access for local commands according to the configured policy.',
        c3Title: 'Local Storage & Open Source',
        c3Desc: 'Sessions, configuration, and Caelis-managed credentials are stored on your machine. The source code is available under Apache-2.0.',
        c3Chip: 'Apache-2.0 · Local-First',
      },
      faq: {
        title: 'FAQ',
        subtitle: 'Collaboration, model connections, and local sessions in Caelis.',
        q1Question: 'How do agents collaborate in Caelis?',
        q1Answer: 'Participants keep their own conversations and exchange progress and findings through messages. Coordinate work from the main conversation or open a participant pane to follow up directly.',
        q2Question: 'How do provider bindings and custom roles work?',
        q2Answer: 'Use /subagent to bind breeze, orbit, zenith, or custom roles to a model or ACP agent. Save binding sets to reuse a configuration across tasks.',
        q3Question: 'Which sign-in and provider connection methods are supported?',
        q3Answer: 'Use /connect to sign in with ChatGPT Codex or Grok, configure API-key or local model providers, or connect an installed ACP agent.',
        q4Question: 'Where is my code and data stored?',
        q4Answer: 'Caelis stores sessions and its managed credentials in ~/.caelis by default. Use /resume to return to earlier conversations. Model requests go to your selected provider or external agent.',
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
      metaDescription: 'Caelis 是一个本地 AI 智能体协作工作空间，让模型与 ACP Agent 在同一会话中协同完成任务。',
      controls: {
        skip: '跳转到正文',
        languageAria: '选择语言',
        switchToLight: '切换到浅色主题',
        switchToDark: '切换到深色主题',
      },
      hero: {
        title: '当群星各循其轨<br>天空便有了新的模样',
        subtitle: '一个本地 AI 智能体协作工作空间，让模型与 ACP Agent 在同一会话中分工、沟通并协同完成任务。',
        ctaInstall: '安装 Caelis',
        ctaDemo: '观看演示',
        ctaGithub: 'GitHub 仓库',
      },
      demo: {
        videoAria: 'Caelis 多智能体协作演示',
      },
      cli: {
        title: 'Caelis CLI',
        badge: '最新版本',
        desc: '在终端中阅读代码、修改文件、运行测试和审查结果。恢复本地会话，继续之前的工作。',
        macLabel: 'macOS',
        linuxLabel: 'Linux',
        winLabel: 'Windows PowerShell',
        npmLabel: 'npm (全平台)',
        copyAria: '复制安装指令',
        copied: '已复制',
      },
      binding: {
        title: '为每个角色，<br>绑定最合适的智能',
        desc: '为参与者和自定义角色绑定模型或 ACP Agent，分别配置 Guardian、Reviewer 与 Memory Steward。在同一工作空间查看各方进展，并直接发送文字或图片。',
        breezeSub: '检索与局部修改',
        orbitSub: '实现与代码审查',
        zenithSub: '架构分析与复杂调试',
        guardianSub: '工具请求审批',
        reviewerSub: '工作区变更审查',
        customSub: '自定义职责',
        breezeTarget: 'MiMo',
        orbitTarget: 'Grok',
        zenithTarget: 'GPT',
        guardianTarget: 'DeepSeek',
        reviewerTarget: 'Codex',
        customTarget: 'Yours',
        pillProvider: 'Provider',
        pillAcp: 'ACP',
      },
      security: {
        title: '工具审批与系统沙箱',
        subtitle: '工具请求按审批模式审核，本地命令按沙箱策略执行。',
        c1Title: 'Guardian 智能自动审批',
        c1Desc: 'Guardian 结合会话上下文与审批策略审核工具请求。也可切换到手动模式自行审批。',
        c1Chip: 'Auto review approved',
        c2Title: '三大原生系统沙箱',
        c2Desc: '使用操作系统隔离机制，按配置的策略限定本地命令的文件访问范围。',
        c3Title: '本地存储与开源',
        c3Desc: '会话、配置与 Caelis 管理的凭证保存在本机。源代码以 Apache-2.0 协议开放。',
        c3Chip: 'Apache-2.0 · 本地优先',
      },
      faq: {
        title: '常见问题',
        subtitle: '了解 Caelis 的协作方式、模型接入与本地会话。',
        q1Question: 'Caelis 中的智能体如何协作？',
        q1Answer: '参与者各自保留对话，并通过消息交换进展与发现。你可以在主会话中协调任务，也可以打开参与者工作区继续追问。',
        q2Question: 'Provider 绑定与自定义角色如何工作？',
        q2Answer: '在 /subagent 中为 breeze、orbit、zenith 或自定义角色选择模型或 ACP Agent，并将绑定保存为可复用的配置组。',
        q3Question: '当前支持哪些登录与 Provider 接入方式？',
        q3Answer: '通过 /connect 使用 ChatGPT Codex 或 Grok 账号登录，配置 API Key、本地模型服务，或连接已安装的 ACP Agent。',
        q4Question: '我的代码和会话数据存放在哪里？',
        q4Answer: '会话和 Caelis 管理的凭证默认保存在本机 ~/.caelis，可通过 /resume 恢复会话。模型请求发送至你选择的 Provider 或外部 Agent。',
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
    window.dispatchEvent(new CustomEvent('caelis:themechange', { detail: { theme } }));
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
     ☀️ Light Theme: Flexible Morphing Constellations with Gentle Parallax
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
    // ☀️ LIGHT THEME: DAYLIGHT CONSTELLATION FRAGMENTS
    // ------------------------------------------------------------------------
    class DaylightConstellationField {
      constructor() {
        this.clusters = [];
        this.specks = [];
        this.create();
      }

      create() {
        const compact = width < 600;
        const tablet = width >= 600 && width < 1024;
        const zones = compact
          ? [
              [0.1, 0.12], [0.7, 0.08], [0.94, 0.29], [0.06, 0.48],
              [0.9, 0.7], [0.18, 0.84], [0.61, 0.92],
            ]
          : [
              [0.05, 0.14], [0.25, 0.07], [0.61, 0.17], [0.81, 0.06], [0.95, 0.26],
              [0.1, 0.4], [0.97, 0.53], [0.03, 0.75], [0.2, 0.92],
              [0.48, 0.84], [0.73, 0.95], [0.91, 0.78],
            ];
        const clusterCount = compact ? zones.length : tablet ? 9 : zones.length;
        const baseSpread = compact ? Math.min(56, width * 0.15) : tablet ? 70 : 84;

        for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
          const [zoneX, zoneY] = zones[clusterIndex % zones.length];
          const spread = baseSpread * (0.82 + Math.random() * 0.38);
          const nodeCount = 4 + Math.floor(Math.random() * 3);
          const mirrorX = Math.random() > 0.5 ? -1 : 1;
          const mirrorY = mirrorX === 1 ? -1 : (Math.random() > 0.5 ? -1 : 1);
          const flipRotation = (Math.random() > 0.5 ? 1 : -1) * (0.45 + Math.random() * 0.55);
          const cluster = {
            x: Math.max(0.03, Math.min(0.97, zoneX + (Math.random() - 0.5) * 0.06)) * width,
            y: Math.max(0.04, Math.min(0.96, zoneY + (Math.random() - 0.5) * 0.05)) * height,
            phase: Math.random() * Math.PI * 2,
            driftSpeed: 0.16 + Math.random() * 0.08,
            driftRadiusX: 9 + Math.random() * 9,
            driftRadiusY: 7 + Math.random() * 7,
            morphSpeed: 0.22 + Math.random() * 0.16,
            swimSpeed: 0.42 + Math.random() * 0.23,
            turnSpeed: 0.13 + Math.random() * 0.09,
            turnRange: 0.12 + Math.random() * 0.14,
            parallax: 4 + Math.random() * 7,
            nodes: [],
            edges: [],
          };

          for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex += 1) {
            const angle = Math.random() * Math.PI * 2;
            const distance = nodeIndex === 0 ? spread * 0.05 : spread * (0.38 + Math.random() * 0.7);
            const ax = Math.cos(angle) * distance;
            const ay = Math.sin(angle) * distance * 0.72;
            const mirroredX = ax * mirrorX;
            const mirroredY = ay * mirrorY;
            const bx = (mirroredX * Math.cos(flipRotation) - mirroredY * Math.sin(flipRotation))
              + (Math.random() - 0.5) * spread * 0.28;
            const by = (mirroredX * Math.sin(flipRotation) + mirroredY * Math.cos(flipRotation))
              + (Math.random() - 0.5) * spread * 0.22;
            cluster.nodes.push({
              ax,
              ay,
              bx,
              by,
              radius: nodeIndex === 0 ? 2 + Math.random() : 0.9 + Math.random() * 0.9,
              baseAlpha: nodeIndex === 0 ? 0.75 + Math.random() * 0.2 : 0.45 + Math.random() * 0.24,
              phase: Math.random() * Math.PI * 2,
              twinkleSpeed: 0.35 + Math.random() * 0.5,
              flexRadius: nodeIndex === 0 ? 1.5 + Math.random() : 2.5 + Math.random() * 3.5,
              flexSpeed: 0.24 + Math.random() * 0.22,
              isAnchor: nodeIndex === 0,
              drawX: 0,
              drawY: 0,
            });
            if (nodeIndex > 0) {
              cluster.edges.push([nodeIndex, Math.floor(Math.random() * nodeIndex)]);
            }
          }

          if (nodeCount > 4) {
            cluster.edges.push([nodeCount - 1, 1 + Math.floor(Math.random() * (nodeCount - 2))]);
          }

          this.clusters.push(cluster);
        }

        const speckCount = compact ? 12 : tablet ? 18 : 26;
        while (this.specks.length < speckCount) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const insideQuietCenter = x > width * 0.25 && x < width * 0.75 && y > height * 0.27 && y < height * 0.73;
          if (insideQuietCenter) continue;
          this.specks.push({
            x,
            y,
            radius: 0.45 + Math.random() * 0.6,
            alpha: 0.22 + Math.random() * 0.24,
            phase: Math.random() * Math.PI * 2,
            driftRadius: 0.8 + Math.random() * 1.8,
            driftSpeed: 0.08 + Math.random() * 0.1,
          });
        }
      }

      updateAndDraw(ctx, time) {
        ctx.save();
        ctx.lineCap = 'round';

        for (const cluster of this.clusters) {
          const driftX = Math.sin(time * cluster.driftSpeed + cluster.phase) * cluster.driftRadiusX
            + Math.sin(time * cluster.driftSpeed * 0.37 + cluster.phase * 1.7) * cluster.driftRadiusX * 0.28
            + mouseFlow.smoothNormX * cluster.parallax;
          const driftY = Math.cos(time * cluster.driftSpeed * 0.73 + cluster.phase) * cluster.driftRadiusY
            + Math.sin(time * cluster.swimSpeed + cluster.phase) * cluster.driftRadiusY * 0.26
            + mouseFlow.smoothNormY * cluster.parallax * 0.65;
          const morphWave = (1 - Math.cos(time * cluster.morphSpeed + cluster.phase)) * 0.5;
          const morph = morphWave * morphWave * (3 - 2 * morphWave);
          const swim = Math.sin(time * cluster.swimSpeed + cluster.phase * 0.71);
          const scaleX = 1 - swim * 0.08;
          const scaleY = 1 + swim * 0.11;
          const rotation = Math.sin(time * cluster.turnSpeed + cluster.phase) * cluster.turnRange;
          const cosRotation = Math.cos(rotation);
          const sinRotation = Math.sin(rotation);

          for (const node of cluster.nodes) {
            const flex = time * node.flexSpeed + node.phase;
            const localX = (node.ax + (node.bx - node.ax) * morph) * scaleX
              + Math.cos(flex) * node.flexRadius;
            const localY = (node.ay + (node.by - node.ay) * morph) * scaleY
              + Math.sin(flex * 0.83) * node.flexRadius * 0.7;
            node.drawX = cluster.x + driftX + localX * cosRotation - localY * sinRotation;
            node.drawY = cluster.y + driftY + localX * sinRotation + localY * cosRotation;
          }

          for (const [fromIndex, toIndex] of cluster.edges) {
            const from = cluster.nodes[fromIndex];
            const to = cluster.nodes[toIndex];
            const breath = 0.78 + Math.sin(time * 0.3 + from.phase) * 0.16 + swim * 0.05;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * breath})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(from.drawX, from.drawY);
            ctx.lineTo(to.drawX, to.drawY);
            ctx.stroke();
          }

          for (const node of cluster.nodes) {
            const breath = 0.84 + Math.sin(time * node.twinkleSpeed + node.phase) * 0.16;
            const alpha = node.baseAlpha * breath;
            const breathingRadius = node.radius * (node.isAnchor ? 0.96 + breath * 0.08 + swim * 0.025 : 1);
            ctx.save();
            if (node.isAnchor) {
              ctx.shadowColor = 'rgba(37, 99, 235, 0.42)';
              ctx.shadowBlur = 11;
            }
            ctx.beginPath();
            ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.arc(node.drawX, node.drawY, breathingRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        for (const speck of this.specks) {
          const alpha = speck.alpha * (0.85 + Math.sin(time * 0.28 + speck.phase) * 0.15);
          const drift = time * speck.driftSpeed + speck.phase;
          ctx.beginPath();
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.arc(
            speck.x + Math.cos(drift) * speck.driftRadius + mouseFlow.smoothNormX * 3,
            speck.y + Math.sin(drift * 0.82) * speck.driftRadius * 0.65 + mouseFlow.smoothNormY * 2,
            speck.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

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
    let constellationField = null;
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

      // Initialize irregular flexible constellations outside the quiet center.
      constellationField = new DaylightConstellationField();

      // Initialize Dark Theme Meteors & Starfield
      meteors = [];
      const meteorCount = width < 600 ? 5 : 8;
      for (let i = 0; i < meteorCount; i++) {
        meteors.push(new SereneMeteor(true));
      }
      starField = new StarField(width < 600 ? 40 : 75);
    };

    resize();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isHeroIntersecting = true;

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
        // ☀️ Light Theme: Flexible constellation fragments with gentle parallax.
        if (constellationField) constellationField.updateAndDraw(ctx, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      if (isCurrentThemeDark) {
        if (starField) starField.updateAndDraw(ctx, 1.0);
      } else if (constellationField) {
        constellationField.updateAndDraw(ctx, 1.0);
      }
    };

    const startAnimation = () => {
      if (motionQuery.matches) {
        drawStaticFrame();
        return;
      }
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

    const handleResize = () => {
      resize();
      if (motionQuery.matches) drawStaticFrame();
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stopAnimation();
        drawStaticFrame();
      } else if (isHeroIntersecting) {
        startAnimation();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('caelis:themechange', () => {
      if (motionQuery.matches) drawStaticFrame();
    });

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionPreferenceChange);
    } else {
      motionQuery.addListener(handleMotionPreferenceChange);
    }

    startAnimation();

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isHeroIntersecting = entry.isIntersecting;
          if (isHeroIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(heroSection);
    }
  };

  initHeroCelestialCanvas();

  /* Section reveal without changing the user's scroll position. */
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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
