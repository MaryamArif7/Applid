export type ApplicationStatus =
  | 'Submitted'
  | 'Waiting'
  | 'Heard back'
  | 'Accepted'
  | 'Rejected'

export interface QAPair {
  id: string
  question: string
  answer: string
}

export interface Application {
  id: string
  formTitle: string
  organization: string
  sourceUrl: string
  submittedAt: string // ISO date string
  status: ApplicationStatus
  fields: QAPair[]
  fieldCount: number
  wordCount: number
  notes?: string
  tags?: string[]
}

export interface AnswerEntry {
  id: string
  question: string
  answer: string
  applicationId: string
  organization: string
  formTitle: string
  submittedAt: string
  usageCount: number
  tags: string[]
}

export interface Reminder {
  id: string
  applicationId: string
  organization: string
  formTitle: string
  submittedAt: string
  daysSince: number
  type: 'follow-up' | 'check-status' | 'deadline'
  message: string
  dismissed: boolean
}

export interface HealthScore {
  overall: number
  submitted: number
  responseRate: number
  avgWaitDays: number
  acceptanceRate: number
  trend: 'up' | 'down' | 'stable'
  byCategory: { label: string; count: number; responses: number }[]
}

export type TabId = 'feed' | 'library' | 'reminders' | 'health'
