'use client'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5"
      style={{ background: 'rgba(7,26,21,0.92)', backdropFilter: 'blur(16px)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.15)', border: '1px solid rgba(0,229,160,0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 14L7 4L9 9L11 6L15 14" stroke="#00e5a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 14H12" stroke="#00e5a0" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="font-display font-700 text-white text-lg tracking-tight">applid</span>

      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {['How it Works', 'Features', 'Contact'].map((item) => (
          <a key={item} href="#" className="text-sm text-textSecondary hover:text-white transition-colors duration-200 font-medium">
            {item}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div className="hidden md:flex items-center gap-3">
        <button className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200">
      Add To Chrome
        </button>
       
      </div>

      {/* Mobile menu toggle */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen
            ? <><path d="M6 6l12 12M18 6L6 18"/></>
            : <><path d="M3 6h18M3 12h18M3 18h18"/></>
          }
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-white/5 py-4 px-8 flex flex-col gap-4"
          style={{ background: 'rgba(7,26,21,0.98)' }}>
          {['How it Works', 'The Problem', 'Web Console', 'Extension Engine'].map((item) => (
            <a key={item} href="#" className="text-sm text-textSecondary hover:text-white transition-colors">{item}</a>
          ))}
          <button className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/20 text-white w-full mt-2">
            Test Form Sandbox
          </button>
          <button className="text-sm font-semibold px-4 py-2 rounded-lg text-bgDark w-full" style={{ background: '#00e5a0' }}>
            Launch Dashboard
          </button>
        </div>
      )}
    </nav>
  )
}
