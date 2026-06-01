/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  MailOpen, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Play, 
  ArrowRight,
  Sparkles,
  Inbox,
  User,
  Clock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { Application, MockEmail, ApplicationStatus } from '../types';

interface GmailSimulatorProps {
  emails: MockEmail[];
  applications: Application[];
  onTriggerEmailSync: (selectedEmailId: string) => void;
  onSyncAllEmails: () => void;
}

export default function GmailSimulator({ 
  emails, 
  applications, 
  onTriggerEmailSync,
  onSyncAllEmails 
}: GmailSimulatorProps) {
  const [activeEmail, setActiveEmail] = useState<MockEmail | null>(emails[0] || null);
  const [syncingLoading, setSyncingLoading] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncComplete, setSyncComplete] = useState(false);

  const startAutomatedInboxAnalysis = () => {
    setSyncingLoading(true);
    setSyncComplete(false);
    setSyncLogs([]);

    const logPoints = [
      '📡 Querying user OAuth authorization token for secure Gmail container...',
      '📬 Connected to inbox: reading unread confirmation-related messages...',
      '🔍 Extracted 3 email sequences relating to applicant workspace keywords...',
      '⚙️ Running NLP Entity Recognition on sender metadata & headers...',
      '🤖 Mapping "University recruiting" → Google Application Track Index...',
      '✅ Detected keyword [OFFER] inside Google recruitment letter! Upgrading Google application status to [Accepted].',
      '🤖 Mapping "fellowship-replies" → UNICEF Fellows program tracker...',
      '✅ Detected keyword [interview rounds] inside UNICEF message body. Upgrading UNICEF application status to [Heard back].',
      '🤖 Mapping "KP fellowship operations" → Kleiner Perkins Track Index...',
      '⚠️ Detected keyword [unable to advance] inside KP slips. Marking Kleiner Perkins application status to [Rejected].',
      '💾 Writing sync updates cleanly to local application schema...'
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logPoints.length) {
        setSyncLogs(prev => [...prev, logPoints[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        onSyncAllEmails();
        setSyncingLoading(false);
        setSyncComplete(true);
      }
    }, 450);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
            Gmail Automation
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Analyze confirmation/reply letters automatically via secure OAuth loops. Sync changes cleanly to your dashboard.
          </p>
        </div>

        {/* Sync Trigger button */}
        <button
          onClick={startAutomatedInboxAnalysis}
          disabled={syncingLoading}
          className={`flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-[#050d0a] font-semibold px-4 py-2.5 rounded-lg text-sm transition-all shadow cursor-pointer active:scale-95 ${
            syncingLoading ? 'opacity-50 cursor-not-allowed animate-pulse' : ''
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${syncingLoading ? 'animate-spin' : ''}`} />
          Run Demo Gmail Sync
        </button>
      </div>

      {/* Security Oath Banner */}
      <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <strong className="text-white block font-medium">Privacy Standard (OAuth Protected)</strong>
          Applid parses messages fully client-side inside secure browser isolates using high-accuracy subject filters. No confidential body metadata or independent personal files are ever transmitted or written to unencrypted storage.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: Email Inbox List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#050d0a] rounded-lg border border-emerald-950/80">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 uppercase">
              <Inbox className="w-4 h-4 text-emerald-500" />
              Incoming mail stream (Simulated)
            </span>
            <span className="text-[10px] font-mono bg-emerald-950 text-brand-green px-2 py-0.5 rounded">
              {emails.filter(e => !e.processed).length} new updates
            </span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto">
            {emails.map((email) => {
              const matchingApp = applications.find(a => a.company === email.targetCompany);
              return (
                <div
                  key={email.id}
                  onClick={() => {
                    setActiveEmail(email);
                    setSyncComplete(false);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 relative overflow-hidden ${
                    activeEmail?.id === email.id
                      ? 'bg-[#061d17] border-brand-green/45'
                      : 'bg-emerald-deep bg-opacity-65 border-emerald-950/70 hover:bg-[#07241d]/40'
                  }`}
                >
                  {/* Processed/Unprocessed corner indicator */}
                  {!email.processed ? (
                    <div className="absolute right-0 top-0 w-3 h-3 bg-brand-green rounded-bl animate-pulse-slow" title="Ready to parse" />
                  ) : (
                    <div className="absolute right-2 top-2">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]" title={email.sender}>
                      {email.sender}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="text-sm font-display font-medium text-white truncate mt-2">
                    {email.subject}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-1">
                    {email.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      Target app: <strong className="text-slate-300">{email.targetCompany}</strong>
                    </span>
                    
                    {matchingApp && (
                      <span className="text-[9px] font-mono text-emerald-400">
                        Tracks: {matchingApp.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hand: Email Body Reader Panel & Sim Parser Logs */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Email body reading */}
          {activeEmail ? (
            <div className="p-5 bg-emerald-deep bg-opacity-70 border border-emerald-950 rounded-2xl shadow-xl space-y-4">
              
              <div className="pb-4 border-b border-white/5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-md font-display font-semibold text-white tracking-tight">
                    {activeEmail.subject}
                  </h2>
                  
                  {!activeEmail.processed ? (
                    <button
                      onClick={() => onTriggerEmailSync(activeEmail.id)}
                      className="text-[10px] font-mono font-bold bg-brand-green/10 text-brand-green border border-brand-green/30 hover:bg-brand-green/20 px-2 py-1 rounded cursor-pointer transition-all flex items-center gap-1"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      Sync This Mail
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono bg-emerald-950/80 text-brand-green border border-brand-green/20 px-2 py-1 rounded inline-flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3 h-3 text-brand-green" />
                      Synced
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{activeEmail.sender}</span>
                  <span>&lt;{activeEmail.senderEmail}&gt;</span>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="p-4 bg-[#050d0a] border border-emerald-950/70 rounded-xl">
                <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {activeEmail.content}
                </p>
              </div>

              {/* Parsed attributes visualization */}
              <div className="p-3.5 bg-emerald-950/15 border border-emerald-900/20 rounded-xl space-y-1 text-xs">
                <h5 className="font-mono text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Estimated Parsing Logic</h5>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 bg-[#050d0a]/50 rounded-md border border-emerald-950 text-[11px]">
                    <span className="text-slate-500 block text-[9px] uppercase font-mono">Entity Match</span>
                    <span className="text-white font-medium">{activeEmail.targetCompany}</span>
                  </div>
                  <div className="p-2 bg-[#050d0a]/50 rounded-md border border-emerald-950 text-[11px]">
                    <span className="text-slate-500 block text-[9px] uppercase font-mono">Status Action Keyword</span>
                    <span className="text-emerald-400 font-mono font-bold uppercase">{activeEmail.statusKeyword}</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 bg-emerald-deep bg-opacity-20 border border-emerald-950 rounded-xl text-center py-10">
              <Mail className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">Select simulated response letter to parse header logs</p>
            </div>
          )}

          {/* Sync Simulator Logs Console */}
          {(syncingLoading || syncComplete) && (
            <div className="p-5 bg-black border border-emerald-950 rounded-xl space-y-4 shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-950/80">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 bg-brand-green rounded-full ${syncingLoading ? 'animate-ping' : ''}`} />
                  Applid Sync Console Log
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  {syncingLoading ? 'ANALYSIS_PROCESSING...' : 'SYNC_STABLE'}
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] text-emerald-400/90 leading-relaxed overflow-y-auto max-h-[180px] pr-1">
                {syncLogs.map((log, index) => (
                  <p key={index} className="flex gap-2">
                    <span className="text-slate-600 select-none">[{index+1}]</span>
                    <span>{log}</span>
                  </p>
                ))}
              </div>

              {syncComplete && (
                <div className="p-3 bg-emerald-950/50 border border-brand-green/30 text-xs text-brand-green rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-green animate-pulse" />
                    <span>Applications funnel synced and dashboard records dynamically updated!</span>
                  </div>
                  <button 
                    onClick={() => setSyncComplete(false)}
                    className="text-[10px] uppercase font-bold text-slate-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
