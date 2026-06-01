/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Application, LibraryItem, MockEmail } from './types';

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    title: 'Software Engineer Intern 2026 - Summer',
    company: 'Google',
    position: 'Software Engineer Intern',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfD_K98xO80p_as91_GoogleForm_Intern/viewform',
    timestamp: '2026-05-24T14:32:00Z',
    status: 'Heard back',
    source: 'auto',
    daysPassed: 8,
    qaList: [
      {
        question: 'Why do you want to join our team as a Software Engineer Intern?',
        answer: 'I want to work on Google scale infrastructure. Ever since building my first nested database, I realized that optimizing latency by even 50ms saves thousands of gigawatt-hours at scale. I hope to apply my knowledge of distributed systems to the Search Infrastructure team.'
      },
      {
        question: 'Describe a challenging engineering project you lead or worked on recently.',
        answer: 'I architected a real-time event pipeline using specialized local buffers, handling up to 12,000 requests/sec. When standard message queues bottlenecked, I designed an in-memory sliding ring buffer in TypeScript that dropped latency from 18ms to 1.2ms without packet loss.'
      },
      {
        question: 'Are you authorized to work in the United States?',
        answer: 'Yes, I am authorized to work in the United States for internship purposes.'
      }
    ],
    reminderText: 'Waiting 8 days. HR generally responds in 10-14 days. We suggest reviewing your follow-up email draft.'
  },
  {
    id: 'app-2',
    title: 'UNICEF Tech For Good Fellowship 2026',
    company: 'UNICEF USA',
    position: 'Fellow',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdf91z_UNICEF_Fellowship_Form/viewform',
    timestamp: '2026-05-18T09:12:00Z',
    status: 'Waiting',
    source: 'auto',
    daysPassed: 14,
    qaList: [
      {
        question: 'How do you plan to use technology to advance equity in your local community?',
        answer: 'I believe digital agency is the cornerstone of modern liberty. In my home district, 24% of families lack home fiber access. I volunteered at the community library to build off-grid offline local search appliances using standard Raspberry Pi servers loaded with digital textbooks, helping over 140 middle schoolers study during power shutdowns.'
      },
      {
        question: 'Provide a brief summary of your core leadership experiences.',
        answer: 'As lead organizer for HackCommunity, I coordinated a team of 15 student directors, raised $18,000 in sponsor capital, and managed physical security for 250+ in-person attendees. More importantly, we instituted a fully sponsored child-care booth to allow young parent coders to participate.'
      }
    ],
    reminderText: 'Delayed: 14 days have passed with no response. Standard response timeline has elapsed, follow-up recommended!'
  },
  {
    id: 'app-3',
    title: 'Y Combinator Summer 2026 Batch Application',
    company: 'Y Combinator',
    position: 'Founder',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdf_YC_Application_S26/viewform',
    timestamp: '2026-05-29T23:55:00Z',
    status: 'Submitted',
    source: 'auto',
    daysPassed: 3,
    qaList: [
      {
        question: 'What is your product and what problem does it solve?',
        answer: 'We are building Applid — a browser extension that silently tracks, files, and parses form submissions automatically for users filling them out. Over 1 billion applications are submitted via tools like Google Forms annually; currently, applicants lose 100% of their responses upon submission. Applid creates a stateful record automatically.'
      },
      {
        question: 'How does your team know each other?',
        answer: 'My co-founder and I built high-frequency trading tools at the university robotics club. We spent 48 hours continuous debugging a memory leak, and realized we operate at matching rhythms under heavy load.'
      }
    ],
    reminderText: null
  },
  {
    id: 'app-4',
    title: 'KPCB Fellowship Engineering Elite 2026',
    company: 'Kleiner Perkins',
    position: 'Fellow',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfH_Kleiner_Perkins_Form/viewform',
    timestamp: '2026-05-25T11:05:00Z',
    status: 'Submitted',
    source: 'auto',
    daysPassed: 7,
    qaList: [
      {
        question: 'Why are you passionate about the intersection of technology and venture capital?',
        answer: 'Venture Capital determines which futures are funded. By combining systemic hardware design with high-empathy capital allocators, we can accelerate critical planetary computing needs like optical transceivers and secure local AI models.'
      }
    ],
    reminderText: null
  }
];

