/**
 * 项目作品集页数据源（/projects）。
 * EAM 三端来自本机目录 E:\w\EAM\EAM-code（api / web / app），代码不对外仓库时勿填 repo。
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
}

export const projects: ProjectItem[] = [
  {
    name: "EAM · 后端服务（api）",
    slug: "eam-api",
    description:
      "潍柴资产 / 设备相关业务能力后端：基于 ALP 快速开发平台与 Maven 多模块（网关、认证、文件、代码生成、定时任务及各 weichai-* 业务域），统一鉴权、接口聚合与领域服务拆分。",
    tech: ["Java 8", "Spring Boot 2.6", "Maven", "微服务 / Gateway", "MySQL"],
    kind: "company",
    pinned: true,
    image: "/project-eam-api.svg"
  },
  {
    name: "EAM · 网页端（web）",
    slug: "eam-web",
    description:
      "资产管理系统 Web 端：Yarn workspaces 拆 framework / business，Vue 3 + Vite + Element Plus + Pinia；集成 BPMN 流程、ECharts 可视化、富文本与表格等典型企业后台能力（可选 qiankun 微前端形态）。",
    tech: ["Vue 3", "Vite", "TypeScript", "Element Plus", "Pinia", "ECharts", "BPMN", "qiankun"],
    kind: "company",
    image: "/project-eam-web.svg"
  },
  {
    name: "EAM · 移动端（App）",
    slug: "eam-app",
    description:
      "WeiChaiEamApp：uni-app 跨端工程，支持 App-Plus、H5、各端小程序等构建脚本；Vue 2 + Vuex + uView UI，含扫码、图表、钉钉 JSAPI 等现场运维与移动办公场景。",
    tech: ["uni-app", "Vue 2", "Vuex", "uView UI", "ECharts", "App-Plus / H5"],
    kind: "company",
    image: "/project-eam-app.svg"
  }
];
