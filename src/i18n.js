export const verdictLabels = {
  en: {
    doNotSupport: "Hold",
    watchOnly: "Watch only",
    supportConditionally: "Conditional support",
    supportNow: "Ready to structure",
  },
  zh: {
    doNotSupport: "暂缓处理",
    watchOnly: "继续观察",
    supportConditionally: "条件支持",
    supportNow: "可进入结构化支持",
  },
};

export const policyLabels = {
  en: {
    milestoneGrant: "Exploration Grant",
    replicationGate: "Replication Gate",
    watchlistOnly: "Watchlist Only",
    declineHold: "Hold and archive",
  },
  zh: {
    milestoneGrant: "探索型资助",
    replicationGate: "复现门槛支持",
    watchlistOnly: "仅观察，不释放资金",
    declineHold: "暂缓并归档",
  },
};

export const activityTypeLabels = {
  en: {
    all: "All",
    internal: "Internal notes",
    system: "System actions",
    external: "Project updates",
  },
  zh: {
    all: "全部",
    internal: "内部备注",
    system: "系统动作",
    external: "项目更新",
  },
};

export const reasonLabels = {
  en: {
    strongEvidence: "Inspectable proof already covers a meaningful part of the thesis.",
    thinEvidence: "The thesis is still ahead of the available proof.",
    deliveryStrong: "Previous delivery history lowers execution uncertainty.",
    deliveryThin: "Execution confidence still relies too much on team claims.",
    controlsOpen: "Open requests and governance controls are within the current policy.",
    controlsBlocked: "Outstanding requests or governance blockers still constrain release.",
    riskContained: "Failure modes are visible and currently bounded.",
    riskElevated: "Visible failure modes are still severe enough to distort the decision.",
  },
  zh: {
    strongEvidence: "可检查证据已经覆盖了核心论点的相当一部分。",
    thinEvidence: "当前论点仍然跑在已有证据前面。",
    deliveryStrong: "既往履约记录有效降低了执行不确定性。",
    deliveryThin: "当前执行信心仍过度依赖团队陈述。",
    controlsOpen: "补证请求和治理控制仍在当前政策可承受范围内。",
    controlsBlocked: "未完成补证或治理阻塞仍然约束资金释放。",
    riskContained: "当前失败模式已经被看见，并且仍在可控范围内。",
    riskElevated: "当前失败模式仍足够严重，会扭曲决策结果。",
  },
};

