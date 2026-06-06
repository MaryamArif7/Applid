import React from "react";
import { Info } from "lucide-react";

interface GaugeProps {
  pct: number;
  color: string;
  sublabel: string;
}

function Gauge({ pct, color, sublabel }: GaugeProps) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative w-[88px] h-[88px]">
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true"
        style={{ transform: "rotate(-90deg)" }}>
        <circle cx="44" cy="44" r={r} fill="none"
          stroke="currentColor" strokeWidth="8" className="text-slate-200" />
        <circle cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-px">
        <span className="text-xl font-semibold leading-none" style={{ color }}>{pct}%</span>
        <span className="text-[10px] uppercase tracking-widest" style={{ color }}>{sublabel}</span>
      </div>
    </div>
  );
}

const cards = [
  {
    sectionLabel: "Submission pulse",
    pct: 80, color: "#1D9E75", sublabel: "health",
    title: "Active engagement pace",
    desc: "Submission goal of 4 forms hit over the past 30 days.",
  },
  {
    sectionLabel: "Feedback response rate",
    pct: 50, color: "#7F77DD", sublabel: "responses",
    title: "Hear-back frequency",
    desc: "2 of 4 programs replied — well above the 18% global baseline.",
  },
  {
    sectionLabel: "Duplicate intercept rating",
    pct: 100, color: "#1D9E75", sublabel: "secured",
    title: "Duplicate prevention",
    desc: "Zero redundant submissions — all duplicate attempts blocked.",
  },
  {
    sectionLabel: "Reuse & rewrite index",
    pct: 70, color: "#BA7517", sublabel: "optimized",
    title: "Answer reusability factor",
    desc: "Paragraph blocks reused for Why Me & Projects — ~38 retyping cycles saved.",
  },
];

export default function HealthIndex() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.title}
            className=" rounded-xl border border-slate-100 p-5 flex flex-col items-center gap-2.5 text-center"
             style={{ background: "rgba(7,26,21,0.92)" }}
            >
            <span className="text-[11px] text-white tracking-wide">{c.sectionLabel}</span>
            <Gauge pct={c.pct} color={c.color} sublabel={c.sublabel} />
            <p className="text-[13px] font-semibold text-white">{c.title}</p>
            <p className="text-xs text-white leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className=" rounded-xl border border-slate-100 p-5"
       style={{ background: "rgba(7,26,21,0.92)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-slate-400" />
          <span className="text-[13px] font-semibold text-white">How we calculate your health score</span>
        </div>
        <p className="text-xs text-white leading-relaxed">
          Applid correlates timestamp frequency, email sync response logs, and repetition overlaps
          to compile your applicant dashboard rating. Keeping your engagement score above 70%
          statistically yields a <span className="font-semibold text-white">3.4× higher offer conversion</span>.
        </p>
      </div>
    </div>
  );
}