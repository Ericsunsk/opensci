import React, { useEffect, useMemo, useState } from "react";
import { principles, projects, reviewSeeds } from "./data";
import { postureCopy, readText, reasonLabels, uiCopy, verdictLabels } from "./i18n";

const severityOrder = {
  low: 1,
  medium: 2,
  high: 3,
};

const reviewStageOrder = [
  "submitted",
  "evidence",
  "governance",
  "decision",
  "monitoring",
];

const requestToneMap = {
  needsRequest: "danger",
  requested: "warning",
  received: "success",
};

const commitmentBounds = {
  money: {
    min: 10000,
    max: 120000,
    baseExposure: 20,
    weight: 1,
  },
  time: {
    min: 1,
    max: 120,
    baseExposure: 8,
    weight: 0.55,
  },
  participation: {
    min: 1,
    max: 6,
    baseExposure: 12,
    weight: 0.75,
  },
};

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

function formatSupportValue(mode, value, lang) {
  if (mode === "money") {
    return `$${Number(value).toLocaleString(lang === "zh" ? "zh-CN" : "en-US")}`;
  }

  if (mode === "time") {
    return lang === "zh" ? `${value} 小时` : `${value} hrs`;
  }

  return lang === "zh" ? `${value} 个席位` : `${value} seats`;
}

function formatTrancheValue(mode, total, percentage, lang) {
  if (mode === "money") {
    return formatSupportValue(
      mode,
      Math.max(5000, Math.round((total * percentage) / 100 / 1000) * 1000),
      lang,
    );
  }

  return formatSupportValue(
    mode,
    Math.max(1, Math.round((total * percentage) / 100)),
    lang,
  );
}

function countOpenRequests(review) {
  return review.evidenceRequests.filter((item) => item.status !== "received").length;
}

function getCommitmentProfile(mode, value) {
  const config = commitmentBounds[mode] ?? commitmentBounds.money;
  const numericValue = Number.isFinite(value) ? value : config.min;
  const ratio =
    config.max === config.min ? 0 : (numericValue - config.min) / (config.max - config.min);
  const normalized = Math.max(0, Math.min(1, ratio));

  return {
    normalized,
    pressure: Math.round(config.baseExposure + normalized * 80 * config.weight),
  };
}

