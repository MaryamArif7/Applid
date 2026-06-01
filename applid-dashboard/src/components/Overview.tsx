/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Chrome, 
  TrendingUp, 
  Check, 
  FileText,
  X 
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';

interface OverviewProps {
  applications: Application[];
  onAddApplication: (app: Partial<Application>) => void;
  onSelectApp: (app: Application) => void;
}

export default function Overview({ applications, onAddApplication, onSelectApp }: OverviewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Stats calculation
  const totalApps = applications.length;
  const autoCaptured = applications.filter(a => a.source === 'auto').length;
  const waitingApps = applications.filter(a => a.status === 'Waiting').length;
  const responseRate = totalApps > 0 
    ? Math.round((applications.filter(a => ['Heard back', 'Accepted', 'Rejected'].includes(a.status)).length / totalApps) * 100) 
    : 0;

  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;

  // Real-time duplicate checker check
  const handleCompanyChange = (val: string) => {
    setNewCompany(val);
    if (!val) {
      setDuplicateWarning(null);
      return;
    }
    const match = applications.find(
      app => app.company.toLowerCase().trim() === val.toLowerCase().trim()
    );
    if (match) {
      const dateStr = new Date(match.timestamp).toLocaleDateString();
      setDuplicateWarning(
        `⚠️ Duplicate Threat: Applid detected you already submitted an application for ${match.company} (${match.position}) on ${dateStr}. Submitting again might result in auto-rejection.`
      );
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newPosition) return;

    onAddApplication({
      company: newCompany,
      position: newPosition,
      title: `${newPosition} - ${newCompany}`,
      url: newUrl || 'https://google-form-manually-added',
      status: 'Submitted',
      source: 'manual',
    });

    // Reset Form
    setNewCompany('');
    setNewPosition('');
    setNewUrl('');
    setDuplicateWarning(null);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Upper Status Action Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Silent Chrome Extension tracker captures submissions as you fill Google Forms.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-green hover:bg-emerald-500 text-[#050d0a] font-medium px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg text-sm transition-all shadow-sm active:scale-95 duration-150 cursor-pointer"
          id="add-custom-btn"
        >
          <Plus className="w-4 h-4" />
          Add Custom Track
        </button>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-emerald-deep emerald-card-glow rounded-xl bg-opacity-80 flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium tracking-wide text-emerald-400 uppercase">Tracked Forms</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-semibold text-white">{totalApps}</span>
              <span className="text-xs text-slate-400">Total</span>
            </div>
            <p className="text-xs text-emerald-500 flex items-center gap-1 font-mono">
              <Chrome className="w-3.h-3" />
              {autoCaptured} captured silently
            </p>
          </div>
          <div className="p-3 bg-emerald-950 rounded-lg text-brand-green">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-emerald-deep emerald-card-glow rounded-xl bg-opacity-80 flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium tracking-wide text-yellow-500 uppercase">Waiting on Nudge</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-semibold text-white">{waitingApps}</span>
              <span className="text-xs text-slate-400">Applications</span>
            </div>
            <p className="text-xs text-yellow-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Overdue responses
            </p>
          </div>
          <div className="p-3 bg-yellow-950/40 rounded-lg text-yellow-500">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-emerald-deep emerald-card-glow rounded-xl bg-opacity-80 flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium tracking-wide text-brand-green uppercase">Response Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-semibold text-white">{responseRate}%</span>
              <span className="text-xs text-slate-400">Health</span>
            </div>
            <p className="text-xs text-slate-400">Status upgrades active</p>
          </div>
          <div className="p-3 bg-emerald-950 rounded-lg text-brand-green">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 bg-emerald-deep emerald-card-glow rounded-xl bg-opacity-80 flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium tracking-wide text-[#38bdf8] uppercase">Offers Accepted</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-semibold text-white">{acceptedCount}</span>
              <span className="text-xs text-slate-400">Success</span>
            </div>
            <p className="text-xs text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Auto-synced from Gmail
            </p>
          </div>
          <div className="p-3 bg-sky-950/40 rounded-lg text-sky-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Data Visualizer & Live Form Ticker Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Custom Visual Charts Panel */}
        <div className="lg:col-span-2 p-5 bg-emerald-deep bg-opacity-70 emerald-card-glow rounded-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div>
              <h3 className="text-md font-display font-medium text-white">Application funnel</h3>
              <p className="text-xs text-slate-400">Your application health and response pattern metrics</p>
            </div>
            <span className="text-xs font-mono bg-emerald-950 text-brand-green px-2 py-1 rounded">Live stats</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Health Score gauge */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#071a15]/50 border border-emerald-950 rounded-xl space-y-4">
              <span className="text-sm font-medium text-slate-300">Applid Health Score</span>
              
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Radial Gauge */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="rgba(16, 185, 129, 0.08)" 
                    strokeWidth="8" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#10b981" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (responseRate || 75)) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-bold text-white font-mono">{responseRate || 75}</span>
                  <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase">EXCELLENT</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 text-center max-w-[220px]">
                Response loops show high engagement! Keep submissions consistent.
              </p>
            </div>

            {/* Custom Funnel list */}
            <div className="space-y-3 flex flex-col justify-center">
              <span className="text-sm font-medium text-slate-300">Submission funnel status</span>
              {['Accepted', 'Heard back', 'Waiting', 'Submitted', 'Rejected'].map((status) => {
                const count = applications.filter(a => a.status === status).length;
                const percentage = totalApps > 0 ? (count / totalApps) * 100 : 0;
                
                const getColors = (st: string) => {
                  switch(st) {
                    case 'Accepted': return { bg: 'bg-emerald-400', txt: 'text-emerald-400' };
                    case 'Heard back': return { bg: 'bg-green-500', txt: 'text-emerald-300' };
                    case 'Waiting': return { bg: 'bg-yellow-500', txt: 'text-yellow-400' };
                    case 'Submitted': return { bg: 'bg-blue-400', txt: 'text-blue-400' };
                    default: return { bg: 'bg-rose-500', txt: 'text-rose-400' };
                  }
                };
                
                const cols = getColors(status);

                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">{status}</span>
                      <span className={`${cols.txt} font-semibold`}>{count} ({Math.round(percentage)}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${cols.bg} rounded-full transition-all duration-1000`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chrome Extension Live capture Feed */}
        <div className="p-5 bg-emerald-deep bg-opacity-70 emerald-card-glow rounded-xl flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-ping" />
                <h3 className="text-md font-display font-medium text-white">Silent Tracker Feed</h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-300">Active</span>
            </div>

            <p className="text-xs text-slate-400">
              Your Chrome Extension operates in the background, listening for the form submission page.
            </p>

            <div className="space-y-4 mt-2">
              {applications.slice(0, 3).map((app, idx) => (
                <div 
                  key={app.id}
                  onClick={() => onSelectApp(app)}
                  className="group flex gap-3 p-3 bg-[#071a15]/50 border border-emerald-950/70 hover:border-brand-green/30 rounded-lg cursor-pointer transition-all duration-150"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-950 text-brand-green flex items-center justify-center font-mono text-xs font-bold">
                    0{idx+1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-brand-green">
                        {app.company}
                      </h4>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded uppercase">
                        {app.source === 'auto' ? 'AUTO_CAPTURED' : 'MANUAL'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate mt-0.5">{app.position}</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">
                      {new Date(app.timestamp).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-center">
            <span className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              Answer Library auto-indexed {applications.reduce((acc, a) => acc + a.qaList.length, 0)} answers.
            </span>
          </div>
        </div>

      </div>

      {/* Manual Track Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-deep border border-emerald-900 rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Chrome className="w-5 h-5 text-brand-green" />
                <h3 className="text-lg font-display font-medium text-white">Manual Application Track</h3>
              </div>
              <button 
                onClick={() => { setShowAddModal(false); setDuplicateWarning(null); }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Company Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Kleiner Perkins"
                  value={newCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="w-full bg-[#071a15] border border-emerald-900 focus:border-brand-green rounded-lg px-3 py-2 text-sm text-white outline-none placeholder-slate-600 transition-all font-sans"
                />
              </div>

              {duplicateWarning && (
                <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-lg flex items-start gap-2.5 text-xs text-red-400">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                  <span>{duplicateWarning}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Position / Program Role</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Engineering Fellow"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  className="w-full bg-[#071a15] border border-emerald-900 focus:border-brand-green rounded-lg px-3 py-2 text-sm text-white outline-none placeholder-slate-600 transition-all font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Application Form URL (Optional)</label>
                <input 
                  type="url"
                  placeholder="e.g. https://docs.google.com/forms/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-[#071a15] border border-emerald-900 focus:border-brand-green rounded-lg px-3 py-2 text-sm text-white outline-none placeholder-slate-600 transition-all font-sans"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => { setShowAddModal(false); setDuplicateWarning(null); }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm text-slate-300 font-medium transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-[#050d0a] font-semibold rounded-lg text-sm transition-all shadow active:scale-95 duration-150 cursor-pointer"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
