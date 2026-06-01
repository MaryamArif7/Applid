'use client'
import { useState } from 'react'
import type { Application, ApplicationStatus } from '@/types'
import { getStatusStyle, formatDate, getOrgInitial, getOrgColor, STATUS_OPTIONS } from '@/lib/utils'

interface ApplicationsFeedProps {
  applications: Application[]
  onStatusChange: (id: string, status: ApplicationStatus) => void
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const s = getStatusStyle(status)
  return (
    <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md flex-shrink-0"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {status}
    </span>
  )
}

export default function ApplicationsFeed({ applications, onStatusChange }: ApplicationsFeedProps) {
  const [selectedId, setSelectedId] = useState<string>(applications[0]?.id ?? '')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'All'>('All')

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.formTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.organization.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  const selected = applications.find((a) => a.id === selectedId)

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Left: list */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r overflow-hidden"
        style={{ borderColor: '#f0ece6' }}>

        {/* Search + filter */}
        <div className="p-4 space-y-3 border-b" style={{ borderColor: '#f0ece6' }}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="5.5" cy="5.5" r="4.5"/><path d="M10 10l2 2" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg outline-none"
              style={{ background: '#f8f6f2', border: '1px solid #ede9e1', color: '#1a1a1a' }}
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {(['All', ...STATUS_OPTIONS] as const).map((s) => (
              <button key={s}
                onClick={() => setFilterStatus(s)}
                className="text-[10px] font-medium px-2 py-1 rounded-md transition-colors"
                style={{
                  background: filterStatus === s ? '#071a15' : '#f8f6f2',
                  color: filterStatus === s ? '#00e5a0' : '#6b7280',
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b"
          style={{ borderColor: '#f0ece6' }}>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: '#9ca3af' }}>
            ACTIVE APPLICATIONS
          </span>
          <span className="text-[10px]" style={{ color: '#9ca3af' }}>
            {filtered.length} forms
          </span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              className="w-full text-left px-4 py-4 border-b transition-colors hover:bg-gray-50"
              style={{
                borderColor: '#f0ece6',
                background: selectedId === app.id ? '#f0faf5' : 'white',
                borderLeft: selectedId === app.id ? '3px solid #00c484' : '3px solid transparent',
              }}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: getOrgColor(app.organization) }}>
                    {getOrgInitial(app.organization)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium truncate" style={{ color: '#9ca3af' }}>
                      {app.organization} · {formatDate(app.submittedAt)}
                    </div>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>
              <div className="text-sm font-semibold mb-2 pl-8" style={{ color: '#1a1a1a' }}>
                {app.formTitle}
              </div>
              <div className="flex items-center justify-between pl-8">
                <div className="flex items-center gap-1 text-[11px]" style={{ color: '#9ca3af' }}>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="1" y="2" width="9" height="8" rx="1"/>
                    <path d="M3 5h5M3 7h3" strokeLinecap="round"/>
                  </svg>
                  {app.fieldCount} fields captured
                </div>
                <span className="text-[11px] font-medium" style={{ color: '#00c484' }}>
                  Inspect Q&A →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: detail */}
      {selected ? (
        <div className="flex-1 overflow-y-auto">

          {/* Detail header */}
          <div className="px-8 py-6 border-b" style={{ borderColor: '#f0ece6' }}>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase mb-1"
              style={{ color: '#9ca3af' }}>
              FORM RECORDS INSPECTOR · Captured in Chrome
            </div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#1a1a1a', fontFamily: 'inherit' }}>
              {selected.formTitle}
            </h2>
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer"
              className="text-xs underline" style={{ color: '#9ca3af' }}>
              URL: {selected.sourceUrl}
            </a>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-5">
              {[
                { label: 'Questions Captured', value: selected.fieldCount.toString() },
                { label: 'Answer Words', value: selected.wordCount.toString() },
                { label: 'Days Since Submit', value: Math.floor((Date.now() - new Date(selected.submittedAt).getTime()) / 86400000).toString() },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-4 text-center"
                  style={{ background: '#f8f6f2', border: '1px solid #ede9e1' }}>
                  <div className="text-2xl font-bold mb-0.5" style={{ color: '#1a1a1a' }}>{value}</div>
                  <div className="text-[11px]" style={{ color: '#9ca3af' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status pipeline */}
          <div className="px-8 py-5 border-b" style={{ borderColor: '#f0ece6' }}>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase mb-3"
              style={{ color: '#9ca3af' }}>
              MODIFY PIPELINE STATUS:
            </div>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => {
                const style = getStatusStyle(s)
                const isActive = selected.status === s
                return (
                  <button
                    key={s}
                    onClick={() => onStatusChange(selected.id, s)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                    style={{
                      background: isActive ? '#071a15' : '#f8f6f2',
                      color: isActive ? '#00e5a0' : '#6b7280',
                      border: `1px solid ${isActive ? '#071a15' : '#ede9e1'}`,
                    }}>
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Q&A */}
          <div className="px-8 py-6">
            <div className="text-sm font-bold mb-5" style={{ color: '#1a1a1a' }}>
              Silently Saved Field Answers
            </div>
            <div className="space-y-4">
              {selected.fields.map((field, i) => (
                <div key={field.id}
                  className="rounded-xl p-5 border"
                  style={{ background: '#f8f6f2', borderColor: '#ede9e1' }}>
                  <div className="text-[10px] font-mono font-bold tracking-widest uppercase mb-2"
                    style={{ color: '#9ca3af' }}>
                    QUESTION {i + 1}
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                    {field.question}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                    {field.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p style={{ color: '#9ca3af' }}>Select an application to inspect</p>
        </div>
      )}
    </div>
  )
}
