const t = (en, zh) => ({ en, zh });

export const projects = [
  {
    id: "opencryo",
    name: t("OpenCryo Atlas", "OpenCryo 开放图谱"),
    domain: t("Cryo-EM", "冷冻电镜"),
    phase: t("Pilot dataset expansion", "试点数据集扩展"),
    ask: t("$180k matched support", "$18 万美元配捐支持"),
    askValue: 180000,
    summary: t(
      "An open structural biology initiative building a public cryo-EM atlas for rare protein conformations, with staged releases for external labs.",
      "一个开放结构生物学计划，正在构建面向稀有蛋白构象的公开冷冻电镜图谱，并计划面向外部实验室分阶段发布。",
    ),
    thesis: t(
      "A public atlas can shorten discovery cycles for labs that cannot afford proprietary image libraries.",
      "公开图谱可以缩短那些无力承担商业图像库成本实验室的发现周期。",
    ),
    trustScore: 76,
    evidenceCoverage: 68,
    anomalyRisk: 21,
    momentum: 74,
    communityConfidence: 81,
    submission: {
      submittedBy: t("Dr. Lena Ortiz", "Ortiz 博士"),
      submittedAt: "2026-03-14",
      reviewWindow: t("April funding committee", "4 月资助委员会"),
      requestedSupport: t("$180k matched support", "$18 万美元配捐支持"),
      requestedUse: t(
        "Atlas curation, benchmark replication, and public utility onboarding for external labs.",
        "图谱整理、基准复现，以及外部实验室的公共可用性接入。",
      ),
      intakeReason: t(
        "Entered review because the project already has inspectable raw data and partial external replication, but still needs stronger utility proof before later release.",
        "进入评审的原因是项目已经具备可检查原始数据和部分外部复现，但在后续释放前仍需要更强的实际效用证明。",
      ),
      links: [
        {
          label: t("Dataset repository", "数据集仓库"),
          url: "https://zenodo.org/",
        },
        {
          label: t("Replication notes", "复现说明"),
          url: "https://osf.io/",
        },
        {
          label: t("Project board", "项目看板"),
          url: "https://github.com/",
        },
      ],
    },
    thesisChecks: [
      t(
        "Raw microscopy samples already live in a public repository.",
        "原始显微样本已经托管在公开仓库中。",
      ),
      t(
        "Two external labs reproduced a subset of the highlighted structures.",
        "已有两家外部实验室复现了部分重点结构。",
      ),
      t(
        "Annotation rules and labeling criteria are already published.",
        "标注规则和标签判定标准已经公开。",
      ),
    ],
    concernChecks: [
      t(
        "Utility claims still rely on a small early cohort.",
        "当前效用结论仍主要来自一个较小的早期样本群体。",
      ),
      t(
        "Core throughput still depends on one imaging partner.",
        "核心交付吞吐量仍依赖单一影像合作方。",
      ),
    ],
    evidence: [
      {
        label: t("Raw data repository", "原始数据仓库"),
        detail: t(
          "650 sample files with version history, checksums, and public annotation diffs.",
          "包含 650 份样本文件，并提供版本历史、校验和与公开标注差异记录。",
        ),
        claim: t(
          "The atlas is already grounded in inspectable source material.",
          "图谱已经建立在可检查的源材料之上。",
        ),
        weight: 30,
        status: "verified",
        sourceType: t("Dataset", "数据集"),
        sourceLabel: t("Zenodo release bundle", "Zenodo 发布包"),
        sourceUrl: "https://zenodo.org/",
        submittedBy: t("OpenCryo data steward", "OpenCryo 数据维护负责人"),
        verifiedBy: t("Mina Kwan", "关敏娜"),
        lastChecked: "2026-03-24",
      },
      {
        label: t("Independent replication", "独立复现"),
        detail: t(
          "2 labs confirmed 4 of 5 highlighted structures with review notes attached.",
          "两家实验室确认了 5 个重点结构中的 4 个，并附带审阅说明。",
        ),
        claim: t(
          "External labs can reproduce the core structural readouts.",
          "外部实验室能够复现核心结构读数。",
        ),
        weight: 24,
        status: "partial",
        sourceType: t("Lab memo", "实验室备忘录"),
        sourceLabel: t("OSF replication packet", "OSF 复现包"),
        sourceUrl: "https://osf.io/",
        submittedBy: t("Partner lab consortium", "合作实验室联盟"),
        verifiedBy: t("Ariel Tan", "陈雅睿"),
        lastChecked: "2026-03-26",
      },
      {
        label: t("Team delivery record", "团队履约记录"),
        detail: t(
          "The PI has shipped open-data outputs across three previous grant cycles.",
          "项目负责人在过去三个资助周期中均有开放数据交付记录。",
        ),
        claim: t(
          "The operating team has earned some execution trust.",
          "执行团队已经积累了一定的履约可信度。",
        ),
        weight: 18,
        status: "verified",
        sourceType: t("Grant history", "资助履历"),
        sourceLabel: t("Prior delivery archive", "既往交付档案"),
        sourceUrl: "https://github.com/",
        submittedBy: t("Program operations", "项目运营"),
        verifiedBy: t("Committee ops", "委员会运营"),
        lastChecked: "2026-03-18",
      },
      {
        label: t("Utility projection", "效用预估"),
        detail: t(
          "Acceleration claims are promising, but still come from a limited pilot group.",
          "提效结论看起来积极，但目前仍主要来自有限的试点群体。",
        ),
        claim: t(
          "The atlas will materially improve downstream lab throughput.",
          "该图谱将显著提升下游实验室的工作效率。",
        ),
        weight: 12,
        status: "watch",
        sourceType: t("Pilot report", "试点评估"),
        sourceLabel: t("Utility cohort notes", "效用群体记录"),
        sourceUrl: "https://figshare.com/",
        submittedBy: t("Research ops lead", "研究运营负责人"),
        verifiedBy: t("Pending external cohort review", "等待外部群体验证"),
        lastChecked: "2026-03-12",
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
        title: t("Utility proof is still narrow", "效用证明仍偏窄"),
        detail: t(
          "Researcher time-savings are still drawn from a small cohort.",
          "研究者时间节省的结论仍然来自一个较小样本群体。",
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
          "Microscopy queue caused a delay; the team posted a mitigation plan.",
          "显微排期导致延期，团队已公开缓解方案。",
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
    askValue: 95000,
    summary: t(
      "A collaborative platform for modular gene circuit templates aimed at reducing duplicated wet-lab setup work across university labs.",
      "一个面向模块化基因线路模板的协作平台，目标是减少高校实验室重复性的湿实验准备工作。",
    ),
    thesis: t(
      "Reusable templates can lower experiment setup time and improve reproducibility for student-led research teams.",
      "可复用模板可以降低学生科研团队的实验准备成本，并提升可复现性。",
    ),
    trustScore: 61,
    evidenceCoverage: 53,
    anomalyRisk: 38,
    momentum: 69,
    communityConfidence: 58,
    submission: {
      submittedBy: t("Prof. Hannah Wu", "吴涵教授"),
      submittedAt: "2026-03-11",
      reviewWindow: t("April governance and funding review", "4 月治理与资助联审"),
      requestedSupport: t("$95k infrastructure support", "$9.5 万美元基础设施支持"),
      requestedUse: t(
        "Safety workflow automation, template moderation capacity, and semester-scale lab onboarding.",
        "安全工作流自动化、模板审核产能建设，以及学期级实验室接入。",
      ),
      intakeReason: t(
        "Entered review because the project has an open template registry and visible community pull, but its safety controls and governance model are still immature.",
        "进入评审的原因是项目已经具备开放模板注册表和一定社区势能，但安全控制与治理模型仍不成熟。",
      ),
      links: [
        {
          label: t("Template registry", "模板注册表"),
          url: "https://github.com/",
        },
        {
          label: t("Governance draft", "治理草案"),
          url: "https://osf.io/",
        },
        {
          label: t("Adoption notes", "采用记录"),
          url: "https://figshare.com/",
        },
      ],
    },
    thesisChecks: [
      t("The template schema is open and versioned.", "模板 schema 已公开，并具备版本管理。"),
      t(
        "Two faculty advisors are publicly attached to governance review.",
        "已有两位导师公开参与治理审查。",
      ),
    ],
    concernChecks: [
      t(
        "No automated safety review exists yet for submitted circuits.",
        "提交电路还没有自动化安全审查机制。",
      ),
      t(
        "Most adoption evidence comes from short pilot bursts, not semester-scale use.",
        "大部分采用证据来自短期试点，而非学期级长期使用。",
      ),
    ],
    evidence: [
      {
        label: t("Open template registry", "开放模板注册表"),
        detail: t(
          "Schema, changelog, and contributor history are visible and versioned.",
          "Schema、变更记录和贡献者历史都可见，且具备版本管理。",
        ),
        claim: t(
          "Templates can be reviewed and reused without hidden ownership.",
          "模板可以在没有隐性所有权的前提下被复查和复用。",
        ),
        weight: 22,
        status: "verified",
        sourceType: t("Repository", "仓库"),
        sourceLabel: t("Template registry repo", "模板注册表仓库"),
        sourceUrl: "https://github.com/",
        submittedBy: t("Platform engineer", "平台工程负责人"),
        verifiedBy: t("Committee ops", "委员会运营"),
        lastChecked: "2026-03-17",
      },
      {
        label: t("Safety oversight", "安全监督"),
        detail: t(
          "Human advisory review exists, but no continuous screening pipeline is live.",
          "已有人工作业审查，但尚未形成持续筛查流程。",
        ),
        claim: t(
          "Risky circuit submissions can be caught before publication.",
          "高风险电路提交能够在发布前被拦截。",
        ),
        weight: 16,
        status: "partial",
        sourceType: t("Policy memo", "政策备忘录"),
        sourceLabel: t("Advisory board draft", "顾问委员会草案"),
        sourceUrl: "https://osf.io/",
        submittedBy: t("Governance lead", "治理负责人"),
        verifiedBy: t("Ariel Tan", "陈雅睿"),
        lastChecked: "2026-03-23",
      },
      {
        label: t("Pilot adoption", "试点采用情况"),
        detail: t(
          "4 student teams reused templates during a two-week sprint.",
          "有 4 个学生团队在两周冲刺期间复用了模板。",
        ),
        claim: t(
          "The product already changes actual lab setup behavior.",
          "产品已经开始改变真实实验室的搭建行为。",
        ),
        weight: 12,
        status: "watch",
        sourceType: t("Usage report", "使用报告"),
        sourceLabel: t("Sprint adoption notes", "冲刺采用记录"),
        sourceUrl: "https://figshare.com/",
        submittedBy: t("Program operator", "项目运营负责人"),
        verifiedBy: t("Pending semester cohort", "等待学期群体复核"),
        lastChecked: "2026-03-02",
      },
      {
        label: t("Operator credibility", "执行团队可信度"),
        detail: t(
          "The core team is credible, but has not shipped a platform at this scale before.",
          "核心团队背景可信，但此前没有交付过这一规模的平台产品。",
        ),
        claim: t(
          "The team can operate the registry beyond a pilot stage.",
          "团队有能力把注册表从试点推向长期运营。",
        ),
        weight: 14,
        status: "partial",
        sourceType: t("Operating record", "运营记录"),
        sourceLabel: t("Prior lab tooling archive", "既往实验室工具档案"),
        sourceUrl: "https://github.com/",
        submittedBy: t("Founding team", "创始团队"),
        verifiedBy: t("Committee ops", "委员会运营"),
        lastChecked: "2026-03-10",
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
          "Human review will not scale if submissions rise sharply.",
          "如果提交量快速增加，纯人工审查将难以扩展。",
        ),
      },
      {
        severity: "high",
        title: t("Governance still centralized", "治理仍然过于中心化"),
        detail: t(
          "Template approvals still rely on a small founding group.",
          "模板审批仍依赖一个很小的创始团队。",
        ),
      },
    ],
    updates: [
      {
        date: "2026-03-18",
        title: t("Advisory board minutes published", "顾问委员会纪要已公开"),
        detail: t(
          "The board agreed on a mandatory rubric for higher-risk submissions.",
          "委员会就高风险提交建立了强制审查标准。",
        ),
      },
      {
        date: "2026-03-02",
        title: t("Volunteer reviewer shortage", "志愿审查员不足"),
        detail: t(
          "Three template requests are waiting beyond target SLA.",
          "有 3 个模板申请已超出目标处理时限。",
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
    askValue: 240000,
    summary: t(
      "A materials discovery collective promising a room-temperature superconductor class through citizen science and AI screening.",
      "一个材料发现团队，宣称将通过公民科研与 AI 筛选结合，找到室温超导材料类别。",
    ),
    thesis: t(
      "A wider contributor network plus model-assisted search will uncover hidden compounds that traditional grant cycles ignore.",
      "更广泛的贡献者网络和模型辅助搜索，能够发现传统资助机制忽略的潜在化合物。",
    ),
    trustScore: 42,
    evidenceCoverage: 35,
    anomalyRisk: 66,
    momentum: 79,
    communityConfidence: 39,
    submission: {
      submittedBy: t("QuantumLoop campaign team", "QuantumLoop 筹资团队"),
      submittedAt: "2026-03-09",
      reviewWindow: t("Rapid diligence review", "快速尽调评审"),
      requestedSupport: t("$240k unrestricted support", "$24 万美元无条件支持"),
      requestedUse: t(
        "General operating runway, contributor incentives, and exploratory lab expenses.",
        "一般运营资金、贡献者激励和探索性实验费用。",
      ),
      intakeReason: t(
        "Entered review because the campaign has strong visibility, but core evidence remains closed and the support request is not tied to deliverables.",
        "进入评审的原因是项目传播势能很强，但核心证据仍然封闭，而且支持请求没有绑定交付物。",
      ),
      links: [
        {
          label: t("Campaign page", "筹资页面"),
          url: "https://github.com/",
        },
        {
          label: t("Technical AMA notes", "技术 AMA 记录"),
          url: "https://osf.io/",
        },
        {
          label: t("Public updates", "公开更新"),
          url: "https://figshare.com/",
        },
      ],
    },
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
        claim: t(
          "The core materials result can already be inspected by outside reviewers.",
          "外部评审已经可以检查核心材料结果。",
        ),
        weight: 8,
        status: "watch",
        sourceType: t("Campaign brief", "项目简报"),
        sourceLabel: t("Public explainer deck", "公开说明材料"),
        sourceUrl: "https://figshare.com/",
        submittedBy: t("Campaign operator", "筹资运营负责人"),
        verifiedBy: t("No technical verifier attached", "暂无技术验证人"),
        lastChecked: "2026-03-21",
      },
      {
        label: t("Independent replication", "独立复现"),
        detail: t(
          "No outside lab has confirmed the headline result.",
          "还没有外部实验室确认其核心结果。",
        ),
        claim: t(
          "The headline claim survives independent verification.",
          "核心结论能够经受独立验证。",
        ),
        weight: 4,
        status: "missing",
        sourceType: t("Replication memo", "复现备忘录"),
        sourceLabel: t("Partner lab validation", "合作实验室验证"),
        sourceUrl: "https://osf.io/",
        submittedBy: t("Pending partner lab", "待补合作实验室"),
        verifiedBy: t("Not available", "暂无"),
        lastChecked: "2026-03-19",
      },
      {
        label: t("Funding structure", "资金结构"),
        detail: t(
          "The support request is unrestricted and not milestone bound.",
          "当前支持请求不设限制，也没有里程碑约束。",
        ),
        claim: t(
          "Backers can still control downside after the first release.",
          "支持者在第一笔释放后仍然能够控制下行风险。",
        ),
        weight: 6,
        status: "missing",
        sourceType: t("Budget request", "预算请求"),
        sourceLabel: t("Support ask memo", "支持请求备忘录"),
        sourceUrl: "https://github.com/",
        submittedBy: t("Program operator", "项目运营负责人"),
        verifiedBy: t("Finance review pending", "等待资金审查"),
        lastChecked: "2026-03-07",
      },
      {
        label: t("Narrative traction", "叙事传播力"),
        detail: t(
          "Campaign visibility is high across social channels and endorsements.",
          "项目在社交渠道和背书中的传播势能都很强。",
        ),
        claim: t(
          "Visibility is being mistaken for proof quality.",
          "外部可见度正在被误认为是证据质量。",
        ),
        weight: 20,
        status: "verified",
        sourceType: t("Campaign analytics", "传播分析"),
        sourceLabel: t("Visibility dashboard", "传播看板"),
        sourceUrl: "https://figshare.com/",
        submittedBy: t("Campaign team", "筹资团队"),
        verifiedBy: t("Committee ops", "委员会运营"),
        lastChecked: "2026-03-21",
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
    priority: "high",
    committeeStatus: "draft",
    lastTouched: "2026-03-26",
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
    priority: "medium",
    committeeStatus: "blocked",
    lastTouched: "2026-03-23",
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
    priority: "high",
    committeeStatus: "blocked",
    lastTouched: "2026-03-25",
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
