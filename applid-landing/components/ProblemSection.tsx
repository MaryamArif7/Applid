'use client'

const PROBLEMS = [
  {
    number: '01',
    tag: 'NO RECORD',
    headline: 'You submitted. It vanished.',
    body: 'Google Forms shows a confirmation screen for three seconds — then it\'s gone. No copy of what you wrote. No record of which questions they asked. No receipt of any kind.',
    stat: '0',
    statLabel: 'records kept by Google Forms',
  },
  {
    number: '02',
    tag: 'WASTED TIME',
    headline: 'You\'re rewriting the same answers from scratch every time.',
    body: '"Why do you want to join this team?" You\'ve answered this 14 times across 14 different forms. You have no idea what you said last time, so you start over. Every single application.',
    stat: '4.2h',
    statLabel: 'lost rewriting duplicate answers per cycle',
  },
  {
    number: '03',
    tag: 'NO FOLLOW-UP',
    headline: 'You have no idea what\'s still pending.',
    body: 'Did you apply to that fellowship last month or the month before? Have they replied? Was it via this email or your other one? Without a record, following up feels impossible.',
    stat: '73%',
    statLabel: 'of applicants never follow up after submitting',
  },
]

export default function ProblemSection() {
  return (
    <section  className="bg-gray-200 py-24 relative overflow-hidden"
    >

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="mb-16">
         
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black leading-tight max-w-xl">
              Most applications vanish the moment you hit submit.
            </h2>
           
          </div>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROBLEMS.map(({ number, tag, headline, body, stat, statLabel }) => (
            <div key={number}
              className="relative rounded-2xl p-7 border border-white/6 flex flex-col gap-6"
              style={{ background: '#071a15' }}>

              {/* Number + tag */}
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-5xl font-bold leading-none"
                  >
                  {number}
                </span>
                <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
                  style={{ background: 'rgba(201,74,30,0.12)', color: '#e06040' }}>
                  {tag}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display text-xl font-bold text-white leading-snug mb-3">
                  {headline}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b9080' }}>
                  {body}
                </p>
              </div>

             
            </div>
          ))}
        </div>

        {/* Bridge line */}
        <div className="mt-16 flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <p className="text-sm font-medium text-center max-w-md"
            style={{ color: '#6b9080' }}>
            Applid fixes all three — silently, automatically, from the moment you install it.
          </p>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

      </div>
    </section>
  )
}
