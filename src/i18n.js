export const verdictLabels = {
  en: {
    doNotSupport: "Do not support",
    watchOnly: "Watch only",
    supportConditionally: "Support conditionally",
    supportNow: "Support now",
  },
  zh: {
    doNotSupport: "暂不支持",
    watchOnly: "继续观察",
    supportConditionally: "有条件支持",
    supportNow: "现在支持",
  },
};

export const postureCopy = {
  en: {
    success: {
      label: "High conviction",
      copy: "The thesis is already supported by enough inspectable proof to start backing now, while still keeping later tranches gated.",
    },
    warning: {
      label: "Conditional support",
      copy: "The project is promising, but support should stay tightly structured around verification and milestone proof.",
    },
    neutral: {
      label: "Observation mode",
      copy: "The right move is to keep the project in view and wait for higher-quality evidence before committing real resources.",
    },
    danger: {
      label: "Hold position",
      copy: "Narrative momentum is currently outrunning trustworthy evidence, so the product should help the user avoid a premature decision.",
    },
  },
  zh: {
    success: {
      label: "高把握度",
      copy: "当前论点已经有足够多可检查的证据支撑，可以开始支持，但后续资源仍应绑定里程碑释放。",
    },
    warning: {
      label: "条件支持",
      copy: "项目方向有潜力，但支持动作必须更强地绑定验证和阶段性证明。",
    },
    neutral: {
      label: "观察模式",
      copy: "更合理的动作是继续追踪，等待更高质量证据出现后再做真实投入。",
    },
    danger: {
      label: "保持克制",
      copy: "当前传播势能已经跑在可信证据前面，产品应帮助用户避免过早决策。",
    },
  },
};

export const reasonLabels = {
  en: {
    trustStrong: "The team's delivery history lowers execution risk.",
    trustWeak: "Trust is still concentrated in claims rather than delivered proof.",
    evidenceStrong: "Evidence coverage is broad enough to justify milestone-based support.",
    evidenceWeak: "Evidence coverage is too thin for full upfront commitment.",
    stagedOn: "Staged release cuts downside if future checkpoints miss.",
    stagedOff: "Without staged release, the user absorbs too much uncertainty early.",
    replicationOn: "Independent replication is required before higher commitment.",
    replicationOff: "Skipping replication raises the chance of backing inflated results.",
  },
  zh: {
    trustStrong: "团队过往的交付记录有效降低了执行风险。",
    trustWeak: "当前信任仍主要建立在陈述上，而不是已完成的交付上。",
    evidenceStrong: "证据覆盖已经足够广，能够支撑基于里程碑的支持方式。",
    evidenceWeak: "证据覆盖仍然偏薄，不足以支撑一次性前置投入。",
    stagedOn: "分阶段释放可以在后续检查点失守时显著降低下行风险。",
    stagedOff: "如果不做分阶段释放，用户会在早期承担过多不确定性。",
    replicationOn: "在更大额度支持前，引入第三方复现是必要条件。",
    replicationOff: "跳过复现会显著提高支持到被夸大结果的概率。",
  },
};

