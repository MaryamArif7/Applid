'use client'

export default function ClosingCTA() {
  return (
    <section className=" py-32 relative overflow-hidden"
      style={{ background: 'rgba(7,26,21,0.92)', backdropFilter: 'blur(16px)' }}
      >

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)' }} />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,229,160,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">

       

        <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
          Your next application<br />starts with a record.
        </h2>

        <p className="text-base lg:text-lg leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: '#6b9080' }}>
          Install once. Apply as normal. Never lose an answer again.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className=" bg-gray-200 flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-black hover:opacity-90 transition-opacity"
           >
            Add to Chrome
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-sm" style={{ color: '#6b9080' }}>
            No credit card · Works in 60 seconds
          </span>
        </div>

      

      </div>
    </section>
  )
}
