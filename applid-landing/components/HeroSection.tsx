'use client'

export default function HeroSection() {
  return (
    <section
      className="bg-[#011413] relative min-h-screen flex flex-col overflow-hidden pt-20"
     
    >
      {/* ── Main content: grows to fill, pins pills to bottom ── */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-8 w-full py-16">

        {/* ── Top area: label + headline left, text + CTAs right ── */}
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 w-full items-center">

            {/* Left: label + big headline */}
            <div>
            
              <h1
                className=" text-white font-display text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] text-white"
              >
                Turn blind form<br />
                submissions into{' '}
                <span >your</span>
                <br />
                <span >permanent answer</span>
                <br />
                <span >database</span>.
              </h1>
            </div>

            {/* Right: description + CTAs */}
            <div className="flex flex-col gap-6">
              <p className="text-white/75 text-base leading-relaxed">
                When you apply to jobs, internships, grants, or colleges via Google
                Forms, your text vanishes forever. You get no submission receipt, no
                record of what you wrote, and no follow-up reminder.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                <span className="text-white font-semibold">Applid fits silently over Chrome.</span>{' '}
                It detects your submissions, extracts questions &amp; answers
                instantly, builds your searchable application portfolio, and updates
                status alerts by reading incoming reply emails.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-900 hover:opacity-90 transition-opacity"
                  style={{ background: '#ffffff' }}
                >
                Add to Chrome
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="3,2 13,7 3,12" fill="currentColor" stroke="none" />
                  </svg>
                </button>
               
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: feature pills pinned to bottom ── */}
        <div className="pt-10 pb-2">
          <div
            className="flex flex-wrap gap-x-20 gap-y-3 pt-6"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            {[
              { color: '#00e5a0', label: '100% Zero Manual Input' },
              { color: '#f5c842', label: 'Gmail status sync' },
              { color: '#60a5fa', label: 'Answer reuse' },
              { color: '#c084fc', label: 'Application health score' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-sm font-medium text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}