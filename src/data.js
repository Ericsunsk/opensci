const t = (en, zh) => ({ en, zh });

export const projects = [
  {
    id: "opencryo",
    name: t("OpenCryo Atlas", "OpenCryo 开放图谱"),
    domain: t("Cryo-EM", "冷冻电镜"),
    phase: t("Pilot dataset expansion", "试点数据集扩展"),
    ask: t("$180k matched support", "$18 万美元配捐支持"),
    summary: t(
      "An open structural biology initiative that wants to publish a cryo-EM atlas for rare protein conformations with staged public releases.",
      "一个开放结构生物学计划，希望以分阶段公开发布的方式，构建针对稀有蛋白构象的冷冻电镜图谱。",
    ),
    thesis: t(
      "The team claims that a public atlas would shorten early-stage discovery cycles for labs that cannot afford proprietary image libraries.",
      "团队认为，公开图谱可以缩短那些无力承担商业图像库成本实验室的早期发现周期。",
    ),
    trustScore: 76,
    evidenceCoverage: 68,
    anomalyRisk: 21,
    momentum: 74,
    communityConfidence: 81,
    stageRelease: t(
      "Three tranches tied to sample publication, replication, and dataset utility feedback.",
      "支持分三批释放，分别绑定样本发布、第三方复现与数据集可用性反馈。",
    ),
    thesisChecks: [
      t(
        "Raw microscopy samples are already hosted in a public repository.",
        "原始显微样本已经托管在公开仓库中。",
      ),
      t(
        "Two external labs reproduced a subset of the structure annotations.",
        "已有两家外部实验室复现了部分结构标注结果。",
      ),
      t(
        "The team has published the annotation rubric and labeling criteria.",
        "团队已经公开标注规则和标签判定标准。",
      ),
    ],
    concernChecks: [
      t(
        "Lead timeline depends on one specialist imaging partner.",
        "关键交付时间线仍依赖单一影像合作方。",
      ),
      t(
        "Utility claims rely on six early collaborators, not broad usage yet.",
        "当前效用判断主要来自 6 位早期合作方，尚未形成广泛使用证明。",
      ),
    ],
    evidence: [
      {
        label: t("Raw data repository", "原始数据仓库"),
        detail: t(
          "650 sample files with public version history and checksum logs.",
          "包含 650 份样本文件，并带有公开版本历史和校验日志。",
        ),
        weight: 30,
        status: "verified",
      },
      {
        label: t("Independent replication", "独立复现"),
        detail: t(
          "2 labs confirmed 4 of 5 highlighted structures.",
          "两家实验室确认了 5 个重点结构中的 4 个。",
        ),
        weight: 24,
        status: "partial",
      },
      {
        label: t("Team reputation", "团队履约记录"),
        detail: t(
          "PI has prior open-data delivery record across 3 grant cycles.",
          "项目负责人在过去 3 个资助周期中均有开放数据交付记录。",
        ),
        weight: 18,
        status: "verified",
      },
      {
        label: t("Impact projection", "影响预估"),
        detail: t(
          "Projected acceleration is promising but based on limited pilot users.",
          "预估收益看起来积极，但目前仍主要基于有限的试点用户。",
        ),
        weight: 12,
        status: "watch",
      },
    ],
    milestones: [
      {
        name: t("Release 100 annotated conformations", "发布 100 个带标注的构象"),
        due: "Q2 2026",
        confidence: 83,
        status: "on track",
      },
      {
        name: t("Independent benchmark by partner lab", "合作实验室完成独立基准测试"),
        due: "Q3 2026",
        confidence: 67,
        status: "needs checkpoint",
      },
      {
        name: t("Public utility report from 20 labs", "形成 20 家实验室公开使用反馈报告"),
        due: "Q4 2026",
        confidence: 54,
        status: "high uncertainty",
      },
    ],
    anomalies: [
      {
        severity: "low",
        title: t("Single-point delivery dependency", "单点交付依赖"),
        detail: t(
          "Imaging throughput still depends on one contracted facility.",
          "影像产能仍然依赖单一外部合作设施。",
        ),
      },
      {
        severity: "medium",
        title: t("Impact claim not yet generalized", "效果论证尚未普适化"),
        detail: t(
          "Reported researcher time savings come from a small cohort.",
          "目前节省研究者时间的结论只来自一个较小样本群体。",
        ),
      },
    ],
    updates: [
      {
        date: "2026-03-12",
        title: t("Second replication uploaded", "第二轮复现结果已上传"),
        detail: t(
          "External partner added full review notes and image quality deltas.",
          "外部合作方补充了完整审阅说明和图像质量差异记录。",
        ),
      },
      {
        date: "2026-02-28",
        title: t("Checkpoint slipped by 10 days", "阶段检查点延后 10 天"),
        detail: t(
          "Microscopy queue caused a delay; team posted mitigation plan.",
          "显微排期导致延期，团队已公开应对方案。",
        ),
      },
      {
        date: "2026-02-11",
        title: t("Dataset review opened", "数据集公开评审开启"),
        detail: t(
          "Community can now challenge low-confidence labels in public threads.",
          "社区现在可以在公开讨论中质疑低置信度标签。",
        ),
      },
    ],
  },
  {
    id: "geneweave",
    name: t("GeneWeave Commons", "GeneWeave 公共模板库"),
    domain: t("Synthetic biology", "合成生物学"),
    phase: t("Tooling build-out", "工具体系搭建"),
    ask: t("$95k infrastructure support", "$9.5 万美元基础设施支持"),
    summary: t(
      "A collaborative platform for modular gene circuit templates, aiming to reduce duplicated wet-lab setup work across university labs.",
      "一个面向模块化基因线路模板的协作平台，目标是减少高校实验室重复性的湿实验搭建工作。",
    ),
    thesis: t(
      "The project proposes that standardized reusable templates can lower experiment setup time and improve reproducibility for student-led research teams.",
      "项目认为，标准化的可复用模板可以降低学生科研团队的实验准备成本，并提升可复现性。",
    ),
    trustScore: 61,
    evidenceCoverage: 53,
    anomalyRisk: 38,
    momentum: 69,
    communityConfidence: 58,
    stageRelease: t(
      "Support only unlocks fully after template reuse and safety review thresholds are met.",
      "只有在模板复用和安全审查达到阈值后，支持资源才会完全释放。",
    ),
    thesisChecks: [
      t("The template schema is open and versioned.", "模板 schema 已公开，并具备版本管理。"),
      t(
        "Two faculty advisors are publicly attached to governance review.",
        "已有两位导师公开参与治理审查。",
      ),
    ],
    concernChecks: [
      t(
        "No safety review automation exists yet for submitted circuits.",
        "提交电路还没有自动化安全审查机制。",
      ),
      t(
        "Most adoption evidence comes from hackathon pilots, not semester-scale use.",
        "大部分采用证据来自短期 hackathon，而非学期级长期使用。",
      ),
    ],
    evidence: [
      {
        label: t("Open template registry", "开放模板注册表"),
        detail: t(
          "Schema, changelog, and contributor history are visible.",
          "Schema、变更记录和贡献者历史都可见。",
        ),
        weight: 22,
        status: "verified",
      },
      {
        label: t("Safety oversight", "安全监督"),
        detail: t(
          "Human advisory review exists, but no continuous screening pipeline yet.",
          "已有人工作业审查，但尚未形成持续筛查流程。",
        ),
        weight: 16,
        status: "partial",
      },
      {
        label: t("Pilot adoption", "试点采用情况"),
        detail: t(
          "4 student teams reused templates during a two-week sprint.",
          "有 4 个学生团队在两周冲刺期间复用了模板。",
        ),
        weight: 12,
        status: "watch",
      },
      {
        label: t("Operator credibility", "执行团队可信度"),
        detail: t(
          "Core team is credible but has not shipped a platform before.",
          "核心团队背景可信，但此前没有平台型产品交付记录。",
        ),
        weight: 14,
        status: "partial",
      },
    ],
    milestones: [
      {
        name: t("Safety review workflow live", "安全审查流程上线"),
        due: "Q2 2026",
        confidence: 58,
        status: "fragile",
      },
      {
        name: t("20 reusable circuits published", "发布 20 个可复用电路模板"),
        due: "Q3 2026",
        confidence: 72,
        status: "on track",
      },
      {
        name: t("Semester-long adoption proof", "拿到一个学期周期的采用证明"),
        due: "Q4 2026",
        confidence: 49,
        status: "high uncertainty",
      },
    ],
    anomalies: [
      {
        severity: "medium",
        title: t("Safety mechanism gap", "安全机制缺口"),
        detail: t(
          "Human review cannot scale if project submissions increase quickly.",
          "如果项目提交量快速增加，纯人工审查将难以扩展。",
        ),
      },
      {
        severity: "medium",
        title: t("Adoption evidence is shallow", "采用证据偏浅"),
        detail: t(
          "Current use cases are short-lived and incentive-driven.",
          "现有使用场景持续时间短，并且带有明显激励驱动。",
        ),
      },
      {
        severity: "high",
        title: t("Governance still centralized", "治理仍然过于中心化"),
        detail: t(
          "Template approvals rely on a small founding group.",
          "模板审批仍依赖一个很小的创始团队。",
        ),
      },
    ],
    updates: [
      {
        date: "2026-03-18",
        title: t("Advisory board minutes published", "顾问委员会纪要已公开"),
        detail: t(
          "Board agreed on a mandatory review rubric for higher-risk submissions.",
          "委员会就高风险提交建立了强制审查标准。",
        ),
      },
      {
        date: "2026-03-02",
        title: t("Volunteer reviewer shortage", "志愿审查员不足"),
        detail: t(
          "Three template requests are waiting longer than SLA.",
          "有 3 个模板申请已超出预期处理时限。",
        ),
      },
      {
        date: "2026-02-10",
        title: t("New partner lab joined", "新增合作实验室"),
        detail: t(
          "A new university lab offered to validate circuit documentation quality.",
          "一所新的高校实验室愿意参与验证电路文档质量。",
        ),
      },
    ],
  },
  {
    id: "quantumloop",
    name: t("QuantumLoop Materials", "QuantumLoop 材料计划"),
    domain: t("Materials science", "材料科学"),
    phase: t("Narrative-heavy fundraising", "高叙事驱动融资阶段"),
    ask: t("$240k unrestricted support", "$24 万美元无条件支持"),
    summary: t(
      "A materials discovery collective promising to discover a room-temperature superconductor class through a combination of citizen science and AI screening.",
      "一个材料发现团队，宣称将通过公民科研与 AI 筛选结合，找到室温超导材料类别。",
    ),
    thesis: t(
      "The team says a wider contributor network and model-assisted search will uncover hidden compounds that traditional grant cycles ignore.",
      "团队声称，更广泛的贡献者网络和模型辅助搜索，能够发现传统资助机制忽略的潜在化合物。",
    ),
    trustScore: 42,
    evidenceCoverage: 35,
    anomalyRisk: 66,
    momentum: 79,
    communityConfidence: 39,
    stageRelease: t(
      "No milestone-gated structure has been proposed by the team.",
      "团队尚未提出任何基于里程碑的分段支持方案。",
    ),
    thesisChecks: [
      t(
        "Community excitement is high and campaign storytelling is strong.",
        "社区热度很高，传播叙事能力也很强。",
      ),
    ],
    concernChecks: [
      t("No raw experiment logs have been published.", "尚未公开任何原始实验日志。"),
      t(
        "Performance claims are based on unpublished internal testing.",
        "性能结论基于未公开的内部测试。",
      ),
      t(
        "Requested support is not tied to verifiable deliverables.",
        "当前支持请求没有绑定可验证交付物。",
      ),
    ],
    evidence: [
      {
        label: t("Public technical evidence", "公开技术证据"),
        detail: t(
          "A polished explainer exists, but there is no raw materials log.",
          "虽然有精致的解释材料，但没有原始实验日志。",
        ),
        weight: 8,
        status: "watch",
      },
      {
        label: t("Independent replication", "独立复现"),
        detail: t(
          "No outside lab has confirmed the headline result.",
          "还没有外部实验室确认其核心结果。",
        ),
        weight: 4,
        status: "missing",
      },
      {
        label: t("Funding structure", "资金结构"),
        detail: t(
          "Support request is unrestricted and not milestone bound.",
          "当前支持请求不设限制，也没有里程碑约束。",
        ),
        weight: 6,
        status: "missing",
      },
      {
        label: t("Narrative traction", "叙事传播力"),
        detail: t(
          "Campaign visibility is high across social channels.",
          "项目在社交渠道上的传播势能很强。",
        ),
        weight: 20,
        status: "verified",
      },
    ],
    milestones: [
      {
        name: t("Raw experiment ledger published", "公开原始实验台账"),
        due: "Q2 2026",
        confidence: 24,
        status: "at risk",
      },
      {
        name: t("Independent validation partner announced", "公布独立验证合作方"),
        due: "Q2 2026",
        confidence: 31,
        status: "at risk",
      },
      {
        name: t("Deliverable-based support model", "建立基于交付物的支持机制"),
        due: "Q3 2026",
        confidence: 18,
        status: "not defined",
      },
    ],
    anomalies: [
      {
        severity: "high",
        title: t("Proof is downstream of funding", "证据被放在资金之后"),
        detail: t(
          "The team requests large support before opening core evidence.",
          "团队要求在公开核心证据前先拿到大额支持。",
        ),
      },
      {
        severity: "high",
        title: t("Signal inflation risk", "信号被放大风险"),
        detail: t(
          "Momentum is driven by storytelling and endorsements, not verifiable logs.",
          "当前势能主要来自故事包装和背书，而不是可验证日志。",
        ),
      },
      {
        severity: "medium",
        title: t("No scoped tranche plan", "缺少明确的分段支持方案"),
        detail: t(
          "Backers cannot reduce downside with staged release controls.",
          "支持者无法通过分批释放机制降低下行风险。",
        ),
      },
    ],
    updates: [
      {
        date: "2026-03-21",
        title: t("Campaign adds celebrity advisors", "项目新增名人顾问"),
        detail: t(
          "The announcement boosted visibility but did not add technical proof.",
          "这次公告带来了更高关注度，但没有新增技术证据。",
        ),
      },
      {
        date: "2026-03-07",
        title: t("Technical AMA avoided replication details", "技术 AMA 回避复现细节"),
        detail: t(
          "Most questions on measurement conditions remained unanswered.",
          "关于测量条件的大部分问题仍未得到回答。",
        ),
      },
      {
        date: "2026-02-19",
        title: t("Funding target raised", "筹资目标上调"),
        detail: t(
          "Target increased by 35% without updated milestone definitions.",
          "在未更新里程碑定义的情况下，目标额提高了 35%。",
        ),
      },
    ],
  },
];

