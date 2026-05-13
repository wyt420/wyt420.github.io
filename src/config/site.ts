/**
 * 全站文案与外链配置（导航、SEO、关于页等会读取此处）。
 * GitHub Pages 用户站点仓库：https://github.com/wyt420/wyt420.github.io
 * 部署后公网地址通常为 https://wyt420.github.io（与 siteUrl 保持一致）。
 * LinkedIn / Twitter / 邮箱请按需改成你的真实链接。
 */
export const siteConfig = {
  title: "WYT 技术博客",
  description: "个人技术博客 · 在线简历 · 项目作品集 · 建设日志（Astro + Vue + Tailwind）",
  author: "wyt420",
  siteUrl: "https://wyt420.github.io",
  avatar: "/avatar.svg",
  social: {
    github: "https://github.com/wyt420",
    linkedin: "https://github.com/wyt420",
    twitter: "https://github.com/wyt420",
    /** 发布前请改为真实邮箱，例如 mailto:you@example.com */
    email: "mailto:your@email.com"
  },
  nav: [
    { href: "/", label: "首页" },
    { href: "/projects", label: "项目" },
    { href: "/archives", label: "归档" },
    { href: "/tags", label: "标签" },
    { href: "/build-log", label: "建设日志" },
    { href: "/resume", label: "在线简历" },
    { href: "/about", label: "关于" }
  ]
} as const;

/** 关于页展示的示意数据；可改为从 API 拉取或手工维护的真实数字。 */
export const profileStats = {
  totalStars: 320,
  totalCommits: 1200,
  projects: 12
};
