import type { ApplicationStatus } from '@/types'

export function getStatusStyle(status: ApplicationStatus): {
  bg: string
  color: string
  border: string
} {
  switch (status) {
    case 'Submitted':
      return { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' }
    case 'Waiting':
      return { bg: '#fef9c3', color: '#854d0e', border: '#fde68a' }
    case 'Heard back':
      return { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' }
    case 'Accepted':
      return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' }
    case 'Rejected':
      return { bg: '#fee2e2', color: '#b91c1c', border: '#fecaca' }
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getDaysAgo(iso: string): number {
  const now = new Date()
  const then = new Date(iso)
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))
}

export function getOrgInitial(org: string): string {
  return org[0].toUpperCase()
}

export function getOrgColor(org: string): string {
  const colors: Record<string, string> = {
    Google: '#4285f4',
    'Y Combinator': '#f26625',
    Stripe: '#6772e5',
    Notion: '#000000',
    Figma: '#f24e1e',
    OpenAI: '#10a37f',
  }
  return colors[org] || '#6b9080'
}

export const STATUS_OPTIONS: ApplicationStatus[] = [
  'Submitted',
  'Waiting',
  'Heard back',
  'Accepted',
  'Rejected',
]
