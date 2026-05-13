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
    name: "Astro Resume Blog",
    slug: "wyt420Blog",
    description: "集博客、简历、作品集于一体的个人站点模板。",
    tech: ["Astro", "Vue 3", "Tailwind"],
    kind: "personal",
    pinned: true,
    repo: "https://github.com/your-name/wyt420Blog",
    demo: "https://example.github.io",
    image: "/project-blog.svg"
  },
  {
    name: "企业数据中台",
    slug: "company-data-platform",
    description: "面向内部运营和数据分析的统一平台。",
    tech: ["Vue", "Node.js", "PostgreSQL"],
    kind: "company",
    pinned: true,
    image: "/project-company.svg"
  },
  {
    name: "Open Source Starter",
    slug: "open-source-starter",
    description: "开源工程化模板，提供 lint、test 与发布流程。",
    tech: ["TypeScript", "Vitest", "GitHub Actions"],
    kind: "opensource",
    repo: "https://github.com/your-name/open-source-starter",
    image: "/project-oss.svg"
  }
];
