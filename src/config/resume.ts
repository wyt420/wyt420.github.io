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
  title: "AI 应用工程师 / 企业数字化工程师",
  intro:
    "东北大学信息管理与信息系统本科；具备制造业 MES/EAM 项目经验，专注于 LLM 应用集成、AI 辅助开发与企业业务数字化落地。",
  summaryParagraphs: [
    "AI 应用实践：使用 Python、FastAPI、LiteLLM 对接 DeepSeek 等 OpenAI 兼容模型，结合 Tavily 搜索、Agent 与消息推送搭建完整分析工作流。",
    "企业项目经验：参与制造业 MES、EAM、ERP 系统建设与运维，可独立完成需求分析、功能开发、接口联调、部署验证和问题闭环。",
    "复合技术能力：覆盖 Vue 3 前端、Java / Spring Boot 后端、SQL 数据处理及 uni-app 移动端，能够把 AI 能力与真实业务系统结合。"
  ],
  location: "中国 · 山东",
  yearsOfExperience: "全职 2 年+（2024.07 至今）",
  contacts: [
    { type: "手机", label: "15344261033", href: "tel:15344261033" },
    { type: "邮箱", label: "984102889@qq.com", href: "mailto:984102889@qq.com" },
    { type: "GitHub", label: "wyt420", href: "https://github.com/wyt420" }
  ],

  skills: [
    {
      category: "AI 应用开发与工程化",
      description:
        "大模型 API 集成、提示词设计与 AI 工作流落地；能使用 LiteLLM 统一模型调用，结合搜索、Agent 和 Webhook 构建端到端应用；关注上下文组织、异常兜底、调用成本与密钥安全。",
      items: [
        { name: "DeepSeek / OpenAI 兼容 API", level: 80 },
        { name: "LiteLLM / Prompt Engineering", level: 84 },
        { name: "Agent / 搜索增强 / Webhook", level: 76 },
        { name: "Codex / Cursor / Copilot", level: 88 }
      ]
    },
    {
      category: "应用开发",
      description:
        "具备前后端与跨端协作能力，能够开发企业后台、动态路由、复杂表单、权限与流程功能，并完成接口联调和本地部署。",
      items: [
        { name: "Python / FastAPI", level: 82 },
        { name: "Vue 3 / TypeScript / Pinia", level: 85 },
        { name: "Java / Spring Boot / MyBatis", level: 74 },
        { name: "uni-app / Vue 2", level: 76 }
      ]
    },
    {
      category: "数据分析与数据库",
      description:
        "能够使用 SQL 和 Python 完成业务数据处理、查询优化与报表分析，具备统计建模和数据口径问题定位经验。",
      items: [
        { name: "SQL / MySQL", level: 88 },
        { name: "Pandas / NumPy", level: 86 },
        { name: "Excel / SPSS", level: 82 },
        { name: "业务报表 / 数据口径", level: 84 }
      ]
    },
    {
      category: "工程化与业务交付",
      description:
        "熟悉制造业 MES、EAM、ERP 场景，具备需求调研、Git 协作、构建部署、功能验证和跨系统联调经验，能够沉淀规范、排障记录与技术复盘。",
      items: [
        { name: "MES / EAM / ERP", level: 86 },
        { name: "Git / Vite / Maven", level: 80 },
        { name: "需求分析 / 接口联调", level: 84 },
        { name: "部署验证 / 问题排查", level: 84 }
      ]
    }
  ],

  workExperience: [
    {
      company: "潍柴雷沃智慧农业科技股份有限公司",
      period: "2024.07 – 至今",
      role: "信息化工程师",
      highlights: [
        "MES Web：主导智造云首页工作台与树形/平铺双模式菜单重构，从 Vue Router 权限路由动态生成应用中心，使用 Pinia 按用户持久化布局与收藏，避免维护第二份菜单配置。",
        "MES 桌面端：参与 WPF + Prism Shell 重构，通过 NavigateMenuCatalog 聚合 Region 菜单，新增工作台和 Tree/Tile 导航；复用原 MenuItem 链路，实现业务模块低侵入升级。",
        "EAM 多端开发：参与物资、维修、设备台账与移动检修功能迭代，修复级联分类异步回显、盘点重复提交、多保管员权限、流程动作校验和移动端工时计算等问题。",
        "EAM 后端与数据：使用 Java、Spring Boot、MyBatis 与 SQL 完成台账模糊查询、预算统计口径和空值安全修复，覆盖前端交互、接口规则与数据查询链路。",
        "AI 辅助研发：将 Codex、Cursor、Copilot 应用于需求拆解、代码定位、测试验证和技术文档整理，沉淀 MES/EAM 功能复盘文章，使问题、根因和解决方案可复用。",
        "项目交付：负责 MES、ERP 相关系统运维与异常闭环，参与需求调研、部署上线、功能验证、跨系统接口联调及周例会进度协调。"
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
    "兼具制造业业务理解与软件开发能力，善于把复杂流程拆解为数据、状态、权限和接口问题。",
    "关注 AI 的实际应用价值，具备从模型 API、外部搜索到结果推送的工作流集成经验，能够评估错误兜底、调用成本和数据安全。",
    "持续使用 AI 工具提升研发效率，同时坚持核对源码、验证构建并记录问题根因；希望在 AI 应用与企业数字化结合方向持续深耕。"
  ],

  openSource: [
    {
      project: "A 股智能分析与问股 Agent",
      contribution:
        "在 Windows 本地部署 Python + FastAPI Web 工作台，对接 DeepSeek OpenAI 兼容接口与 LiteLLM，集成 Tavily 新闻检索、Agent 问股和钉钉 Webhook 推送，并梳理模型调用成本及异常兜底。",
      link: "/projects/daily-stock-analysis/"
    },
    {
      project: "MES 智造云 Web 工作台与应用中心",
      contribution:
        "基于 Vue 3、TypeScript、Pinia 和 Vue Router 重构首页工作台与双模式导航，从权限路由动态生成应用中心，支持菜单搜索、收藏、布局持久化和旧配置迁移。",
      link: "/projects/mes-cloud-web/"
    },
    {
      project: "EAM 资产管理系统多端迭代",
      contribution:
        "参与 Vue Web、Spring Boot API 与 uni-app 移动端开发，覆盖物资盘点、外委维修、设备台账和计划检修；解决异步回显、重复提交、权限集合、预算口径及移动端工时计算问题。",
      link: "/projects/eam-web/"
    }
  ]
};
