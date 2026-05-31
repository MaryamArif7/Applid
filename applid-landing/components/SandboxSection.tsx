"use client";

export default function Sandbox() {
  return (
    <section id="how" className="relative px-8 py-24" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-white inline-block" />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "#00e5a0" }}
            >
              How it captures
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Same moment.<br />Completely different outcome.
          </h2>
          <p className="mt-3 text-white/50 text-sm leading-relaxed">
            After hitting submit on any Google Form — this is the difference Applid makes.
          </p>
        </div>

        {/* Before / After grid */}
        <div className="grid grid-cols-2 gap-4">

          {/* ── BEFORE ── */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-5 py-3 border-b border-white/10"
              style={{ background: "rgba(201,74,30,0.08)" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="7" stroke="#c94a1e" strokeWidth="1"/>
                <path d="M5 5l5 5M10 5l-5 5" stroke="#c94a1e" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "#c94a1e" }}
              >
                Without Applid
              </span>
            </div>

            <div style={{ background: "#0a2318" }} className="p-5">
              {/* Google confirmation mockup */}
              <div className="flex flex-col items-center py-5 text-center border border-white/10 rounded-xl mb-4"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(66,133,244,0.15)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9l4 4 6-6" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/80">Your response has been recorded.</p>
                <p className="text-xs text-white/30 mt-1">google.com</p>
              </div>

              {/* Void states */}
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: "📄", label: "No submission receipt", sub: "nothing saved" },
                  { icon: "💬", label: "No record of what you wrote", sub: "answers gone forever" },
                  { icon: "🔔", label: "No follow-up reminder", sub: "you'll forget you applied" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{
                      background: "rgba(201,74,30,0.06)",
                      borderColor: "rgba(201,74,30,0.2)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: "rgba(201,74,30,0.12)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/70">{item.label}</p>
                      <p className="text-[11px] italic" style={{ color: "#c94a1e" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── AFTER ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(0,229,160,0.2)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-5 py-3 border-b"
              style={{
                background: "rgba(0,229,160,0.07)",
                borderColor: "rgba(0,229,160,0.15)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="7" stroke="#00e5a0" strokeWidth="1"/>
                <path d="M4.5 7.5l2.5 2.5 4-4" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: "#00e5a0" }}
              >
                With Applid
              </span>
            </div>

            <div style={{ background: "#0a2318" }} className="p-5">
              {/* Same Google confirmation */}
              <div
                className="flex flex-col items-center py-5 text-center border rounded-xl mb-4"
                style={{
                  background: "rgba(0,229,160,0.04)",
                  borderColor: "rgba(0,229,160,0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,229,160,0.12)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9l4 4 6-6" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/80">Your response has been recorded.</p>
                <p className="text-xs text-white/30 mt-1">google.com</p>
              </div>

              {/* Applid captured state */}
              <div className="flex flex-col gap-2.5">
                {/* Live capture badge */}
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                  style={{
                    background: "rgba(0,229,160,0.07)",
                    borderColor: "rgba(0,229,160,0.2)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                    style={{ background: "#00e5a0" }}
                  />
                  <span className="text-xs font-medium" style={{ color: "#00e5a0" }}>
                    Applid captured this submission
                  </span>
                  <span
                    className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(0,229,160,0.12)",
                      color: "#00e5a0",
                    }}
                  >
                    just now
                  </span>
                </div>

                {/* Captured card */}
                <div
                  className="rounded-xl border p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                    borderLeft: "2.5px solid #00e5a0",
                    borderRadius: "0 12px 12px 0",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      LUMS Graduate Fellowship 2026
                    </p>
                    <span className="text-[10px] font-mono text-white/30">2026-05-30</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { q: "Q1", a: "I want to contribute to research that has real-world impact..." },
                      { q: "Q2", a: "Over the past two years, I built a caching layer for a high-throughput scheduler..." },
                    ].map((row) => (
                      <div key={row.q} className="flex items-start gap-2">
                        <span
                          className="text-[10px] font-mono font-bold flex-shrink-0 mt-0.5"
                          style={{ color: "#00e5a0" }}
                        >
                          {row.q}
                        </span>
                        <p className="text-[11px] text-white/50 leading-relaxed truncate">
                          {row.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra wins */}
                {[
                  { icon: "🧠", label: "Answers saved to your library", sub: "reuse on future applications" },
                  { icon: "🔔", label: "Reminder set for 14 days", sub: "we'll nudge you to follow up" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{
                      background: "rgba(0,229,160,0.04)",
                      borderColor: "rgba(0,229,160,0.12)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: "rgba(0,229,160,0.1)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/70">{item.label}</p>
                      <p className="text-[11px] text-white/30">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom label */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <p className="text-xs text-white/30 whitespace-nowrap">
            Same moment. Completely different outcome.
          </p>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

      </div>
    </section>
  );
}
