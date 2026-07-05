document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      metaTitle: 'Caelis — Open-Source Local-First AI Agent Runtime',
      metaDescription: 'Caelis is a local-first, open-source AI agent runtime. Run local agents inside secure sandboxes with Guardian auto-review and privilege escalation prompting.',
      controls: {
        languageAria: 'Select language',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
      },
      hero: {
        eyebrow: 'AI Agent Runtime',
        title: 'One workspace,<br>coordinating multiple AI Agents',
        lede: 'Connect ACP-compatible agents,<br>including Claude Code, Codex, Grok, Copilot, and more.',
      },
      cta: {
        install: 'Install Caelis',
        github: 'View on GitHub',
      },
      install: {
        curl: 'curl',
        windows: 'PowerShell',
        copied: 'Copied!',
        copyAria: 'Copy installation command',
      },
      intro: {
        kicker: 'DESIGN PHILOSOPHY',
        title: 'Unified runtime, shared agent workspace',
        body: 'Caelis connects local execution, sandboxing, tool ecosystems, and the ACP protocol, enabling different agents to collaborate in a single managed workspace rather than scattered across isolated clients.',
        f1: {
          title: 'Local-first Runtime',
          body: 'Caelis Runtime runs on your machine. Your workspace, session history, permission boundaries, and tool policies stay entirely in your control.',
        },
        f2: {
          title: 'Powered by ACP',
          body: 'Link compatible clients and agents through the open Agent Context Protocol (ACP) to share a unified workspace, context, and tool environments.',
        },
        f3: {
          title: 'Secure Execution Boundaries',
          body: 'Agents run inside sandboxed boundaries by default. Guardian automatically reviews tool executions and prompts for approval only when accessing host resources.',
        },
        f4: {
          title: 'Cross-Platform Support',
          body: 'Consistently run Caelis runtime and workspace capabilities across macOS, Linux, and Windows environments.',
        },
        f5: {
          title: 'Compatible with Existing Ecosystems',
          body: 'Support Plugins, Skills, MCP, and ACP Clients. Reuse existing developer tools instead of rebuilding your agent workflow.',
        },
        f6: {
          title: 'Open Source & Extensible',
          body: 'Licensed under Apache-2.0. Join the community to build custom runtimes, protocol adapters, plugins, and cross-platform clients.',
        },
      },
      showcase: {
        title: 'A shared agent workspace',
        tuiTitle: 'caelis - terminal session',
        msg1: 'Just run a simple command for demonstration.',
        thought1: '> The user wants me to run a simple command for demonstration. This is a straightforward request - no skills apply here. Let me just run a simple command.',
        output1: 'Hello from Caelis! 🚀 Current date: Sun Jul  5 12:20:37 CST 2026',
        thought2: '> The command ran successfully. Let me share the result with the user.',
        status2: "Command executed successfully! Here's the output:",
        output2: 'Hello from Caelis! 🚀 Current date: Sun Jul  5 12:20:37 CST 2026',
        bubble1: "The environment is working — shell commands run, return exit codes, and produce output. Let me know if you'd like to do something more interesting!",
        msg2: 'Briefly introduce yourself.',
        thought3: '> The user is sharing a "Caelis" shared dialogue context. This appears to be some kind of mu...elf briefly. I don\'t need to use any tools for this - it\'s just a conversational response.',
        status3: "Hi! I'm Claude, an AI assistant by Anthropic. I'm here to help with software engineering tasks – debugging, writing code, exploring codebases, planning features, and more.",
        bubble2: "I can see the shared context showing a successful command demo in your workspace at ~/project. What would you like to work on?",
        placeholder: "Type your message, @agent, #path/to/file, or $skill",
      },
      faq: {
        kicker: 'FAQ',
        title: 'Common questions',
        q1: {
          question: 'What is Caelis?',
          answer: 'Caelis is an open-source, local-first runtime for AI agents. It manages local workspaces, session context, tool execution, and permission boundaries, and can connect compatible agents and clients via ACP.',
        },
        q2: {
          question: 'Can Caelis run independently?',
          answer: 'Yes. Caelis includes a built-in local Agent Runtime and does not require third-party clients to execute command tasks via TUI or Headless CLI.',
        },
        q3: {
          question: 'Is ACP mandatory?',
          answer: 'No. Caelis runs local agents independently out of the box. ACP is primarily used to connect compatible external agents, editors, or clients to share a unified workspace and context.',
        },
        q4: {
          question: 'Why not just use Claude Code, Codex, or OpenCode directly?',
          answer: 'Claude Code, Codex, and OpenCode are excellent agents. Caelis focuses on the runtime layer: managing workspaces, context sharing, sandbox isolation, permission prompts, and multi-agent coordination. Instead of replacing any specific agent, Caelis enables them to collaborate in a single secure environment.',
        },
        q5: {
          question: 'Does it support existing Plugins, Skills, and MCP ecosystems?',
          answer: 'Yes. Caelis reuses community capabilities rather than inventing closed ecosystems. You can connect MCP servers, call Skills, and utilize existing plugin marketplaces or tool extensions to migrate your workflows with low friction.',
        },
        q6: {
          question: 'Is my data kept locally?',
          answer: 'Yes. Caelis is local-first. Your local workspaces, session transcripts, execution histories, and runtime configurations are stored on your machine. External model APIs are called only during inference depending on your model choices.',
        },
        q7: {
          question: 'How does Caelis ensure secure agent execution?',
          answer: 'Caelis runs agents in sandboxed environments by default and uses Guardian for automated tool review. Low-risk operations execute automatically, while actions requiring host access or exceeding sandbox boundaries trigger privilege prompts. Developers can also toggle optional manual approval workflows.',
        },
        q8: {
          question: 'Does it support Windows, macOS, and Linux?',
          answer: 'Yes. Caelis supports macOS, Linux, and Windows. Depending on your platform, you can install Caelis via shell script, PowerShell, or global npm package.',
        },
        q9: {
          question: 'Is Caelis open source?',
          answer: 'Yes. Caelis is open source and licensed under the Apache-2.0 License. Code is hosted on GitHub, and we welcome issue reports, pull requests, and ecosystem contributions.',
        },
        q10: {
          question: 'Is a native GUI planned?',
          answer: 'Yes. Caelis currently supports TUI, Headless CLI, and ACP Runtime. Native GUI is on our active roadmap and will connect as a new interface to the same local runtime, rather than being a separate product.',
        },
      },
      footer: {
        text: 'Caelis is a local-first AI agent runtime licensed under the Apache-2.0 License. Check the codebase on',
      },
    },
    zh: {
      metaTitle: 'Caelis — 开源、本地优先的 AI Agent Runtime',
      metaDescription: 'Caelis 是一个开源、本地优先 of AI Agent Runtime。它在沙箱与 Guardian 自动审查的保护下，让 Agent 更安全地执行开发任务。',
      controls: {
        languageAria: '选择语言',
        switchToLight: '切换到浅色主题',
        switchToDark: '切换到深色主题',
      },
      hero: {
        eyebrow: 'AI Agent Runtime',
        title: '一个工作空间<br>协同多个 AI Agent',
        lede: '支持连接兼容 ACP 协议的 Agent，<br>包括 Claude Code, Codex, Grok, Copilot 等。',
      },
      cta: {
        install: '安装 Caelis',
        github: '在 GitHub 查看',
      },
      install: {
        curl: 'curl',
        windows: 'PowerShell',
        copied: '已复制',
        copyAria: '复制安装命令',
      },
      intro: {
        kicker: '核心设计理念',
        title: '统一运行时，共享 Agent 工作空间',
        body: 'Caelis 将本地运行、沙箱安全、工具生态与 ACP 协议连接在一起，让不同 Agent 在同一个受控工作空间中协同，而不是分散在孤立的客户端里。',
        f1: {
          title: '本地优先运行时',
          body: 'Runtime 运行在你的机器上。工作空间、会话记录、权限边界与工具策略默认由本地掌控。',
        },
        f2: {
          title: 'Powered by ACP',
          body: '连接兼容 ACP 的客户端与 Agent，共享同一个工作空间、上下文和工具环境。',
        },
        f3: {
          title: '安全执行边界',
          body: 'Agent 默认运行在 sandbox 中。Caelis 通过 Guardian 自动审查工具调用，并在需要访问宿主机或突破默认权限边界时触发审批。',
        },
        f4: {
          title: '跨平台支持',
          body: 'Caelis 面向 macOS、Linux 和 Windows 构建，让同一套运行时与工作空间能力在不同开发环境中保持一致。',
        },
        f5: {
          title: '兼容社区工具生态',
          body: '支持 Plugins、Skills、MCP 与 ACP Clients，尽量复用社区已有工具，而不是要求你重建一套 Agent 工作流。',
        },
        f6: {
          title: '开源与社区驱动',
          body: 'Caelis 基于 Apache-2.0 License 开源，欢迎开发者参与 Runtime、协议适配、插件生态与跨平台能力建设。',
        },
      },
      showcase: {
        title: '共享的 Agent 工作空间',
        tuiTitle: 'caelis - 终端会话',
        msg1: '运行一个简单的命令进行演示。',
        thought1: '> 用户希望我运行一个简单的命令进行演示。这是一个直接的请求 - 这里不需要应用特定 Skill。让它直接运行命令。',
        output1: 'Hello from Caelis! 🚀 Current date: Sun Jul  5 12:20:37 CST 2026',
        thought2: '> 命令运行成功。让它与用户共享结果。',
        status2: '命令执行成功！输出如下：',
        output2: 'Hello from Caelis! 🚀 Current date: Sun Jul  5 12:20:37 CST 2026',
        bubble1: '环境工作正常 — Shell 命令已运行，返回退出码并生成输出。如果您想做点更有趣的事，请告诉我！',
        msg2: '简要介绍一下你自己。',
        thought3: '> 用户正在共享 "Caelis" 会话上下文。这看起来像是一个共享对话……我不需要使用任何工具进行响应。',
        status3: '你好！我是 Claude，Anthropic 开发的 AI 助手。我在这里协助您完成软件工程任务——调试、编写代码、分析代码库、规划功能等。',
        bubble2: '我可以看到共享上下文中显示了在您的工作空间 ~/project 下的成功命令演示。您想开展什么工作？',
        placeholder: '输入您的消息、@agent、#文件路径 或 $skill',
      },
      faq: {
        kicker: 'FAQ',
        title: '常见问题',
        q1: {
          question: 'Caelis 是什么？',
          answer: 'Caelis 是一个开源、本地优先的 AI Agent Runtime。它负责管理本地工作空间、会话上下文、工具执行、权限边界，并可以通过 ACP 连接兼容的 Agent 与客户端。',
        },
        q2: {
          question: '可以独立运行吗？',
          answer: '可以。Caelis 内置本地 Agent Runtime，无需第三方客户端即可通过 TUI 或 Headless CLI 运行任务。',
        },
        q3: {
          question: 'ACP 是必须的吗？',
          answer: '不是。Caelis 可以独立运行本地 Agent。ACP 主要用于连接兼容的 Agent、客户端或编辑器，让它们共享同一个工作空间和上下文。',
        },
        q4: {
          question: '为什么不是直接使用 Claude Code、Codex 或 OpenCode？',
          answer: 'Claude Code、Codex 和 OpenCode 都是优秀的 Agent。Caelis 关注的是运行时层：本地工作空间、上下文共享、工具执行、权限边界、sandbox 与多 Agent 协同。它不是替代某一个 Agent，而是让不同 Agent 可以在同一个受控工作空间里协作。',
        },
        q5: {
          question: '支持 Plugins、Skills 和 MCP 生态吗？',
          answer: '支持。Caelis 尽量复用社区已有能力，而不是重新发明封闭生态。你可以接入 MCP 服务，使用 Skills，并兼容社区已有的 Plugin 市场与工具扩展。',
        },
        q6: {
          question: '数据是否保留在本地？',
          answer: '是。Caelis 遵循本地优先原则。工作空间、会话记录、执行历史 and 运行时配置默认保留在你的本地机器上。',
        },
        q7: {
          question: 'Agent 执行是否安全？',
          answer: 'Caelis 默认将 Agent 运行在 sandbox 内，并通过 Guardian / auto-review 对工具调用进行自动审查。低风险操作可以在受控边界内自动执行；当操作需要访问宿主机资源、突破默认权限边界或执行高风险命令时，才触发提权审批。开发者也可以选择手动审批模式。',
        },
        q8: {
          question: '是否支持 Windows、macOS 和 Linux？',
          answer: '支持。Caelis 面向 macOS、Linux 和 Windows 构建，安装方式可根据平台选择 shell 脚本、PowerShell 或 npm。',
        },
        q9: {
          question: '是否开源？',
          answer: '是。Caelis 基于 Apache-2.0 License 开源，代码托管在 GitHub，欢迎提交 Issue、PR 或参与生态建设。',
        },
        q10: {
          question: 'GUI 是否在规划中？',
          answer: '是。Caelis 当前支持 TUI、Headless CLI 和 ACP Runtime. Native GUI 已在规划中，未来会作为新的交互界面接入同一套本地运行时，而不是另起一套产品。',
        },
      },
      footer: {
        text: 'Caelis 是基于 Apache-2.0 License 开源的本地优先 AI Agent Runtime，代码托管在 GitHub。',
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

  // --- HTML data-i18n attributes translation mapper ---
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
        if (value.includes('<br>') || value.includes('<br/>')) {
          element.innerHTML = value;
        } else {
          element.textContent = value;
        }
        element.removeAttribute('data-text'); // 切换语言时清除打字机缓存
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

  // --- 1. Header Scroll Shrink Fallback ---
  if (!CSS.supports || !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
    const checkScroll = () => {
      if (window.scrollY > 40) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // --- 2. Tabs Switch and Double-SVG Copy Interaction ---
  const tabs = document.querySelectorAll('.tab-btn');
  const commandText = document.getElementById('command-text');
  const copyBtn = document.getElementById('install-copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  const getOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) return 'windows';
    if (userAgent.includes('mac')) return 'macos';
    if (userAgent.includes('linux')) return 'linux';
    return 'other';
  };

  const os = getOS();
  const shTab = document.querySelector('.tab-btn[data-platform="sh"]');
  const ps1Tab = document.querySelector('.tab-btn[data-platform="ps1"]');

  if (os === 'windows') {
    // Windows 用户展示全部三个：PowerShell, curl, npm
    // 默认高亮激活 PowerShell Tab
    if (ps1Tab) {
      tabs.forEach(t => t.classList.remove('active'));
      ps1Tab.classList.add('active');
      if (commandText) {
        commandText.textContent = 'irm https://caelis.dev/install.ps1 | iex';
      }
    }
  } else {
    // macOS / Linux 用户展示：curl 和 npm，隐藏 PowerShell Tab
    if (ps1Tab) {
      ps1Tab.style.display = 'none';
    }
    // 默认高亮激活 curl Tab
    if (shTab) {
      tabs.forEach(t => t.classList.remove('active'));
      shTab.classList.add('active');
      if (commandText) {
        commandText.textContent = 'curl -fsSL https://caelis.dev/install.sh | sh';
      }
    }
  }

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

  if (copyBtn && commandText && copyFeedback) {
    copyBtn.addEventListener('click', () => {
      const text = commandText.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        copyFeedback.classList.add('show');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyFeedback.classList.remove('show');
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy command: ', err);
      });
    });
  }

  // --- 3. FAQ Accordion Exclusion Logic ---
  const faqDetails = document.querySelectorAll('.faq-list details');
  faqDetails.forEach(detail => {
    const summary = detail.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', () => {
        if (!detail.open) {
          faqDetails.forEach(otherDetail => {
            if (otherDetail !== detail && otherDetail.open) {
              otherDetail.removeAttribute('open');
            }
          });
        }
      });
    }
  });

  // --- 4. Scroll Enter View Animation via IntersectionObserver ---
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.intro-item, .terminal-mockup');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: immediately visible
    document.querySelectorAll('.intro-item, .terminal-mockup').forEach(el => {
      el.classList.add('in-view');
    });
  }

  // --- 5. TUI Mockup Dynamic CLI Typing Animation Engine ---
  let tuiAnimationTimer = null;
  let activeTuiTimers = [];

  function clearActiveTuiTimers() {
    activeTuiTimers.forEach(item => {
      if (item && typeof item.clear === 'function') {
        item.clear();
      }
    });
    activeTuiTimers = [];
  }

  function typeWriter(element, callback) {
    const fullText = element.getAttribute('data-text') || element.textContent;
    if (!element.getAttribute('data-text')) {
      element.setAttribute('data-text', fullText);
    }
    element.textContent = '';
    element.classList.add('typing');
    element.classList.add('visible');

    let i = 0;
    const speed = 25; // 调整打字机字符输出速度为 25ms 保持节奏
    const timer = setInterval(() => {
      if (i < fullText.length) {
        element.textContent += fullText.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.classList.remove('typing');
        if (callback) callback();
      }
    }, speed);

    activeTuiTimers.push({
      clear: () => clearInterval(timer)
    });
  }

  // --- Animation fade in ---
  function fadeIn(element, delay, callback) {
    const t = setTimeout(() => {
      element.classList.add('visible');
      if (callback) callback();
    }, delay);
    activeTuiTimers.push({
      clear: () => clearTimeout(t)
    });
  }

  function playTuiAnimation() {
    clearActiveTuiTimers();
    clearTimeout(tuiAnimationTimer);

    const items = document.querySelectorAll('.tui-anim-item');
    items.forEach(item => {
      item.classList.remove('visible');
      const target = item.querySelector('.tui-type-target');
      if (target) {
        target.classList.remove('visible', 'typing');
        const origin = target.getAttribute('data-text');
        if (origin) {
          target.textContent = origin;
        }
      }
    });

    const userMsg1 = document.querySelector('.tui-msg-1');
    const target1 = userMsg1 ? userMsg1.querySelector('.tui-type-target') : null;

    if (!userMsg1 || !target1) return;

    const startT = setTimeout(() => {
      userMsg1.classList.add('visible');
      typeWriter(target1, () => {
        const agentBlock1 = document.querySelector('.tui-agent-1');
        fadeIn(agentBlock1, 300, () => {
          const agentBlock2 = document.querySelector('.tui-agent-2');
          fadeIn(agentBlock2, 600, () => {
            const userMsg2 = document.querySelector('.tui-msg-2');
            const target2 = userMsg2 ? userMsg2.querySelector('.tui-type-target') : null;
            
            if (userMsg2 && target2) {
              const userT = setTimeout(() => {
                userMsg2.classList.add('visible');
                typeWriter(target2, () => {
                  const agentBlock3 = document.querySelector('.tui-agent-3');
                  fadeIn(agentBlock3, 300, () => {
                    // 6.5s 之后重启轮播
                    tuiAnimationTimer = setTimeout(playTuiAnimation, 6500);
                  });
                });
              }, 400);
              activeTuiTimers.push({ clear: () => clearTimeout(userT) });
            }
          });
        });
      });
    }, 800);
    activeTuiTimers.push({ clear: () => clearTimeout(startT) });
  }

  // 利用 IntersectionObserver 使得终端模拟器只在滚动进入视口时才启动，提升体验并保护主线程
  if ('IntersectionObserver' in window) {
    const tuiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playTuiAnimation();
          tuiObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const tuiWin = document.querySelector('.tui-window');
    if (tuiWin) {
      tuiObserver.observe(tuiWin);
    }
  } else {
    playTuiAnimation();
  }
});
