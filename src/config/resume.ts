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
    "拥有制造企业 MES、EAM 项目建设与运维经验，能从业务需求出发完成方案拆解、前后端开发协作、部署验证与问题闭环。",
    "具备 AI 应用集成实践：使用 Python、FastAPI、LiteLLM 对接 DeepSeek 等 OpenAI 兼容模型，结合搜索 API、Agent 与消息推送搭建智能分析工作流。",
    "熟悉 Vue 3、Java / Spring Boot、SQL 与 uni-app，可将大模型能力接入既有企业系统；善用 Codex、Cursor、Copilot 进行需求分析、编码、测试和技术文档沉淀。",
    "求职方向：AI 应用工程师、企业 AI 解决方案工程师、智能制造数字化开发等偏业务落地岗位。"
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
      category: "AI 应用开发与工程化",
      description:
        "具备大模型 API 集成和 AI 工作流实践：使用 OpenAI 兼容接口接入 DeepSeek，基于 LiteLLM 管理模型调用，结合 Tavily 搜索、Agent 多轮执行与钉钉 Webhook 完成“数据获取—信息检索—模型分析—结果推送”闭环；了解提示词拆解、上下文组织、异常兜底、调用成本与密钥安全。",
      items: [
        { name: "LLM API / DeepSeek / LiteLLM", level: 80 },
        { name: "Prompt Engineering", level: 84 },
        { name: "Agent 与工具调用工作流", level: 76 },
        { name: "AI 辅助开发（Codex / Cursor / Copilot）", level: 88 }
      ]
    },
    {
      category: "数据分析与建模",
      description:
        "熟练运用 Python（Pandas、NumPy）进行数据处理与建模分析，具备 FastAPI 服务部署实践；掌握 SPSS 统计分析，能使用 Excel 与 SQL 完成业务数据处理和报表支撑。",
      items: [
        { name: "Python（Pandas / NumPy）", level: 86 },
        { name: "FastAPI / Python 服务部署", level: 76 },
        { name: "SPSS 统计分析", level: 80 },
        { name: "Excel 高级函数与数据透视", level: 82 }
      ]
    },
    {
      category: "数据库与后端",
      description:
        "熟练掌握 SQL，能编写复杂业务报表并定位数据口径问题；熟悉 MySQL、MyBatis、Java 与 Spring Boot，具备接口联调、动态查询、空值安全和企业流程问题定位经验。",
      items: [
        { name: "SQL 与复杂报表", level: 90 },
        { name: "MySQL", level: 78 },
        { name: "Java / Spring Boot / MyBatis", level: 74 },
        { name: "MES / EAM / ERP 系统集成", level: 84 }
      ]
    },
    {
      category: "前端与全栈",
      description:
        "掌握 Vue 3、TypeScript、Pinia 与企业后台开发，熟悉 Vue Router 动态路由、Element Plus、uni-app 跨端开发；能独立完成复杂表单、权限、异步状态和前后端联调问题。",
      items: [
        { name: "Vue 3 / TypeScript / Pinia", level: 85 },
        { name: "uni-app", level: 76 },
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
      category: "工程化与项目交付",
      description:
        "具备 Git、Vite、Maven、Windows 本地部署及前后端联调经验；能够将需求整理为可验证任务，使用 AI 编程工具辅助实现，并通过代码审查、构建验证和技术复盘保证结果可追溯。",
      items: [
        { name: "Git / Vite / Maven", level: 80 },
        { name: "需求拆解与技术文档", level: 86 },
        { name: "部署验证与问题排查", level: 84 }
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
      project: "个人技术博客与 AI 辅助知识沉淀",
      contribution:
        "基于 Astro、Vue 3 与 TypeScript 搭建个人博客，将 MES/EAM 开发内容按功能拆分为背景、问题、根因、方案和验证文章，形成可检索的项目经验库。",
      link: "/"
    }
  ]
};
