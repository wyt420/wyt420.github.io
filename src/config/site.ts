/**
 * 全站文案与外链配置（导航、SEO、关于页等会读取此处）。
 * GitHub Pages 用户站点仓库：https://github.com/wyt420/wyt420.github.io
 * 部署后公网地址通常为 https://wyt420.github.io（与 siteUrl 保持一致）。
 * LinkedIn / Twitter 若暂无独立主页，可后续改为真实链接。
 */
export const siteConfig = {
  title: "王雨婷",
  description: "记录 MES、EAM 项目中的需求、开发与排障，也记录我学习 AI 应用开发的过程。",
  author: "王雨婷",
  siteUrl: "https://wyt420.github.io",
  avatar: "/avatar.svg",
  social: {
    github: "https://github.com/wyt420",
    linkedin: "https://github.com/wyt420",
    twitter: "https://github.com/wyt420",
    email: "mailto:984102889@qq.com"
  },
  nav: [
    { href: "/", label: "首页" },
    { href: "/projects", label: "项目" },
    { href: "/archives", label: "文章" },
    { href: "/resume", label: "简历" },
    { href: "/about", label: "关于" }
  ]
} as const;
