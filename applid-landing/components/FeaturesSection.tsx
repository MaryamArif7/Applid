'use client'

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M7 11l3 3 5-5" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Zero-Config Auto Capture',
    desc: 'Just submit Google Forms naturally. Extension DOM listeners intercept values the exact millisecond of submit, requiring zero manual logging or entry steps.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="14" rx="2" stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M7 2v4M15 2v4M3 10h16" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Universal Answer Library',
    desc: 'Every paragraph and text field you ever fill on a form is saved. Search past answers, reuse blocks, and modify context in seconds.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h14a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M3 8h16M8 8v8" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Autonomous Status Synchronization',
    desc: 'Applid reads confirmation, updates, and feedback emails in Gmail inbox to automatically pivot statuses from Submitted to Heard back or Accepted.',
  },
]

const SUGGESTED_ANSWERS = [
  {
    tag: 'WHY GOOGLE?',
    tagColor: '#fef3cd',
    tagText: '#92691a',
    used: '7x recently',
    q: 'Why are you excited to join this team?',
    a: '"The opportunity to work alongside senior engineers on planetary-scale infrastructure is peerless..."',
  },
  {
    tag: 'TECHNICAL CHALLENGES',
    tagColor: '#dbeafe',
    tagText: '#1d4ed8',
    used: '12x recently',
    q: 'Describe a complex technical problem.',
    a: '"I engineered an automated caching layer for scheduler app writes bottlenecked during concurrent sign-up..."',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #071a15 0%, #040f0c 100%)' }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00e5a0 1px, transparent 1px), linear-gradient(90deg, #00e5a0 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Chrome overlay widget */}
          <div>
            {/* Widget label */}
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#6b9080' }}>
                APPLID OVERLAY WIDGET v1.0
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#6b9080' }}>
                CHROME DROPDOWN PREVIEW
              </span>
            </div>

            {/* Widget card */}
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
              {/* Widget header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/8"
                style={{ background: '#0d2b20' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 13L6 5L8 9L10 6.5L14 13" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.5 13H12.5" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Applid Chrome Helper Tool</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#6b9080' }}>Active overlay sitting over active Google Form tabs.</div>
                </div>
              </div>

              {/* Suggested answers */}
              <div style={{ background: '#071a15' }}>
                <div className="px-4 py-3 border-b border-white/5">
                  <span className="section-label text-[10px]">SUGGESTED RELEVANT ANSWERS FROM LIBRARY:</span>
                </div>

                <div className="p-3 space-y-3">
                  {SUGGESTED_ANSWERS.map((item, i) => (
                    <div key={i} className="rounded-xl p-4 border border-white/6 hover:border-white/12 transition-colors cursor-pointer"
                      style={{ background: '#0d2b20' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                          style={{ background: item.tagColor, color: item.tagText }}>
                          {item.tag}
                        </span>
                        <span className="text-[11px]" style={{ color: '#6b9080' }}>Used {item.used}</span>
                      </div>
                      <div className="text-xs font-semibold mb-1.5 text-white">{item.q}</div>
                      <div className="text-xs leading-relaxed italic" style={{ color: '#7dd3c0' }}>{item.a}</div>
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2">
                  <span className="text-accent">✦</span>
                  <p className="text-[11px]" style={{ color: '#6b9080' }}>
                    Auto-suggest algorithms detect form labels in real-time, highlighting matching content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: feature list */}
          <div>
            <div className="section-label mb-4">NO MANUAL ENTRY, MAXIMUM OUTPUT</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Explore the Unique Features That Make Applid Stand Out from the Rest.
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: '#b8cfc8' }}>
              We did not build another cluttered productivity dashboard. Applid behaves like a silent layer on top of
              your standard workflows, and aggregates answers with zero setup.
            </p>

            {/* Features list */}
            <div className="space-y-7">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.15)' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base mb-1">{title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: '#b8cfc8' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
