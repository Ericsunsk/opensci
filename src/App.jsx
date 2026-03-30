import React, { useEffect, useMemo, useState } from "react";
import { projects, reviewSeeds } from "./data";
import {
  activityTypeLabels,
  policyLabels,
  readText,
  reasonLabels,
  uiCopy,
  verdictLabels,
} from "./i18n";

const severityOrder = {
  low: 1,
  medium: 2,
  high: 3,
};

const reviewStageOrder = ["submitted", "evidence", "governance", "decision", "monitoring"];

const trancheAllocations = [40, 35, 25];
const CURRENT_REVIEW_DATE = "2026-03-30";

const bi = (en, zh) => ({ en, zh });

function cloneReviewSeed(seed) {
  return {
    ...seed,
    evidenceRequests: seed.evidenceRequests.map((item) => ({ ...item })),
    notes: seed.notes.map((item) => ({ ...item })),
    auditLog: seed.auditLog.map((item) => ({ ...item })),
  };
}

function createInitialReviewState() {
  return Object.fromEntries(
    projects.map((project) => [project.id, cloneReviewSeed(reviewSeeds[project.id])]),
  );
}

function createComposerSeed(projectId) {
  const seed = reviewSeeds[projectId];
  const requestIndex = seed.evidenceRequests.findIndex((item) => item.status === "needsRequest");

  return {
    actionType: requestIndex >= 0 ? "requestEvidence" : seed.watchlisted ? "removeFromWatchlist" : "flagRisk",
    requestIndex: requestIndex >= 0 ? requestIndex : 0,
    owner: "",
    due: seed.nextDecision,
    reason: "",
  };
}

function createInitialComposerState() {
  return Object.fromEntries(projects.map((project) => [project.id, createComposerSeed(project.id)]));
}

function parseDateString(value) {
  if (!value.includes("-")) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatReviewDate(value, lang) {
  const parsed = parseDateString(value);

  if (!parsed) {
    return value;
  }

  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: lang === "zh" ? "numeric" : "short",
    day: "numeric",
  }).format(parsed);
}

