document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      metaTitle: 'Caelis — Local-first Agent Runtime',
      metaDescription: 'Caelis is a terminal-first, local-first agent runtime. Connect model providers and ACP agents, delegate work, and keep every session inside one guarded workspace.',
      controls: {
        skip: 'Skip to content',
        languageAria: 'Select language',
        primaryNav: 'Primary navigation',
        installMethod: 'Installation method',
        tuiPreview: 'Caelis v0.31.0 terminal welcome screen',
        productFacts: 'Product facts',
        profileFlow: 'Caelis model profile and agent role flow',
        ecosystems: 'Supported ecosystems',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      nav: {
        workflow: 'Workflow',
        surfaces: 'Surfaces',
        ecosystem: 'Ecosystem',
      },
      hero: {
        eyebrow: 'TERMINAL-FIRST AGENT RUNTIME',
        title: 'Build with agents.<br>Keep one local runtime.',
        lede: 'Connect model providers and ACP agents, bind specialists, and run every turn inside one guarded, resumable workspace.',
        install: 'Install Caelis',
        github: 'Explore the source',
        caption: 'The current responsive welcome surface — connect, resume, or start typing.',
      },
      install: {
        copied: 'Copied',
        copyAria: 'Copy installation command',
      },
      proof: {
        local: 'Local-first state',
        acp: 'ACP-native',
      },
      workflow: {
        eyebrow: 'ONE WORKSPACE, THREE MOVES',
        title: 'Connect. Delegate. Review.',
        body: 'Caelis turns a collection of models, local agents, and tools into one intentional terminal workflow.',
        connect: {
          title: 'Choose the right backend',
          body: 'Connect a model provider or a local ACP agent. Both become consistent Model Profiles instead of leaking backend details into your work.',
        },
        delegate: {
          title: 'Bind clear specialist roles',
          body: 'Use Breeze for bounded work, Orbit for implementation, and Zenith for deep or high-risk analysis — each with an explicit profile and reasoning effort.',
        },
        review: {
          title: 'Keep execution guarded',
          body: 'Guardian reviews tool access; Reviewer inspects the result. Sandbox boundaries and approval prompts stay part of the same session.',
        },
      },
      orchestration: {
        eyebrow: 'CONTROL WITHOUT LOCK-IN',
        title: 'One profile language across every agent.',
        body: 'Provider models and external ACP agents enter through the same Control layer. Roles stay stable even when the backend changes.',
        link: 'Read the architecture →',
        providers: 'Model providers',
        agents: 'Local ACP agents',
        profile: 'model + effort + backend',
        session: 'One guarded, resumable Session',
      },
      tui: {
        eyebrow: 'THE TERMINAL IS THE PRODUCT',
        title: 'Fast discovery. Quiet long-running work.',
        body: 'The new TUI keeps command and Skill discovery under <code>/</code>, file references under <code>@</code>, and long tasks in stable semantic states instead of noisy control traces.',
        detail1: 'Responsive welcome surface with mouse-first actions',
        detail2: 'Adaptive themes, completion overlays, image paste, and clickable sources',
        detail3: 'Durable sessions with resume, replay, and approval recovery',
      },
      surfaces: {
        eyebrow: 'ONE RUNTIME, THREE SURFACES',
        title: 'Stay interactive. Script it. Embed it.',
        tui: 'Start with <code>caelis</code> for the full interactive workspace, command discovery, approvals, and session control.',
        headless: 'Use <code>caelis -p</code> for one-shot prompts with text or JSON output in scripts and automation.',
        acp: 'Run <code>caelis acp</code> and expose the same runtime to compatible editors and external agent clients.',
      },
      ecosystem: {
        eyebrow: 'BRING YOUR STACK',
        title: 'Open models. Open tools. Open protocol.',
        body: 'Use subscription sign-in, API providers, local models, ACP agents, MCP servers, Skills, and Plugins without rebuilding your workflow around one vendor.',
      },
      trust: {
        eyebrow: 'LOCAL-FIRST BY DEFAULT',
        title: 'Your workspace stays yours.',
        body: 'Sessions, execution history, configuration, and workspace context live on your machine. Native sandbox backends constrain tools; Guardian and explicit approvals handle the edges.',
        fact1: 'Local session persistence',
        fact2: 'Native sandbox backends',
        fact3: 'Approval-aware execution',
        fact4: 'Open-source runtime',
      },
      faq: {
        title: 'The short version.',
        q1: {
          question: 'What is Caelis?',
          answer: 'A terminal-first agent runtime with an interactive TUI, a headless CLI, and an ACP stdio server. It owns the local workspace, Session, tool, sandbox, and approval boundaries around your agents.',
        },
        q2: {
          question: 'Does it require an external ACP agent?',
          answer: 'No. Caelis includes its own local runtime. ACP is an additional interoperability path for connecting local agents and external clients.',
        },
        q3: {
          question: 'Which agents can I connect?',
          answer: 'The guided flow currently includes Codex, Claude Code, OpenCode, CodeFree-O, and Grok, plus custom ACP stdio commands.',
        },
        q4: {
          question: 'Can I use my existing model subscription?',
          answer: 'Caelis supports guided browser or device sign-in for eligible ChatGPT Codex and Grok subscriptions, alongside API-key and local provider paths.',
        },
        q5: {
          question: 'Where is my data stored?',
          answer: 'Under <code>~/.caelis</code> by default, with an override available through <code>-store-dir</code>.',
        },
      },
      final: {
        eyebrow: 'START IN YOUR TERMINAL',
        title: 'One command to meet your runtime.',
        action: 'Install Caelis',
      },
      footer: {
        copy: 'Open-source under Apache-2.0. Built for the terminal, ready for the agent ecosystem.',
        releases: 'Releases',
        docs: 'Docs',
      },
      demo: {
        action: 'mouse action → {command}',
      },
    },
    zh: {
      metaTitle: 'Caelis — 本地优先的 Agent Runtime',
      metaDescription: 'Caelis 是一个终端优先、本地优先的 Agent Runtime。连接模型服务与 ACP Agent，委派任务，并让每个 Session 运行在同一个受控工作空间中。',
      controls: {
        skip: '跳转到正文',
        languageAria: '选择语言',
        primaryNav: '主导航',
        installMethod: '安装方式',
        tuiPreview: 'Caelis v0.31.0 终端欢迎界面',
        productFacts: '产品信息',
        profileFlow: 'Caelis Model Profile 与 Agent 角色流向',
        ecosystems: '支持的生态',
        switchToLight: '切换到浅色主题',
        switchToDark: '切换到深色主题',
      },
      nav: {
        workflow: '工作流',
        surfaces: '使用入口',
        ecosystem: '生态',
      },
      hero: {
        eyebrow: '终端优先的 AGENT RUNTIME',
        title: '让多个 Agent，<br>运行在一个本地 Runtime。',
        lede: '连接模型服务与 ACP Agent，绑定各有所长的角色，让每个 Turn 都在同一个受控、可恢复的工作空间中运行。',
        install: '安装 Caelis',
        github: '查看源码',
        caption: '当前响应式欢迎界面——连接、恢复会话，或直接开始输入。',
      },
      install: {
        copied: '已复制',
        copyAria: '复制安装命令',
      },
      proof: {
        local: '状态本地优先',
        acp: '原生支持 ACP',
      },
      workflow: {
        eyebrow: '一个工作空间，三个动作',
        title: '连接。委派。审查。',
        body: 'Caelis 把模型、本地 Agent 与工具组合成一条边界清晰的终端工作流。',
        connect: {
          title: '选择真正合适的后端',
          body: '连接模型服务或本地 ACP Agent。两种后端都会转化为一致的 Model Profile，不把底层差异泄漏到工作流中。',
        },
        delegate: {
          title: '绑定职责明确的专家角色',
          body: 'Breeze 处理快速、边界明确的任务，Orbit 负责常规实现，Zenith 承担深度或高风险分析；每个角色都绑定显式 Profile 与推理强度。',
        },
        review: {
          title: '让执行始终处于保护之中',
          body: 'Guardian 审查工具访问，Reviewer 检查结果；Sandbox 边界与提权审批始终留在同一个 Session 内。',
        },
      },
      orchestration: {
        eyebrow: '可控，但不锁定',
        title: '所有 Agent 使用同一种 Profile 语言。',
        body: '模型服务与外部 ACP Agent 都通过同一个 Control 层进入系统。即使更换后端，角色与工作方式也保持稳定。',
        link: '阅读架构说明 →',
        providers: '模型服务',
        agents: '本地 ACP Agent',
        profile: '模型 + 推理强度 + 后端',
        session: '一个受控、可恢复的 Session',
      },
      tui: {
        eyebrow: '终端就是产品',
        title: '发现更快，长任务更安静。',
        body: '新 TUI 将命令和 Skill 统一放在 <code>/</code> 下发现，使用 <code>@</code> 引用文件，并以稳定的语义状态呈现长任务，不再暴露嘈杂的控制轨迹。',
        detail1: '响应式欢迎界面，保留鼠标优先的快捷动作',
        detail2: '自适应主题、补全浮层、图片粘贴与可点击来源',
        detail3: '支持恢复、重放与审批恢复的持久化 Session',
      },
      surfaces: {
        eyebrow: '一个 RUNTIME，三种入口',
        title: '交互使用。脚本调用。协议接入。',
        tui: '直接运行 <code>caelis</code>，进入完整交互式工作空间，使用命令发现、审批与 Session 控制。',
        headless: '使用 <code>caelis -p</code> 运行一次性 Prompt，并以文本或 JSON 输出接入脚本和自动化。',
        acp: '运行 <code>caelis acp</code>，把同一个 Runtime 暴露给兼容的编辑器与外部 Agent 客户端。',
      },
      ecosystem: {
        eyebrow: '带上你的现有技术栈',
        title: '开放模型。开放工具。开放协议。',
        body: '订阅登录、API 服务、本地模型、ACP Agent、MCP 服务、Skills 与 Plugins 都可接入，无需围绕单一厂商重建工作流。',
      },
      trust: {
        eyebrow: '默认本地优先',
        title: '你的工作空间，始终属于你。',
        body: 'Session、执行历史、配置与工作空间上下文保存在本机。原生 Sandbox 后端约束工具，Guardian 与显式审批处理越过边界的操作。',
        fact1: 'Session 本地持久化',
        fact2: '原生 Sandbox 后端',
        fact3: '具备审批语义的执行',
        fact4: '开源 Runtime',
      },
      faq: {
        title: '简短回答。',
        q1: {
          question: 'Caelis 是什么？',
          answer: '一个终端优先的 Agent Runtime，包含交互式 TUI、Headless CLI 与 ACP stdio server。它管理 Agent 周围的本地工作空间、Session、工具、Sandbox 与审批边界。',
        },
        q2: {
          question: '必须连接外部 ACP Agent 吗？',
          answer: '不需要。Caelis 自带本地 Runtime；ACP 是额外的互操作入口，用来连接本地 Agent 与外部客户端。',
        },
        q3: {
          question: '目前可以连接哪些 Agent？',
          answer: '引导式连接目前包含 Codex、Claude Code、OpenCode、CodeFree-O 与 Grok，也支持自定义 ACP stdio 命令。',
        },
        q4: {
          question: '可以使用现有模型订阅吗？',
          answer: '可以。对于符合条件的 ChatGPT Codex 与 Grok 订阅，Caelis 支持浏览器或设备码登录；同时也支持 API Key 与本地模型服务。',
        },
        q5: {
          question: '数据存放在哪里？',
          answer: '默认存放在 <code>~/.caelis</code>，也可以通过 <code>-store-dir</code> 指定其他位置。',
        },
      },
      final: {
        eyebrow: '从终端开始',
        title: '一条命令，进入你的 Agent Runtime。',
        action: '安装 Caelis',
      },
      footer: {
        copy: '基于 Apache-2.0 开源。为终端而生，与开放 Agent 生态协同。',
        releases: '版本发布',
        docs: '文档',
      },
      demo: {
        action: '鼠标动作 → {command}',
      },
    },
  };

  const getByPath = (source, path) => path
    .split('.')
    .reduce((value, key) => value && value[key], source);

  const languageMenu = document.querySelector('[data-language-menu]');
  const languageTrigger = document.querySelector('[data-language-trigger]');
  const languageOptions = document.querySelector('[data-language-options]');
  const languageCurrent = document.querySelector('[data-language-current]');
  const languageOptionButtons = document.querySelectorAll('[data-language-option]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const languageNames = { en: 'English', zh: '中文' };
  let activeLanguage = 'en';
  let activeTheme = 'dark';

  function normalizeLanguage(language) {
    return language === 'zh' || language === 'en' ? language : 'en';
  }

  function preferredTheme() {
    const stored = localStorage.getItem('caelis-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function syncThemeControl() {
    if (!themeToggle) return;
    const dict = translations[activeLanguage] || translations.en;
    const label = activeTheme === 'dark'
      ? dict.controls.switchToLight
      : dict.controls.switchToDark;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }

  function applyTheme(theme) {
    activeTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = activeTheme;
    localStorage.setItem('caelis-theme', activeTheme);
    syncThemeControl();
  }

  function setLanguageMenuOpen(open) {
    if (!languageMenu || !languageTrigger || !languageOptions) return;
    languageMenu.classList.toggle('open', open);
    languageTrigger.setAttribute('aria-expanded', String(open));
    languageOptions.hidden = !open;
  }

  function applyLanguage(language) {
    activeLanguage = normalizeLanguage(language);
    const dict = translations[activeLanguage] || translations.en;

    document.documentElement.lang = activeLanguage === 'zh' ? 'zh-CN' : 'en';
    document.title = dict.metaTitle;

    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.setAttribute('content', dict.metaDescription);
    if (ogTitle) ogTitle.setAttribute('content', dict.metaTitle);
    if (ogDescription) ogDescription.setAttribute('content', dict.metaDescription);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = getByPath(dict, element.getAttribute('data-i18n'));
      if (!value) return;
      if (value.includes('<br>') || value.includes('<code>')) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const value = getByPath(dict, element.getAttribute('data-i18n-aria'));
      if (value) element.setAttribute('aria-label', value);
    });

    if (languageCurrent) languageCurrent.textContent = languageNames[activeLanguage];
    languageOptionButtons.forEach((button) => {
      button.setAttribute(
        'aria-checked',
        String(button.getAttribute('data-language-option') === activeLanguage),
      );
    });

    localStorage.setItem('caelis-language', activeLanguage);
    syncThemeControl();
  }

  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  const initialLanguage = (
    requestedLanguage === 'zh' || requestedLanguage === 'en'
      ? requestedLanguage
      : ''
  )
    || localStorage.getItem('caelis-language')
    || (navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');

  applyTheme(preferredTheme());
  applyLanguage(initialLanguage);

  if (languageTrigger && languageOptions) {
    languageTrigger.addEventListener('click', () => {
      setLanguageMenuOpen(languageOptions.hidden);
    });
  }

  languageOptionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.getAttribute('data-language-option'));
      setLanguageMenuOpen(false);
      languageTrigger && languageTrigger.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (languageMenu && !languageMenu.contains(event.target)) {
      setLanguageMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setLanguageMenuOpen(false);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(activeTheme === 'dark' ? 'light' : 'dark');
    });
  }

  const installCommands = {
    sh: 'curl -fsSL https://caelis.dev/install.sh | sh',
    ps1: 'irm https://caelis.dev/install.ps1 | iex',
    npm: 'npm i -g @caelis/caelis',
  };
  const installTabs = document.querySelectorAll('.install-tab');
  const commandText = document.getElementById('command-text');
  const copyButton = document.getElementById('install-copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  function setInstallPlatform(platform) {
    if (!installCommands[platform]) return;
    installTabs.forEach((tab) => {
      const selected = tab.getAttribute('data-platform') === platform;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    if (commandText) commandText.textContent = installCommands[platform];
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isWindows = userAgent.includes('win');
  const powershellTab = document.querySelector('.install-tab[data-platform="ps1"]');
  if (powershellTab && !isWindows) powershellTab.hidden = true;
  setInstallPlatform(isWindows ? 'ps1' : 'sh');

  installTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setInstallPlatform(tab.getAttribute('data-platform'));
    });
  });

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    fallback.remove();
  }

  if (copyButton && commandText && copyFeedback) {
    copyButton.addEventListener('click', async () => {
      try {
        await writeClipboard(commandText.textContent.trim());
        copyButton.classList.add('copied');
        copyFeedback.classList.add('show');
        window.setTimeout(() => {
          copyButton.classList.remove('copied');
          copyFeedback.classList.remove('show');
        }, 1500);
      } catch (error) {
        console.error('Failed to copy installation command', error);
      }
    });
  }

  const demoActions = document.querySelectorAll('[data-demo-action]');
  const demoCommand = document.querySelector('[data-demo-command]');
  const demoFeedback = document.querySelector('[data-demo-feedback]');
  let demoTimer;

  demoActions.forEach((button) => {
    button.addEventListener('click', () => {
      const command = button.getAttribute('data-demo-action') || '';
      const dict = translations[activeLanguage] || translations.en;
      window.clearTimeout(demoTimer);
      if (demoCommand) demoCommand.textContent = command;
      if (demoFeedback) {
        demoFeedback.textContent = dict.demo.action.replace('{command}', command);
        demoFeedback.classList.add('active');
      }
      demoTimer = window.setTimeout(() => {
        if (demoCommand) demoCommand.textContent = '';
        if (demoFeedback) {
          demoFeedback.textContent = '';
          demoFeedback.classList.remove('active');
        }
      }, 1700);
    });
  });

  const faqDetails = document.querySelectorAll('.faq-list details');
  faqDetails.forEach((detail) => {
    const summary = detail.querySelector('summary');
    if (!summary) return;
    summary.addEventListener('click', () => {
      if (detail.open) return;
      faqDetails.forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08,
    });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('in-view'));
  }
});
