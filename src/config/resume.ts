/**
 * 在线简历页数据源（/resume）。
 * 尽量与纸质简历逐条对齐；导出 PDF 使用同一份数据。
 */

export interface ResumeData {
  name: string;
  title: string;
  /** 一句话定位 */
  intro: string;
  /** 个人综述（可多段，与简历「自我评价」前呼应） */
  summaryParagraphs: string[];
  location: string;
  yearsOfExperience: string;
  contacts: Array<{ type: string; label: string; href: string }>;

  /** 专业技能：每类含简历原文说明 + 可量化条目的进度条 */
  skills: Array<{
    category: string;
    /** 与纸质简历一致的段落说明 */
    description: string;
    items: Array<{ name: string; level: number }>;
  }>;

  /** 全职工作经历 */
  workExperience: Array<{
    company: string;
    period: string;
    role: string;
    highlights: string[];
  }>;

  /** 实习经历 */
  internships: Array<{
    company: string;
    period: string;
    role: string;
    highlights: string[];
  }>;

  education: Array<{
    school: string;
    degree: string;
    period: string;
    gpa: string;
    ranking: string;
    coreCourses: string[];
  }>;

  competitions: Array<{
    name: string;
    role: string;
    period: string;
    award: string;
    summary: string;
    highlights?: string[];
  }>;

  /** 荣誉奖项（职称、奖学金、竞赛获奖汇总等） */
  honors: string[];

  /** 证书与语言（与「荣誉」区分：偏资格与等级考试） */
  certificates: string[];

  /** 自我评价（多段/多条） */
  selfEvaluation: string[];

  openSource: Array<{ project: string; contribution: string; link?: string }>;
}