export const uiCopy = {
  en: {
    consoleLabel: "OPENSCI Review Workspace",
    metaDescription:
      "A reviewer workspace for evaluating research submissions, tracing evidence provenance, and packaging milestone-based support decisions.",
    language: {
      zh: "中",
      en: "EN",
    },
    languageSwitchLabel: "Switch language",
    topbarTitle: "Research review workspace",
    topbarLede:
      "Review incoming projects, trace evidence provenance, package milestone-based support, and keep the full decision trail visible.",
    workspaceStatus: {
      queue: "Inbox",
      summary: "Case summary",
      review: "Evidence & review",
      packet: "Decision packet",
    },
    inbox: {
      eyebrow: "Inbox",
      title: "Active review queue",
      description:
        "Triage projects by stage, evidence pressure, and next decision gate instead of reading static showcase cards.",
      search: "Search project or domain",
      stageFilter: "Stage",
      ownerFilter: "Owner",
      sort: "Sort",
      allStages: "All stages",
      allOwners: "All owners",
      sortOptions: {
        nextDecision: "Next decision date",
        highestRisk: "Highest risk",
        highestEvidenceGap: "Largest evidence gap",
      },
      empty: "No projects match the current filters.",
      nextDecision: "Next gate",
      owner: "Owner",
      openRequests: "Open requests",
      trust: "Trust",
      evidence: "Evidence",
      risk: "Risk",
      lastTouched: "Last touched",
      priority: {
        high: "High priority",
        medium: "Medium priority",
        low: "Low priority",
      },
    },
    workflowStages: {
      submitted: {
        label: "Submitted",
        caption: "Intake package created",
      },
      evidence: {
        label: "Evidence review",
        caption: "Missing proof is being requested",
      },
      governance: {
        label: "Governance check",
        caption: "Risk and policy controls are challenged",
      },
      decision: {
        label: "Decision design",
        caption: "Support package is being locked",
      },
      monitoring: {
        label: "Monitoring",
        caption: "Signals are watched after release",
      },
    },
    caseSummary: {
      eyebrow: "Case summary",
      title: "Submission snapshot",
      description:
        "The case header should tell reviewers who submitted the project, what support is being requested, and why the case is in this review cycle.",
      thesis: "Core claim under review",
      intakeReason: "Why this case is here",
      requestedSupport: "Requested support",
      requestedUse: "Requested use of funds",
      submittedBy: "Submitted by",
      submittedAt: "Submitted at",
      reviewWindow: "Review window",
      quickMetrics: "Decision snapshot",
      topRisks: "Top risks",
      links: "Reference links",
      lastTouched: "Last touched",
      owner: "Review owner",
    },
    quickMetrics: {
      verdict: "Current posture",
      evidence: "Evidence coverage",
      trust: "Trust score",
      risk: "Anomaly risk",
    },
    reviewSection: {
      eyebrow: "Evidence & review",
      title: "Provenance and review operations",
      description:
        "Every evidence row should carry a source, a verifier, and a last-check date. Every action should capture why it happened and who owns the next step.",
    },
    evidenceSection: {
      title: "Evidence provenance",
      description:
        "Proof stays reviewable when its source, verifier, and claim linkage remain visible.",
      claim: "Claim supported",
      source: "Source",
      submittedBy: "Submitted by",
      verifiedBy: "Verified by",
      lastChecked: "Last checked",
      openSource: "Open source",
      weights: "Weight",
    },
    requestSection: {
      title: "Open requests",
      description:
        "Uncertainty should be converted into owned work with a due date, not left as a vague caution flag.",
      owner: "Owner",
      due: "Due",
      markReceived: "Mark received",
      empty: "No open evidence requests on this case.",
      statuses: {
        needsRequest: "needs request",
        requested: "requested",
        received: "received",
      },
    },
    actionComposer: {
      title: "Action composer",
      description:
        "Operational actions should include a reason, an owner, and a next checkpoint before they hit the case log.",
      action: "Action",
      request: "Request item",
      owner: "Owner",
      due: "Next checkpoint",
      reason: "Decision rationale",
      placeholder:
        "Write the rationale that should appear in the case log and decision packet...",
      submit: "Apply action",
      actions: {
        requestEvidence: "Request evidence",
        flagRisk: "Escalate risk",
        approveTranche: "Approve next tranche",
        moveToWatchlist: "Move to watchlist",
        removeFromWatchlist: "Remove from watchlist",
      },
      helper:
        "This composer replaces one-click state changes with review actions that carry context.",
      blocked: "This action is currently blocked by policy or stage.",
    },
    activitySection: {
      eyebrow: "Activity",
      title: "Unified case activity",
      description:
        "Internal notes, system actions, and project updates should live on one timeline so future reviewers can reconstruct the full decision path.",
      addNote: "Add review note",
      notePlaceholder:
        "Capture what changed, what still worries you, or what the next reviewer should keep in mind.",
      saveNote: "Save note",
      empty: "No activity yet for the selected filter.",
    },
    activityPills: {
      internal: "Internal",
      system: "System",
      external: "Project",
    },
    decisionPacket: {
      eyebrow: "Decision packet",
      title: "Package the committee-facing decision",
      description:
        "A publishable review product should end in a concrete packet, not in a freeform score playground.",
      template: "Policy template",
      committeeStatus: "Committee status",
      recommendedAmount: "Recommended amount",
      nextGate: "Next decision gate",
      owner: "Packet owner",
      releasePlan: "Funding plan",
      controls: "Policy controls",
      blockers: "Remaining blockers",
      noBlockers: "No blocking items remain under the current policy.",
      copy: "Copy packet memo",
      copied: "Copied",
      queue: "Queue for committee",
      queued: "Queued for committee",
      notReady: "Not ready for committee",
      noReleaseTitle: "No capital release",
      noReleaseValue: "Hold",
      releaseLabel: "Release",
      status: {
        draft: "Draft",
        blocked: "Blocked",
        queued: "Queued",
      },
      templates: {
        milestoneGrant: {
          summary:
            "Structure a milestone-based exploration grant with staged release and visible verification checkpoints.",
          controls: [
            "No unrestricted release outside milestone proofs.",
            "Independent benchmark must stay attached before later tranches.",
            "Utility evidence is reviewed again before the final release.",
          ],
        },
        replicationGate: {
          summary:
            "Release only a constrained support package after replication and governance blockers narrow further.",
          controls: [
            "Safety or governance blockers must clear before the second tranche.",
            "Missing evidence requests stay open on the packet until closed.",
            "Committee keeps the right to pause the package after checkpoint review.",
          ],
        },
        watchlistOnly: {
          summary:
            "Do not release capital yet. Keep the case visible, request missing proof, and re-open only when the evidence base changes.",
          controls: [
            "No capital leaves the program while the case is watchlisted.",
            "Raw proof and external validation stay mandatory for re-entry.",
            "The next review gate focuses on evidence, not campaign momentum.",
          ],
        },
        declineHold: {
          summary:
            "Archive the current packet until the submission changes materially. The current decision posture does not justify active packaging.",
          controls: [
            "No committee slot is used while the case stays archived.",
            "A fresh submission is required before review restarts.",
            "Only material evidence changes reopen diligence.",
          ],
        },
      },
    },
    committee: {
      ready: "Ready to queue",
      blocked: "Blocked by current policy",
    },
    blockers: {
      stage: "The case has not reached a decision-design stage yet.",
      watchlist: "The case is still on the watchlist.",
      evidence: "There are unresolved evidence requests.",
      risk: "Risk flags are still above the committee threshold.",
      queued: "This packet is already queued for committee review.",
    },
    badges: {
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
      low: "Low severity",
      medium: "Medium severity",
      high: "High severity",
    },
  },
  zh: {
    consoleLabel: "OPENSCI 评审工作台",
    metaDescription: "一个面向科研项目评审、证据溯源与里程碑支持决策打包的工作台。",
    language: {
      zh: "中",
      en: "EN",
    },
    languageSwitchLabel: "切换语言",
    topbarTitle: "科研项目评审工作台",
    topbarLede:
      "处理待评审项目、追踪证据来源链、生成里程碑支持方案，并让整条决策轨迹保持可见。",
    workspaceStatus: {
      queue: "Inbox",
      summary: "案件摘要",
      review: "证据与评审",
      packet: "决策包",
    },
    inbox: {
      eyebrow: "Inbox",
      title: "活跃评审队列",
      description: "按阶段、证据压力和下个决策节点处理项目，而不是浏览静态展示卡片。",
      search: "搜索项目或领域",
      stageFilter: "阶段",
      ownerFilter: "负责人",
      sort: "排序",
      allStages: "全部阶段",
      allOwners: "全部负责人",
      sortOptions: {
        nextDecision: "按下个决策节点",
        highestRisk: "按风险从高到低",
        highestEvidenceGap: "按证据缺口从大到小",
      },
      empty: "当前筛选条件下没有匹配项目。",
      nextDecision: "下个节点",
      owner: "负责人",
      openRequests: "未完成补证",
      trust: "信任",
      evidence: "证据",
      risk: "风险",
      lastTouched: "最近处理",
      priority: {
        high: "高优先级",
        medium: "中优先级",
        low: "低优先级",
      },
    },
    workflowStages: {
      submitted: {
        label: "项目入池",
        caption: "已创建 intake 包",
      },
      evidence: {
        label: "证据审查",
        caption: "缺失材料正在补齐",
      },
      governance: {
        label: "治理复核",
        caption: "风险与政策控制正在复查",
      },
      decision: {
        label: "决策设计",
        caption: "支持方案正在锁定",
      },
      monitoring: {
        label: "持续监控",
        caption: "释放后继续观察信号",
      },
    },
    caseSummary: {
      eyebrow: "案件摘要",
      title: "提交快照",
      description:
        "案件头部应该直接告诉评审者：谁提交了项目、申请了什么资源、以及它为什么会进入这轮评审。",
      thesis: "正在判断的核心论点",
      intakeReason: "进入本轮评审的原因",
      requestedSupport: "申请支持",
      requestedUse: "资金用途",
      submittedBy: "提交方",
      submittedAt: "提交时间",
      reviewWindow: "评审窗口",
      quickMetrics: "决策快照",
      topRisks: "重点风险",
      links: "参考链接",
      lastTouched: "最近处理",
      owner: "评审负责人",
    },
    quickMetrics: {
      verdict: "当前姿态",
      evidence: "证据覆盖",
      trust: "信任分",
      risk: "异常风险",
    },
    reviewSection: {
      eyebrow: "证据与评审",
      title: "证据来源链与评审动作",
      description:
        "每条证据都需要有来源、验证人和最后检查时间。每个动作都应该记录原因、责任人和下一个检查点。",
    },
    evidenceSection: {
      title: "证据来源链",
      description: "当来源、验证人和所支撑的论点都保持可见时，证据才真正可复查。",
      claim: "支撑的论点",
      source: "来源",
      submittedBy: "提交人",
      verifiedBy: "验证人",
      lastChecked: "最后检查",
      openSource: "打开来源",
      weights: "权重",
    },
    requestSection: {
      title: "未完成补证",
      description: "不确定性应该被转成有负责人和截止时间的工作项，而不是模糊的风险提示。",
      owner: "责任人",
      due: "截止时间",
      markReceived: "标记为已收到",
      empty: "当前案件没有未完成补证。",
      statuses: {
        needsRequest: "待发起",
        requested: "已请求",
        received: "已收到",
      },
    },
    actionComposer: {
      title: "动作编辑器",
      description: "高风险操作不应该一键生效，而应该先补齐原因、责任人和下一个检查点。",
      action: "动作类型",
      request: "补证项",
      owner: "责任人",
      due: "下个检查点",
      reason: "处理依据",
      placeholder: "写下应该进入案件日志和决策包的判断依据……",
      submit: "执行动作",
      actions: {
        requestEvidence: "发起补证请求",
        flagRisk: "升级风险",
        approveTranche: "批准下一笔 tranche",
        moveToWatchlist: "移入观察名单",
        removeFromWatchlist: "移出观察名单",
      },
      helper: "这个编辑器用带上下文的评审动作替代了一键式状态切换。",
      blocked: "当前阶段或政策条件不允许执行这个动作。",
    },
    activitySection: {
      eyebrow: "活动流",
      title: "统一案件时间线",
      description:
        "内部备注、系统动作和项目更新应该在同一条时间线上，方便后续评审者完整还原决策路径。",
      addNote: "添加评审备注",
      notePlaceholder: "记录这次判断变化、剩余疑点，或留给下一位评审者的提醒。",
      saveNote: "保存备注",
      empty: "当前筛选下还没有活动记录。",
    },
    activityPills: {
      internal: "内部",
      system: "系统",
      external: "项目",
    },
    decisionPacket: {
      eyebrow: "决策包",
      title: "输出可提交委员会的支持方案",
      description: "一个接近发布的评审产品，终点应该是决策包，而不是自由调参面板。",
      template: "政策模板",
      committeeStatus: "委员会状态",
      recommendedAmount: "建议额度",
      nextGate: "下个决策节点",
      owner: "决策包负责人",
      releasePlan: "资金计划",
      controls: "政策控制项",
      blockers: "剩余阻塞项",
      noBlockers: "在当前政策下，暂时没有阻塞项。",
      copy: "复制决策备忘录",
      copied: "已复制",
      queue: "加入委员会队列",
      queued: "已加入委员会队列",
      notReady: "当前不可提交委员会",
      noReleaseTitle: "不释放资金",
      noReleaseValue: "保持观察",
      releaseLabel: "释放",
      status: {
        draft: "草稿",
        blocked: "阻塞中",
        queued: "已排队",
      },
      templates: {
        milestoneGrant: {
          summary: "按里程碑设计探索型资助，分阶段释放，并保留显式验证检查点。",
          controls: [
            "没有里程碑证明时，不得做无条件释放。",
            "后续 tranche 前必须继续保留独立基准验证。",
            "最终释放前需要再次复核实际效用证据。",
          ],
        },
        replicationGate: {
          summary: "只在复现与治理阻塞进一步收窄后，才释放受约束的支持方案。",
          controls: [
            "第二笔 tranche 前必须清除安全或治理阻塞项。",
            "未关闭的补证请求必须继续留在决策包中。",
            "委员会在检查点后保留暂停支持的权利。",
          ],
        },
        watchlistOnly: {
          summary: "当前不释放资金。继续保留案件可见性、补齐缺失证据，并在证据基础变化后重开评审。",
          controls: [
            "案件处于观察名单期间，不得释放资金。",
            "原始证据和外部验证仍是重新进入主动评审的前提。",
            "下一次复核聚焦证据，而不是传播势能。",
          ],
        },
        declineHold: {
          summary: "将当前案件暂缓归档，直到提交内容发生实质变化。当前姿态不足以继续进入打包流程。",
          controls: [
            "案件归档期间，不占用委员会评审槽位。",
            "重新启动评审前，需要新的提交版本。",
            "只有实质性证据变化才会触发重新尽调。",
          ],
        },
      },
    },
    committee: {
      ready: "可加入委员会队列",
      blocked: "当前政策阻塞",
    },
    blockers: {
      stage: "案件尚未进入可设计决策包的阶段。",
      watchlist: "案件仍停留在观察名单中。",
      evidence: "当前仍有未关闭的补证请求。",
      risk: "风险标记仍高于委员会阈值。",
      queued: "这个决策包已经在委员会队列中了。",
    },
    badges: {
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
      low: "低级风险",
      medium: "中级风险",
      high: "高级风险",
    },
  },
};

export function readText(value, lang) {
  if (value && typeof value === "object" && "en" in value && "zh" in value) {
    return value[lang];
  }

  return value;
}
