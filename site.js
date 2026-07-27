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
        caption: 'Connect a model or agent, resume a session, or start typing.',
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
          body: 'Connect a model provider or local ACP agent and choose the backend that fits the task without changing how you work.',
        },
        delegate: {
          title: 'Bind clear specialist roles',
          body: 'Use Breeze for quick bounded tasks, Orbit for implementation, and Zenith for deep or high-risk analysis.',
        },
        review: {
          title: 'Keep execution guarded',
          body: 'Guardian reviews tool access; Reviewer inspects the result. Sandbox boundaries and approval prompts stay part of the same session.',
        },
      },
      surfaces: {
        eyebrow: 'ONE RUNTIME, THREE SURFACES',
        title: 'Stay interactive. Script it. Embed it.',
        tui: 'Start with <code>caelis</code> for an interactive workspace that connects agents, handles approvals, and manages sessions.',
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
        title: '多个 Agent<br>一个本地 Runtime',
        lede: '连接模型服务与 ACP Agent，绑定各有所长的角色，让每个 Turn 都在同一个受控、可恢复的工作空间中运行。',
        install: '安装 Caelis',
        github: '查看源码',
        caption: '连接模型或 Agent，恢复 Session，或直接开始输入。',
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
        title: '连接合适的 Agent<br>协作并完成审查',
        body: 'Caelis 把模型、本地 Agent 与工具组合成一条边界清晰的终端工作流。',
        connect: {
          title: '选择真正合适的后端',
          body: '连接模型服务或本地 ACP Agent，为不同任务选择合适后端，工作方式保持一致。',
        },
        delegate: {
          title: '绑定职责明确的专家角色',
          body: 'Breeze 处理快速、边界明确的任务，Orbit 负责常规实现，Zenith 承担深度或高风险分析。',
        },
        review: {
          title: '让执行始终处于保护之中',
          body: 'Guardian 审查工具访问，Reviewer 检查结果；Sandbox 边界与提权审批始终留在同一个 Session 内。',
        },
      },
      surfaces: {
        eyebrow: '一个 RUNTIME，三种入口',
        title: '从终端到自动化<br>使用同一个 Runtime',
        tui: '直接运行 <code>caelis</code>，进入交互式工作空间，连接 Agent、处理审批并管理 Session。',
        headless: '使用 <code>caelis -p</code> 运行一次性 Prompt，并以文本或 JSON 输出接入脚本和自动化。',
        acp: '运行 <code>caelis acp</code>，把同一个 Runtime 暴露给兼容的编辑器与外部 Agent 客户端。',
      },
      ecosystem: {
        eyebrow: '带上你的现有技术栈',
        title: '模型、工具与协议<br>保持开放',
        body: '从订阅登录到本地模型，从 ACP、MCP 到 Skills 与 Plugins，都能接入同一个工作空间。',
      },
      trust: {
        eyebrow: '默认本地优先',
        title: '工作空间<br>始终属于你',
        body: 'Session、执行历史、配置与工作空间上下文保存在本机。原生 Sandbox 后端约束工具，Guardian 与显式审批处理越过边界的操作。',
        fact1: 'Session 本地持久化',
        fact2: '原生 Sandbox 后端',
        fact3: '具备审批语义的执行',
        fact4: '开源 Runtime',
      },
      faq: {
        title: '简短回答',
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
        title: '一条命令<br>启动 Caelis',
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
