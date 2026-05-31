'use client'

const STATS = [
  {
    value: '0',
    label: 'manual inputs required',
    sub: 'after install',
  },
  {
    value: '4.2h',
    label: 'saved per application cycle',
    sub: 'from answer reuse alone',
  },
  {
    value: '100%',
    label: 'answer recall',
    sub: 'every word you wrote, forever',
  },
  {
    value: '5',
    label: 'status stages',
    sub: 'Submitted → Accepted → Rejected',
  },
]

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-white/6"
      style={{ background: '#040f0c' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/6">
          {STATS.map(({ value, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center px-8">
              <span className="font-display text-4xl lg:text-5xl font-bold text-white mb-1">
                {value}
              </span>
              <span className="text-sm font-medium mb-1" style={{ color: '#b8cfc8' }}>
                {label}
              </span>
              <span className="text-xs" style={{ color: '#6b9080' }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
