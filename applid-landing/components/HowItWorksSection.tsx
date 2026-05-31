'use client'

const STEPS = [
  {
    number: '01',
    title: 'Install in 60 seconds',
    desc: 'Add Applid to Chrome from the Web Store. No configuration, no onboarding form, no credit card. Sign in with Google and you\'re done.',
    detail: 'One-click install · Google OAuth · No setup',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M8 12l3 3 5-5" stroke="#00e5a0" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Apply normally — change nothing',
    desc: 'Submit any Google Form exactly as you would today. Applid watches silently in the background. The moment the confirmation screen appears, it captures everything.',
    detail: 'Zero behaviour change · Fully silent · Works on all Google Forms',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M7 12h10M7 8h6M7 16h8" stroke="#00e5a0" strokeWidth="1.4"
          strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Open your dashboard',
    desc: 'Log into your Applid dashboard from any device. Every application is there — the form title, URL, every question and answer, the timestamp, and the current status.',
    detail: 'Any device · Searchable · Status tracking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="16" rx="2" stroke="#00e5a0" strokeWidth="1.4"/>
        <path d="M8 21h8M12 19v2" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M6 8h12M6 12h8" stroke="#00e5a0" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden"
      style={{ background: '#071a15' }}>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-[10px] tracking-widest uppercase mb-4"
            style={{ color: '#00e5a0' }}>
            HOW IT WORKS
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Submit once. Remember everything.
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: '#6b9080' }}>
            Three steps. No new habits. No manual input at any point.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
            style={{ background: 'linear-gradient(90deg, rgba(0,229,160,0.3), rgba(0,229,160,0.1), rgba(0,229,160,0.3))' }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {STEPS.map(({ number, title, desc, detail, icon }) => (
              <div key={number} className="flex flex-col items-start lg:items-center text-left lg:text-center">

                {/* Icon circle */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0,229,160,0.06)',
                      border: '1px solid rgba(0,229,160,0.15)',
                    }}>
                    {icon}
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: '#00e5a0' }}>
                    <span className="font-mono text-[10px] font-bold text-black">
                      {number.replace('0', '')}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-5"
                  style={{ color: '#6b9080' }}>
                  {desc}
                </p>

                {/* Detail tags */}
                <div className="flex flex-wrap gap-2 lg:justify-center">
                  {detail.split(' · ').map((tag) => (
                    <span key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,229,160,0.06)',
                        border: '1px solid rgba(0,229,160,0.12)',
                        color: '#6b9080',
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      

      </div>
    </section>
  )
}
