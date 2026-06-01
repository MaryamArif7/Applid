/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  Calendar, 
  Filter,
  Chrome,
  AlertTriangle,
  Mail
} from 'lucide-react';
import { Application, ApplicationStatus, QAPair } from '../types';

interface TrackerProps {
  applications: Application[];
  selectedApp: Application | null;
  onSelectApp: (app: Application | null) => void;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
}

export default function Tracker({ 
  applications, 
  selectedApp, 
  onSelectApp, 
  onUpdateStatus 
}: TrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<number | null>(null);

  // Filter application roster
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCopyText = (text: string, index: number, isAns: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAns) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } else {
      setCopiedQuestionIdx(index);
      setTimeout(() => setCopiedQuestionIdx(null), 1800);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Accepted':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/20';
      case 'Heard back':
        return 'text-green-300 bg-green-950/70 border-green-500/20';
      case 'Waiting':
        return 'text-yellow-400 bg-yellow-950/80 border-yellow-500/20';
      case 'Submitted':
        return 'text-sky-400 bg-sky-950/80 border-sky-500/25';
      default:
        return 'text-rose-400 bg-rose-950/80 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
          Tracked Applications
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Review and update Google Form submissions collected automatically by the Applid agent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Sidebar directory listing */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Controls Bar */}
          <div className="space-y-3 p-4 bg-emerald-deep bg-opacity-70 border border-emerald-950 rounded-xl">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search company, job role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#050d0a] hover:border-emerald-900/80 focus:border-brand-green/70 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none border border-emerald-950 placeholder-slate-600 transition-all"
              />
            </div>

            {/* Status Tabs Filter */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['All', 'Submitted', 'Waiting', 'Heard back', 'Accepted', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded transition-all cursor-pointer ${
                    statusFilter === status 
                      ? 'bg-brand-green text-[#050d0a] font-semibold' 
                      : 'bg-[#050d0a] text-slate-400 hover:text-white hover:bg-emerald-950/50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Directory */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="text-center py-10 bg-[#071a15]/30 border border-emerald-950 rounded-xl">
                <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No applications found</p>
                <p className="text-xs text-slate-600 mt-1">Try resetting filters or fill a Google Form</p>
              </div>
            ) : (
              filteredApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => onSelectApp(app)}
                  className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selectedApp?.id === app.id
                      ? 'bg-[#061d17] border-brand-green/40 shadow-md'
                      : 'bg-emerald-deep bg-opacity-55 border-emerald-950/60 hover:bg-[#07241d]/40'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-display font-medium text-white group-hover:text-brand-green truncate transition-all text-sm leading-tight">
                        {app.company}
                      </h3>
                      <p className="text-xs text-slate-300 truncate mt-1">{app.position}</p>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border truncate flex-shrink-0 font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-sky-400 bg-sky-950/40 px-1.5 rounded text-[9px] font-mono flex items-center gap-1 py-0.5 uppercase">
                      {app.source === 'auto' ? <Chrome className="w-2.5 h-2.5" /> : null}
                      {app.source === 'auto' ? 'Auto-capture' : 'Manual'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Detailed Application Overview */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="p-6 bg-emerald-deep bg-opacity-70 border border-emerald-950 rounded-2xl shadow-xl space-y-6">
              
              {/* Detail Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-brand-green bg-emerald-950 px-2 py-0.5 rounded tracking-wide font-medium">
                      Form Tracking ID: #{selectedApp.id}
                    </span>
                    <a 
                      href={selectedApp.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-[#050d0a] px-2 py-0.5 rounded hover:bg-emerald-950/30 transition-all border border-emerald-950"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Original Form
                    </a>
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight mt-2.5">
                    {selectedApp.company}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">{selectedApp.position}</p>
                </div>

                {/* Status Updater Card */}
                <div className="bg-[#050d0a] p-3 rounded-xl border border-emerald-950/80 w-full sm:w-auto">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">Update Status</span>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {(['Submitted', 'Waiting', 'Heard back', 'Accepted', 'Rejected'] as ApplicationStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => onUpdateStatus(selectedApp.id, st)}
                        className={`text-[9px] p-1 font-mono rounded cursor-pointer transition-all ${
                          selectedApp.status === st 
                            ? 'bg-brand-green text-[#050d0a] font-bold shadow' 
                            : 'bg-emerald-950/40 text-slate-400 hover:text-white hover:bg-emerald-900/20'
                        }`}
                        title={st}
                      >
                        {st.slice(0, 3)}..
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nudge Notification Area */}
              {selectedApp.reminderText && (
                <div className="p-4 bg-yellow-950/40 border border-yellow-900/50 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-yellow-400 uppercase font-mono tracking-wide">Smart Remind Alert</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedApp.reminderText}</p>
                  </div>
                </div>
              )}

              {/* Question Answer Pairs Index */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-green" />
                  Captured Question/Answer Log ({selectedApp.qaList.length})
                </h3>

                <div className="space-y-3">
                  {selectedApp.qaList.map((qa, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-[#050d0a]/65 border border-emerald-950 rounded-xl space-y-3.5 relative overflow-hidden"
                    >
                      {/* Question */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-mono text-emerald-500 font-medium">QUESTION {index + 1}</span>
                          <button 
                            onClick={() => handleCopyText(qa.question, index, false)}
                            className="text-slate-500 hover:text-emerald-400 transition-all p-1 hover:bg-emerald-950/30 rounded"
                            title="Copy Question"
                          >
                            {copiedQuestionIdx === index ? <Check className="w-3 h-3 text-brand-green" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <p className="text-xs text-slate-200 font-serif leading-relaxed italic pr-4">
                          "{qa.question}"
                        </p>
                      </div>

                      {/* Spacer Line */}
                      <div className="border-t border-emerald-950/50" />

                      {/* Answer */}
                      <div className="space-y-1 bg-[#07130f]/60 p-3 rounded-lg border border-emerald-950/60">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-mono text-brand-green font-medium">SUBMITTED ANSWER</span>
                          <button 
                            onClick={() => handleCopyText(qa.answer, index, true)}
                            className="text-slate-500 hover:text-emerald-400 transition-all p-1 hover:bg-emerald-950/30 rounded"
                            title="Copy Answer"
                          >
                            {copiedIndex === index ? <Check className="w-3 h-3 text-brand-green" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans pr-4 whitespace-pre-wrap">
                          {qa.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-[#071a15]/20 border border-emerald-950 rounded-2xl text-center py-20">
              <FileText className="w-12 h-12 text-slate-700 mb-3" />
              <h3 className="text-md font-display font-medium text-slate-400">No application chosen</h3>
              <p className="text-xs text-slate-600 max-w-xs mt-1 leading-relaxed">
                Choose an application record from the directory sidebar to review its captured answers, update milestones, or setup response reminder nudges.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