function computeRecommendation(project, settings, review) {
  const commitment = getCommitmentProfile(settings.supportMode, settings.supportValue);
  const anomalyPenalty = project.anomalyRisk * 0.55;
  const momentumBonus = project.momentum * 0.15;
  const stagedBonus = settings.staged ? 10 : -5;
  const verificationBonus =
    (settings.replication ? 7 : 0) + (settings.escrow ? 8 : 0);
  const userRiskAdjustment = (settings.riskTolerance - 50) * 0.45;
  const reviewPenalty = review ? review.riskFlags * 3.5 + (review.watchlisted ? 8 : 0) : 0;
  const requestPenalty = review ? countOpenRequests(review) * 2 : 0;
  const trancheBonus = review ? review.approvedTranches * 3 : 0;
  const commitmentBudget =
    project.evidenceCoverage * 0.52 +
    project.trustScore * 0.28 +
    (settings.replication ? 8 : 0) +
    (settings.escrow ? 6 : 0) +
    (settings.supportMode === "time" ? 6 : settings.supportMode === "participation" ? 2 : 0);
  const commitmentPenalty = Math.max(0, commitment.pressure - commitmentBudget) * 0.35;
  const exposurePenalty = commitment.pressure * (settings.staged ? 0.07 : 0.18);

  const rawScore =
    project.trustScore * 0.4 +
    project.evidenceCoverage * 0.25 +
    project.communityConfidence * 0.2 +
    momentumBonus +
    stagedBonus +
    verificationBonus +
    trancheBonus -
    anomalyPenalty -
    reviewPenalty -
    requestPenalty +
    userRiskAdjustment -
    commitmentPenalty -
    exposurePenalty;

  const boundedScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  let verdictKey = "doNotSupport";
  let tone = "danger";

  if (boundedScore >= 72) {
    verdictKey = "supportNow";
    tone = "success";
  } else if (boundedScore >= 56) {
    verdictKey = "supportConditionally";
    tone = "warning";
  } else if (boundedScore >= 40) {
    verdictKey = "watchOnly";
    tone = "neutral";
  }

  const reasonKeys = [
    commitment.pressure <= commitmentBudget * 0.82
      ? "commitmentRightSized"
      : "commitmentOversized",
    project.evidenceCoverage >= 60 ? "evidenceStrong" : "evidenceWeak",
    settings.staged ? "stagedOn" : "stagedOff",
    settings.replication ? "replicationOn" : "replicationOff",
    settings.escrow ? "escrowOn" : "escrowOff",
  ];

  return {
    boundedScore,
    verdictKey,
    tone,
    reasonKeys,
    commitmentPressure: commitment.pressure,
    commitmentBudget: Math.round(commitmentBudget),
  };
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

function SignalTile({ label, value, note, tone }) {
  return (
    <article className={`signal-tile signal-tile--${tone}`}>
      <div className="signal-tile__topline">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <p>{note}</p>
    </article>
  );
}

function DecisionMeter({ score, tone, label, caption, compact = false }) {
  return (
    <div className={`decision-meter decision-meter--${tone} ${compact ? "is-compact" : ""}`}>
      <div className="decision-meter__ring" style={{ "--meter-value": `${score}%` }}>
        <div className="decision-meter__core">
          <strong>{score}</strong>
          <span>/100</span>
        </div>
      </div>
      <div className="decision-meter__copy">
        <span>{label}</span>
        <p>{caption}</p>
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState("zh");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [supportMode, setSupportMode] = useState("money");
  const [supportValue, setSupportValue] = useState(40000);
  const [riskTolerance, setRiskTolerance] = useState(42);
  const [staged, setStaged] = useState(true);
  const [replication, setReplication] = useState(true);
  const [escrow, setEscrow] = useState(true);
  const [reviewState, setReviewState] = useState(createInitialReviewState);
  const [noteDrafts, setNoteDrafts] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, ""])),
  );

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

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [selectedId],
  );
  const selectedReview = reviewState[selectedId];

  const recommendation = useMemo(
    () =>
      computeRecommendation(
        selectedProject,
        {
          supportMode,
          supportValue,
          riskTolerance,
          staged,
          replication,
          escrow,
        },
        selectedReview,
      ),
    [selectedProject, riskTolerance, staged, replication, escrow, selectedReview],
  );

  const anomalyCount = selectedProject.anomalies.reduce(
    (sum, anomaly) => sum + severityOrder[anomaly.severity],
    0,
  );
  const milestoneAverage = Math.round(
    selectedProject.milestones.reduce((sum, milestone) => sum + milestone.confidence, 0) /
      selectedProject.milestones.length,
  );
  const primaryAnomaly = selectedProject.anomalies[0];
  const posture = postureCopy[lang][recommendation.tone];
  const tranchePlan = selectedProject.milestones.map((milestone, index) => ({
    ...milestone,
    allocation: [40, 35, 25][index] ?? 25,
  }));
  const openRequests = countOpenRequests(selectedReview);
  const requestableCount = selectedReview.evidenceRequests.filter(
    (item) => item.status === "needsRequest",
  ).length;
  const approvalBlockers = [];
  const stageAllowsApproval =
    selectedReview.currentStage === "decision" || selectedReview.currentStage === "monitoring";
  const canApproveTranche =
    selectedReview.approvedTranches < selectedProject.milestones.length &&
    stageAllowsApproval &&
    !selectedReview.watchlisted &&
    openRequests === 0 &&
    selectedReview.riskFlags < 4;

  if (!stageAllowsApproval) {
    approvalBlockers.push("stage");
  }

  if (selectedReview.watchlisted) {
    approvalBlockers.push("watchlist");
  }

  if (openRequests > 0) {
    approvalBlockers.push("evidence");
  }

  if (selectedReview.riskFlags >= 4) {
    approvalBlockers.push("risk");
  }

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

  const prependAudit = (review, entry) => ({
    ...review,
    auditLog: [entry, ...review.auditLog].slice(0, 8),
  });

  const queueEvidenceRequest = (requestIndex) => {
    updateProjectReview(selectedId, (review) => {
      const target = review.evidenceRequests[requestIndex];

      if (!target || target.status !== "needsRequest") {
        return review;
      }

      const evidenceRequests = review.evidenceRequests.map((item, index) =>
        index === requestIndex ? { ...item, status: "requested" } : item,
      );

      return prependAudit(
        {
          ...review,
          currentStage: "evidence",
          nextDecision: target.due,
          evidenceRequests,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "warning",
          title: bi("Evidence request sent", "已发起补证请求"),
          detail: bi(
            `Requested ${target.label.en} from ${target.owner.en} before the next committee gate.`,
            `已要求 ${target.owner.zh} 在下次委员会节点前补充「${target.label.zh}」。`,
          ),
        },
      );
    });
  };

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
      const nextStage = allEvidenceResolved
        ? review.watchlisted
          ? "governance"
          : "decision"
        : review.currentStage;
      const nextDecision = allEvidenceResolved
        ? selectedProject.milestones[review.approvedTranches]?.due ?? review.nextDecision
        : review.nextDecision;

      return prependAudit(
        {
          ...review,
          currentStage: nextStage,
          nextDecision,
          evidenceRequests,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "success",
          title: bi("Evidence received", "补证材料已收到"),
          detail: bi(
            allEvidenceResolved
              ? `Received ${target.label.en}; the project can move back into tranche design.`
              : `Received ${target.label.en}; remaining blockers stay in review.`,
            allEvidenceResolved
              ? `已收到「${target.label.zh}」，项目可以重新回到 tranche 设计。`
              : `已收到「${target.label.zh}」，其余阻塞项仍在继续审查。`,
          ),
        },
      );
    });
  };

  const handleRequestEvidence = () => {
    const firstRequestable = selectedReview.evidenceRequests.findIndex(
      (item) => item.status === "needsRequest",
    );

    if (firstRequestable >= 0) {
      queueEvidenceRequest(firstRequestable);
    }
  };

  const handleFlagRisk = () => {
    updateProjectReview(selectedId, (review) =>
      prependAudit(
        {
          ...review,
          currentStage: "governance",
          riskFlags: review.riskFlags + 1,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "danger",
          title: bi("Risk flag added", "新增风险标记"),
          detail: bi(
            `Primary concern escalated around ${primaryAnomaly.title.en} and routed back to governance review.`,
            `围绕「${primaryAnomaly.title.zh}」的核心疑点被升级，并重新送回治理复核。`,
          ),
        },
      ),
    );
  };

  const handleApproveTranche = () => {
    updateProjectReview(selectedId, (review) => {
      const hasOpenRequests = countOpenRequests(review) > 0;
      const stageAllowsRelease =
        review.currentStage === "decision" || review.currentStage === "monitoring";

      if (
        review.approvedTranches >= selectedProject.milestones.length ||
        !stageAllowsRelease ||
        review.watchlisted ||
        hasOpenRequests ||
        review.riskFlags >= 4
      ) {
        return review;
      }

      const nextApproved = review.approvedTranches + 1;
      const trancheMilestone = selectedProject.milestones[nextApproved - 1];
      const nextDecision = selectedProject.milestones[nextApproved]?.due ?? review.nextDecision;

      return prependAudit(
        {
          ...review,
          approvedTranches: nextApproved,
          currentStage: "monitoring",
          nextDecision,
          watchlisted: false,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "success",
          title: bi("Tranche approved", "已批准 tranche"),
          detail: bi(
            `Released tranche ${nextApproved} against ${trancheMilestone.name.en}.`,
            `已依据「${trancheMilestone.name.zh}」批准第 ${nextApproved} 笔 tranche 释放。`,
          ),
        },
      );
    });
  };

  const handleToggleWatchlist = () => {
    updateProjectReview(selectedId, (review) => {
      const nextWatchlist = !review.watchlisted;
      const allEvidenceResolved = review.evidenceRequests.every(
        (item) => item.status === "received",
      );
      const nextStage = nextWatchlist
        ? "governance"
        : allEvidenceResolved
          ? "decision"
          : review.currentStage;

      return prependAudit(
        {
          ...review,
          currentStage: nextStage,
          watchlisted: nextWatchlist,
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: nextWatchlist ? "warning" : "neutral",
          title: nextWatchlist
            ? bi("Moved to watchlist", "移入观察名单")
            : bi("Removed from watchlist", "移出观察名单"),
          detail: nextWatchlist
            ? bi(
                "The project remains visible, but no new commitment should happen until the current blockers are cleared.",
                "项目会继续被观察，但在当前阻塞项解除前不应新增投入。",
              )
            : bi(
                "The project can move back into active handling after the latest checks.",
                "在最新检查通过后，项目可以重新回到主动处理流程。",
              ),
        },
      );
    });
  };

  const handleSaveNote = () => {
    const draft = noteDrafts[selectedId]?.trim();

    if (!draft) {
      return;
    }

    updateProjectReview(selectedId, (review) =>
      prependAudit(
        {
          ...review,
          notes: [
            {
              author: bi("Current reviewer", "当前评审员"),
              role: bi("Reviewer note", "评审备注"),
              date: CURRENT_REVIEW_DATE,
              content: draft,
            },
            ...review.notes,
          ].slice(0, 6),
        },
        {
          date: CURRENT_REVIEW_DATE,
          tone: "neutral",
          title: bi("Reviewer note added", "已添加评审备注"),
          detail: bi(
            "The current rationale was saved to the workspace log for the next decision gate.",
            "当前判断依据已经写入工作台记录，用于下一次决策节点复核。",
          ),
        },
      ),
    );

    setNoteDrafts((current) => ({ ...current, [selectedId]: "" }));
  };

  return (
    <div className={`app-shell app-shell--${lang}`}>
      <div className="ambient ambient--top" />
      <div className="ambient ambient--middle" />
      <div className="ambient ambient--bottom" />

      <header className="hero">
        <div className="hero__copy">
          <div className="hero__topbar">
            <p className="eyebrow">{ui.consoleLabel}</p>
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

          <div className="hero__kicker">
            {ui.heroKickers.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h1>{ui.heroTitle}</h1>
          <p className="hero__lede">{ui.heroLede}</p>

          <div className="hero__chips">
            {ui.heroChips.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="hero__aside">
          <article className="hero-card hero-card--focus">
            <span className="hero-card__eyebrow">{ui.currentFocus}</span>
            <div className="hero-card__header">
              <div>
                <strong>{t(selectedProject.name)}</strong>
                <p>{t(selectedProject.domain)}</p>
              </div>
              <div className={`hero-card__stamp hero-card__stamp--${recommendation.tone}`}>
                {posture.label}
              </div>
            </div>

            <p className="hero-card__body">{posture.copy}</p>

            <div className="hero-card__stats">
              <div>
                <span>{ui.currentAsk}</span>
                <strong>{t(selectedProject.ask)}</strong>
              </div>
              <div>
                <span>{ui.workflowStages[selectedReview.currentStage].label}</span>
                <strong>{formatReviewDate(selectedReview.nextDecision, lang)}</strong>
              </div>
              <div>
                <span>{ui.primaryAlert}</span>
                <strong>{t(primaryAnomaly.title)}</strong>
              </div>
            </div>
          </article>

          <article className="hero-card hero-card--protocol">
            <span className="hero-card__eyebrow">{ui.reviewProtocol}</span>
            {ui.protocol.map((step, index) => (
              <div key={step.title} className="protocol-row">
                <strong>{`0${index + 1}`}</strong>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </article>
        </div>
      </header>

      <section className="overview-band">
        <article className="overview-card overview-card--primary">
          <span>{ui.overview.decisionPosture}</span>
          <strong>{verdictLabels[lang][recommendation.verdictKey]}</strong>
          <p>{posture.copy}</p>
        </article>
        <article className="overview-card">
          <span>{ui.overview.currentPhase}</span>
          <strong>{ui.workflowStages[selectedReview.currentStage].label}</strong>
          <p>{`${t(selectedProject.phase)} · ${t(selectedReview.owner)}`}</p>
        </article>
        <article className="overview-card">
          <span>{ui.overview.largestFailureSurface}</span>
          <strong>{t(primaryAnomaly.title)}</strong>
          <p>{t(primaryAnomaly.detail)}</p>
        </article>
        <article className="overview-card">
          <span>{ui.overview.recommendedCommitment}</span>
          <strong>{formatSupportValue(supportMode, supportValue, lang)}</strong>
          <p>{staged ? ui.overview.recommendedStaged : ui.overview.recommendedDirect}</p>
        </article>
      </section>

      <section className="principles">
        {principles.map((principle) => (
          <article key={t(principle.label)} className="principle-card">
            <span>{t(principle.label)}</span>
            <p>{t(principle.detail)}</p>
          </article>
        ))}
      </section>

      <main className="workspace">
        <aside className="project-rail card">
          <SectionTitle
            eyebrow={ui.queue.eyebrow}
            title={ui.queue.title}
            description={ui.queue.description}
          />

          <div className="project-list">
            {projects.map((project) => {
              const projectReview = reviewState[project.id];
              const localRecommendation = computeRecommendation(
                project,
                {
                  supportMode,
                  supportValue,
                  riskTolerance,
                  staged,
                  replication,
                  escrow,
                },
                projectReview,
              );

              return (
                <button
                  key={project.id}
                  type="button"
                  className={`project-card ${project.id === selectedProject.id ? "is-active" : ""}`}
                  onClick={() => setSelectedId(project.id)}
                >
                  <div className="project-card__topline">
                    <span>{t(project.domain)}</span>
                    <strong
                      className={`project-card__verdict project-card__verdict--${localRecommendation.tone}`}
                    >
                      {verdictLabels[lang][localRecommendation.verdictKey]}
                    </strong>
                  </div>

                  <h3>{t(project.name)}</h3>
                  <p>{t(project.summary)}</p>

                  <div className="project-card__status-row">
                    <span>{ui.workflowStages[projectReview.currentStage].label}</span>
                    <strong>{`${countOpenRequests(projectReview)} · ${ui.reviewMeta.openRequests}`}</strong>
                  </div>

                  <div className="project-card__track">
                    <span style={{ width: `${localRecommendation.boundedScore}%` }} />
                  </div>

                  <div className="project-card__metrics">
                    <div>
                      <span>{ui.queue.trust}</span>
                      <strong>{project.trustScore}</strong>
                    </div>
                    <div>
                      <span>{ui.queue.evidence}</span>
                      <strong>{project.evidenceCoverage}</strong>
                    </div>
                    <div>
                      <span>{ui.queue.risk}</span>
                      <strong>{project.anomalyRisk}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="project-detail">
          <article className="detail-head card">
            <div className="detail-head__copy">
              <p className="eyebrow">{ui.queue.selectedProject}</p>
              <h2>{t(selectedProject.name)}</h2>
              <p className="detail-head__lede">{t(selectedProject.summary)}</p>

              <div className="detail-head__chips">
                <span>{t(selectedProject.domain)}</span>
                <span>{t(selectedProject.phase)}</span>
                <span>{ui.workflowStages[selectedReview.currentStage].label}</span>
                <span>{t(selectedReview.owner)}</span>
              </div>

              <div className="detail-head__grid">
                <div>
                  <span>{ui.detail.thesisPrompt}</span>
                  <strong>{t(selectedProject.thesis)}</strong>
                </div>
                <div>
                  <span>{ui.detail.supportShape}</span>
                  <strong>{t(selectedProject.stageRelease)}</strong>
                </div>
                <div>
                  <span>{ui.reviewMeta.nextDecision}</span>
                  <strong>{formatReviewDate(selectedReview.nextDecision, lang)}</strong>
                </div>
                <div>
                  <span>{ui.reviewMeta.trancheStatus}</span>
                  <strong>{`${selectedReview.approvedTranches}/${selectedProject.milestones.length}`}</strong>
                </div>
              </div>
            </div>

            <div className="detail-head__sidebar">
              <DecisionMeter
                score={recommendation.boundedScore}
                tone={recommendation.tone}
                label={posture.label}
                caption={reasonLabels[lang][recommendation.reasonKeys[0]]}
              />

              <div className="detail-head__insight">
                <span>{ui.detail.decisionReadout}</span>
                <p>{reasonLabels[lang][recommendation.reasonKeys[1]]}</p>
                <div className="detail-head__mini-grid">
                  <div>
                    <span>{ui.detail.milestoneAverage}</span>
                    <strong>{milestoneAverage}%</strong>
                  </div>
                  <div>
                    <span>{ui.detail.anomalyLoad}</span>
                    <strong>{anomalyCount}</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <section className="review-ops-grid">
            <article className="card">
              <SectionTitle
                eyebrow={ui.sections.reviewFlow.eyebrow}
                title={ui.sections.reviewFlow.title}
                description={ui.sections.reviewFlow.description}
              />

              <div className="workspace-meta">
                <div className="workspace-metric">
                  <span>{ui.reviewMeta.owner}</span>
                  <strong>{t(selectedReview.owner)}</strong>
                </div>
                <div className="workspace-metric">
                  <span>{ui.reviewMeta.nextDecision}</span>
                  <strong>{formatReviewDate(selectedReview.nextDecision, lang)}</strong>
                </div>
                <div className="workspace-metric">
                  <span>{ui.reviewMeta.openRequests}</span>
                  <strong>{openRequests}</strong>
                </div>
                <div className="workspace-metric">
                  <span>{ui.reviewMeta.trancheStatus}</span>
                  <strong>{`${selectedReview.approvedTranches}/${selectedProject.milestones.length}`}</strong>
                </div>
              </div>

              <div className="workflow-stage-strip">
                {reviewStageOrder.map((stageKey, index) => {
                  const currentStageIndex = reviewStageOrder.indexOf(selectedReview.currentStage);
                  const stageState =
                    index < currentStageIndex
                      ? "complete"
                      : index === currentStageIndex
                        ? "active"
                        : "pending";

                  return (
                    <div key={stageKey} className={`workflow-stage workflow-stage--${stageState}`}>
                      <div className="workflow-stage__index">{`0${index + 1}`}</div>
                      <div className="workflow-stage__content">
                        <strong>{ui.workflowStages[stageKey].label}</strong>
                        <p>{ui.workflowStages[stageKey].caption}</p>
                      </div>
                      <span className={`workflow-stage__status workflow-stage__status--${stageState}`}>
                        {ui.reviewMeta[stageState]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="card card--paper">
              <SectionTitle
                eyebrow={ui.sections.actionDock.eyebrow}
                title={ui.sections.actionDock.title}
                description={ui.sections.actionDock.description}
              />

              <div className="action-grid">
                <button
                  type="button"
                  className="action-button action-button--warning"
                  onClick={handleRequestEvidence}
                  disabled={requestableCount === 0}
                >
                  {ui.actions.requestEvidence}
                </button>
                <button
                  type="button"
                  className="action-button action-button--danger"
                  onClick={handleFlagRisk}
                >
                  {ui.actions.flagRisk}
                </button>
                <button
                  type="button"
                  className="action-button action-button--success"
                  onClick={handleApproveTranche}
                  disabled={!canApproveTranche}
                >
                  {ui.actions.approveTranche}
                </button>
                <button
                  type="button"
                  className="action-button action-button--neutral"
                  onClick={handleToggleWatchlist}
                >
                  {selectedReview.watchlisted
                    ? ui.actions.removeFromWatchlist
                    : ui.actions.moveToWatchlist}
                </button>
              </div>

              <div className="action-summary">
                <div className="action-summary__item">
                  <span>{ui.reviewMeta.watchlist}</span>
                  <strong>{selectedReview.watchlisted ? (lang === "zh" ? "已开启" : "On") : lang === "zh" ? "未开启" : "Off"}</strong>
                </div>
                <div className="action-summary__item">
                  <span>{ui.reviewMeta.riskFlags}</span>
                  <strong>{selectedReview.riskFlags}</strong>
                </div>
                <div className="action-summary__item">
                  <span>{ui.reviewMeta.noteCount}</span>
                  <strong>{selectedReview.notes.length}</strong>
                </div>
                <div className="action-summary__item">
                  <span>{ui.reviewMeta.openRequests}</span>
                  <strong>{`${openRequests}/${selectedReview.evidenceRequests.length}`}</strong>
                </div>
              </div>

              <div
                className={`approval-guard ${
                  canApproveTranche ? "approval-guard--ready" : "approval-guard--blocked"
                }`}
              >
                <strong>
                  {canApproveTranche ? ui.approvalGate.ready : ui.approvalGate.blocked}
                </strong>
                <p>
                  {canApproveTranche
                    ? ui.approvalGate.readyCopy
                    : ui.approvalGate.blockedCopy}
                </p>
                {!canApproveTranche && approvalBlockers.length > 0 ? (
                  <ul>
                    {approvalBlockers.map((blocker) => (
                      <li key={blocker}>{ui.approvalBlockers[blocker]}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <p className="action-helper">{ui.actions.helper}</p>
            </article>
          </section>

          <section className="score-grid">
            <SignalTile
              label={ui.signalTiles.trust.label}
              value={`${selectedProject.trustScore}/100`}
              note={ui.signalTiles.trust.note}
              tone="success"
            />
            <SignalTile
              label={ui.signalTiles.evidence.label}
              value={`${selectedProject.evidenceCoverage}/100`}
              note={ui.signalTiles.evidence.note}
              tone="warning"
            />
            <SignalTile
              label={ui.signalTiles.community.label}
              value={`${selectedProject.communityConfidence}/100`}
              note={ui.signalTiles.community.note}
              tone="neutral"
            />
            <SignalTile
              label={ui.signalTiles.anomaly.label}
              value={`${selectedProject.anomalyRisk}/100`}
              note={ui.signalTiles.anomaly.note}
              tone="danger"
            />
          </section>

          <section className="detail-grid">
            <article className="card card--paper">
              <SectionTitle
                eyebrow={ui.sections.requestPanel.eyebrow}
                title={ui.sections.requestPanel.title}
                description={ui.sections.requestPanel.description}
              />

              <div className="request-list">
                {selectedReview.evidenceRequests.map((request, index) => (
                  <div
                    key={`${request.due}-${request.label.en}`}
                    className={`request-card request-card--${requestToneMap[request.status]}`}
                  >
                    <div className="request-card__topline">
                      <strong>{t(request.label)}</strong>
                      <span className={`request-status request-status--${requestToneMap[request.status]}`}>
                        {ui.requestStatuses[request.status]}
                      </span>
                    </div>
                    <div className="request-card__meta">
                      <span>{`${ui.requestPanel.owner} · ${t(request.owner)}`}</span>
                      <span>{`${ui.requestPanel.due} · ${formatReviewDate(request.due, lang)}`}</span>
                    </div>
                    {request.status === "needsRequest" ? (
                      <button
                        type="button"
                        className="inline-action"
                        onClick={() => queueEvidenceRequest(index)}
                      >
                        {ui.requestPanel.requestNow}
                      </button>
                    ) : null}
                    {request.status === "requested" ? (
                      <button
                        type="button"
                        className="inline-action inline-action--secondary"
                        onClick={() => markEvidenceReceived(index)}
                      >
                        {ui.requestPanel.markReceived}
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>

            <article className="card card--paper">
              <SectionTitle
                eyebrow={ui.sections.reviewerNotes.eyebrow}
                title={ui.sections.reviewerNotes.title}
                description={ui.sections.reviewerNotes.description}
              />

              <div className="note-form">
                <textarea
                  className="note-textarea"
                  value={noteDrafts[selectedId] ?? ""}
                  onChange={(event) =>
                    setNoteDrafts((current) => ({
                      ...current,
                      [selectedId]: event.target.value,
                    }))
                  }
                  placeholder={ui.notes.placeholder}
                />
                <button
                  type="button"
                  className="action-button action-button--neutral note-save"
                  onClick={handleSaveNote}
                  disabled={!noteDrafts[selectedId]?.trim()}
                >
                  {ui.notes.save}
                </button>
              </div>

              <div className="notes-stack">
                {selectedReview.notes.length > 0 ? (
                  selectedReview.notes.map((note, index) => (
                    <div key={`${note.date}-${index}`} className="note-card">
                      <div className="note-card__topline">
                        <div>
                          <strong>{t(note.author)}</strong>
                          <span>{t(note.role)}</span>
                        </div>
                        <span>{formatReviewDate(note.date, lang)}</span>
                      </div>
                      <p>{t(note.content)}</p>
                    </div>
                  ))
                ) : (
                  <p className="empty-copy">{ui.notes.empty}</p>
                )}
              </div>
            </article>

            <article className="card card--paper">
              <SectionTitle
                eyebrow={ui.sections.decisionThesis.eyebrow}
                title={ui.sections.decisionThesis.title}
                description={ui.sections.decisionThesis.description}
              />

              <div className="check-grid">
                <div>
                  <h3>{ui.reasonsToLean}</h3>
                  <ul>
                    {selectedProject.thesisChecks.map((item) => (
                      <li key={t(item)}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{ui.reasonsToSlow}</h3>
                  <ul>
                    {selectedProject.concernChecks.map((item) => (
                      <li key={t(item)}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="card">
              <SectionTitle
                eyebrow={ui.sections.evidenceMatrix.eyebrow}
                title={ui.sections.evidenceMatrix.title}
                description={ui.sections.evidenceMatrix.description}
              />

              <div className="evidence-list">
                {selectedProject.evidence.map((item) => (
                  <div key={t(item.label)} className="evidence-row">
                    <div className="evidence-row__content">
                      <div className="evidence-row__label">
                        <strong>{t(item.label)}</strong>
                        <span className={`badge badge--${item.status}`}>
                          {ui.badgeLabels[item.status]}
                        </span>
                      </div>
                      <p>{t(item.detail)}</p>
                    </div>
                    <div className="weight-pill">{item.weight} pts</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <SectionTitle
                eyebrow={ui.sections.milestoneLedger.eyebrow}
                title={ui.sections.milestoneLedger.title}
                description={ui.sections.milestoneLedger.description}
              />

              <div className="milestone-list">
                {selectedProject.milestones.map((milestone) => (
                  <div key={t(milestone.name)} className="milestone-row">
                    <div>
                      <strong>{t(milestone.name)}</strong>
                      <p>{milestone.due}</p>
                    </div>
                    <div className="milestone-row__bar">
                      <div
                        className="milestone-row__bar-fill"
                        style={{ width: `${milestone.confidence}%` }}
                      />
                    </div>
                    <div className="milestone-row__meta">
                      <strong>{milestone.confidence}%</strong>
                      <span>{ui.milestoneStatuses[milestone.status]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card card--warning">
              <SectionTitle
                eyebrow={ui.sections.anomalyRadar.eyebrow}
                title={ui.sections.anomalyRadar.title}
                description={ui.sections.anomalyRadar.description}
              />

              <div className="anomaly-summary">
                <div>
                  <span>{ui.detail.anomalyLoad}</span>
                  <strong>{anomalyCount}</strong>
                </div>
                <div>
                  <span>{ui.primaryAlert}</span>
                  <strong>{t(primaryAnomaly.title)}</strong>
                </div>
              </div>

              <div className="anomaly-list">
                {selectedProject.anomalies.map((anomaly) => (
                  <div
                    key={t(anomaly.title)}
                    className={`anomaly-card anomaly-card--${anomaly.severity}`}
                  >
                    <div className="anomaly-card__topline">
                      <span>
                        {ui.severityLabels[anomaly.severity]} {ui.severitySuffix}
                      </span>
                      <strong>{t(anomaly.title)}</strong>
                    </div>
                    <p>{t(anomaly.detail)}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card card--wide">
              <SectionTitle
                eyebrow={ui.sections.auditLog.eyebrow}
                title={ui.sections.auditLog.title}
                description={ui.sections.auditLog.description}
              />

              <div className="audit-list">
                {selectedReview.auditLog.length > 0 ? (
                  selectedReview.auditLog.map((entry, index) => (
                    <div key={`${entry.date}-${index}`} className={`audit-entry audit-entry--${entry.tone}`}>
                      <span className="audit-entry__date">
                        {formatReviewDate(entry.date, lang)}
                      </span>
                      <div className="audit-entry__content">
                        <strong>{t(entry.title)}</strong>
                        <p>{t(entry.detail)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-copy">{ui.audit.empty}</p>
                )}
              </div>
            </article>

            <article className="card card--wide">
              <SectionTitle
                eyebrow={ui.sections.feedback.eyebrow}
                title={ui.sections.feedback.title}
                description={ui.sections.feedback.description}
              />

              <div className="timeline">
                {selectedProject.updates.map((update) => (
                  <div key={`${update.date}-${t(update.title)}`} className="timeline-row">
                    <span>{update.date}</span>
                    <div>
                      <strong>{t(update.title)}</strong>
                      <p>{t(update.detail)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>

        <aside className="decision-rail card card--paper">
          <SectionTitle
            eyebrow={ui.sections.decisionStudio.eyebrow}
            title={ui.sections.decisionStudio.title}
            description={ui.sections.decisionStudio.description}
          />

          <DecisionMeter
            score={recommendation.boundedScore}
            tone={recommendation.tone}
            label={verdictLabels[lang][recommendation.verdictKey]}
            caption={`${ui.suggestedCommitmentPrefix} ${formatSupportValue(supportMode, supportValue, lang)}${
              staged ? (lang === "zh" ? "，分阶段释放。" : " in staged release.") : "."
            }`}
            compact
          />

          <div className="control-group">
            <label htmlFor="support-mode">{ui.supportMode}</label>
            <select
              id="support-mode"
              value={supportMode}
              onChange={(event) => {
                const nextMode = event.target.value;
                setSupportMode(nextMode);
                setSupportValue(nextMode === "money" ? 40000 : nextMode === "time" ? 32 : 2);
              }}
            >
              <option value="money">{ui.supportModes.money}</option>
              <option value="time">{ui.supportModes.time}</option>
              <option value="participation">{ui.supportModes.participation}</option>
            </select>
          </div>

          <div className="control-group">
            <div className="control-group__label-row">
              <label htmlFor="support-value">{ui.commitmentSize}</label>
              <strong>{formatSupportValue(supportMode, supportValue, lang)}</strong>
            </div>
            <input
              id="support-value"
              type="range"
              min={supportMode === "money" ? 10000 : 1}
              max={supportMode === "money" ? 120000 : supportMode === "time" ? 120 : 6}
              step={supportMode === "money" ? 5000 : 1}
              value={supportValue}
              onChange={(event) => setSupportValue(Number(event.target.value))}
            />
          </div>

          <div className="control-group">
            <div className="control-group__label-row">
              <label htmlFor="risk-tolerance">{ui.riskTolerance}</label>
              <strong>{riskTolerance}</strong>
            </div>
            <input
              id="risk-tolerance"
              type="range"
              min="0"
              max="100"
              value={riskTolerance}
              onChange={(event) => setRiskTolerance(Number(event.target.value))}
            />
          </div>

          <div className="toggle-list">
            <label>
              <input
                type="checkbox"
                checked={staged}
                onChange={() => setStaged((value) => !value)}
              />
              <span>{ui.toggles.staged}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={replication}
                onChange={() => setReplication((value) => !value)}
              />
              <span>{ui.toggles.replication}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={escrow}
                onChange={() => setEscrow((value) => !value)}
              />
              <span>{ui.toggles.escrow}</span>
            </label>
          </div>

          <article className="strategy-card">
            <span className="strategy-card__eyebrow">{ui.supportBlueprint}</span>
            <div className="strategy-card__list">
              {tranchePlan.map((milestone) => (
                <div key={t(milestone.name)} className="strategy-step">
                  <div className="strategy-step__allocation">
                    {formatTrancheValue(supportMode, supportValue, milestone.allocation, lang)}
                  </div>
                  <div>
                    <strong>{t(milestone.name)}</strong>
                    <p>{ui.milestoneStatuses[milestone.status]}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="rationale-list">
            {recommendation.reasonKeys.map((reasonKey) => (
              <div key={reasonKey} className="rationale-row">
                <span />
                <p>{reasonLabels[lang][reasonKey]}</p>
              </div>
            ))}
          </div>

          <article className="ops-note">
            <span>{ui.whyMatters}</span>
            <p>{ui.whyMattersCopy}</p>
          </article>
        </aside>
      </main>
    </div>
  );
}

export default App;
