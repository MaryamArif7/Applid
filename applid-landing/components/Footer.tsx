export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5"
      style={{ background: '#040f0c' }}>
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 4L7 7.5L9 5.5L12 11" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 11H10" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-white">applid</span>

        </div>

       
        <p className="text-xs font-mono" style={{ color: '#6b9080' }}>
          © 2026 Applid · Built for the applicant, not the recruiter.
        </p>
      </div>
    </footer>
  )
}