export const resumeData: ResumeData = {
  name: "王雨婷",
  title: "信息化工程师",
  intro:
    "东北大学信息管理与信息系统本科；现从事制造企业信息化与 MES/ERP 相关工作，具备数据分析、全栈协作与项目实施经验。",
  summaryParagraphs: [
    "熟悉 MES、ERP 系统运维与项目建设流程，能独立完成需求沟通、部署验证与异常闭环。",
    "具备 Python 数据分析与 SQL 报表开发能力；熟悉 Vue3 + SpringCloud 前后端分离架构下的联调与缺陷修复。",
    "善用 AI 辅助编程（Cursor、Copilot 等）与提示词工程，提升文档、脚本与原型迭代效率（vibe coding）。"
  ],
  location: "中国 · 山东",
  yearsOfExperience: "全职 1 年+（2024.07 至今）",
  contacts: [
    { type: "手机", label: "15344261033", href: "tel:15344261033" },
    { type: "邮箱", label: "984102889@qq.com", href: "mailto:984102889@qq.com" },
    { type: "GitHub", label: "wyt420", href: "https://github.com/wyt420" }
  ],

  skills: [
    {
      category: "数据分析与建模",
      description:
        "熟练运用 Python（Pandas、NumPy）进行数据处理与建模分析；掌握 SPSS 统计分析；熟练使用 Excel 高级函数完成业务侧数据处理与报表支撑。",
      items: [
        { name: "Python（Pandas / NumPy）", level: 86 },
        { name: "SPSS 统计分析", level: 80 },
        { name: "Excel 高级函数与数据透视", level: 82 }
      ]
    },
    {
      category: "数据库与后端",
      description:
        "熟练掌握 SQL，能编写复杂业务报表；熟悉 MySQL；了解 Java 与 SpringBoot 技术栈；具备 MES/ERP 与业务系统集成、联调与问题定位经验。",
      items: [
        { name: "SQL 与复杂报表", level: 90 },
        { name: "MySQL", level: 78 },
        { name: "Java / SpringBoot", level: 72 },
        { name: "MES / ERP 系统集成", level: 80 }
      ]
    },
    {
      category: "前端与全栈",
      description:
        "掌握 Vue3 与 Element-UI；熟悉 uniapp 跨端开发；理解前后端分离架构，能在该架构下独立完成缺陷修复与功能开发协作。",
      items: [
        { name: "Vue3 + Element-UI", level: 84 },
        { name: "uniapp", level: 74 },
        { name: "前后端分离协作与联调", level: 80 }
      ]
    },
    {
      category: "语言与资格",
      description: "大学英语六级（CET-6）；全国计算机等级考试二级。",
      items: [
        { name: "英语（CET-6）", level: 78 },
        { name: "计算机等级（二级）", level: 75 }
      ]
    },
    {
      category: "Vibe Coding & AI 辅助开发",
      description:
        "熟练使用 Cursor、GitHub Copilot 等 AI 编程工具；能将业务需求拆解为可执行的提示词与任务列表，加速文档撰写、SQL/脚本初稿与界面原型迭代；在规范与评审前提下保持代码可追溯、可维护。",
      items: [
        { name: "Cursor / Copilot 工作流", level: 86 },
        { name: "提示词工程（需求 → Spec → 实现）", level: 82 },
        { name: "快速原型与脚手架迭代", level: 78 }
      ]
    }
  ],

  workExperience: [
    {
      company: "潍柴雷沃智慧农业科技股份有限公司",
      period: "2024.07 – 至今",
      role: "信息化工程师",
      highlights: [
        "系统运维：负责 MES、ERP 相关模块的日常运维，处理异常需求与问题闭环，维护系统运行说明与操作记录。",
        "项目实施：参与 MES、EAM 等系统建设，承担需求调研、部署上线、功能验证及与业务、开发的多方沟通。",
        "开发与数据分析：在 Vue3 + SpringCloud 架构下参与前端缺陷修复；编写 SQL，支撑库存、生产等多维度动态报表。",
        "项目协调：组织周例会，跟踪进度，协调跨系统接口与联调事项，推动问题落实。"
      ]
    }
  ],

  internships: [
    {
      company: "用友网络科技股份有限公司",
      period: "2023.07 – 2023.09",
      role: "实施工程师（实习）",
      highlights: [
        "参与某大型制造企业 ERP/MES 一体化实施项目，面向关键用户开展培训，累计培训 30 余名关键用户。",
        "起草详细需求说明文档与业务流程图，协助开发团队完成系统联调测试，覆盖 50 余个核心功能点。",
        "使用 SQL 编写库存管理、生产排程等业务报表，支撑业务侧查询与决策。"
      ]
    }
  ],

  education: [
    {
      school: "东北大学",
      degree: "信息管理与信息系统 · 本科（全日制）",
      period: "2020.08 – 2024.07",
      gpa: "3.8 / 5.0",
      ranking: "专业前 20%",
      coreCourses: [
        "Java Web 开发（Servlet / JSP）",
        "计算机网络",
        "数据结构",
        "面向对象程序设计（Java / C++）",
        "Python 数据分析",
        "信息系统开发与管理"
      ]
    }
  ],

  competitions: [
    {
      name: "全国大学生数学建模竞赛",
      role: "队长",
      period: "2022.09 – 2022.10",
      award: "校一等奖",
      summary: "担任队长，负责建模思路与任务分工；侧重 Python 数据挖掘与模型实现，完成赛题分析、模型建立与论文撰写协作。",
      highlights: ["团队组织与建模路线把控", "Python 数据挖掘与建模", "论文与材料统筹"]
    },
    {
      name: "美国大学生数学建模竞赛（MCM / ICM）",
      role: "队长",
      period: "2021.12 – 2022.01",
      award: "Honorable Mention（H 奖）· 校一等奖",
      summary:
        "担任队长；运用 Python 进行数据挖掘与大规模数据仿真，完成赛题建模、实验与英文论文撰写，获国际赛 H 奖及校级一等奖。",
      highlights: ["英文赛题解读与建模", "大规模数据仿真", "竞赛文档与答辩材料整理"]
    },
    {
      name: "第九届全国大学生统计建模大赛",
      role: "队长",
      period: "2023",
      award: "河北省本科生组一等奖",
      summary: "担任队长；运用 SPSS 与 Python 构建多维度统计评价模型，完成选题、数据处理、模型检验与报告撰写。",
      highlights: ["多维度评价指标体系", "SPSS / Python 联合建模", "省赛一等奖（本科组）"]
    }
  ],

  honors: [
    "助理工程师职称",
    "国家励志奖学金（2022）",
    "校级综合二等奖学金、三等奖学金（多次）",
    "美国大学生数学建模竞赛 H 奖（Honorable Mention）",
    "全国大学生数学建模竞赛校一等奖",
    "第九届全国大学生统计建模大赛河北省本科生组一等奖"
  ],

  certificates: ["大学英语六级（CET-6）", "全国计算机等级考试二级"],

  selfEvaluation: [
    "具备扎实的数理与信息系统专业基础，善于将业务问题抽象为数据与流程问题。",
    "在竞赛与实习中积累了 Python 数据挖掘、统计建模与需求文档撰写经验，能在项目中承担沟通、文档与联调职责。",
    "工作态度踏实，学习意愿强，希望在信息化与智能制造领域持续深耕，为企业数字化落地贡献稳定产出。"
  ],

  openSource: []
};
