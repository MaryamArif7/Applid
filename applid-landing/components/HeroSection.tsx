'use client'

export default function HeroSection() {
  return (
    <section className=" bg-[#011413] relative min-h-screen flex items-center pt-20 overflow-hidden"
      >

      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-[0.04]"
         />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
          
            {/* Headline */}
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              <span className="text-white">Turn blind form</span>
              <br />
              <span className="text-white">submissions into </span>
             your
              <br />
             permanent answer
              <br />
             database
              <span className="text-white">.</span>
            </h1>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
              {[
                { color: '#00e5a0', label: '100% Zero Manual Input' },
                { color: '#f5c842', label: 'Auto-Syncs with Chrome' },
                { color: '#60a5fa', label: 'Universal Answer Memory' },
                { color: '#c084fc', label: 'Continuous Gmail Radar' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-sm font-medium" style={{ color: '#b8cfc8' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              When you apply to jobs, internships, grants, or colleges via Google Forms, your text vanishes forever.
              You get no submission receipt, no record of what you wrote, and no follow-up reminder.
            </p>

            <p className="text-base leading-relaxed mb-10" style={{ color: '#b8cfc8' }}>
              <span className="text-white font-semibold">Applid fits silently over Chrome.</span>{' '}
              It detects your submissions, extracts questions &amp; answers instantly, builds your searchable
              application portfolio, and updates status alerts by reading incoming reply emails.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-[#1a1a1a] text-base hover:opacity-90 transition-all duration-200 shadow-lg"
                style={{ background: '#ffffff' }}>
                Submit Simulated Form
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 4l4 4-4 4M4 8h8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white text-base border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all duration-200">
                Explore Dashboard Demo
                <span className="text-accent">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
