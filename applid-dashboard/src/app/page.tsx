/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Chrome, 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  Library, 
  Mail, 
  User, 
  ChevronRight,
  Code,
  ShieldCheck,
  Zap
} from 'lucide-react';

import { Application, LibraryItem, MockEmail, ApplicationStatus } from '../types';
import { INITIAL_APPLICATIONS, INITIAL_LIBRARY, MOCK_EMAILS } from '../mockData';

// Subcomponents
import Overview from '../components/Overview';
import Tracker from '../components/Tracker';
import AnswerLibrary from '../components/AnswerLibrary';
import GmailSimulator from '../components/GmailSimulator';
import ExtensionPlayground from '../components/ExtensionPlayground';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tracker' | 'library' | 'gmail' | 'extension'>('overview');
  
  // Durable local states
  const [applications, setApplications] = useState<Application[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [emails, setEmails] = useState<MockEmail[]>([]);
  
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Load and hydrate from LocalStorage on mount
  useEffect(() => {
    const cachedApps = localStorage.getItem('applid_applications');
    const cachedLib = localStorage.getItem('applid_library');
    const cachedEmails = localStorage.getItem('applid_emails');

    if (cachedApps) {
      setApplications(JSON.parse(cachedApps));
    } else {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.setItem('applid_applications', JSON.stringify(INITIAL_APPLICATIONS));
    }

    if (cachedLib) {
      setLibrary(JSON.parse(cachedLib));
    } else {
      setLibrary(INITIAL_LIBRARY);
      localStorage.setItem('applid_library', JSON.stringify(INITIAL_LIBRARY));
    }

    if (cachedEmails) {
      setEmails(JSON.parse(cachedEmails));
    } else {
      setEmails(MOCK_EMAILS);
      localStorage.setItem('applid_emails', JSON.stringify(MOCK_EMAILS));
    }
  }, []);

  // Save changes helper
  const saveAppsState = (updated: Application[]) => {
    setApplications(updated);
    localStorage.setItem('applid_applications', JSON.stringify(updated));
  };

  const saveLibState = (updated: LibraryItem[]) => {
    setLibrary(updated);
    localStorage.setItem('applid_library', JSON.stringify(updated));
  };

  const saveEmailsState = (updated: MockEmail[]) => {
    setEmails(updated);
    localStorage.setItem('applid_emails', JSON.stringify(updated));
  };

  // Interactions pipelines
  const handleAddApplication = (newApp: Partial<Application>) => {
    const fullApp: Application = {
      id: `app-man-${Date.now()}`,
      title: newApp.title || `${newApp.position} - ${newApp.company}`,
      company: newApp.company || 'Unknown',
      position: newApp.position || 'Unknown',
      url: newApp.url || '',
      timestamp: new Date().toISOString(),
      status: newApp.status || 'Submitted',
      source: newApp.source || 'manual',
      daysPassed: 0,
      qaList: newApp.qaList || [],
      reminderText: null
    };

    const updated = [fullApp, ...applications];
    saveAppsState(updated);
  };

  const handleSelectApp = (app: Application | null) => {
    setSelectedApp(app);
    setSelectedTab('tracker');
  };

  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    const updated = applications.map(app => {
      if (app.id === id) {
        return { 
          ...app, 
          status: newStatus,
          // Clear reminder if user resolves waiting status
          reminderText: ['Accepted', 'Rejected'].includes(newStatus) ? null : app.reminderText
        };
      }
      return app;
    });

    saveAppsState(updated);
    if (selectedApp?.id === id) {
      const match = updated.find(a => a.id === id);
      if (match) setSelectedApp(match);
    }
  };

  // Trigger individual simulated email link tracking map
  const handleTriggerEmailSync = (emailId: string) => {
    const emailIndex = emails.findIndex(e => e.id === emailId);
    if (emailIndex === -1) return;

    const targetEmail = emails[emailIndex];
    if (targetEmail.processed) return;

    // Set as processed
    const updatedEmails = emails.map(e => e.id === emailId ? { ...e, processed: true } : e);
    saveEmailsState(updatedEmails);

    // Sync corresponding app status
    const updatedApps = applications.map(app => {
      if (app.company.toLowerCase().trim() === targetEmail.targetCompany.toLowerCase().trim()) {
        const keyMap: Record<string, ApplicationStatus> = {
          'Accepted': 'Accepted',
          'Rejected': 'Rejected',
          'Heard back': 'Heard back',
          'Submitted': 'Submitted'
        };
        const resolvedStatus = keyMap[targetEmail.statusKeyword] || 'Heard back';
        return {
          ...app,
          status: resolvedStatus,
          reminderText: resolvedStatus === 'Accepted' 
            ? '🎉 Offer details auto-synced from recruiter inbox!' 
            : resolvedStatus === 'Heard back' 
              ? '📅 Interview request flagged! Reply schedule immediately.' 
              : null
        };
      }
      return app;
    });

    saveAppsState(updatedApps);
    if (selectedApp && selectedApp.company.toLowerCase() === targetEmail.targetCompany.toLowerCase()) {
      const freshSelect = updatedApps.find(a => a.id === selectedApp.id);
      if (freshSelect) setSelectedApp(freshSelect);
    }

    if (typeof window !== 'undefined') {
      alert(`Synced email from ${targetEmail.sender}. Parsed status action -> ${targetEmail.statusKeyword} mapped to ${targetEmail.targetCompany}!`);
    }
  };

  // Sync all mock emails in batch
  const handleSyncAllEmails = () => {
    const updatedEmails = emails.map(e => ({ ...e, processed: true }));
    saveEmailsState(updatedEmails);

    const updatedApps = applications.map(app => {
      const matchingEmail = emails.find(
        e => e.targetCompany.toLowerCase().trim() === app.company.toLowerCase().trim()
      );

      if (matchingEmail) {
        const resolvedStatus = matchingEmail.statusKeyword;
        return {
          ...app,
          status: resolvedStatus,
          reminderText: resolvedStatus === 'Accepted' 
            ? '🎉 Offer parsed & auto-synced from recruiter Gmail!' 
            : resolvedStatus === 'Heard back' 
              ? '📅 Interview schedule flagged! Schedule soon.' 
              : null
        };
      }
      return app;
    });

    saveAppsState(updatedApps);
    if (selectedApp) {
      const refreshed = updatedApps.find(a => a.id === selectedApp.id);
      if (refreshed) setSelectedApp(refreshed);
    }
  };

  const handleCaptureNewForm = (capturedApp: Application) => {
    // Add to applications
    const updatedApps = [capturedApp, ...applications];
    saveAppsState(updatedApps);

    // Mapped items index to the Answer Library as well
    const newLibItems: LibraryItem[] = capturedApp.qaList.map((qa, index) => ({
      id: `lib-auto-${Date.now()}-${index}`,
      question: qa.question,
      answer: qa.answer,
      category: 'General',
      company: capturedApp.company,
      position: capturedApp.position,
      timestamp: capturedApp.timestamp
    }));

    const updatedLib = [...newLibItems, ...library];
    saveLibState(updatedLib);
  };

  const handleAddLibraryItem = (newItem: LibraryItem) => {
    const updated = [newItem, ...library];
    saveLibState(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans" style={{ background: 'rgba(7,26,21,0.92)' }}>
      
      {/* Upper Navigation Header bar */}
      <header className="border-b border-emerald-950 bg-[#050d0a]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Branding Title logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-green to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-green/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#050d0a]/10 animate-pulse" />
            <Chrome className="w-5 h-5 text-[#050d0a] relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-white tracking-tight">Applid</span>
              <span className="text-[10px] font-mono text-brand-green bg-emerald-950 border border-brand-green/20 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                Beta
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 tracking-wide uppercase">Silent Form Capture</p>
          </div>
        </div>

        {/* Global tab choices */}
        <nav className="flex items-center bg-slate-900/60 p-1.5 rounded-xl border border-emerald-950/80">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedTab === 'overview' 
                ? 'bg-[#07241c] text-brand-green border border-brand-green/20 shadow-sm font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Overview
          </button>
          
          <button
            onClick={() => setSelectedTab('tracker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedTab === 'tracker'
                ? 'bg-[#07241c] text-brand-green border border-brand-green/20 shadow-sm font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Tracker
          </button>

          <button
            onClick={() => setSelectedTab('library')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedTab === 'library'
                ? 'bg-[#07241c] text-brand-green border border-brand-green/20 shadow-sm font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            Answers
          </button>

          <button
            onClick={() => setSelectedTab('gmail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedTab === 'gmail'
                ? 'bg-[#07241c] text-brand-green border border-brand-green/20 shadow-sm font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Gmail Sync
          </button>

          <button
            onClick={() => setSelectedTab('extension')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedTab === 'extension'
                ? 'bg-[#07241c] text-brand-green border border-brand-green/20 shadow-sm font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Playground
          </button>
        </nav>

        {/* User context widget */}
        <div className="flex items-center gap-3.5 bg-[#050d0a] p-1.5 rounded-xl border border-emerald-950/85">
          <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center font-mono text-[10px] text-brand-green font-bold">
            MA
          </div>
          <div className="hidden sm:block text-left text-[11px] leading-tight">
            <span className="text-white font-medium block">Maryam Arif</span>
            <span className="text-slate-500 font-mono">www.maryamarif28@gmail.com</span>
          </div>
        </div>

      </header>

      {/* Main Container Workspace layout */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* Render Tab Modules */}
        {selectedTab === 'overview' && (
          <Overview 
            applications={applications} 
            onAddApplication={handleAddApplication} 
            onSelectApp={handleSelectApp} 
          />
        )}

        {selectedTab === 'tracker' && (
          <Tracker 
            applications={applications} 
            selectedApp={selectedApp} 
            onSelectApp={setSelectedApp} 
            onUpdateStatus={handleUpdateStatus} 
          />
        )}

        {selectedTab === 'library' && (
          <AnswerLibrary 
            library={library} 
            onAddLibraryItem={handleAddLibraryItem} 
          />
        )}

        {selectedTab === 'gmail' && (
          <GmailSimulator 
            emails={emails} 
            applications={applications} 
            onTriggerEmailSync={handleTriggerEmailSync} 
            onSyncAllEmails={handleSyncAllEmails} 
          />
        )}

        {selectedTab === 'extension' && (
          <ExtensionPlayground 
            onCaptureNewForm={handleCaptureNewForm} 
          />
        )}

      </main>

      {/* Footer System Credits */}
      <footer className="border-t border-emerald-950/60 bg-[#050d0a] py-5 px-8 text-center text-xs text-slate-500 font-mono">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl w-full mx-auto">
          <span>Applid Web Dashboard &copy; 2026. All rights secured internally.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-all flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              Symmetric Encryption
            </span>
            <span>v1.0.4 Release</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
