/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ApplicationStatus = 'Submitted' | 'Waiting' | 'Heard back' | 'Accepted' | 'Rejected';

export interface QAPair {
  question: string;
  answer: string;
}

export interface Application {
  id: string;
  title: string;
  company: string;
  position: string;
  url: string;
  timestamp: string;
  status: ApplicationStatus;
  qaList: QAPair[];
  reminderText?: string | null;
  daysPassed: number;
  duplicateDetected?: boolean;
  source: 'auto' | 'manual';
}

export interface LibraryItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  company: string;
  position: string;
  timestamp: string;
}

export interface MockEmail {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  excerpt: string;
  content: string;
  timestamp: string;
  targetCompany: string;
  statusKeyword: 'Accepted' | 'Rejected' | 'Heard back' | 'Submitted';
  processed: boolean;
}
