"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApplicationStatus = "Submitted" | "Waiting" | "Heard back" | "Accepted" | "Rejected";
type DashboardTab = "feed" | "answers" | "reminders" | "health";
type AnswerCategory = "All" | "Technical" | "Why Me" | "Leadership" | "Projects" | "General";
type ToneType = "Highly Technical" | "Academic" | "Empathetic Leader" | "Startup Generalist";

interface Answer {
  question: string;
  answer: string;
}

interface Application {
  id: string;
  company: string;
  title: string;
  url: string;
  timestamp: string;
  status: ApplicationStatus;
  answers: Answer[];
  notes?: string;
}

interface LibraryItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  timesUsed: number;
  lastUsed: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    company: "Google",
    title: "Google STEP Internship 2026",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf6g7A_step2026/viewform",
    timestamp: "2026-05-27T10:30:00Z",
    status: "Waiting",
    answers: [
      { question: "Why do you want to join Google STEP?", answer: "The opportunity to work alongside senior engineers on planetary-scale infrastructure is peerless. Google's commitment to open-source tooling and developer experience aligns deeply with my own engineering philosophy of building systems that empower others." },
      { question: "Describe a technical challenge you've solved.", answer: "I engineered an automated caching layer for a scheduler app writes bottlenecked during concurrent sign-up sessions. By profiling the hot paths and introducing Redis with a write-through strategy, I reduced p99 latency from 2.3s to 180ms under 500 concurrent users." },
      { question: "What programming languages are you proficient in?", answer: "TypeScript, Python, Rust (beginner), and Go for microservices. I prefer TypeScript for full-stack work due to its type safety benefits across the entire API contract surface." },
    ],
    notes: "",
  },
  {
    id: "app-2",
    company: "Y Combinator",
    title: "Y Combinator W26 Batch Application",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSyc_w26batch/viewform",
    timestamp: "2026-05-22T14:00:00Z",
    status: "Heard back",
    answers: [
      { question: "Describe your startup idea in one sentence.", answer: "Applid is a silent Chrome extension that captures every Google Form submission and builds the applicant a permanent, searchable answer database." },
      { question: "Why are you the right team to build this?", answer: "As a frequent applicant myself, I experienced this pain first-hand across 40+ form submissions with zero record-keeping. I've already shipped the core detection engine with MutationObserver and have 12 beta users tracking applications." },
    ],
    notes: "Interview scheduled for June 5th. Prepare demo flow.",
  },
  {
    id: "app-3",
    company: "Stripe",
    title: "Stripe Summer Engineering 2026",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSstripe_eng/viewform",
    timestamp: "2026-05-18T09:15:00Z",
    status: "Submitted",
    answers: [
      { question: "Why Stripe?", answer: "Stripe's infrastructure handles trillions of dollars in payment volume while maintaining extraordinary developer experience. The challenge of making financial systems feel effortless is exactly the kind of constraint-driven design problem I thrive in." },
      { question: "Describe your experience with APIs.", answer: "I've designed and consumed RESTful and GraphQL APIs across 6 projects. Most notably, I built a webhook delivery system with exponential backoff retry logic handling 10k events/day with 99.97% delivery success." },
    ],
  },
  {
    id: "app-4",
    company: "Vercel",
    title: "Vercel Front End Engineer Role",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSvercel_fe/viewform",
    timestamp: "2026-05-15T11:00:00Z",
    status: "Accepted",
    answers: [
      { question: "What excites you about edge computing?", answer: "Edge computing collapses the distance between computation and the user. The ability to run personalization, A/B testing, and auth logic at sub-10ms globally — without cold starts — changes what's architecturally possible for web applications." },
    ],
  },
];

