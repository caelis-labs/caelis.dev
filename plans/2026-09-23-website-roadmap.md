# Caelis Labs 官网与文档站改版规划

日期：2026-09-23。性质：规划，不是实现完成记录。

已确认：以 **Caelis Labs 为项目总入口**，首页重点展示 Caelis；只展示五个公开项目；重新设计品牌 Logo，并覆盖 Twitter/X 分享卡片。

已确认的宣传顺序：**Caelis → Caelis Bot → ACP Go SDK → Memory → Caelis App**。首页、项目目录、项目导航、文档项目切换器与品牌应用预览均采用此顺序；不按名称、仓库更新时间或类别重新排序。

## 1. 这次改版要解决什么

访客进入首页后，应能迅速回答：Caelis Labs 做什么、哪个项目适合自己、如何开始，以及去哪里找到可靠文档。

建议定位文案：

> **为智能体协作，构建开放工具。**
> 从协作工作空间、桌面应用到记忆与协议 SDK，选择适合你的工具，开始使用或构建。

英文工作稿：**Open tools for agents that work together.**

这只是文案方向，后续随视觉稿一起定稿。现有“群星各循其轨”的意象可以保留在品牌细节中，首屏则先说明产品价值。

### 已核对的现状

- 当前网站是原生 HTML/CSS/JS 静态单页，仓库配置面向 Cloudflare Pages。
- 页头、页尾通过 SVG 的 `<image>` 引用 `assets/logo.png`，PNG 为 **850,896 bytes（约 831 KiB）**。
- `icon.svg` 为 **1,135,068 bytes（约 1.08 MiB）**，其中嵌入了 Base64 PNG；扩展名为 SVG 并没有消除位图负担。
- 页面已有部分 Open Graph 文本标签，但没有 `og:image`，也没有 Twitter 卡片标签。
- `/docs` 目前重定向至 Caelis 的 GitHub README；导航没有项目目录入口。
- 中英文依靠浏览器 JavaScript 替换，同一 URL 没有独立的语言版本与分享元数据。
- 首页演示视频约 4.3 MB、封面约 530 KB。现有可见性播放和减少动态效果处理可复用，但仍应把媒体请求与首屏资源预算分开。

这些是文件和页面检查结果；没有实测网络瀑布或 Core Web Vitals，因此不把文件大小直接等同于用户实测加载时间。

## 2. 项目目录与品牌关系

仓库及发布状态来自 2026-09-23 的 GitHub API 查询，实施时再次核对。非预发布 Release 不等于完整产品质量认证。