function formatCurrency(value, lang) {
  if (!value) {
    return lang === "zh" ? "不释放资金" : "No capital release";
  }

  return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function countOpenRequests(review) {
  return review.evidenceRequests.filter((item) => item.status !== "received").length;
}

function computeRecommendation(project, review) {
  const openRequests = countOpenRequests(review);
  const stageBonus =
    review.currentStage === "decision"
      ? 4
      : review.currentStage === "monitoring"
        ? 3
        : review.currentStage === "governance"
          ? 1
          : 0;
  const rawScore =
    project.trustScore * 0.34 +
    project.evidenceCoverage * 0.31 +
    project.communityConfidence * 0.12 +
    project.momentum * 0.08 -
    project.anomalyRisk * 0.22 -
    review.riskFlags * 3.4 -
    openRequests * 2.5 -
    (review.watchlisted ? 6 : 0) +
    review.approvedTranches * 2.5 +
    stageBonus;

  const boundedScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  let verdictKey = "doNotSupport";
  let tone = "danger";

  if (boundedScore >= 72) {
    verdictKey = "supportNow";
    tone = "success";
  } else if (boundedScore >= 56) {
    verdictKey = "supportConditionally";
    tone = "warning";
  } else if (boundedScore >= 42) {
    verdictKey = "watchOnly";
    tone = "neutral";
  }

  let policyKey = "declineHold";

  if (verdictKey === "supportNow") {
    policyKey = "milestoneGrant";
  } else if (verdictKey === "supportConditionally") {
    policyKey = "replicationGate";
  } else if (verdictKey === "watchOnly") {
    policyKey = "watchlistOnly";
  }

  const reasonKeys = [
    project.evidenceCoverage >= 60 ? "strongEvidence" : "thinEvidence",
    project.trustScore >= 65 ? "deliveryStrong" : "deliveryThin",
    openRequests === 0 && review.riskFlags < 3 && !review.watchlisted ? "controlsOpen" : "controlsBlocked",
    project.anomalyRisk >= 45 ? "riskElevated" : "riskContained",
  ];

  return {
    boundedScore,
    verdictKey,
    tone,
    policyKey,
    reasonKeys,
  };
}

function getRecommendedAmount(project, policyKey) {
  if (policyKey === "milestoneGrant") {
    return Math.round((project.askValue * 0.67) / 5000) * 5000;
  }

  if (policyKey === "replicationGate") {
    return Math.round((project.askValue * 0.45) / 5000) * 5000;
  }

  return 0;
}

function getApprovalBlockers(review, recommendation) {
  const blockers = [];
  const openRequests = countOpenRequests(review);
  const stageAllowsDecision = review.currentStage === "decision" || review.currentStage === "monitoring";

  if (!stageAllowsDecision) {
    blockers.push("stage");
  }

  if (review.watchlisted) {
    blockers.push("watchlist");
  }

  if (openRequests > 0) {
    blockers.push("evidence");
  }

  if (review.riskFlags >= 3 || recommendation.verdictKey === "doNotSupport") {
    blockers.push("risk");
  }

  if (review.committeeStatus === "queued") {
    blockers.push("queued");
  }

  return blockers;
}

function buildFundingPlan(project, recommendedAmount, lang, ui) {
  if (!recommendedAmount) {
    return [
      {
        name: ui.decisionPacket.noReleaseTitle,
        due: project.milestones[0]?.due ?? formatReviewDate(CURRENT_REVIEW_DATE, lang),
        amount: ui.decisionPacket.noReleaseValue,
      },
    ];
  }

  return project.milestones.map((milestone, index) => {
    const allocation = trancheAllocations[index] ?? 25;
    const amount = Math.round((recommendedAmount * allocation) / 100 / 1000) * 1000;

    return {
      name: readText(milestone.name, lang),
      due: milestone.due,
      amount: formatCurrency(Math.max(amount, 5000), lang),
    };
  });
}

function mergeActivity(project, review) {
  const internal = review.notes.map((note, index) => ({
    id: `note-${index}-${note.date}`,
    type: "internal",
    tone: "neutral",
    date: note.date,
    title: note.role,
    detail: note.content,
    actor: note.author,
  }));

  const system = review.auditLog.map((entry, index) => ({
    id: `audit-${index}-${entry.date}`,
    type: "system",
    tone: entry.tone,
    date: entry.date,
    title: entry.title,
    detail: entry.detail,
    actor: null,
  }));

  const external = project.updates.map((entry, index) => ({
    id: `update-${index}-${entry.date}`,
    type: "external",
    tone: "neutral",
    date: entry.date,
    title: entry.title,
    detail: entry.detail,
    actor: null,
  }));

  return [...internal, ...system, ...external].sort((left, right) => {
    const leftDate = parseDateString(left.date)?.getTime() ?? 0;
    const rightDate = parseDateString(right.date)?.getTime() ?? 0;
    return rightDate - leftDate;
  });
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState("zh");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [reviewState, setReviewState] = useState(createInitialReviewState);
  const [composerState, setComposerState] = useState(createInitialComposerState);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sortKey, setSortKey] = useState("nextDecision");
  const [activityFilter, setActivityFilter] = useState("all");
  const [noteDrafts, setNoteDrafts] = useState(
    Object.fromEntries(projects.map((project) => [project.id, ""])),
  );
  const [copiedPacketId, setCopiedPacketId] = useState("");

  const ui = uiCopy[lang];
  const t = (value) => readText(value, lang);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = ui.consoleLabel;

    const description =
      document.querySelector('meta[name="description"]') ??
      document.head.appendChild(document.createElement("meta"));

    description.setAttribute("name", "description");
    description.setAttribute("content", ui.metaDescription);
  }, [lang, ui.consoleLabel, ui.metaDescription]);

  const owners = useMemo(() => {
    const uniqueOwners = Array.from(
      new Set(projects.map((project) => t(reviewState[project.id].owner))),
    );

    return uniqueOwners.sort((left, right) => left.localeCompare(right));
  }, [lang, reviewState]);

  const filteredProjects = useMemo(() => {
    const lowerQuery = searchQuery.trim().toLowerCase();

    const matches = projects.filter((project) => {
      const review = reviewState[project.id];
      const matchesQuery =
        lowerQuery.length === 0 ||
        t(project.name).toLowerCase().includes(lowerQuery) ||
        t(project.domain).toLowerCase().includes(lowerQuery);
      const matchesStage = stageFilter === "all" || review.currentStage === stageFilter;
      const matchesOwner = ownerFilter === "all" || t(review.owner) === ownerFilter;

      return matchesQuery && matchesStage && matchesOwner;
    });

    return matches.sort((left, right) => {
      const leftReview = reviewState[left.id];
      const rightReview = reviewState[right.id];

      if (sortKey === "highestRisk") {
        return right.anomalyRisk - left.anomalyRisk;
      }

      if (sortKey === "highestEvidenceGap") {
        return left.evidenceCoverage - right.evidenceCoverage;
      }

      const leftDate = parseDateString(leftReview.nextDecision)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const rightDate =
        parseDateString(rightReview.nextDecision)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return leftDate - rightDate;
    });
  }, [ownerFilter, reviewState, searchQuery, sortKey, stageFilter, lang]);

  useEffect(() => {
    if (filteredProjects.length === 0) {
      return;
    }

    const stillVisible = filteredProjects.some((project) => project.id === selectedId);

    if (!stillVisible) {
      setSelectedId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedId]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [selectedId],
  );
  const selectedReview = reviewState[selectedId];
  const selectedComposer = composerState[selectedId];

  const recommendation = useMemo(
    () => computeRecommendation(selectedProject, selectedReview),
    [selectedProject, selectedReview],
  );
  const requestableOptions = useMemo(
    () =>
      selectedReview.evidenceRequests
        .map((request, index) => ({ request, index }))
        .filter(({ request }) => request.status === "needsRequest"),
    [selectedReview],
  );

  const openRequests = countOpenRequests(selectedReview);
  const primaryAnomaly = selectedProject.anomalies[0];
  const activityItems = useMemo(
    () => mergeActivity(selectedProject, selectedReview),
    [selectedProject, selectedReview],
  );
  const filteredActivity = useMemo(
    () =>
      activityItems.filter((item) => activityFilter === "all" || item.type === activityFilter),
    [activityFilter, activityItems],
  );
  const recommendedAmount = getRecommendedAmount(selectedProject, recommendation.policyKey);
  const approvalBlockers = getApprovalBlockers(selectedReview, recommendation);
  const canQueueCommittee = approvalBlockers.length === 0;
  const canApproveNextTranche =
    selectedReview.approvedTranches < selectedProject.milestones.length &&
    selectedReview.currentStage === "decision" &&
    !selectedReview.watchlisted &&
    openRequests === 0 &&
    selectedReview.riskFlags < 3;
  const fundingPlan = buildFundingPlan(selectedProject, recommendedAmount, lang, ui);

  const packetMemo = useMemo(() => {
    const lines = [
      `${ui.consoleLabel} · ${t(selectedProject.name)}`,
      `${ui.decisionPacket.template}: ${policyLabels[lang][recommendation.policyKey]}`,
      `${ui.decisionPacket.recommendedAmount}: ${formatCurrency(recommendedAmount, lang)}`,
      `${ui.decisionPacket.nextGate}: ${formatReviewDate(selectedReview.nextDecision, lang)}`,
      `${ui.caseSummary.owner}: ${t(selectedReview.owner)}`,
      `${ui.quickMetrics.verdict}: ${verdictLabels[lang][recommendation.verdictKey]}`,
      `${ui.decisionPacket.blockers}: ${
        approvalBlockers.length > 0
          ? approvalBlockers.map((blocker) => ui.blockers[blocker]).join(" / ")
          : ui.decisionPacket.noBlockers
      }`,
    ];

    return lines.join("\n");
  }, [
    approvalBlockers,
    lang,
    recommendation.policyKey,
    recommendation.verdictKey,
    recommendedAmount,
    selectedProject,
    selectedReview.nextDecision,
    selectedReview.owner,
    ui,
    t,
  ]);

  const updateProjectReview = (projectId, updater) => {
    setReviewState((current) => {
      const existing = current[projectId];

      if (!existing) {
        return current;
      }

      const next = updater(existing);
      return next === existing ? current : { ...current, [projectId]: next };
    });
  };

  const updateComposer = (projectId, updater) => {
    setComposerState((current) => {
      const existing = current[projectId] ?? createComposerSeed(projectId);
      const next = typeof updater === "function" ? updater(existing) : { ...existing, ...updater };
      return { ...current, [projectId]: next };
    });
  };

  const prependAudit = (review, entry) => ({
    ...review,
    lastTouched: CURRENT_REVIEW_DATE,
    auditLog: [entry, ...review.auditLog].slice(0, 10),
  });

  const markEvidenceReceived = (requestIndex) => {
    updateProjectReview(selectedId, (review) => {
      const target = review.evidenceRequests[requestIndex];

      if (!target || target.status !== "requested") {
        return review;
      }

      const evidenceRequests = review.evidenceRequests.map((item, index) =>
        index === requestIndex ? { ...item, status: "received" } : item,
      );

      const allEvidenceResolved = evidenceRequests.every((item) => item.status === "received");
      const nextStage = allEvidenceResolved && !review.watchlisted ? "decision" : review.currentStage;

      return prependAudit(
        {
          ...review,
          currentStage: nextStage,
          evidenceRequests,
          committeeStatus: allEvidenceResolved ? "draft" : review.committeeStatus,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "success",
          title: bi("Evidence received", "补证材料已收到"),
          detail: bi(
            `Marked ${target.label.en} as received and kept the case moving.`,
            `已将「${target.label.zh}」标记为收到，并继续推进案件。`,
          ),
        },
      );
    });
  };

  const handleSubmitAction = () => {
    const draft = selectedComposer;
    const reason = draft.reason.trim();

    if (!reason) {
      return;
    }

    updateProjectReview(selectedId, (review) => {
      const ownerValue = draft.owner.trim() || t(review.owner);
      const dueValue = draft.due || review.nextDecision;

      if (draft.actionType === "requestEvidence") {
        const target = review.evidenceRequests[draft.requestIndex];

        if (!target || target.status !== "needsRequest") {
          return review;
        }

        const evidenceRequests = review.evidenceRequests.map((item, index) =>
          index === draft.requestIndex ? { ...item, status: "requested", owner: ownerValue, due: dueValue } : item,
        );

        return prependAudit(
          {
            ...review,
            currentStage: "evidence",
            nextDecision: dueValue,
            committeeStatus: "draft",
            evidenceRequests,
          },
          {
            date: CURRENT_REVIEW_DATE,
            tone: "warning",
            title: bi("Evidence request issued", "已发起补证请求"),
            detail: bi(
              `Requested ${target.label.en}. Rationale: ${reason}`,
              `已发起「${target.label.zh}」补证。依据：${reason}`,
            ),
          },
        );
      }

      if (draft.actionType === "flagRisk") {
        return prependAudit(
          {
            ...review,
            currentStage: "governance",
            nextDecision: dueValue,
            committeeStatus: "blocked",
            riskFlags: review.riskFlags + 1,
          },
          {
            date: CURRENT_REVIEW_DATE,
            tone: "danger",
            title: bi("Risk escalated", "风险已升级"),
            detail: bi(
              `Escalated governance review. Rationale: ${reason}`,
              `已升级治理复核。依据：${reason}`,
            ),
          },
        );
      }

      if (draft.actionType === "approveTranche") {
        if (!canApproveNextTranche) {
          return review;
        }

        const nextApproved = review.approvedTranches + 1;
        const milestone = selectedProject.milestones[nextApproved - 1];

        return prependAudit(
          {
            ...review,
            approvedTranches: nextApproved,
            currentStage: "monitoring",
            nextDecision: dueValue,
            committeeStatus: "draft",
          },
          {
            date: CURRENT_REVIEW_DATE,
            tone: "success",
            title: bi("Next tranche approved", "已批准下一笔 tranche"),
            detail: bi(
              `Approved tranche ${nextApproved} against ${milestone.name.en}. Rationale: ${reason}`,
              `已依据「${milestone.name.zh}」批准第 ${nextApproved} 笔 tranche。依据：${reason}`,
            ),
          },
        );
      }

      const nextWatchlist = draft.actionType === "moveToWatchlist";

      return prependAudit(
        {
          ...review,
          watchlisted: nextWatchlist,
          currentStage: nextWatchlist ? "governance" : "decision",
          nextDecision: dueValue,
          committeeStatus: nextWatchlist ? "blocked" : "draft",
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: nextWatchlist ? "warning" : "neutral",
          title: nextWatchlist
            ? bi("Moved to watchlist", "移入观察名单")
            : bi("Removed from watchlist", "移出观察名单"),
          detail: nextWatchlist
            ? bi(`Paused active packaging. Rationale: ${reason}`, `已暂停主动打包。依据：${reason}`)
            : bi(`Returned the case to active handling. Rationale: ${reason}`, `案件已回到主动处理。依据：${reason}`),
        },
      );
    });

    updateComposer(selectedId, (current) => ({ ...current, reason: "" }));
  };

  const handleSaveNote = () => {
    const draft = noteDrafts[selectedId]?.trim();

    if (!draft) {
      return;
    }

    updateProjectReview(selectedId, (review) => ({
      ...review,
      lastTouched: CURRENT_REVIEW_DATE,
      notes: [
        {
          author: bi("Current reviewer", "当前评审员"),
          role: bi("Reviewer note", "评审备注"),
          date: CURRENT_REVIEW_DATE,
          content: draft,
        },
        ...review.notes,
      ].slice(0, 10),
    }));

    setNoteDrafts((current) => ({ ...current, [selectedId]: "" }));
  };

  const handleQueueCommittee = () => {
    if (!canQueueCommittee) {
      return;
    }

    updateProjectReview(selectedId, (review) =>
      prependAudit(
        {
          ...review,
          committeeStatus: "queued",
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "success",
          title: bi("Packet queued for committee", "决策包已加入委员会队列"),
          detail: bi(
            "The current package is ready for the next committee review window.",
            "当前决策包已进入下一次委员会评审窗口。",
          ),
        },
      ),
    );
  };

  const handleCopyPacket = async () => {
    try {
      await navigator.clipboard.writeText(packetMemo);
      setCopiedPacketId(selectedId);
      window.setTimeout(() => setCopiedPacketId(""), 1600);
    } catch {
      setCopiedPacketId("");
    }
  };

  const recommendationReasons = recommendation.reasonKeys.map((reasonKey) => reasonLabels[lang][reasonKey]);

  return (
    <div className={`app-shell app-shell--${lang}`}>
      <header className="topbar">
        <div className="topbar__copy">
          <p className="eyebrow">{ui.consoleLabel}</p>
          <h1>{ui.topbarTitle}</h1>
          <p>{ui.topbarLede}</p>
        </div>

        <div className="topbar__meta">
          <div className="workspace-pill-list">
            <span>{ui.workspaceStatus.queue}</span>
            <span>{ui.workspaceStatus.summary}</span>
            <span>{ui.workspaceStatus.review}</span>
            <span>{ui.workspaceStatus.packet}</span>
          </div>
          <div className="lang-switch" aria-label="language switch">
            <button
              type="button"
              className={lang === "zh" ? "is-active" : ""}
              aria-pressed={lang === "zh"}
              aria-label={ui.languageSwitchLabel}
              onClick={() => setLang("zh")}
            >
              {ui.language.zh}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              aria-pressed={lang === "en"}
              aria-label={ui.languageSwitchLabel}
              onClick={() => setLang("en")}
            >
              {ui.language.en}
            </button>
          </div>
        </div>
      </header>

      <main className="workspace-shell">
        <aside className="panel panel--inbox">
          <SectionTitle
            eyebrow={ui.inbox.eyebrow}
            title={ui.inbox.title}
            description={ui.inbox.description}
          />

          <div className="filter-grid">
            <label className="field">
              <span>{ui.inbox.search}</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={ui.inbox.search}
              />
            </label>
            <label className="field">
              <span>{ui.inbox.stageFilter}</span>
              <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
                <option value="all">{ui.inbox.allStages}</option>
                {reviewStageOrder.map((stage) => (
                  <option key={stage} value={stage}>
                    {ui.workflowStages[stage].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>{ui.inbox.ownerFilter}</span>
              <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
                <option value="all">{ui.inbox.allOwners}</option>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>{ui.inbox.sort}</span>
              <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                <option value="nextDecision">{ui.inbox.sortOptions.nextDecision}</option>
                <option value="highestRisk">{ui.inbox.sortOptions.highestRisk}</option>
                <option value="highestEvidenceGap">{ui.inbox.sortOptions.highestEvidenceGap}</option>
              </select>
            </label>
          </div>

          <div className="project-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const review = reviewState[project.id];
                const localRecommendation = computeRecommendation(project, review);

                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-card ${selectedId === project.id ? "is-active" : ""}`}
                    onClick={() => setSelectedId(project.id)}
                  >
                    <div className="project-card__topline">
                      <span>{ui.inbox.priority[review.priority]}</span>
                      <strong className={`status-chip status-chip--${localRecommendation.tone}`}>
                        {verdictLabels[lang][localRecommendation.verdictKey]}
                      </strong>
                    </div>
                    <h3>{t(project.name)}</h3>
                    <p>{t(project.summary)}</p>
                    <div className="project-card__meta">
                      <span>{t(project.domain)}</span>
                      <span>{ui.workflowStages[review.currentStage].label}</span>
                    </div>
                    <div className="project-card__stats">
                      <div>
                        <span>{ui.inbox.owner}</span>
                        <strong>{t(review.owner)}</strong>
                      </div>
                      <div>
                        <span>{ui.inbox.nextDecision}</span>
                        <strong>{formatReviewDate(review.nextDecision, lang)}</strong>
                      </div>
                      <div>
                        <span>{ui.inbox.openRequests}</span>
                        <strong>{countOpenRequests(review)}</strong>
                      </div>
                    </div>
                    <div className="project-card__metrics">
                      <div>
                        <span>{ui.inbox.trust}</span>
                        <strong>{project.trustScore}</strong>
                      </div>
                      <div>
                        <span>{ui.inbox.evidence}</span>
                        <strong>{project.evidenceCoverage}</strong>
                      </div>
                      <div>
                        <span>{ui.inbox.risk}</span>
                        <strong>{project.anomalyRisk}</strong>
                      </div>
                    </div>
                    <div className="project-card__footer">
                      <span>{ui.inbox.lastTouched}</span>
                      <strong>{formatReviewDate(review.lastTouched, lang)}</strong>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="empty-state">{ui.inbox.empty}</div>
            )}
          </div>
        </aside>

        <section className="main-column">
          <article className="panel">
            <SectionTitle
              eyebrow={ui.caseSummary.eyebrow}
              title={ui.caseSummary.title}
              description={ui.caseSummary.description}
            />

            <div className="case-header">
              <div className="case-header__copy">
                <div className="case-header__heading">
                  <div>
                    <h2>{t(selectedProject.name)}</h2>
                    <p>{t(selectedProject.summary)}</p>
                  </div>
                  <strong className={`status-chip status-chip--${recommendation.tone}`}>
                    {verdictLabels[lang][recommendation.verdictKey]}
                  </strong>
                </div>

                <div className="chip-row">
                  <span>{t(selectedProject.domain)}</span>
                  <span>{t(selectedProject.phase)}</span>
                  <span>{ui.workflowStages[selectedReview.currentStage].label}</span>
                  <span>{t(selectedReview.owner)}</span>
                </div>

                <div className="summary-grid">
                  <div className="summary-card">
                    <span>{ui.caseSummary.thesis}</span>
                    <strong>{t(selectedProject.thesis)}</strong>
                  </div>
                  <div className="summary-card">
                    <span>{ui.caseSummary.intakeReason}</span>
                    <strong>{t(selectedProject.submission.intakeReason)}</strong>
                  </div>
                  <div className="summary-card">
                    <span>{ui.caseSummary.requestedSupport}</span>
                    <strong>{t(selectedProject.submission.requestedSupport)}</strong>
                  </div>
                  <div className="summary-card">
                    <span>{ui.caseSummary.requestedUse}</span>
                    <strong>{t(selectedProject.submission.requestedUse)}</strong>
                  </div>
                </div>
              </div>

              <div className="case-header__rail">
                <div className="metric-stack">
                  <div className="metric-card">
                    <span>{ui.quickMetrics.verdict}</span>
                    <strong>{recommendation.boundedScore}/100</strong>
                  </div>
                  <div className="metric-card">
                    <span>{ui.quickMetrics.evidence}</span>
                    <strong>{formatPercent(selectedProject.evidenceCoverage)}</strong>
                  </div>
                  <div className="metric-card">
                    <span>{ui.quickMetrics.trust}</span>
                    <strong>{selectedProject.trustScore}/100</strong>
                  </div>
                  <div className="metric-card">
                    <span>{ui.quickMetrics.risk}</span>
                    <strong>{selectedProject.anomalyRisk}/100</strong>
                  </div>
                </div>

                <div className="snapshot-card">
                  <div className="snapshot-card__row">
                    <span>{ui.caseSummary.submittedBy}</span>
                    <strong>{t(selectedProject.submission.submittedBy)}</strong>
                  </div>
                  <div className="snapshot-card__row">
                    <span>{ui.caseSummary.submittedAt}</span>
                    <strong>{formatReviewDate(selectedProject.submission.submittedAt, lang)}</strong>
                  </div>
                  <div className="snapshot-card__row">
                    <span>{ui.caseSummary.reviewWindow}</span>
                    <strong>{t(selectedProject.submission.reviewWindow)}</strong>
                  </div>
                  <div className="snapshot-card__row">
                    <span>{ui.caseSummary.lastTouched}</span>
                    <strong>{formatReviewDate(selectedReview.lastTouched, lang)}</strong>
                  </div>
                  <div className="snapshot-card__row">
                    <span>{ui.caseSummary.owner}</span>
                    <strong>{t(selectedReview.owner)}</strong>
                  </div>
                </div>

                <div className="risk-card">
                  <span>{ui.caseSummary.topRisks}</span>
                  <ul>
                    {selectedProject.anomalies.map((anomaly) => (
                      <li key={t(anomaly.title)}>
                        <strong>{ui.severityLabels[anomaly.severity]}</strong>
                        <p>{t(anomaly.title)}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="link-card">
                  <span>{ui.caseSummary.links}</span>
                  <div className="link-list">
                    {selectedProject.submission.links.map((link) => (
                      <a key={link.url + t(link.label)} href={link.url} target="_blank" rel="noreferrer">
                        {t(link.label)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="review-grid">
            <article className="panel">
              <SectionTitle
                eyebrow={ui.reviewSection.eyebrow}
                title={ui.evidenceSection.title}
                description={ui.evidenceSection.description}
              />

              <div className="evidence-list">
                {selectedProject.evidence.map((item) => (
                  <div key={t(item.label)} className="evidence-card">
                    <div className="evidence-card__header">
                      <div>
                        <strong>{t(item.label)}</strong>
                        <p>{t(item.detail)}</p>
                      </div>
                      <div className="evidence-card__badges">
                        <span className={`badge badge--${item.status}`}>{ui.badges[item.status]}</span>
                        <span className="weight-pill">{item.weight} {ui.evidenceSection.weights}</span>
                      </div>
                    </div>

                    <div className="evidence-card__claim">
                      <span>{ui.evidenceSection.claim}</span>
                      <strong>{t(item.claim)}</strong>
                    </div>

                    <div className="evidence-card__meta">
                      <div>
                        <span>{ui.evidenceSection.source}</span>
                        <strong>{`${t(item.sourceType)} · ${t(item.sourceLabel)}`}</strong>
                      </div>
                      <div>
                        <span>{ui.evidenceSection.submittedBy}</span>
                        <strong>{t(item.submittedBy)}</strong>
                      </div>
                      <div>
                        <span>{ui.evidenceSection.verifiedBy}</span>
                        <strong>{t(item.verifiedBy)}</strong>
                      </div>
                      <div>
                        <span>{ui.evidenceSection.lastChecked}</span>
                        <strong>{formatReviewDate(item.lastChecked, lang)}</strong>
                      </div>
                    </div>

                    <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-link">
                      {ui.evidenceSection.openSource}
                    </a>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <SectionTitle
                eyebrow={ui.reviewSection.eyebrow}
                title={ui.requestSection.title}
                description={ui.reviewSection.description}
              />

              <div className="workflow-stage-strip">
                {reviewStageOrder.map((stageKey, index) => {
                  const currentStageIndex = reviewStageOrder.indexOf(selectedReview.currentStage);
                  const state =
                    index < currentStageIndex ? "complete" : index === currentStageIndex ? "active" : "pending";

                  return (
                    <div key={stageKey} className={`workflow-stage workflow-stage--${state}`}>
                      <div className="workflow-stage__index">{`0${index + 1}`}</div>
                      <div>
                        <strong>{ui.workflowStages[stageKey].label}</strong>
                        <p>{ui.workflowStages[stageKey].caption}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="request-list">
                {selectedReview.evidenceRequests.filter((item) => item.status !== "received").length > 0 ? (
                  selectedReview.evidenceRequests
                    .filter((item) => item.status !== "received")
                    .map((request, index) => {
                      const originalIndex = selectedReview.evidenceRequests.findIndex(
                        (candidate) => candidate === request,
                      );

                      return (
                        <div key={`${request.due}-${t(request.label)}`} className={`request-card request-card--${request.status}`}>
                          <div className="request-card__topline">
                            <strong>{t(request.label)}</strong>
                            <span>{ui.requestSection.statuses[request.status]}</span>
                          </div>
                          <div className="request-card__meta">
                            <span>{`${ui.requestSection.owner} · ${t(request.owner)}`}</span>
                            <span>{`${ui.requestSection.due} · ${formatReviewDate(request.due, lang)}`}</span>
                          </div>
                          {request.status === "requested" ? (
                            <button
                              type="button"
                              className="secondary-button"
                              onClick={() => markEvidenceReceived(originalIndex)}
                            >
                              {ui.requestSection.markReceived}
                            </button>
                          ) : null}
                        </div>
                      );
                    })
                ) : (
                  <div className="empty-state">{ui.requestSection.empty}</div>
                )}
              </div>

              <div className="composer-card">
                <div className="composer-card__header">
                  <h3>{ui.actionComposer.title}</h3>
                  <p>{ui.actionComposer.description}</p>
                </div>

                <div className="composer-grid">
                  <label className="field">
                    <span>{ui.actionComposer.action}</span>
                    <select
                      value={selectedComposer.actionType}
                      onChange={(event) =>
                        updateComposer(selectedId, { actionType: event.target.value })
                      }
                    >
                      <option value="requestEvidence">{ui.actionComposer.actions.requestEvidence}</option>
                      <option value="flagRisk">{ui.actionComposer.actions.flagRisk}</option>
                      <option value="approveTranche">{ui.actionComposer.actions.approveTranche}</option>
                      <option value="moveToWatchlist">{ui.actionComposer.actions.moveToWatchlist}</option>
                      <option value="removeFromWatchlist">{ui.actionComposer.actions.removeFromWatchlist}</option>
                    </select>
                  </label>

                  {selectedComposer.actionType === "requestEvidence" ? (
                    <label className="field">
                      <span>{ui.actionComposer.request}</span>
                      <select
                        value={selectedComposer.requestIndex}
                        onChange={(event) =>
                          updateComposer(selectedId, { requestIndex: Number(event.target.value) })
                        }
                      >
                        {requestableOptions.map(({ request, index }) => (
                          <option key={`${request.due}-${index}`} value={index}>
                            {t(request.label)}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  <label className="field">
                    <span>{ui.actionComposer.owner}</span>
                    <input
                      type="text"
                      value={selectedComposer.owner}
                      onChange={(event) => updateComposer(selectedId, { owner: event.target.value })}
                      placeholder={t(selectedReview.owner)}
                    />
                  </label>

                  <label className="field">
                    <span>{ui.actionComposer.due}</span>
                    <input
                      type="date"
                      value={selectedComposer.due}
                      onChange={(event) => updateComposer(selectedId, { due: event.target.value })}
                    />
                  </label>
                </div>

                <label className="field field--stacked">
                  <span>{ui.actionComposer.reason}</span>
                  <textarea
                    value={selectedComposer.reason}
                    onChange={(event) => updateComposer(selectedId, { reason: event.target.value })}
                    placeholder={ui.actionComposer.placeholder}
                  />
                </label>

                {selectedComposer.actionType === "approveTranche" && !canApproveNextTranche ? (
                  <div className="inline-alert inline-alert--warning">{ui.actionComposer.blocked}</div>
                ) : null}

                <div className="composer-card__footer">
                  <p>{ui.actionComposer.helper}</p>
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleSubmitAction}
                    disabled={
                      !selectedComposer.reason.trim() ||
                      (selectedComposer.actionType === "approveTranche" && !canApproveNextTranche) ||
                      (selectedComposer.actionType === "requestEvidence" && requestableOptions.length === 0)
                    }
                  >
                    {ui.actionComposer.submit}
                  </button>
                </div>
              </div>
            </article>
          </section>

          <article className="panel">
            <SectionTitle
              eyebrow={ui.activitySection.eyebrow}
              title={ui.activitySection.title}
              description={ui.activitySection.description}
            />

            <div className="activity-toolbar">
              <div className="activity-filters">
                {["all", "internal", "system", "external"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={activityFilter === filter ? "is-active" : ""}
                    onClick={() => setActivityFilter(filter)}
                  >
                    {activityTypeLabels[lang][filter]}
                  </button>
                ))}
              </div>

              <div className="note-composer">
                <textarea
                  value={noteDrafts[selectedId] ?? ""}
                  onChange={(event) =>
                    setNoteDrafts((current) => ({ ...current, [selectedId]: event.target.value }))
                  }
                  placeholder={ui.activitySection.notePlaceholder}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleSaveNote}
                  disabled={!noteDrafts[selectedId]?.trim()}
                >
                  {ui.activitySection.saveNote}
                </button>
              </div>
            </div>

            <div className="activity-list">
              {filteredActivity.length > 0 ? (
                filteredActivity.map((item) => (
                  <div key={item.id} className={`activity-row activity-row--${item.tone}`}>
                    <div className="activity-row__date">{formatReviewDate(item.date, lang)}</div>
                    <div className="activity-row__content">
                      <div className="activity-row__topline">
                        <span className={`activity-pill activity-pill--${item.type}`}>
                          {ui.activityPills[item.type]}
                        </span>
                        <strong>{t(item.title)}</strong>
                      </div>
                      <p>{t(item.detail)}</p>
                      {item.actor ? <span className="activity-row__actor">{t(item.actor)}</span> : null}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">{ui.activitySection.empty}</div>
              )}
            </div>
          </article>
        </section>

        <aside className="panel panel--packet">
          <SectionTitle
            eyebrow={ui.decisionPacket.eyebrow}
            title={ui.decisionPacket.title}
            description={ui.decisionPacket.description}
          />

          <div className={`packet-score packet-score--${recommendation.tone}`}>
            <strong>{recommendation.boundedScore}</strong>
            <span>/100</span>
            <p>{verdictLabels[lang][recommendation.verdictKey]}</p>
          </div>

          <div className="packet-grid">
            <div>
              <span>{ui.decisionPacket.template}</span>
              <strong>{policyLabels[lang][recommendation.policyKey]}</strong>
            </div>
            <div>
              <span>{ui.decisionPacket.committeeStatus}</span>
              <strong>{ui.decisionPacket.status[selectedReview.committeeStatus]}</strong>
            </div>
            <div>
              <span>{ui.decisionPacket.recommendedAmount}</span>
              <strong>{formatCurrency(recommendedAmount, lang)}</strong>
            </div>
            <div>
              <span>{ui.decisionPacket.nextGate}</span>
              <strong>{formatReviewDate(selectedReview.nextDecision, lang)}</strong>
            </div>
            <div>
              <span>{ui.decisionPacket.owner}</span>
              <strong>{t(selectedReview.owner)}</strong>
            </div>
            <div>
              <span>{ui.caseSummary.requestedSupport}</span>
              <strong>{t(selectedProject.ask)}</strong>
            </div>
          </div>

          <article className="packet-section">
            <h3>{policyLabels[lang][recommendation.policyKey]}</h3>
            <p>{ui.decisionPacket.templates[recommendation.policyKey].summary}</p>
          </article>

          <article className="packet-section">
            <h3>{ui.decisionPacket.releasePlan}</h3>
            <div className="funding-plan">
              {fundingPlan.map((item) => (
                <div key={`${item.name}-${item.due}`} className="funding-step">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.due}</p>
                  </div>
                  <span>{item.amount}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="packet-section">
            <h3>{ui.decisionPacket.controls}</h3>
            <ul className="packet-list">
              {ui.decisionPacket.templates[recommendation.policyKey].controls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="packet-section">
            <h3>{ui.decisionPacket.blockers}</h3>
            {approvalBlockers.length > 0 ? (
              <ul className="packet-list">
                {approvalBlockers.map((blocker) => (
                  <li key={blocker}>{ui.blockers[blocker]}</li>
                ))}
              </ul>
            ) : (
              <p className="packet-copy">{ui.decisionPacket.noBlockers}</p>
            )}
          </article>

          <article className="packet-section">
            <h3>{ui.caseSummary.topRisks}</h3>
            <ul className="packet-list">
              <li>{t(primaryAnomaly.title)}</li>
              {recommendationReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </article>

          <div className="packet-actions">
            <button type="button" className="secondary-button" onClick={handleCopyPacket}>
              {copiedPacketId === selectedId ? ui.decisionPacket.copied : ui.decisionPacket.copy}
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={handleQueueCommittee}
              disabled={!canQueueCommittee}
            >
              {selectedReview.committeeStatus === "queued"
                ? ui.decisionPacket.queued
                : canQueueCommittee
                  ? ui.decisionPacket.queue
                  : ui.decisionPacket.notReady}
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