const LIBRARY_ITEMS: LibraryItem[] = [
  { id: "lib-1", category: "Why Me", question: "Why are you the right person for this role?", answer: "I've spent the last two years building products that solve real friction for real people. My combination of systems thinking and user empathy means I don't just ship features — I ship outcomes that compound.", timesUsed: 7, lastUsed: "2026-05-27" },
  { id: "lib-2", category: "Technical", question: "Describe a complex technical problem you solved.", answer: "I engineered an automated caching layer for a scheduler app's write bottlenecks during concurrent sign-up sessions. Redis write-through strategy reduced p99 latency from 2.3s to 180ms at 500 concurrent users.", timesUsed: 12, lastUsed: "2026-05-22" },
  { id: "lib-3", category: "Leadership", question: "Tell us about a time you led a team through ambiguity.", answer: "During a critical product pivot with no defined specs, I convened daily 15-minute standups to surface blockers early and maintained a shared decision log in Notion. We shipped the MVP two days ahead of schedule.", timesUsed: 4, lastUsed: "2026-05-18" },
  { id: "lib-4", category: "Projects", question: "What's your most significant personal project?", answer: "Applid — a Chrome extension that silently captures Google Form submissions and builds the user a permanent answer library. Built with Vanilla JS MutationObserver, Next.js dashboard, and Supabase. 12 active beta users.", timesUsed: 9, lastUsed: "2026-05-27" },
  { id: "lib-5", category: "General", question: "Where do you see yourself in 5 years?", answer: "Leading a small, high-leverage engineering team at a company that's reimagining a fundamental workflow. I want to have shipped products used by millions and mentored engineers who go on to do the same.", timesUsed: 3, lastUsed: "2026-05-15" },
  { id: "lib-6", category: "Technical", question: "How do you approach system design?", answer: "I start from the access patterns, not the data model. Understanding read/write ratios, consistency requirements, and failure modes first lets me pick the right trade-offs before committing to a schema.", timesUsed: 6, lastUsed: "2026-05-20" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconFileText = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconSearch = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconCopy = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconCheck = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const IconLayers = () => (
  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const IconMail = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconCheckCircle = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconSparkles = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconHelpCircle = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardSection() {
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>("feed");
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [expandedAppId, setExpandedAppId] = useState<string>(INITIAL_APPLICATIONS[0].id);
  const [copiedId, setCopiedId] = useState<string>("");
  const [answerSearch, setAnswerSearch] = useState("");
  const [selectedAnswerCategory, setSelectedAnswerCategory] = useState<AnswerCategory>("All");
  const [selectedAnswerToEnhance, setSelectedAnswerToEnhance] = useState<LibraryItem | null>(null);
  const [enhancedResult, setEnhancedResult] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiEnhancedTone, setAiEnhancedTone] = useState<ToneType>("Highly Technical");

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  }

  function updateAppStatus(id: string, status: ApplicationStatus) {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  async function handleEnhance() {
    if (!selectedAnswerToEnhance) return;
    setIsEnhancing(true);
    setEnhancedResult("");
    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1800));
    const toneMap: Record<ToneType, string> = {
      "Highly Technical": `From an engineering perspective, ${selectedAnswerToEnhance.answer.slice(0, 80)}... This approach leverages low-level system primitives to achieve sub-millisecond throughput characteristics across distributed nodes.`,
      "Academic": `Drawing upon established research in human-computer interaction and distributed systems theory, the approach outlined herein demonstrates measurable improvement across key performance indicators, specifically latency reduction and throughput optimization.`,
      "Empathetic Leader": `What truly drives me is the impact on the people downstream. ${selectedAnswerToEnhance.answer.slice(0, 80)}... I keep the team's wellbeing and the end user's experience as my north star throughout every technical decision.`,
      "Startup Generalist": `Move fast, learn faster. ${selectedAnswerToEnhance.answer.slice(0, 80)}... In an early-stage environment, the ability to context-switch between frontend, infra, and product thinking isn't a liability — it's the whole game.`,
    };
    setEnhancedResult(toneMap[aiEnhancedTone]);
    setIsEnhancing(false);
  }

  const filteredAnswers = LIBRARY_ITEMS.filter((item) => {
    const matchesCategory = selectedAnswerCategory === "All" || item.category === selectedAnswerCategory;
    const matchesSearch =
      !answerSearch ||
      item.question.toLowerCase().includes(answerSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(answerSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const statusColors: Record<ApplicationStatus, string> = {
    Submitted: "bg-blue-100 text-blue-700 border-blue-200",
    Waiting: "bg-amber-100 text-amber-700 border-amber-200",
    "Heard back": "bg-purple-100 text-purple-700 border-purple-200",
    Accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-stone-200 text-stone-700 border-stone-300",
  };

  const TABS = [
    { id: "feed" as DashboardTab,      icon: "▦", label: "Applications Feed" },
    { id: "answers" as DashboardTab,   icon: "◧", label: "Answer Library" },
    { id: "reminders" as DashboardTab, icon: "◉", label: "Smart Reminders" },
    { id: "health" as DashboardTab,    icon: "↗", label: "Health Index" },
  ];

  return (
    <section id="console" className="relative px-4 md:px-8 py-24" style={{ position: "relative", zIndex: 1 }}>
      {/* Section header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-xs font-mono text-[#00e5a0] uppercase tracking-widest mb-4">
          Explore the Live Web Console
        </p>
        <h2
          className="text-5xl font-bold text-white tracking-tight leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          An application dashboard<br />that builds itself.
        </h2>
        <p className="mt-5 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
          This is the web console where your captured submissions live. Every time you submit a Google Form,
          the details populate instantly below. Log in from any machine to access your database.
        </p>
      </div>

      {/* ── CONSOLE WRAPPER ── */}
      <div
        className="max-w-6xl mx-auto rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        style={{ background: "#ffffff" }}
      >
        {/* Console top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0c2e2b]/10 border border-[#0c2e2b]/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="#0c2e2b" opacity="0.8" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="#0c2e2b" opacity="0.5" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="#0c2e2b" opacity="0.5" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="#0c2e2b" opacity="0.3" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                applid web console
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="text-[11px] text-stone-400">Managing {applications.length} persistent application repositories.</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                  dashboardTab === tab.id
                    ? "bg-[#0c2e2b]/10 text-[#0c2e2b] border border-[#0c2e2b]/25 font-semibold"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-header */}
        <div className="bg-stone-50 border-b border-stone-200/60 px-6 py-3 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <span className="font-mono">USER STATE:</span>
            <span className="font-bold text-stone-800">www.maryamarif28@gmail.com</span>
          </div>
          <div className="text-stone-500 font-mono flex items-center gap-3">
            <span>SYNC RATE: <strong className="text-emerald-600">100%</strong></span>
            <span>•</span>
            <span>SYS TIME (UTC): <strong className="text-stone-800">2026-05-30 04:13</strong></span>
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="flex-1 p-6 md:p-8 bg-stone-50/20">

          {/* ══ TAB 1: APPLICATIONS FEED ══ */}
          {dashboardTab === "feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left: applications list */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className="font-bold text-sm text-stone-900 uppercase tracking-widest"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Active Applications Timeline
                  </h4>
                  <span className="text-xs text-stone-500">{applications.length} Captured Forms</span>
                </div>

                <div className="space-y-3 max-h-[580px] overflow-y-auto pr-2">
                  {applications.map((app) => {
                    const isActive = expandedAppId === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setExpandedAppId(app.id)}
                        className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? "bg-white border-[#0c2e2b] shadow-md scale-[1.01]"
                            : "bg-white border-stone-200 hover:border-stone-350 hover:bg-white/80"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0c2e2b]" />
                        )}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className="font-extrabold text-sm text-stone-900"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                              >
                                {app.company}
                              </span>
                              <span className="text-xs text-stone-400">•</span>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {new Date(app.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <h4
                              className="font-bold text-base text-stone-950 mt-1 leading-tight"
                              style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                              {app.title}
                            </h4>
                          </div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider whitespace-nowrap ${statusColors[app.status]}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="mt-3.5 flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                          <span className="flex items-center gap-1.5">
                            <IconFileText />
                            <strong>{app.answers.length}</strong> Fields Captured
                          </span>
                          <span className="text-[10px] hover:text-[#0c2e2b] hover:font-bold transition-all flex items-center gap-1">
                            Inspect Q&A →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: expanded inspect pane */}
              <div className="lg:col-span-6 bg-white border border-stone-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
                {expandedAppId ? (() => {
                  const selectedApp = applications.find((a) => a.id === expandedAppId);
                  if (!selectedApp) return (
                    <p className="text-stone-500 text-center">Select an application to inspect.</p>
                  );
                  return (
                    <div className="space-y-6">
                      <div className="pb-5 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-extrabold text-[#0c2e2b] tracking-wider uppercase text-xs"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            Form Records Inspector
                          </span>
                          <span className="text-stone-400">•</span>
                          <span className="text-xs text-stone-500">Captured in Chrome</span>
                        </div>
                        <h3
                          className="text-2xl font-black text-stone-950 mt-1"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {selectedApp.title}
                        </h3>
                        <p className="text-xs text-stone-500 font-mono mt-1 break-all">
                          URL:{" "}
                          <a href={selectedApp.url} target="_blank" rel="noreferrer" className="underline hover:text-[#0c2e2b]">
                            {selectedApp.url.slice(0, 50)}...
                          </a>
                        </p>
                      </div>

                      {/* Status updater */}
                      <div className="bg-[#faf9f6] border border-stone-200 rounded-2xl p-4 space-y-3">
                        <span
                          className="text-xs font-extrabold uppercase tracking-widest text-[#0c2e2b] font-mono block"
                        >
                          Modify Pipeline Status:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(["Submitted", "Waiting", "Heard back", "Accepted", "Rejected"] as ApplicationStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => updateAppStatus(selectedApp.id, st)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                                selectedApp.status === st
                                  ? "bg-[#0c2e2b] text-white border-[#0c2e2b] shadow-sm"
                                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Captured answers */}
                      <div className="space-y-4">
                        <h4
                          className="font-extrabold text-sm text-stone-900 border-b border-stone-100 pb-2"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Silently Saved Field Answers
                        </h4>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                          {selectedApp.answers.map((ans, idx) => (
                            <div
                              key={idx}
                              className="bg-stone-50/70 border border-stone-200 rounded-2xl p-5 space-y-2 text-left relative group"
                            >
                              <button
                                onClick={() => copyToClipboard(ans.answer, `${selectedApp.id}-${idx}`)}
                                className="absolute top-4 right-4 p-2 bg-white border border-stone-200 rounded-lg hover:border-stone-400 hover:text-[#0c2e2b] transition shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100"
                                title="Copy answer"
                              >
                                {copiedId === `${selectedApp.id}-${idx}` ? (
                                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                    <IconCheck /> Copied
                                  </span>
                                ) : (
                                  <IconCopy />
                                )}
                              </button>
                              <span className="text-[10px] font-mono text-stone-400 uppercase">Question {idx + 1}</span>
                              <h5
                                className="font-extrabold text-sm text-stone-900 leading-tight pr-12"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                              >
                                {ans.question}
                              </h5>
                              <p className="text-sm text-stone-700 leading-relaxed mt-1">{ans.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="pt-4 border-t border-stone-100 space-y-2">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">
                          My Notes:
                        </label>
                        <textarea
                          value={selectedApp.notes || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setApplications((prev) =>
                              prev.map((a) => (a.id === selectedApp.id ? { ...a, notes: val } : a))
                            );
                          }}
                          className="w-full text-sm border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#0c2e2b] bg-stone-50/50 resize-none"
                          placeholder="Add personal updates, reminders, interview notes..."
                          rows={2}
                        />
                        <p className="text-[10px] text-stone-400 italic">
                          Saved locally. Encrypted client-side in active browser sync.
                        </p>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 text-stone-400 space-y-4">
                    <IconLayers />
                    <div>
                      <h4
                        className="text-lg font-bold text-stone-600"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        No application selected
                      </h4>
                      <p className="text-sm max-w-xs mx-auto">
                        Click on any tracked form card on the left to inspect its captured answers.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ TAB 2: ANSWER LIBRARY ══ */}
          {dashboardTab === "answers" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-xl font-bold text-stone-900"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Applicants Answer Library
                  </h3>
                  <p className="text-sm text-stone-600">
                    Every text sentence you submit is indexed, cataloged and made searchable across your history.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Technical", "Why Me", "Leadership", "Projects", "General"] as AnswerCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedAnswerCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        selectedAnswerCategory === cat
                          ? "bg-[#0c2e2b] text-white border-[#0c2e2b]"
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative max-w-xl">
                <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 pointer-events-none">
                  <IconSearch />
                </span>
                <input
                  type="text"
                  value={answerSearch}
                  onChange={(e) => setAnswerSearch(e.target.value)}
                  placeholder="Search past answers by keywords (e.g. 'caching', 'leadership', 'step')..."
                  className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#0c2e2b] shadow-sm bg-white"
                />
                {answerSearch && (
                  <button
                    onClick={() => setAnswerSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-900"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Results list */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider font-mono">
                      Matching Library Paragraphs
                    </span>
                    <span className="text-xs text-stone-500">{filteredAnswers.length} Items Found</span>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredAnswers.length > 0 ? filteredAnswers.map((item) => {
                      const isSelected = selectedAnswerToEnhance?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => { setSelectedAnswerToEnhance(item); setEnhancedResult(""); }}
                          className={`p-5 rounded-2xl border text-left cursor-pointer transition relative group ${
                            isSelected
                              ? "bg-[#0c2e2b]/5 border-[#0c2e2b] ring-2 ring-[#0c2e2b]/5"
                              : "bg-white border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="inline-block px-2.5 py-1 bg-stone-100 text-[#0c2e2b] border border-stone-200 text-[10px] font-mono rounded-lg font-bold uppercase tracking-wider">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
                              <span>Used {item.timesUsed}x</span>
                              <span>•</span>
                              <span>Last: {new Date(item.lastUsed).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <h4
                            className="font-bold text-sm text-stone-900 mt-2.5 leading-snug"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {item.question}
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed mt-2 italic line-clamp-3">
                            "{item.answer}"
                          </p>
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                            <button
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(item.answer, item.id); }}
                              className="text-stone-500 hover:text-[#0c2e2b] flex items-center gap-1 hover:underline text-[11px]"
                            >
                              {copiedId === item.id ? (
                                <span className="text-emerald-600 flex items-center gap-1"><IconCheck /> Paragraph Copied</span>
                              ) : (
                                <span className="flex items-center gap-1.5"><IconCopy /> Copy Raw Text</span>
                              )}
                            </button>
                            <span className="text-[#0c2e2b] text-[11px] flex items-center gap-1 hover:underline cursor-pointer">
                              Select to Enhance with AI ↗
                            </span>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-12 text-stone-400 space-y-3 bg-white border border-stone-200 rounded-2xl">
                        <IconSearch />
                        <p className="text-xs">No matching library answers found. Try a different keyword filter.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Enhancer panel */}
                <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-emerald-500/20 text-[#0c2e2b] px-3 py-1 rounded-full text-xs font-semibold">
                      <IconSparkles />
                      AI Re-writer Engine
                    </div>
                    <h4
                      className="text-lg font-bold text-stone-950"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Semantic Answer Personalizer
                    </h4>
                    <p className="text-xs text-stone-500">
                      Select a past answer on the left, pick a tone, and let Applid draft an optimized variation.
                    </p>
                  </div>

                  {selectedAnswerToEnhance ? (
                    <div className="space-y-4 text-left">
                      <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                        <span className="font-bold text-stone-400 uppercase tracking-widest font-mono text-[9px]">Original Selection:</span>
                        <h5
                          className="font-bold text-stone-800 line-clamp-1"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {selectedAnswerToEnhance.question}
                        </h5>
                        <p className="text-stone-500 line-clamp-2 italic">"{selectedAnswerToEnhance.answer}"</p>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
                          Adjust Persona Tone:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["Highly Technical", "Academic", "Empathetic Leader", "Startup Generalist"] as ToneType[]).map((tone) => (
                            <button
                              key={tone}
                              onClick={() => setAiEnhancedTone(tone)}
                              className={`px-2.5 py-2 text-xs font-bold border rounded-xl text-left transition ${
                                aiEnhancedTone === tone
                                  ? "bg-[#0c2e2b] text-white border-[#0c2e2b] shadow-sm"
                                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                              }`}
                            >
                              {tone}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleEnhance}
                        disabled={isEnhancing}
                        className="w-full py-2.5 bg-[#0c2e2b] text-white text-xs font-bold rounded-xl hover:bg-emerald-950 transition disabled:opacity-60"
                      >
                        {isEnhancing ? "Generating..." : "Generate Enhanced Draft →"}
                      </button>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-stone-500 uppercase tracking-widest">Enhanced Output:</span>
                          {enhancedResult && (
                            <button
                              onClick={() => copyToClipboard(enhancedResult, "ai-enhancer")}
                              className="text-xs font-bold text-[#0c2e2b] hover:underline flex items-center gap-1"
                            >
                              {copiedId === "ai-enhancer" ? (
                                <span className="text-emerald-600 flex items-center gap-1"><IconCheck /> Copied</span>
                              ) : "Copy Draft"}
                            </button>
                          )}
                        </div>
                        <div className="bg-[#031d1a] text-[#daf4f1] border border-[#0a423d] rounded-2xl p-5 font-mono text-xs min-h-[140px] flex flex-col justify-between">
                          {isEnhancing ? (
                            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3 py-4">
                              <svg className="animate-spin h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-wider animate-pulse">
                                Generating semantic contexts...
                              </span>
                            </div>
                          ) : (
                            <p className="leading-relaxed italic text-xs whitespace-pre-line">
                              {enhancedResult || "Select a question and tone, then click Generate..."}
                            </p>
                          )}
                          <div className="mt-3 pt-2 border-t border-[#092b28] text-[10px] text-stone-500 flex justify-between">
                            <span>Context model: Gemini 2.0 Flash</span>
                            <span>Ready to paste in Google Form</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-stone-50 border border-stone-200 border-dashed rounded-2xl text-stone-400 space-y-3">
                      <IconHelpCircle />
                      <p className="text-xs">No library item selected for enhancement.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB 3: SMART REMINDERS ══ */}
          {dashboardTab === "reminders" && (
            <div className="space-y-8 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left explanation */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                    <IconMail />
                    Continuous Gmail Synchronization
                  </div>
                  <h3
                    className="text-2xl font-bold text-stone-900 leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Instant Gmail Alert Synchronization
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    You do not have to update status grids manually. Applid monitors your inbox keywords in the background. The minute you receive a confirmation reply or a decision email, our AI matches it against the form title and pivots status fields instantly.
                  </p>
                  <p className="text-xs text-stone-500">
                    If an application has been resting in{" "}
                    <strong className="text-amber-600">"Waiting"</strong> for more than 14 business days, Applid generates smart follow-up templates ready to copy.
                  </p>
                  <div className="p-4 border border-stone-200 bg-stone-50 rounded-2xl">
                    <h4 className="font-mono text-xs text-stone-400 uppercase tracking-widest">Simulated Webhook Feed</h4>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      <span className="font-mono text-stone-600">Google OAuth token active</span>
                    </div>
                  </div>
                </div>

                {/* Right reminders */}
                <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
                  <h4
                    className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Active Email Decoders & Smart Reminders
                  </h4>
                  <div className="space-y-4">

                    {/* Reminder 1 */}
                    <div className="p-5 border border-amber-200 bg-amber-50/40 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-700 uppercase tracking-widest font-bold">
                          Alert: Cold Application Warning (Pending 14 days)
                        </span>
                        <h4
                          className="font-bold text-base text-stone-900"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Google STEP Internship 2026
                        </h4>
                        <p className="text-xs text-stone-600">
                          Submitted on: <strong>2026-05-27</strong>. Recruiter jordan_recruiter@google.com has not received a response nudge.
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`Subject: Follow-up regarding STEP Internship - Maryam Arif\n\nDear Jordan,\n\nI hope you are having an excellent week. I submitted the STEP Internship Google Form on May 27th and remain very interested in the opportunity.\n\nWarmly,\nMaryam Arif`, "step-rem")}
                        className="px-4 py-2 bg-[#0c2e2b] text-white text-xs font-bold rounded-xl hover:bg-emerald-950 transition shrink-0"
                      >
                        {copiedId === "step-rem" ? "Nudge Copied!" : "Copy Follow-up Draft"}
                      </button>
                    </div>

                    {/* Reminder 2 */}
                    <div className="p-5 border border-purple-200 bg-purple-50/40 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-700 uppercase tracking-widest font-bold">
                          Alert: Incoming Gmail Decoded Status Update
                        </span>
                        <h4
                          className="font-bold text-base text-stone-900"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Y Combinator W26 Batch Application
                        </h4>
                        <p className="text-xs text-stone-600">
                          Email from <strong>apply@ycombinator.com</strong> detected on May 29th. Keyword{" "}
                          <span className="underline font-bold text-purple-900">"interview schedule"</span> found. Status auto-updated to{" "}
                          <strong className="text-purple-700 font-mono">"Heard back"</strong>.
                        </p>
                      </div>
                      <div className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl font-bold flex items-center gap-1 shrink-0">
                        <IconCheckCircle /> Auto-Decoded
                      </div>
                    </div>

                    {/* Reminder 3 */}
                    <div className="p-5 border border-emerald-200 bg-emerald-50/20 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-bold">
                          Decoded: Confirmation receipt synced
                        </span>
                        <h4
                          className="font-bold text-base text-stone-900"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Vercel Front End Engineer Role
                        </h4>
                        <p className="text-xs text-stone-600">
                          Verification email headers synchronized with Google Forms database. Status committed to Submitted.
                        </p>
                      </div>
                      <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl font-bold flex items-center gap-1 shrink-0">
                        <IconCheckCircle /> Healthy Link
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB 4: HEALTH INDEX ══ */}
          {dashboardTab === "health" && (
            <div className="space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Submission Pulse Tracker", value: 80, unit: "Health", color: "#059669", title: "Active Engagement Pace", desc: "Excellent! You have reached your submission goal of 4 forms over the past 30 days.", textColor: "text-emerald-700" },
                  { label: "Feedback response rate", value: 50, unit: "Responses", color: "#4f46e5", title: "Hear-back Frequency", desc: "2 out of 4 programs have triggered responses. High response rating compared to the typical 18% global baseline.", textColor: "text-indigo-700" },
                  { label: "Duplicate Intercept Rating", value: 100, unit: "Secured", color: "#0ea5e9", title: "Duplicate Prevention", desc: "Zero redundant submissions filed. Applid blocked all duplicate attempts successfully.", textColor: "text-sky-700" },
                  { label: "Reuse and rewrite index", value: 70, unit: "Optimized", color: "#d97706", title: "Answer Reusability factor", desc: "You reused paragraph blocks for Why Me and Projects templates, saving approximately 38 retyping cycles.", textColor: "text-amber-700" },
                ].map((gauge) => {
                  const circumference = 251;
                  const offset = circumference - (gauge.value / 100) * circumference;
                  return (
                    <div key={gauge.label} className="bg-white border border-stone-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                      <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block">
                        {gauge.label}
                      </span>
                      <div className="relative w-28 h-28 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#f5f4f0" strokeWidth="8" fill="transparent" />
                          <circle cx="50" cy="50" r="40" stroke={gauge.color} strokeWidth="8" fill="transparent"
                            strokeDasharray={circumference} strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 1s ease" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span
                            className={`text-xl font-black ${gauge.textColor}`}
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {gauge.value}%
                          </span>
                          <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">
                            {gauge.unit}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4
                          className="font-bold text-sm text-stone-900 mt-2"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {gauge.title}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1">{gauge.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl">
                <h4
                  className="text-base font-bold text-stone-900 mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  How we calculate your Health Score
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-4xl">
                  Applid correlates the timestamp frequency, email sync response logs, and repetition overlaps to compile your active applicant dashboard rating. Maintaining a high Engagement Score (over 70%) keeps your pipeline fresh and statistically yields a 3.4x higher overall offer conversion.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