export const reviewSeeds = {
  opencryo: {
    owner: t("Mina Kwan", "关敏娜"),
    currentStage: "decision",
    nextDecision: "2026-04-05",
    approvedTranches: 1,
    watchlisted: false,
    riskFlags: 1,
    evidenceRequests: [
      {
        label: t(
          "Full benchmark protocol from partner lab",
          "合作实验室完整基准测试协议",
        ),
        owner: t("Partner lab", "合作实验室"),
        due: "2026-04-02",
        status: "requested",
      },
      {
        label: t(
          "Utility report template for the 20-lab cohort",
          "20 家实验室效用报告模板",
        ),
        owner: t("Project ops lead", "项目运营负责人"),
        due: "2026-04-10",
        status: "needsRequest",
      },
      {
        label: t("Dataset checksum reconciliation note", "数据校验和对账说明"),
        owner: t("Data steward", "数据维护负责人"),
        due: "2026-03-28",
        status: "received",
      },
    ],
    notes: [
      {
        author: t("Mina Kwan", "关敏娜"),
        role: t("Lead reviewer", "主评审"),
        date: "2026-03-24",
        content: t(
          "Replication quality is already strong enough to move into tranche design, but utility evidence still needs broader lab coverage.",
          "复现质量已经足够支撑进入 tranche 设计，但效用证据仍需要更广的实验室覆盖。",
        ),
      },
    ],
    auditLog: [
      {
        date: "2026-03-26",
        tone: "success",
        title: t("Moved to tranche decision", "进入 tranche 决策阶段"),
        detail: t(
          "Committee agreed to structure support around partner benchmarking and external utility feedback.",
          "评审小组同意将支持绑定在合作方基准测试和外部效用反馈上。",
        ),
      },
      {
        date: "2026-03-20",
        tone: "warning",
        title: t("Evidence request issued", "已发起补证请求"),
        detail: t(
          "Reviewer asked for benchmark protocol and the cohort utility reporting template.",
          "评审员要求补充基准测试协议和群体效用报告模板。",
        ),
      },
    ],
  },
  geneweave: {
    owner: t("Ariel Tan", "陈雅睿"),
    currentStage: "governance",
    nextDecision: "2026-04-09",
    approvedTranches: 0,
    watchlisted: false,
    riskFlags: 2,
    evidenceRequests: [
      {
        label: t("Automated safety screening spec", "自动化安全筛查方案"),
        owner: t("Platform engineer", "平台工程负责人"),
        due: "2026-04-04",
        status: "requested",
      },
      {
        label: t("Faculty governance escalation matrix", "导师治理升级矩阵"),
        owner: t("Governance lead", "治理负责人"),
        due: "2026-04-06",
        status: "needsRequest",
      },
      {
        label: t("Semester-scale adoption baseline", "学期级采用基线数据"),
        owner: t("Partner university lab", "合作高校实验室"),
        due: "2026-04-15",
        status: "needsRequest",
      },
    ],
    notes: [
      {
        author: t("Ariel Tan", "陈雅睿"),
        role: t("Governance reviewer", "治理评审"),
        date: "2026-03-22",
        content: t(
          "The platform concept is useful, but governance centralization and safety review throughput need explicit controls before release.",
          "平台方向有价值，但在释放支持前，治理中心化和安全审查吞吐量都需要更明确的控制措施。",
        ),
      },
    ],
    auditLog: [
      {
        date: "2026-03-23",
        tone: "warning",
        title: t("Escalated to governance review", "升级到治理复核"),
        detail: t(
          "Safety oversight and approval concentration triggered a second-layer review.",
          "安全监督和审批集中度触发了二级治理审查。",
        ),
      },
      {
        date: "2026-03-17",
        tone: "neutral",
        title: t("Reviewer note attached", "已附加评审备注"),
        detail: t(
          "Current recommendation is conditional and waits on scalable safety controls.",
          "当前建议为条件支持，等待可扩展的安全控制机制。",
        ),
      },
    ],
  },
  quantumloop: {
    owner: t("Devon Price", "周德文"),
    currentStage: "evidence",
    nextDecision: "2026-04-01",
    approvedTranches: 0,
    watchlisted: true,
    riskFlags: 3,
    evidenceRequests: [
      {
        label: t("Raw experiment ledger", "原始实验台账"),
        owner: t("Scientific lead", "科研负责人"),
        due: "2026-04-01",
        status: "needsRequest",
      },
      {
        label: t("Independent validation partner memo", "独立验证合作方备忘录"),
        owner: t("Program operator", "项目运营负责人"),
        due: "2026-04-03",
        status: "requested",
      },
      {
        label: t("Deliverable-based support budget", "基于交付物的支持预算"),
        owner: t("Finance coordinator", "资金协调负责人"),
        due: "2026-04-05",
        status: "needsRequest",
      },
    ],
    notes: [
      {
        author: t("Devon Price", "周德文"),
        role: t("Risk reviewer", "风险评审"),
        date: "2026-03-25",
        content: t(
          "Narrative momentum is running ahead of inspectable proof, so the project stays on the watchlist until raw logs and external validation appear.",
          "当前叙事势能明显跑在可检查证据前面，因此在原始日志和外部验证出现前，项目继续停留在观察名单中。",
        ),
      },
    ],
    auditLog: [
      {
        date: "2026-03-25",
        tone: "danger",
        title: t("Moved to watchlist", "移入观察名单"),
        detail: t(
          "Committee paused commitment because support was requested before core evidence was opened.",
          "委员会暂停投入，因为项目在公开核心证据前就要求先获得支持。",
        ),
      },
      {
        date: "2026-03-19",
        tone: "warning",
        title: t("Replication gap logged", "已记录复现缺口"),
        detail: t(
          "Reviewer flagged that no outside lab has confirmed the headline claim.",
          "评审员标记了“尚无外部实验室确认核心结论”这一缺口。",
        ),
      },
    ],
  },
};

export const principles = [
  {
    label: t("Evidence before narrative", "证据先于叙事"),
    detail: t(
      "Claims earn score only when tied to inspectable artifacts or independent review.",
      "只有与可检查证据或独立评审绑定的论点，才应该获得更高权重。",
    ),
  },
  {
    label: t("Support in tranches", "分阶段支持"),
    detail: t(
      "Users do not need to go all-in; each tranche waits for milestone proof.",
      "用户不必一次性投入全部资源，每一批支持都应等待里程碑证明。",
    ),
  },
  {
    label: t("Continuous trust updates", "持续信任更新"),
    detail: t(
      "The system keeps watching after the decision instead of treating support as one-off.",
      "系统在决策后仍然持续追踪，而不是把支持当成一次性动作。",
    ),
  },
  {
    label: t("Visible failure modes", "显式暴露失败模式"),
    detail: t(
      "Every recommendation shows why it could still be wrong and where it can break.",
      "每个推荐都应说明它为什么可能出错，以及系统最脆弱的环节在哪里。",
    ),
  },
];
