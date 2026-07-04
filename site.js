document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      metaTitle: 'Caelis — ACP Agent Workspace',
      metaDescription: 'Caelis includes a full Agent Runtime, orchestrates ACP agents in shared terminal sessions, and exposes caelis acp for ACP clients such as Zed.',
      controls: {
        languageAria: 'Select language',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      hero: {
        eyebrow: 'ACP agent workspace',
        title: 'Connect every ACP agent in one terminal session.',
        lede: 'Built on its own Agent Runtime, Caelis coordinates ACP-compatible agents in one shared terminal session and can run as a caelis acp server for clients such as Zed.',
      },
      cta: {
        install: 'Install Caelis',
        github: 'View on GitHub',
      },
      install: {
        macos: 'macOS / Linux',
        windows: 'Windows (PowerShell)',
        copied: 'Copied!',
        copyAria: 'Copy installation command',
      },
      intro: {
        kicker: 'Why Caelis',
        title: 'Use each agent where it is strongest. Keep the session together.',
        body: 'Caelis treats ACP as the bridge between agent clients instead of locking work into one assistant UI.',
        fusion: {
          title: 'ACP fusion',
          body: 'Connect ACP-compatible agents through a shared session so Claude Code, Codex, Copilot, Grok, OpenCode, and future peers can hand work across the same context.',
        },
        surface: {
          title: 'One control surface',
          body: 'Drive the workspace from the TUI, a headless one-shot CLI, or expose it through caelis acp to ACP clients such as Zed.',
        },
        review: {
          title: 'Delegation with review',
          body: 'Ask one agent to implement, another to inspect, and keep decisions, command output, and approval traces attached to the session.',
        },
        runtime: {
          title: 'Full Agent Runtime',
          body: 'Caelis is not just an ACP TUI shell. It includes a reusable Agent Runtime for sessions, tools, sandboxing, permissions, and future memory or GUI surfaces.',
        },
      },
      showcase: {
        title: 'A shared agent workspace',
        sessionTitle: 'ACP session',
        sessionLine1: '# Open one workspace for connected agents',
        sessionLine2: 'ACP peers: Claude Code, Codex, Copilot, Grok, OpenCode',
        sessionLine3: 'Shared transcript and command context are ready.',
        sessionLine4: 'Delegate, compare, and review without leaving the session.',
        clientTitle: 'ACP client bridge',
        clientLine1: '# Expose Caelis to ACP-compatible clients',
        clientLine2: 'Listening on stdio for Zed or another ACP client.',
        clientLine3: 'Reuse Caelis runtime, tools, sandbox, and session context.',
        clientLine4: 'Client bridge is ready.',
      },
      faq: {
        kicker: 'FAQ',
        title: 'Common questions',
        what: {
          question: 'What is Caelis?',
          answer: 'Caelis is an ACP-native terminal workspace backed by its own Agent Runtime for coordinating multiple coding agents in one shared session.',
        },
        runtime: {
          question: 'Is Caelis only an ACP TUI shell?',
          answer: 'No. Caelis includes a full Agent Runtime with session orchestration, tools, sandbox-aware execution, permissions, and reusable runtime boundaries.',
        },
        replace: {
          question: 'Does it replace Claude Code, Codex, Copilot, Grok, or OpenCode?',
          answer: 'No. Caelis is designed to connect ACP-compatible agents and let them collaborate through shared context, delegation, and review.',
        },
        acp: {
          question: 'What role does ACP play?',
          answer: 'ACP is the connection layer Caelis uses to normalize agent sessions, messages, command context, and future external-agent bridges.',
        },
        clients: {
          question: 'Can I use Caelis from ACP clients such as Zed?',
          answer: 'Yes. Caelis can run caelis acp so ACP-compatible clients can use the Caelis runtime and session layer from their own interface.',
        },
        install: {
          question: 'How do I install it?',
          answer: 'Use the install command above for macOS, Linux, or Windows, or install the scoped npm package when you prefer a Node-based workflow.',
        },
        early: {
          question: 'Is Caelis stable yet?',
          answer: 'Caelis is still early. The project favors clean ACP boundaries, reusable runtime pieces, and fast iteration before a v1.0 contract.',
        },
      },
      footer: {
        text: 'Caelis is open source, licensed under Apache-2.0. Check the codebase on',
      },
    },
    zh: {
      metaTitle: 'Caelis — ACP Agent 工作空间',
      metaDescription: 'Caelis 自带完整 Agent Runtime，可编排共享终端会话中的 ACP Agent，也可通过 caelis acp 接入 Zed 等 ACP 客户端。',
      controls: {
        languageAria: '选择语言',
        switchToLight: '切换到浅色主题',
        switchToDark: '切换到深色主题',
      },
      hero: {
        eyebrow: 'ACP Agent 工作空间',
        title: '把多个 ACP Agent 接进同一个终端会话。',
        lede: 'Caelis 自带 Agent Runtime，可在同一个终端会话中协调兼容 ACP 的 Agent，也可以作为 caelis acp server 接入 Zed 等 ACP 客户端。',
      },
      cta: {
        install: '安装 Caelis',
        github: '在 GitHub 查看',
      },
      install: {
        macos: 'macOS / Linux',
        windows: 'Windows (PowerShell)',
        copied: '已复制',
        copyAria: '复制安装命令',
      },
      intro: {
        kicker: '为什么是 Caelis',
        title: '让每个 Agent 做擅长的事，同时保留同一个会话。',
        body: 'Caelis 把 ACP 当作 Agent 客户端之间的桥，而不是把工作锁进某一个助手界面。',
        fusion: {
          title: 'ACP 融合',
          body: '通过共享会话连接兼容 ACP 的 Agent，让 Claude Code、Codex、Copilot、Grok、OpenCode 以及未来更多 peer 能在同一上下文中交接工作。',
        },
        surface: {
          title: '统一控制面',
          body: '可以从交互式 TUI、headless one-shot CLI 驱动工作空间，也可以通过 caelis acp 暴露给 Zed 等 ACP 客户端使用。',
        },
        review: {
          title: '委派与交叉审查',
          body: '让一个 Agent 负责实现，另一个 Agent 负责检查，并把决策、命令输出和审批痕迹都附着在会话里。',
        },
        runtime: {
          title: '完整 Agent Runtime',
          body: 'Caelis 不只是 ACP TUI 外壳。它自带可复用的 Agent Runtime，覆盖会话、工具、sandbox、权限以及未来的 memory 或 GUI surface。',
        },
      },
      showcase: {
        title: '共享的 Agent 工作空间',
        sessionTitle: 'ACP 会话',
        sessionLine1: '# 为已连接的 agent 打开同一个工作空间',
        sessionLine2: 'ACP peers: Claude Code, Codex, Copilot, Grok, OpenCode',
        sessionLine3: '共享 transcript 与命令上下文已就绪。',
        sessionLine4: '在同一个会话中委派、对比与审查。',
        clientTitle: 'ACP 客户端桥接',
        clientLine1: '# 将 Caelis 暴露给兼容 ACP 的客户端',
        clientLine2: '通过 stdio 等待 Zed 或其他 ACP 客户端连接。',
        clientLine3: '复用 Caelis runtime、tools、sandbox 和会话上下文。',
        clientLine4: '客户端桥接已就绪。',
      },
      faq: {
        kicker: 'FAQ',
        title: '常见问题',
        what: {
          question: 'Caelis 是什么？',
          answer: 'Caelis 是 ACP 原生的终端工作空间，自带 Agent Runtime，用来在同一个共享会话中协调多个编程 Agent。',
        },
        runtime: {
          question: 'Caelis 只是 ACP TUI 外壳吗？',
          answer: '不是。Caelis 包含完整 Agent Runtime，负责会话编排、工具、sandbox-aware 执行、权限和可复用运行时边界。',
        },
        replace: {
          question: '它会替代 Claude Code、Codex、Copilot、Grok 或 OpenCode 吗？',
          answer: '不会。Caelis 的定位是连接兼容 ACP 的 Agent，让它们通过共享上下文、委派和审查协同工作。',
        },
        acp: {
          question: 'ACP 在 Caelis 中承担什么角色？',
          answer: 'ACP 是 Caelis 的连接层，用来规范 Agent 会话、消息、命令上下文以及未来外部 Agent 桥接。',
        },
        clients: {
          question: '可以在 Zed 这类 ACP 客户端里使用 Caelis 吗？',
          answer: '可以。Caelis 能运行 caelis acp，让兼容 ACP 的客户端从自己的界面使用 Caelis runtime 和会话层。',
        },
        install: {
          question: '如何安装？',
          answer: '可以使用上面的 macOS、Linux 或 Windows 安装命令；如果偏好 Node 工作流，也可以安装 scoped npm package。',
        },
        early: {
          question: 'Caelis 现在稳定了吗？',
          answer: 'Caelis 还处在早期阶段。项目会在 v1.0 合约前优先打磨清晰的 ACP 边界、可复用运行时组件和快速迭代。',
        },
      },
      footer: {
        text: 'Caelis 是 Apache-2.0 许可的开源项目，代码托管在',
      },
    },
  };

  const getByPath = (source, path) => path.split('.').reduce((value, key) => value && value[key], source);
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageTrigger = document.querySelector('[data-language-trigger]');
  const languageOptions = document.querySelector('[data-language-options]');
  const languageCurrent = document.querySelector('[data-language-current]');
  const languageOptionButtons = document.querySelectorAll('[data-language-option]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const languageNames = {
    en: 'English',
    zh: '中文',
  };
  let activeLanguage = 'en';
  let activeTheme = 'dark';

  function normalizeLanguage(language) {
    return language === 'zh' || language === 'en' ? language : 'en';
  }

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem('caelis-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function syncThemeControl() {
    if (!themeToggle) {
      return;
    }
    const dict = translations[activeLanguage] || translations.en;
    const label = activeTheme === 'dark' ? dict.controls.switchToLight : dict.controls.switchToDark;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }

  function applyTheme(theme) {
    activeTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = activeTheme;
    localStorage.setItem('caelis-theme', activeTheme);
    syncThemeControl();
  }

  function setLanguageMenuOpen(isOpen) {
    if (!languageMenu || !languageTrigger || !languageOptions) {
      return;
    }
    languageMenu.classList.toggle('open', isOpen);
    languageTrigger.setAttribute('aria-expanded', String(isOpen));
    languageOptions.hidden = !isOpen;
  }

  function applyLanguage(language) {
    activeLanguage = normalizeLanguage(language);
    const dict = translations[activeLanguage] || translations.en;
    document.documentElement.lang = activeLanguage === 'zh' ? 'zh-CN' : 'en';
    document.title = dict.metaTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', dict.metaDescription);
    }
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = getByPath(dict, element.getAttribute('data-i18n'));
      if (value) {
        element.textContent = value;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const value = getByPath(dict, element.getAttribute('data-i18n-aria'));
      if (value) {
        element.setAttribute('aria-label', value);
      }
    });
    if (languageCurrent) {
      languageCurrent.textContent = languageNames[activeLanguage];
    }
    languageOptionButtons.forEach((button) => {
      const isActive = button.getAttribute('data-language-option') === activeLanguage;
      button.setAttribute('aria-checked', String(isActive));
    });
    localStorage.setItem('caelis-language', activeLanguage);
    syncThemeControl();
  }

  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  const preferredLanguage = (requestedLanguage === 'zh' || requestedLanguage === 'en' ? requestedLanguage : '')
    || localStorage.getItem('caelis-language')
    || (navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
  applyTheme(getPreferredTheme());
  applyLanguage(preferredLanguage);

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
      languageTrigger && languageTrigger.focus();
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(activeTheme === 'dark' ? 'light' : 'dark');
    });
  }

  const tabs = document.querySelectorAll('.tab-btn');
  const commandText = document.getElementById('command-text');
  const copyBtn = document.querySelector('.copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  // Handle Tab Switch
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      tabs.forEach(t => t.classList.remove('active'));
      event.currentTarget.classList.add('active');

      const platform = event.currentTarget.getAttribute('data-platform');
      let command = '';
      if (platform === 'sh') {
        command = 'curl -fsSL https://caelis.dev/install.sh | sh';
      } else if (platform === 'ps1') {
        command = 'irm https://caelis.dev/install.ps1 | iex';
      } else if (platform === 'npm') {
        command = 'npm i -g @caelis/caelis';
      }
      if (commandText) {
        commandText.textContent = command;
      }
    });
  });

  // Handle Clipboard Copy
  if (copyBtn && commandText && copyFeedback) {
    copyBtn.addEventListener('click', () => {
      const text = commandText.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyFeedback.classList.add('show');
        setTimeout(() => {
          copyFeedback.classList.remove('show');
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy command: ', err);
      });
    });
  }
});