export const uiCopy = {
  en: {
    consoleLabel: "OPENSCI Project Support Console",
    language: {
      zh: "中",
      en: "EN",
    },
    heroKickers: ["milestone review", "missing-proof triage", "fraud-aware controls"],
    heroTitle: "Review scientific projects before trust turns into capital.",
    heroLede:
      "A reviewer workspace for milestone-based scientific support: inspect evidence, request missing proof, set tranche gates, and monitor whether a project keeps earning support.",
    heroChips: [
      "Milestone funding",
      "Evidence requests",
      "Attribution signals",
      "Audit trail",
    ],
    currentFocus: "Current focus",
    reviewProtocol: "Review protocol",
    currentAsk: "Current ask",
    milestoneConfidence: "Milestone confidence",
    primaryAlert: "Primary alert",
    protocol: [
      {
        title: "Read the claim",
        description: "Make the project thesis explicit before looking at support momentum.",
      },
      {
        title: "Stress the proof",
        description: "Weight inspectable artifacts above narrative, popularity, or polished updates.",
      },
      {
        title: "Stage the support",
        description: "Convert belief into tranches so the downside stays bounded.",
      },
    ],
    overview: {
      decisionPosture: "Decision posture",
      currentPhase: "Current phase",
      largestFailureSurface: "Largest failure surface",
      recommendedCommitment: "Recommended commitment",
      currentPhaseHelp:
        "Support should match the maturity of proof, not the ambition of the story.",
      recommendedStaged: "Released in milestone-based tranches.",
      recommendedDirect: "Direct commitment with higher downside exposure.",
    },
    queue: {
      eyebrow: "Project Queue",
      title: "Support candidates",
      description:
        "Each project enters the workspace with live review status, unresolved requests, and recommendation pressure.",
      trust: "Trust",
      evidence: "Evidence",
      risk: "Risk",
      selectedProject: "Selected project",
    },
    workflowStages: {
      submitted: {
        label: "Submitted",
        caption: "Intake packet created",
      },
      evidence: {
        label: "Evidence review",
        caption: "Missing proof is requested",
      },
      governance: {
        label: "Governance check",
        caption: "Risk and controls are challenged",
      },
      decision: {
        label: "Tranche decision",
        caption: "Support structure is locked",
      },
      monitoring: {
        label: "Active monitoring",
        caption: "Signals are watched after approval",
      },
    },
    reviewMeta: {
      owner: "Review owner",
      nextDecision: "Next decision gate",
      openRequests: "Open requests",
      trancheStatus: "Tranches approved",
      watchlist: "Watchlist",
      riskFlags: "Risk flags",
      noteCount: "Reviewer notes",
      complete: "Complete",
      active: "Active",
      pending: "Pending",
    },
    detail: {
      thesisPrompt: "What the user is being asked to believe",
      supportShape: "Support shape",
      decisionReadout: "Decision readout",
      milestoneAverage: "Milestone avg.",
      anomalyLoad: "Anomaly load",
    },
    signalTiles: {
      trust: {
        label: "Trust score",
        note: "Signals whether the operator has earned credibility through previous delivery.",
      },
      evidence: {
        label: "Evidence coverage",
        note: "Measures how much of the thesis is backed by inspectable proof instead of narrative.",
      },
      community: {
        label: "Community confidence",
        note: "Tracks whether external observers are reinforcing the case with real participation.",
      },
      anomaly: {
        label: "Anomaly risk",
        note: "Flags the probability that exaggeration or unverified claims are shaping the perception.",
      },
    },
    sections: {
      decisionThesis: {
        eyebrow: "Decision Thesis",
        title: "What pushes the reviewer forward, and what slows them down?",
        description:
          "A good review product should preserve tension instead of pretending the answer is obvious.",
      },
      evidenceMatrix: {
        eyebrow: "Evidence Matrix",
        title: "Proof is curated and weighted, not dumped into a long page.",
        description:
          "Each evidence row is scored by verifiability, external confirmation, and contribution to the thesis.",
      },
      milestoneLedger: {
        eyebrow: "Milestone Ledger",
        title: "Support is released only when checkpoints still hold.",
        description:
          "This is the product's most important mechanism because it shrinks downside even when the initial judgment is imperfect.",
      },
      anomalyRadar: {
        eyebrow: "Anomaly Radar",
        title: "Where fraud or exaggeration would surface first",
        description:
          "The interface exposes the brittle points so users can understand where the recommendation can fail.",
      },
      reviewFlow: {
        eyebrow: "Review Flow",
        title: "The workspace tracks where the project is in the decision process.",
        description:
          "A real review product needs stage ownership, next gates, and visible bottlenecks, not just a score.",
      },
      actionDock: {
        eyebrow: "Action Dock",
        title: "Reviewers should be able to push the project forward from the same screen.",
        description:
          "Each action updates the review state, changes the operating posture, and writes to the audit trail.",
      },
      requestPanel: {
        eyebrow: "Evidence Requests",
        title: "Missing proof should be managed as work, not hidden as uncertainty.",
        description:
          "Unresolved materials stay visible with owners, deadlines, and request status so reviewers know what is blocking the next gate.",
      },
      reviewerNotes: {
        eyebrow: "Reviewer Notes",
        title: "Capture why the current posture changed.",
        description:
          "Decision quality improves when judgments are documented and revisited instead of living in private memory.",
      },
      auditLog: {
        eyebrow: "Audit Trail",
        title: "Every review action leaves a visible operational trace.",
        description:
          "This makes the decision process inspectable for future reviewers, governance leads, and support operators.",
      },
      feedback: {
        eyebrow: "Continuous Feedback",
        title: "Project signals still need to be watched after committee action.",
        description:
          "For long-cycle research outcomes, the product needs a post-support feedback rail that continuously updates trust.",
      },
      decisionStudio: {
        eyebrow: "Decision Studio",
        title: "Turn belief into a support strategy",
        description:
          "The product should help the user decide how to back a project safely, not just whether they like it.",
      },
    },
    reasonsToLean: "Reasons to lean in",
    reasonsToSlow: "Reasons to slow down",
    supportMode: "Support mode",
    commitmentSize: "Commitment size",
    riskTolerance: "Risk tolerance",
    supportModes: {
      money: "Capital",
      time: "Mentor time",
      participation: "Research seats",
    },
    toggles: {
      staged: "Release support in milestone-based tranches",
      replication: "Require third-party replication before larger commitment",
      escrow: "Place funds in milestone escrow with fallback refund logic",
    },
    supportBlueprint: "Support blueprint",
    actions: {
      requestEvidence: "Request more evidence",
      flagRisk: "Flag risk",
      approveTranche: "Approve tranche",
      moveToWatchlist: "Move to watchlist",
      removeFromWatchlist: "Remove from watchlist",
      helper:
        "The workspace is strongest when the reviewer can act immediately instead of switching into email or spreadsheets.",
    },
    requestStatuses: {
      needsRequest: "needs request",
      requested: "requested",
      received: "received",
    },
    requestPanel: {
      requestNow: "Request now",
      due: "Due",
      owner: "Owner",
      empty: "All required materials are already in motion.",
    },
    notes: {
      placeholder: "Write the rationale behind the next decision gate...",
      save: "Save note",
      empty: "No reviewer notes yet.",
    },
    audit: {
      empty: "No audit activity yet.",
    },
    whyMatters: "Why this matters for OPENSCI",
    whyMattersCopy:
      "This prototype deliberately zooms into the decision layer between OPENSCI's funding, attribution, and collaboration surfaces: milestone funding, inspectable proof, reviewer action logs, and post-decision trust updates.",
    suggestedCommitmentPrefix: "Suggested commitment:",
    badgeLabels: {
      verified: "verified",
      partial: "partial",
      watch: "watch",
      missing: "missing",
    },
    milestoneStatuses: {
      "on track": "on track",
      "needs checkpoint": "needs checkpoint",
      "high uncertainty": "high uncertainty",
      fragile: "fragile",
      "at risk": "at risk",
      "not defined": "not defined",
    },
    severityLabels: {
      low: "low",
      medium: "medium",
      high: "high",
    },
    severitySuffix: "severity",
  },
  zh: {
    consoleLabel: "OPENSCI 项目支持决策台",
    language: {
      zh: "中",
      en: "EN",
    },
    heroKickers: ["里程碑评审", "缺失证据补齐", "防夸大 / 防造假"],
    heroTitle: "在“信任变成投入”之前，先审清科研项目。",
    heroLede:
      "这是一个面向里程碑支持的科研评审工作台：检查证据、补齐缺口、锁定 tranche 释放条件，并持续观察项目是否继续配得上支持。",
    heroChips: ["里程碑资助", "补证请求", "归因信号", "审计轨迹"],
    currentFocus: "当前关注",
    reviewProtocol: "评审流程",
    currentAsk: "当前支持请求",
    milestoneConfidence: "里程碑把握度",
    primaryAlert: "主要警报",
    protocol: [
      {
        title: "先读清论点",
        description: "在看热度和支持势能前，先明确项目到底希望用户相信什么。",
      },
      {
        title: "再压测证据",
        description: "把可检查证据的权重放在叙事、热度和精美包装之前。",
      },
      {
        title: "最后设计支持",
        description: "把“相信”转成分阶段支持方案，而不是一次性全押。",
      },
    ],
    overview: {
      decisionPosture: "当前决策姿态",
      currentPhase: "当前阶段",
      largestFailureSurface: "最大失效面",
      recommendedCommitment: "建议支持额度",
      currentPhaseHelp: "支持强度应该匹配证据成熟度，而不是故事 ambition。",
      recommendedStaged: "建议按里程碑分阶段释放。",
      recommendedDirect: "当前是直接投入，风险敞口更高。",
    },
    queue: {
      eyebrow: "项目队列",
      title: "待支持候选",
      description: "每个项目都带着当前评审状态、未完成补证和决策压力进入工作台。",
      trust: "信任",
      evidence: "证据",
      risk: "风险",
      selectedProject: "已选项目",
    },
    workflowStages: {
      submitted: {
        label: "项目入池",
        caption: "已创建 intake 包",
      },
      evidence: {
        label: "证据审查",
        caption: "补证与核验进行中",
      },
      governance: {
        label: "治理复核",
        caption: "风险与约束条件被重新审视",
      },
      decision: {
        label: "分段决策",
        caption: "支持结构正在锁定",
      },
      monitoring: {
        label: "持续监控",
        caption: "批准后继续观察信号",
      },
    },
    reviewMeta: {
      owner: "评审负责人",
      nextDecision: "下个决策节点",
      openRequests: "未完成补证",
      trancheStatus: "已批准 tranche",
      watchlist: "观察名单",
      riskFlags: "风险标记",
      noteCount: "评审备注",
      complete: "已完成",
      active: "进行中",
      pending: "待开始",
    },
    detail: {
      thesisPrompt: "这个项目希望用户相信什么",
      supportShape: "支持结构",
      decisionReadout: "决策读数",
      milestoneAverage: "里程碑均值",
      anomalyLoad: "异常负荷",
    },
    signalTiles: {
      trust: {
        label: "信任分",
        note: "反映项目操盘方是否通过过往交付累积了真实可信度。",
      },
      evidence: {
        label: "证据覆盖",
        note: "反映核心论点有多少是真正由可检查证据支撑，而不是靠叙事。",
      },
      community: {
        label: "社区信心",
        note: "反映外部观察者是否通过真实参与来强化这个项目的可信性。",
      },
      anomaly: {
        label: "异常风险",
        note: "用于提示当前认知是否正被夸大、包装或未验证信息牵引。",
      },
    },
    sections: {
      decisionThesis: {
        eyebrow: "决策论点",
        title: "哪些信息推动评审向前，哪些信息让评审踩刹车？",
        description: "好的评审产品应该保留张力，而不是假装答案天然明确。",
      },
      evidenceMatrix: {
        eyebrow: "证据矩阵",
        title: "证据应该被整理和加权，而不是直接堆成一长页。",
        description: "每条证据都按可验证性、外部确认和对核心论点的贡献来赋权。",
      },
      milestoneLedger: {
        eyebrow: "里程碑台账",
        title: "只有当检查点仍然成立时，支持才继续释放。",
        description: "这是产品里最关键的机制，因为即使初始判断不完美，它也能缩小下行风险。",
      },
      anomalyRadar: {
        eyebrow: "异常雷达",
        title: "如果项目存在造假或夸大，最先会从哪里暴露出来？",
        description: "界面需要显式暴露脆弱点，让用户知道推荐结论会在哪里失效。",
      },
      reviewFlow: {
        eyebrow: "评审流程",
        title: "工作台需要知道项目现在处于决策流程的哪一步。",
        description: "真实的评审产品必须有阶段归属、下个关口和堵点暴露，而不只是一个分数。",
      },
      actionDock: {
        eyebrow: "动作面板",
        title: "评审员应该能在同一屏里直接推动项目向前。",
        description: "每个动作都会更新评审状态、改变操作姿态，并写入审计轨迹。",
      },
      requestPanel: {
        eyebrow: "补证面板",
        title: "缺失证据应该被当成待办工作管理，而不是含糊地留在“不确定性”里。",
        description: "未完成材料会带着负责人、截止时间和请求状态持续可见，方便判断下一关卡的真实阻塞点。",
      },
      reviewerNotes: {
        eyebrow: "评审备注",
        title: "把当前判断为什么变化记录下来。",
        description: "当判断被记录并可回看时，决策质量会明显高于只存在于个人记忆里的评审过程。",
      },
      auditLog: {
        eyebrow: "审计轨迹",
        title: "每个评审动作都应该留下可追溯的操作痕迹。",
        description: "这能让后续评审员、治理负责人和支持运营同样看清整个过程。",
      },
      feedback: {
        eyebrow: "持续反馈",
        title: "委员会动作发生后，项目信号仍然需要被持续观察。",
        description: "对于长周期科研结果，产品必须持续更新信任，而不是只给一次性评分。",
      },
      decisionStudio: {
        eyebrow: "决策工作台",
        title: "把“相信”变成具体的支持策略",
        description: "产品要帮助用户决定如何安全地支持项目，而不只是决定喜不喜欢它。",
      },
    },
    reasonsToLean: "支持它的理由",
    reasonsToSlow: "让你放慢的理由",
    supportMode: "支持方式",
    commitmentSize: "投入规模",
    riskTolerance: "风险偏好",
    supportModes: {
      money: "资金",
      time: "导师时间",
      participation: "参与席位",
    },
    toggles: {
      staged: "按里程碑分阶段释放支持资源",
      replication: "在更大额度支持前要求第三方复现",
      escrow: "将资金放入里程碑托管并保留回退逻辑",
    },
    supportBlueprint: "支持蓝图",
    actions: {
      requestEvidence: "请求更多证据",
      flagRisk: "标记风险",
      approveTranche: "批准 tranche",
      moveToWatchlist: "移入观察名单",
      removeFromWatchlist: "移出观察名单",
      helper:
        "当评审员可以在同一屏里直接行动，而不是切去邮件和表格时，工作台的价值才真正成立。",
    },
    requestStatuses: {
      needsRequest: "待发起",
      requested: "已请求",
      received: "已收到",
    },
    requestPanel: {
      requestNow: "立即请求",
      due: "截止",
      owner: "责任人",
      empty: "当前所需材料都已经在推进中了。",
    },
    notes: {
      placeholder: "写下下一个决策节点背后的判断依据……",
      save: "保存备注",
      empty: "还没有评审备注。",
    },
    audit: {
      empty: "暂时没有审计记录。",
    },
    whyMatters: "为什么这对 OPENSCI 重要",
    whyMattersCopy:
      "这个原型刻意聚焦在 OPENSCI 的“决策层”上：把资助、归因、协作之间最容易失真的一段流程做实，包括里程碑释放、可检查证据、评审动作记录和支持后的信任更新。",
    suggestedCommitmentPrefix: "建议支持：",
    badgeLabels: {
      verified: "已验证",
      partial: "部分验证",
      watch: "观察中",
      missing: "缺失",
    },
    milestoneStatuses: {
      "on track": "按计划推进",
      "needs checkpoint": "需要额外检查",
      "high uncertainty": "高不确定性",
      fragile: "脆弱",
      "at risk": "存在风险",
      "not defined": "尚未定义",
    },
    severityLabels: {
      low: "低",
      medium: "中",
      high: "高",
    },
    severitySuffix: "级别",
  },
};

export function readText(value, lang) {
  if (value && typeof value === "object" && "en" in value && "zh" in value) {
    return value[lang];
  }

  return value;
}
