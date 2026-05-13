export interface ResumeData {
  name: string;
  title: string;
  intro: string;
  location: string;
  yearsOfExperience: string;
  contacts: Array<{ type: string; label: string; href: string }>;
  skills: Array<{ category: string; items: Array<{ name: string; level: number }> }>;
  experiences: Array<{
    company: string;
    period: string;
    role: string;
    highlights: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    extras?: string;
  }>;
  certificates: string[];
  openSource: Array<{ project: string; contribution: string; link?: string }>;
}

export const resumeData: ResumeData = {
  name: "王同学",
  title: "全栈开发工程师",
  intro: "专注高性能 Web 工程与开发体验建设，擅长从 0 到 1 落地产品。",
  location: "上海",
  yearsOfExperience: "5 年",
  contacts: [
    { type: "邮箱", label: "you@example.com", href: "mailto:you@example.com" },
    { type: "GitHub", label: "your-name", href: "https://github.com/your-name" },
    { type: "LinkedIn", label: "your-name", href: "https://linkedin.com/in/your-name" },
    { type: "Twitter", label: "@your-name", href: "https://twitter.com/your-name" }
  ],
  skills: [
    {
      category: "前端",
      items: [
        { name: "TypeScript", level: 90 },
        { name: "Vue 3", level: 92 },
        { name: "React", level: 82 },
        { name: "Astro", level: 90 }
      ]
    },
    {
      category: "后端",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Go", level: 70 }
      ]
    },
    {
      category: "数据库/DevOps",
      items: [
        { name: "PostgreSQL", level: 78 },
        { name: "Docker", level: 76 },
        { name: "GitHub Actions", level: 88 }
      ]
    }
  ],
  experiences: [
    {
      company: "某科技公司",
      period: "2022.03 - 至今",
      role: "高级前端工程师",
      highlights: [
        "主导重构核心站点架构，Lighthouse 平均提升 30%+。",
        "建设组件库与脚手架，团队迭代效率提升约 40%。",
        "推动 CI 质量门禁，线上回滚率降低 50%。"
      ]
    },
    {
      company: "某创业公司",
      period: "2020.07 - 2022.02",
      role: "前端工程师",
      highlights: [
        "从 0 到 1 交付管理后台与移动端 H5。",
        "优化接口聚合与缓存策略，首屏渲染时间下降 35%。"
      ]
    }
  ],
  education: [
    {
      school: "XX 大学",
      degree: "计算机科学与技术 本科",
      period: "2016 - 2020",
      extras: "获省级程序设计竞赛二等奖"
    }
  ],
  certificates: ["CET-6", "AWS Certified Cloud Practitioner"],
  openSource: [
    {
      project: "VueUse",
      contribution: "提交文档修复与类型定义优化",
      link: "https://github.com/vueuse/vueuse"
    }
  ]
};
