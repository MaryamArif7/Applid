'use client'
import type { TabId } from '@/types'

interface SidebarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  submissionCount: number
}

const NAV_ITEMS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'feed',
    label: 'Applications Feed',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: 'library',
    label: 'Answer Library',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3h12M2 6h8M2 9h10M2 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'reminders',
    label: 'Smart Reminders',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2a4.5 4.5 0 00-4.5 4.5c0 2.5-1 3.5-1 3.5h11s-1-1-1-3.5A4.5 4.5 0 008 2z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'health',
    label: 'Health Index',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polyline points="1,10 4,6 7,8 10,3 13,7 15,5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Sidebar({ activeTab, onTabChange, submissionCount }: SidebarProps) {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col border-r"
      style={{ background: '#ffffff', borderColor: '#f0ece6' }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b flex items-center gap-3"
        style={{ borderColor: '#f0ece6' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#071a15' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 12L5 4L7 8L9 5.5L13 12" stroke="#00e5a0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 12H11.5" stroke="#00e5a0" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="font-bold text-sm" style={{ color: '#1a1a1a' }}>applid</div>
          <div className="text-[10px]" style={{ color: '#9ca3af' }}>web console</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left"
            style={{
              background: activeTab === id ? '#f0faf5' : 'transparent',
              color: activeTab === id ? '#065f46' : '#6b7280',
              fontWeight: activeTab === id ? '600' : '500',
            }}>
            <span style={{ color: activeTab === id ? '#00c484' : '#9ca3af' }}>
              {icon}
            </span>
            {label}
            {id === 'reminders' && (
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: '#fef3cd', color: '#92691a' }}>
                3
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t space-y-3"
        style={{ borderColor: '#f0ece6' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#00c484' }} />
          <span className="text-[11px]" style={{ color: '#9ca3af' }}>
            {submissionCount} forms captured
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
            style={{ background: '#071a15' }}>
            M
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium truncate" style={{ color: '#1a1a1a' }}>
              maryamarif28
            </div>
            <div className="text-[10px] truncate" style={{ color: '#9ca3af' }}>
              @gmail.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
