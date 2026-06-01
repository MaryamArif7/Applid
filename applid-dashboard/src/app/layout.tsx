/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import '../index.css';

export const metadata = {
  title: 'Applid Dashboard',
  description: 'Silent tracker and automated answer library for Google Forms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
