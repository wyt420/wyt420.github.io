/**
 * 项目作品集页数据源（/projects）。
 * EAM 三端来自本机目录 E:\w\EAM\EAM-code（api / web / app），代码不对外仓库时勿填 repo。
 * MES 桌面 Shell：E:\w\MES\mes-project-high-horse-power\前端\mes-client-shell
 * MES 智造云 Web：E:\w\MES\mes-project-high-horse-power\前端\lovol-mescloud-web
 */
export type ProjectType = "personal" | "company" | "opensource";

export interface ProjectItem {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  kind: ProjectType;
  pinned?: boolean;
  repo?: string;
  demo?: string;
  image: string;
  /** 详情页展示的要点列表 */
  highlights?: string[];
  /** 关联的技术博客文章路径 */
  articlePath?: string;
}

export const projects: ProjectItem[] = [
  {
    name: "A 股智能分析 · 本地部署与推送集成",
    slug: "daily-stock-analysis",
    description:
      "基于开源 daily_stock_analysis 在 Windows 本地部署 Web 工作台：集成 DeepSeek LLM 生成决策仪表盘、Tavily 多维度新闻搜索、钉钉自定义 Webhook 推送，并配置 Agent 问股与 API 用量优化实践。",
    tech: ["Python", "FastAPI", "LiteLLM", "DeepSeek", "Tavily", "钉钉 Webhook", "AkShare", "Vue 3"],
    kind: "opensource",
    pinned: true,
    repo: "https://github.com/ZhuLinsen/daily_stock_analysis",
    image: "/project-daily-stock-analysis.svg",
    articlePath: "/posts/2026/06/daily-stock-analysis-deploy/",
    highlights: [
      "Windows 本机 Python 3.12 + venv 部署，WebUI 自动 npm 构建与 FastAPI 服务",
      "DeepSeek OpenAI 兼容接口（OPENAI_API_KEY + LITELLM_MODEL）驱动分析报告与问股",
      "Tavily 新闻 API 多维度情报搜索，补全舆情、风险与催化因素",
      "钉钉群机器人经 CUSTOM_WEBHOOK_URLS 推送决策仪表盘",
      "AGENT_MODE 启用问股；梳理 LLM / 新闻 / 推送三类 Key 分工与用量"
    ]
  },
  {
    name: "MES · 智造云 Web 前端与菜单重构",
    slug: "mes-cloud-web",
    description:
      "雷沃 MES 智造云 Web 端（lovol-mescloud-web）前端体验升级：重构首页工作台（KPI、待办日历、快捷入口、今日计划等可配置模块），新增树形 / 平铺双模式菜单与应用中心磁贴导航；基于 vue-router 动态聚合菜单、Pinia 按用户持久化布局偏好，业务路由零侵入。",
    tech: ["Vue 3", "TypeScript", "Vite", "Ant Design Vue", "Pinia", "Vue Router", "ECharts", "Tailwind CSS", "@ice/stark"],
    kind: "company",
    pinned: true,
    image: "/project-mes-cloud-web.svg",
    articlePath: "/posts/2026/05/mes-cloud-web-refactor/",
    highlights: [
      "首页工作台模块化：KPI 指标、待办日历、快捷入口、通知公告与今日计划，支持拖拽排序与模块显隐",
      "HeaderMenuModeSwitch 树形 / 平铺一键切换，menuLayout Store 按用户持久化菜单模式与首页布局",
      "应用中心从 vue-router 权限路由动态生成磁贴分组，支持搜索，不维护第二份菜单配置",
      "useMenuRoutes + menuFlatten 统一菜单缓存与跳转路径解析，平铺预加载减少首次切换卡顿",
      "菜单收藏、最近访问等能力增强跨模块导航效率，侧栏 WeiLayoutSiderMenu 组件适配双模式"
    ]
  },
  {
    name: "MES · 桌面客户端 Shell 重构",
    slug: "mes-shell-workbench",
    description:
      "制造企业 MES 智造执行客户端前端壳层重构：在 WPF + Prism 模块化架构下新增工作台首页与 Tree/Tile 双模式导航；通过 NavigateMenuCatalog 从 Region 动态聚合各模块菜单，事件总线驱动刷新，Workbench 主题资源统一 Shell/Tab/侧栏视觉，业务模块零侵入。",
    tech: ["C#", "WPF", "XAML", "MVVM", "Prism", "Unity", "模块化架构"],
    kind: "company",
    pinned: true,
    image: "/project-mes-shell.svg",
    articlePath: "/posts/2026/05/mes-shell-workbench-refactor/",
    highlights: [
      "新增 WorkbenchHomeView 工作台首页，登录后默认展示欢迎信息与模块快捷入口",
      "NavigateMenuCatalog 从 Prism Region 扫描现有 Menu，磁贴点击复用原 MenuItem.Click，业务模块零改动",
      "Tree / Tile 双模式导航，ShellInitialized / MenuCatalogRefresh 等事件解耦 Shell 与 CommonModule",
      "Workbench.xaml 主题资源统一顶栏、Tab、侧栏与各模块 NavigateItem 视觉"
    ]
  },
  {
    name: "EAM · 后端服务（api）",
    slug: "eam-api",
    description:
      "潍柴资产 / 设备相关业务能力后端：基于 ALP 快速开发平台与 Maven 多模块（网关、认证、文件、代码生成、定时任务及各 weichai-* 业务域），统一鉴权、接口聚合与领域服务拆分。",
    tech: ["Java 8", "Spring Boot 2.6", "Maven", "微服务 / Gateway", "MySQL"],
    kind: "company",
    pinned: true,
    image: "/project-eam-api.svg",
    articlePath: "/posts/2026/08/eam-multi-end-delivery/",
    highlights: [
      "Maven 多模块拆分网关、认证、文件、代码生成、定时任务及各业务域服务",
      "基于 ALP 快速开发平台统一鉴权与接口聚合",
      "面向资产 / 设备管理场景的领域服务设计与接口规范"
    ]
  },
  {
    name: "EAM · 网页端（web）",
    slug: "eam-web",
    description:
      "资产管理系统 Web 端：Yarn workspaces 拆 framework / business，Vue 3 + Vite + Element Plus + Pinia；集成 BPMN 流程、ECharts 可视化、富文本与表格等典型企业后台能力（可选 qiankun 微前端形态）。",
    tech: ["Vue 3", "Vite", "TypeScript", "Element Plus", "Pinia", "ECharts", "BPMN", "qiankun"],
    kind: "company",
    image: "/project-eam-web.svg",
    articlePath: "/posts/2026/08/eam-multi-end-delivery/",
    highlights: [
      "Yarn workspaces 拆分 framework 与 business，支撑大型后台工程化协作",
      "集成 BPMN 流程设计、ECharts 可视化与企业级表格 / 富文本能力",
      "可选 qiankun 微前端形态，便于多子系统按需接入"
    ]
  },
  {
    name: "EAM · 移动端（App）",
    slug: "eam-app",
    description:
      "WeiChaiEamApp：uni-app 跨端工程，支持 App-Plus、H5、各端小程序等构建脚本；Vue 2 + Vuex + uView UI，含扫码、图表、钉钉 JSAPI 等现场运维与移动办公场景。",
    tech: ["uni-app", "Vue 2", "Vuex", "uView UI", "ECharts", "App-Plus / H5"],
    kind: "company",
    image: "/project-eam-app.svg",
    articlePath: "/posts/2026/08/eam-multi-end-delivery/",
    highlights: [
      "uni-app 一套代码覆盖 App-Plus、H5 与多端小程序构建",
      "集成扫码、图表与钉钉 JSAPI，服务现场运维与移动办公",
      "Vue 2 + Vuex + uView UI 的企业移动端典型技术栈实践"
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