| 项目 | 一句话定位 | 当前公开状态 | 主操作 |
| --- | --- | --- | --- |
| [Caelis](https://github.com/caelis-labs/caelis) | 本地 AI 智能体协作工作空间 | 已有正式 Release，查询时为 v0.60.1 | 开始使用 / 安装 |
| [Caelis Bot](https://github.com/caelis-labs/caelis-bot) | 可交流、可协助工作的桌面伙伴 | v0.1.0-preview.1；macOS Apple Silicon 预览 | 试用预览版 / 安装指南 |
| [ACP Go SDK](https://github.com/caelis-labs/acp-go-sdk) | 用 Go 构建 ACP Agent 和 Client | 已有正式 Release，查询时为 v1.4.0 | 快速开始 / API |
| [Memory](https://github.com/caelis-labs/memory) | 可独立嵌入 Agent Host 的 Go 记忆模块 | 已有正式 Release，查询时为 v0.6.1 | 集成指南 / API |
| [Caelis App](https://github.com/caelis-labs/caelis-app) | 面向 ACP Agent 的桌面工作台 | README 标记 early beta；查询时没有公开 Release | 查看项目 / 开发入门 |

首页按已确认的宣传顺序呈现，Caelis 放在最突出的介绍位置，五个项目都能从首页直接进入详情。项目可标注 **应用**（Caelis、Bot、App）或 **开发组件**（ACP Go SDK、Memory），但不拆成改变宣传顺序的两组。布局层级依次为 Caelis 重点介绍、Bot 第二推荐、ACP Go SDK 与 Memory 开发组件、Caelis App 早期项目。

品牌层级采用“Caelis Labs → 项目名”：共享标志、排版和基础色；项目用名称、用途、少量辅助色区分。Bot 角色形象用于 Bot 产品展示，不承担整个 Labs 的导航 Logo。

必须保持准确的内容边界：

- Caelis Bot 桌面应用与 `caelis bot` 命令分别说明，不合并成一个安装入口。
- Bot 公开预览的运行时条件按公开 README 描述，不能把本地开发中的 Caelis 适配器写成已发布能力。
- Memory 目前面向嵌入式 Go 集成，不设置让用户误以为存在成熟独立服务的“一键部署”按钮。
- ACP Go SDK 保持独立、产品中立，并明确其为社区 SDK。
- Caelis App 的页面应展示实际成熟度和开发入口，不放无效的下载按钮。
- 五个项目之外的私有资产库、历史副本和本地归档不进入公开目录。

## 3. 网站结构

建议继续使用 `caelis.dev`，文档先放同域 `/docs/`。这能共用导航、品牌、发布流程和链接规则；未来若需独立部署，再为 `docs.caelis.dev` 做明确迁移。

| 路径 | 作用 |
| --- | --- |
| `/` | Caelis Labs 首页 |
| `/projects/` | 五个项目的完整目录 |
| `/projects/caelis/` | Caelis 产品、演示与安装 |
| `/projects/caelis-bot/` | Bot 产品与预览安装入口 |
| `/projects/acp-go-sdk/` | SDK 用途与入门入口 |
| `/projects/memory/` | Memory 用途与集成入口 |
| `/projects/caelis-app/` | App 定位、当前能力与开发入口 |
| `/docs/` | 文档总入口与项目选择 |
| `/docs/<project>/...` | 项目使用指南与参考资料 |
| `/zh-cn/...` | 对应的简体中文页面，包括 `/zh-cn/docs/...` |

英文默认无语言前缀，中文使用 `/zh-cn/`。URL 决定内容语言，浏览器语言只用于提示切换；保留手动选择，不用 JavaScript 改写同一个 URL 的整页内容。

顶部导航：**项目 · 文档 · GitHub · 语言 · 主题**。GitHub 指向组织；具体项目页面提供自己的仓库与 Releases 链接。第一版不增加缺少维护内容的博客或新闻栏目。

### 首页内容顺序

1. **首屏**：Caelis Labs、清晰定位、两个主要动作“探索项目”“阅读文档”。高度适度收紧，让访客能感知下一段内容。
2. **Caelis 重点介绍**：一句具体价值、产品截图或演示封面、“开始使用”。现有完整演示转到 Caelis 项目页，首页点击或接近可视区域再加载。
3. **全部项目**：严格依次为 Caelis、Caelis Bot、ACP Go SDK、Memory、Caelis App；每项包含用途、类别、成熟度、平台或语言、详情与文档入口。五个项目暂不需要复杂过滤器，桌面与手机阅读顺序一致。
4. **按目标开始**：终端协作、桌面伙伴、构建 ACP 集成、给 Agent 加入记忆；链接到对应入门页。
5. **页尾**：组织、源码、文档、贡献与品牌资源入口；按项目说明代码和资产许可证，不把所有角色资产统称为 Apache-2.0。

项目页统一结构：定位 → 适用场景 → 真实界面或可运行示例 → 当前能力 → 安装/集成 → 文档与源码。下载条件、预览状态等信息放在操作附近。

## 4. 文档站：先让五个项目都能开始使用

采用项目切换器、项目内侧边栏、正文目录、面包屑、全文搜索、代码复制、编辑来源链接及版本说明。桌面与手机都能从文档回到相应项目页。

第一批建议 **25 个内容页（未计翻译副本）**：

| 文档区域 | 首批目录 | 页数 |
| --- | --- | --- |
| 总入口 | 文档首页；如何选择项目 | 2 |
| Caelis | 概览；安装与更新；首次连接；参与者协作；会话与恢复；审批与沙箱 | 6 |
| Caelis Bot | 概览；安装与首次启动；交流、附件与审批；常见问题和当前限制 | 4 |
| ACP Go SDK | 概览；安装；构建 Agent；构建 Client；协议兼容与升级 | 5 |
| Memory | 概览；嵌入式快速开始；Remember/Recall；权限与数据边界；升级与迁移 | 5 |
| Caelis App | 概览与当前范围；本地开发启动；连接 ACP Agent | 3 |

首页、五个项目页、各项目概览和快速开始优先提供中英文。深入参考文档可分批翻译；未翻译页面显示明确提示，不把英文静默伪装成中文内容。

第二批补齐 Caelis 的 Provider/ACP、MCP、Skills、配置与排障，Bot 的设置和角色资产说明，Memory 的 Facts/Steward/治理，以及 SDK 的生命周期与示例。Go 符号级 API 继续链接到 pkg.go.dev，官网负责集成讲解。

### 文档来源与更新方式

技术内容以各项目公开仓库为事实来源；官网维护跨项目导览、页面编排和品牌内容。不能简单把各仓库所有 `docs/*.md` 全量搬上站：其中包含计划、验收记录和内部工程材料。

建议采用明确的导入清单与版本锁定：

- 每页记录 `sourceRepo`、`sourcePath`、`sourceRef`（不可变 commit）、适用产品版本、站点 slug、语言与翻译状态。
- 首次迁入经过筛选的内容快照；同步脚本只更新清单允许的公开文档，并转换相对链接、图片路径和锚点。
- 已生成页面不手工维护第二份技术正文；结构化补充内容单独维护，或回到源仓库修改。
- 普通网站构建从已提交快照生成，不依赖实时 GitHub 请求；专门的更新步骤检查上游变化并生成可审阅差异。
- 发布文档默认对应已发布版本；开发中内容明确标记。App 尚无 Release，锁定公开 main 的 commit 并显示开发版状态。
- 首期只维护当前版本和迁移说明；确实存在不兼容、需要同时支持的旧版时，再引入完整版本站点。
- 上游更新触发同步检查可在后续接入。发布和文档更新的对应关系应成为项目发布清单的一部分。

现有内容可从以下本地位置盘点，最终公开内容必须与锁定的公开仓库 revision 核对：

- `/Users/xueyongzhi/WorkDir/caelis-labs/caelis/docs/`
- `/Users/xueyongzhi/WorkDir/caelis-labs/caelis-bot/docs/`
- `/Users/xueyongzhi/WorkDir/caelis-labs/acp-go-sdk/README.md` 与 `example/`
- `/Users/xueyongzhi/WorkDir/caelis-labs/memory/docs/`
- `/Users/xueyongzhi/WorkDir/caelis-labs/caelis-app/docs/`

## 5. Logo 与视觉方向

新标志应适合开发工具组织、应用、文档、GitHub 头像和社交卡片，优先保证小尺寸辨识度。建议保留“天空、轨道、协作”的语义，降低装饰复杂度。

先做三个方向的视觉提案，同一张应用预览中展示导航、16/32 像素图标、黑白版本和分享卡片：

| 方向 | 设计概念 | 判断 |
| --- | --- | --- |
| **Orbit C（首选）** | 用开口的 C 形轨迹与少量节点表达协作；形成轮廓明确的几何标记 | 与现有品牌语义连续，适合小图标；应避免普通行星环的同质化 |
| Relay | 少量相互衔接的几何结构表达消息与协作 | 工程感强，适合 Labs，但需要验证缩小时的识别度 |
| Caelis 字标 | 以字距和 C/A 字形建立识别，配套简化 C 图标 | 最克制，文字用途清晰；独立图标需另外打磨 |

视觉基调建议：石墨色与暖白为基础、靛蓝为主强调色、大留白、清楚的文本层级。星轨只作为少量品牌纹理；文档正文保持平静。深浅主题都要有独立检查。

最终交付要求：

- 图标、`Caelis Labs` 横向组合、紧凑组合、黑白版本，以及净空和最小尺寸规则。
- 导航使用真正的矢量路径，可内联到 HTML；**不含 PNG/JPEG、Base64 位图、外部图片依赖或运行时 Canvas 绘制**。
- 图标 SVG 目标不超过 3 KB，完整字标目标不超过 8 KB；这是本项目预算，最终以设计质量和实测为准。
- favicon：简化 SVG、16/32 PNG、ICO；Apple touch icon 与应用图标另行导出适配。
- Logo 先做单色通过，再增加辅助色；不能只靠渐变、阴影或颜色区分细节。
- 统一保存品牌源文件和导出说明。已知 Caelis App 曾复制官网品牌资产，后续需列出下游同步项，避免官网更新后其他产品仍沿用旧资源。

本轮确定设计简报与验收标准，不把上述文字方向当作已完成的 Logo。

## 6. Twitter/X 与 Open Graph 分享卡片

网页 Logo 使用轻量矢量；社交分享图在构建时导出 PNG，页面浏览不必加载这张分享图。两种资产承担不同用途，共用同一套品牌设计。

建议制作两种尺寸模板：通用 Open Graph **1200×630**，Twitter/X **1200×600**；重要内容离边缘至少 64 px，并在缩略预览中检查裁切。尺寸和 300 KB 左右的单图目标是项目设计预算，实际平台渲染在发布时验证。

| 模板 | 内容 |
| --- | --- |
| Labs 首页 | 新 Logo + Caelis Labs + 一句定位 + 简洁品牌图形 |
| 项目页 | 项目名 + 一句价值 + 小型 Labs 标识；必要时附 Preview 状态 |
| 文档页 | 页面标题 + 所属项目 + Docs；使用适合长标题的排版 |

品牌图形与标题要在缩小后清楚；不把整个首页截图塞进分享卡片。中英文分别生成，长标题分行或使用专门的分享标题，不截断关键内容。

页面初始 HTML 至少输出：

- `og:type`、`og:site_name`、`og:title`、`og:description`、`og:url`。
- `og:image` 的完整 HTTPS URL、尺寸、类型与 `og:image:alt`。
- `twitter:card=summary_large_image`、`twitter:title`、`twitter:description`、`twitter:image`、`twitter:image:alt`。
- 与当前语言对应的 canonical、语言替代链接和元数据。

Twitter 账号未确认，不填写猜测的 `twitter:site` 或作者账号。图片文件名带内容版本或哈希；构建时生成，避免分享请求依赖运行中的图片服务。页面、图片和 robots/CDN 配置需允许公开抓取。

验收分三层：HTML 元数据与图片可访问 → 本地缩略/裁切预览 → 实际平台抓取预览。只有最后一步通过，才报告 Twitter/X 真实分享显示验证通过；无需发布推文来完成前两步。

Open Graph 属性依据：[Open Graph 官方协议](https://ogp.me/)。本次 X 旧版官方卡片文档入口重定向到总览，未据此确认当前精确裁切规则，实施时以实际平台预览补验。

## 7. 技术方案与迁移约束

推荐：**Astro 静态生成 + Starlight 文档 + Markdown 内容 + Pagefind 搜索**，继续使用当前仓库和静态托管方式。

首页、项目页使用自定义 Astro 页面；文档使用 Starlight，共享品牌组件、项目数据和设计变量。Starlight 官方支持与自定义 Astro 页面共存，也提供多语言与默认 Pagefind 全文搜索。路由组织需先用一个英文页和对应中文页验证，再批量迁入内容。

来源：[自定义页面](https://starlight.astro.build/guides/pages/)、[多语言](https://starlight.astro.build/guides/i18n/)、[搜索](https://starlight.astro.build/guides/site-search/)。静态产物可以继续部署到 [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)；本轮不把更换托管平台作为前置工作。

选择它的原因是首页的视觉自由度、文档的标准能力和较小的客户端负担。维持手写单页会让多项目文档与多语言维护变重；当前需求没有要求动态后端或账户系统。

建议职责位置（均位于 `/Users/xueyongzhi/WorkDir/caelis-labs/caelis.dev/`）：

| 位置 | 职责 |
| --- | --- |
| `src/data/projects.ts` | 项目目录、明确的宣传排序、成熟度、平台、公开链接、文案与 CTA 数据；所有项目入口复用同一排序 |
| `src/components/Brand.astro`、`src/styles/tokens.css` | 品牌组件与共用设计变量 |
| `src/layouts/`、`src/pages/` | 首页、项目页、语言页面、通用元数据 |
| `src/content/docs/` | 文档总览及选定的技术内容快照 |
| `content-sources/manifest.json` | 文档来源、公开范围、revision 与路由映射 |
| `scripts/sync-docs.mjs` | 显式更新文档快照与链接转换 |
| `scripts/generate-social-images.mjs` | 从同一份页面数据生成分享图 |
| `public/brand/`、`public/social/` | 可直接访问的品牌导出与分享图片 |
| `public/install.sh`、`public/install.ps1` | 保持原 URL 的安装脚本 |
| `public/_headers`、`public/_redirects` | 静态托管头与迁移规则 |

必须保留的兼容行为：

- `/install.sh`、`/install.ps1` 的 URL、文件内容、响应类型和缓存语义保持兼容，不把安装脚本替换成 HTML 页面。
- `/github`、`/releases` 保持原来面向 Caelis 的目的地；新导航直接使用组织链接，避免改变老短链接的含义。
- `/docs` 从旧 README 跳转改成站内文档总入口，并兼容尾斜杠。
- 原 `/#cli`、`/#demo-video` 链接继续能找到对应内容：保留有意义的锚点落点/入口，必要时用最小客户端逻辑导向项目页。URL fragment 不会发送到服务器，不能只靠 `_redirects` 修复。
- 现有视频与封面 URL 保留，确保 GitHub README 中已有引用有效。
- 新框架产物与现有 CSP 做兼容验证；对确需的脚本和样式使用准确策略，不通过整体移除安全头来让页面勉强工作。

## 8. 可独立提交与发布的功能切片

每片完成后都能形成可审阅的结果；不要求把所有改动合成一次发布。视觉实现前，先完成 Logo 与关键页面的视觉定稿。

| 切片与建议提交名 | 内容及主要文件 | 验收与兼容 |
| --- | --- | --- |
| **S1 品牌与默认分享** `feat(brand): replace raster identity and add social preview` | 先在现有静态站替换 Logo/favicon，加入首页分享图与标签；`index.html`、`icon.svg`、`assets/`，补品牌说明 | 16/32 px、深浅主题可辨；Logo 无位图依赖；图片预算和元数据通过；现有安装与导航可用。可最先单独发布以解决当前问题 |
| **S2 静态内容基础** `refactor(site): migrate to Astro static pages` | 加入 Astro 构建、公共布局、独立语言路由、静态资源迁移；`astro.config.mjs`、`src/`、`public/` | 保留已有页面主要内容与交互；直接访问中英文页；安装脚本逐字节比对；旧短链接和媒体资源可用；预览部署验证响应头 |
| **S3 Labs 与五个项目** `feat(site): add Labs homepage and project pages` | 项目清单、Labs 首页、目录、五个详情页、全站导航 | 五项目全部可达且遵循确认顺序；CTA 与成熟度匹配；手机/桌面导航完整；原安装和演示锚点兼容。此片完成即可发布项目总入口 |
| **S4 文档可用首版** `feat(docs): publish multi-project getting-started guides` | Starlight、项目导航、首批 25 页、文档来源记录、搜索 | 五项目各有可完成的入门路径；不使用空白占位文档；搜索在构建产物中可用；中英文首页/概览/入门覆盖，其他翻译有提示 |
| **S5 文档持续维护** `feat(docs): add pinned source synchronization` | 文档同步清单和脚本、路径重写、来源信息、内容校验 | 相同 revision 重跑无差异；只导入允许页面；相对链接/图片/锚点有效；失效来源使更新失败且保留当前快照；普通构建不需要读取兄弟仓库或 GitHub |
| **S6 页面级传播与发现** `feat(seo): add localized social images and sitemap` | 项目/文档分享模板、页面元数据、sitemap、robots、404、语言替代链接 | 各项目与长标题文档分别预览；语言与 canonical 一致；所有分享图 HTTP 200；实际平台抓取结果单独记录 |

S2 起即执行资源预算，响应式、可访问性和链接检查随每片进行。最终上线前完成一次全站检查，不靠最后一个大优化补丁收拾所有问题。

## 9. 性能、体验与上线验收

下列是拟定目标，不是当前实测成绩：

- Logo 图标 ≤3 KB；字标 ≤8 KB；首页初始 HTML/CSS/JS/字体等关键资源压缩后总计目标 ≤200 KB，不含延后媒体与按需搜索索引。
- 正文和主要导航在 JavaScript 不可用时仍可阅读和跳转；主题、复制和动效作为增强。
- 本地实验室测试争取 LCP ≤2.5 秒、CLS ≤0.1；报告设备、网络配置及测试页面。真实用户 INP p75 ≤200 ms 等现场指标只能在有足够线上样本后评估。
- 首页不自动抢先下载完整演示视频；图片声明尺寸并按视口适配，避免布局位移。
- 动效支持减少动态效果设置，页面隐藏或区域不可见时停止不必要的绘制；文档阅读不承担背景动画成本。
- 至少检查 360 px、768 px、1440 px 三档宽度与深浅主题；键盘访问导航、菜单、搜索和代码复制。
- CI 检查构建、内容 schema、内部链接与锚点、分享资源、资源预算；外部链接波动独立报告，避免把临时 GitHub 网络问题误判为站点代码损坏。
- 抽查五条真实入门路径与公开产品版本一致。安装脚本未改动时不重复跑完整安装器测试，但必须检查发布产物内容和 HTTP 响应。
- 首次上线保留旧部署回退能力；上线后抽查根路径、项目详情、文档深链接、404、两种语言、安装脚本和社交图片。

本轮已完成：仓库与发布状态核对、官网首屏查看、源文件与资源体积检查、框架官方资料查阅，以及本规划。

本轮未执行：产品代码修改、Logo 定稿、页面实现、性能跑分、Twitter/X 实际抓取验收或上线。

**下一步：先做三套 Logo 应用提案，并同步展示 Labs 首页首屏、项目目录、文档页和分享卡片中的效果，选定统一方向后进入 S1。**