export const INITIAL_LIBRARY: LibraryItem[] = [
  {
    id: 'lib-1',
    question: 'Why do you want to join our team as a Software Engineer Intern?',
    answer: 'I want to work on Google scale infrastructure. Ever since building my first nested database, I realized that optimizing latency by even 50ms saves thousands of gigawatt-hours at scale. I hope to apply my knowledge of distributed systems to the Search Infrastructure team.',
    category: 'Why Us / Fit',
    company: 'Google',
    position: 'Software Engineer',
    timestamp: '2026-05-24T14:32:00Z'
  },
  {
    id: 'lib-2',
    question: 'Describe a challenging engineering project you lead or worked on recently.',
    answer: 'I architected a real-time event pipeline using specialized local buffers, handling up to 12,000 requests/sec. When standard message queues bottlenecked, I designed an in-memory sliding ring buffer in TypeScript that dropped latency from 18ms to 1.2ms without packet loss.',
    category: 'Technical',
    company: 'Google',
    position: 'Software Engineer',
    timestamp: '2026-05-24T14:32:00Z'
  },
  {
    id: 'lib-3',
    question: 'How do you plan to use technology to advance equity in your local community?',
    answer: 'I believe digital agency is the cornerstone of modern liberty. In my home district, 24% of families lack home fiber access. I volunteered at the community library to build offline local search appliances using standard Raspberry Pi servers loaded with digital textbooks, helping over 140 middle schoolers study during power shutdowns.',
    category: 'Community',
    company: 'UNICEF USA',
    position: 'Fellow',
    timestamp: '2026-05-18T09:12:00Z'
  },
  {
    id: 'lib-4',
    question: 'Provide a brief summary of your core leadership experiences.',
    answer: 'As lead organizer for HackCommunity, I coordinated a team of 15 student directors, raised $18,000 in sponsor capital, and managed physical security for 250+ in-person attendees. More importantly, we instituted a fully sponsored child-care booth to allow young parent coders to participate.',
    category: 'Leadership',
    company: 'UNICEF USA',
    position: 'Fellow',
    timestamp: '2026-05-18T09:12:00Z'
  },
  {
    id: 'lib-5',
    question: 'What is your product and what problem does it solve?',
    answer: 'We are building Applid — a browser extension that silently tracks, files, and parses form submissions automatically for users filling them out. Over 1 billion applications are submitted via tools like Google Forms annually; currently, applicants lose 100% of their responses upon submission. Applid creates a stateful record automatically.',
    category: 'Technical',
    company: 'Y Combinator',
    position: 'Founder',
    timestamp: '2026-05-29T23:55:00Z'
  }
];

export const MOCK_EMAILS: MockEmail[] = [
  {
    id: 'email-1',
    sender: 'UNICEF Fellowships Selection Committee',
    senderEmail: 'fellowship-replies@unicef.org',
    subject: 'Update on your technology fellowship application',
    excerpt: 'We have carefully reviewed your application for the UNICEF Fellowship and would like to invite...',
    content: `Dear Applicant,

Thank you for your Google Form submission detailing your community Raspberry Pi library network project.

We are incredibly impressed by your track record in community development and digital access equity. As a result, we are thrilled to invite you to the final interview rounds for the UNICEF Fellowship.

Our team will follow up via Google Calendar with scheduling details shortly.

Warm regards,
Fellowships Coordinator, UNICEF USA`,
    timestamp: '2026-06-01T15:20:00Z',
    targetCompany: 'UNICEF USA',
    statusKeyword: 'Heard back',
    processed: false
  },
  {
    id: 'email-2',
    sender: 'Google Talent Acquisition',
    senderEmail: 'intern-recruit@google.com',
    subject: 'OFFER: Software Engineer Intern 2026',
    excerpt: 'Congratulations! We are delighted to extend you an offer for the positions of SWE Intern...',
    content: `Hello!

We spent the last few days reviewing your engineering pipeline codes and latency ring-buffer designs, and we think you will be a fantastic fit for the Google Search Infrastructure team.

We are delighted to extend an official offer of employment as a Software Engineer Intern for Summer 2026! Your starting package details are attached below.

Please review and sign your offer letters in the employer portal.

Congratulations and welcome to Google!

Sincerely,
Google University Recruiting`,
    timestamp: '2026-06-01T16:05:00Z',
    targetCompany: 'Google',
    statusKeyword: 'Accepted',
    processed: false
  },
  {
    id: 'email-3',
    sender: 'KPCB Fellowship Operations',
    senderEmail: 'fellows@kpcb.com',
    subject: 'KPCB Engineering Fellowship Update',
    excerpt: 'Thank you for your interest. Unfortunately, due to highly competitive volume...',
    content: `Hi there,

Thank you for applying to the Kleiner Perkins Engineering Fellows. We received over 8,000 form submissions for our elite fellowship track.

Unfortunately, after robust assessment of the roster, we are unable to advance your application to the interview panel. We appreciate your passion for distributed hardware and hope you keep in touch.

Best,
KP Fellowship Operations Team`,
    timestamp: '2026-06-01T11:42:00Z',
    targetCompany: 'Kleiner Perkins',
    statusKeyword: 'Rejected',
    processed: false
  }
];
