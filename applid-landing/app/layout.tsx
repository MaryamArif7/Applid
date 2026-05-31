import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Applid — Turn blind form submissions into your permanent answer database',
  description: 'A silent Chrome extension that captures every Google Form application you submit — zero manual input, forever searchable.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise-overlay">{children}</body>
    </html>
  )
}
