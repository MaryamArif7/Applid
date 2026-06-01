/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Chrome, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Check, 
  Send, 
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Application, QAPair } from '../types';

interface ExtensionPlaygroundProps {
  onCaptureNewForm: (app: Application) => void;
}

export default function ExtensionPlayground({ onCaptureNewForm }: ExtensionPlaygroundProps) {
  // Mock form values
  const [formCompany, setFormCompany] = useState('Stripe');
  const [formPosition, setFormPosition] = useState('Product Engineer');
  const [q1, setQ1] = useState('Explain how you would improve the developer onboarding experience at Stripe.');
  const [a1, setA1] = useState('I would build direct CLI-interactive integrations. Instead of static API keys, developers get a fast local sandbox where copyable curls use short-lived local tokens. This reduces the gap from hello-world to live API requests to under 12 seconds.');
  const [q2, setQ2] = useState('Tell us about your favorite library or tool.');
  const [a2, setA2] = useState('I love esbuild. Its focus on single-threaded speed and zero-dependency Go implementation shows that web development tools do not have to be slow legacy bundlers. It is the golden standard of developer ergonomics.');

  // Simulation state
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [observerLogs, setObserverLogs] = useState<string[]>([
    '🟢 MutationObserver: Loaded & watching current DOM body tree.',
    '🟢 Status: Listening passively for window document changes...',
    'ℹ️ Host check: Detected schema on docs.google.com/forms.'
  ]);
  const [popupFeed, setPopupFeed] = useState<string>('Listening... Fill the form and hit Submit.');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'triggered' | 'parsing' | 'synced'>('idle');

  const [formTitle, setFormTitle] = useState('Stripe Senior Fellowship Form 2026');

  // Trigger observer simulation upon Form submission
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setSyncStatus('triggered');

    // Steps log
    const logSteps = [
      '🔴 DOM Mutation detected! nodeId [div.freebirdFormviewerViewResponseConfirmContent] inserted.',
      '🔍 MutationObserver: Confirmation screen parsed. Google Form submit successful!',
      '⚡ Accessing cached page input registry for active window instance...',
      '📥 Extracted Form Title: "Stripe Senior Fellowship Form 2026"',
      '📤 Parsing form target coordinates: docs.google.com/forms/d/e/1FAIpQLSf_Stripe',
      '📋 Capturing Q&A structures dynamically...',
      `⚡ Question 1 Captured: "${q1.slice(0, 30)}..."`,
      `💾 Answer 1 Linked: "${a1.slice(0, 30)}..."`,
      `⚡ Question 2 Captured: "${q2.slice(0, 30)}..."`,
      `💾 Answer 2 Linked: "${a2.slice(0, 30)}..."`,
      '📡 Secure API Proxy: Syncing JSON packet payload over HTTPS secure headers...',
      '🎉 Silent sync complete! Web Applid dashboard indexed 1 new track.'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setObserverLogs(prev => [...prev, logSteps[step]]);
        step++;
        if (step === 3) setSyncStatus('parsing');
      } else {
        clearInterval(interval);
        setSyncStatus('synced');
        
        // Build the captured application object to update state
        const capturedApp: Application = {
          id: `app-captured-${Date.now()}`,
          title: formTitle,
          company: formCompany,
          position: formPosition,
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSf_StripeForm_Autocaptured/viewform',
          timestamp: new Date().toISOString(),
          status: 'Submitted',
          source: 'auto',
          daysPassed: 0,
          qaList: [
            { question: q1, answer: a1 },
            { question: q2, answer: a2 }
          ],
          reminderText: 'Waiting on response. Newly Auto-captured today.'
        };
        
        onCaptureNewForm(capturedApp);
      }
    }, 450);
  };

  const resetFormSimulation = () => {
    setIsFormSubmitted(false);
    setSyncStatus('idle');
    setObserverLogs([
      '🟢 MutationObserver: Loaded & watching current DOM body tree.',
      '🟢 Status: Listening passively for window document changes...',
      'ℹ️ Host check: Detected schema on docs.google.com/forms.'
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
          Extension Playground
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Simulate how the Vanilla JS Chrome Extension detects form completions silently and synchronizes them to this web dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Screen: Google Form web container */}
        <div className="lg:col-span-7 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-emerald-400 rounded-full" />
              <span className="text-xs text-slate-400 font-mono pl-2">tab: docs.google.com/forms</span>
            </div>
            <span className="text-xs font-mono bg-purple-950/50 text-purple-400 px-2 py-0.5 rounded border border-purple-800/30 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Host: docs.google.com
            </span>
          </div>

          {!isFormSubmitted ? (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Purple Header strip representing Google Forms styling */}
              <div className="h-4 bg-purple-700 rounded-t-xl" />

              <div className="p-4 bg-slate-950 rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Simulated Form Registry</span>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-lg font-display font-bold text-white bg-transparent outline-none w-full border-b border-dashed border-slate-800 focus:border-purple-600 pb-1"
                />
                <p className="text-xs text-slate-400 mt-1">Fill this form below as a job applicant would.</p>
              </div>

              {/* Company & Program Info fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono">Company/Team</label>
                  <input 
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-700 text-sm font-medium rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-mono">Position Title</label>
                  <input 
                    type="text"
                    required
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-purple-700 text-sm font-medium rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              {/* Essay Questions Fields */}
              <div className="space-y-3">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-xs text-slate-400 font-mono block">Question 1</span>
                  <input 
                    type="text"
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    className="text-xs text-white font-semibold bg-transparent border-none outline-none w-full"
                  />
                  <textarea 
                    rows={2}
                    required
                    value={a1}
                    onChange={(e) => setA1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-purple-600 rounded-lg p-2.5 text-xs text-slate-300 outline-none resize-none"
                  />
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-2">
                  <span className="text-xs text-slate-400 font-mono block">Question 2</span>
                  <input 
                    type="text"
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    className="text-xs text-white font-semibold bg-transparent border-none outline-none w-full"
                  />
                  <textarea 
                    rows={2}
                    required
                    value={a2}
                    onChange={(e) => setA2(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-purple-600 rounded-lg p-2.5 text-xs text-slate-300 outline-none resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg text-sm transition-all shadow-md active:scale-95 duration-100 cursor-pointer"
              >
                Submit Form (As applicant)
              </button>
            </form>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-5 text-center min-h-[420px]">
              {/* Google Form Submission Confirmation screen */}
              <div className="p-4 bg-purple-950/30 border border-purple-900/40 rounded-full text-purple-400 animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-display font-medium text-white">{formTitle}</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Your response has been recorded. Thank you for your interest.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 w-full max-w-sm">
                <button
                  onClick={resetFormSimulation}
                  className="flex-1 py-2 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs text-slate-300 font-semibold flex items-center justify-center gap-1 text-center transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Fill Form Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Screen: Chrome browser extension popup mockup */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Mock Floating extension popup overlaying */}
          <div className="p-5 bg-emerald-deep bg-opacity-95 rounded-2xl border border-brand-green/35 shadow-2xl space-y-4 glow-glow relative overflow-hidden flex-1">
            <div className="flex items-center justify-between border-b border-emerald-950/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-950 rounded-lg text-brand-green">
                  <Chrome className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white leading-none">Applid Extension</h3>
                  <span className="text-[9px] font-mono text-emerald-400">MANIFEST V3 - RUNNING</span>
                </div>
              </div>
              
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                isFormSubmitted ? 'bg-brand-green text-[#050d0a] font-bold' : 'bg-slate-900 text-slate-400'
              }`}>
                {isFormSubmitted ? 'TRIGGERED ✓' : '🟢 ARMED'}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 border border-emerald-950 rounded-lg text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Extension Popup Status</span>
              <p className="text-slate-300 mt-1 flex items-baseline gap-1.5 leading-relaxed font-sans">
                <Sparkles className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                {syncStatus === 'idle' && '🟢 MutationObserver armed. Ready to automatically track client Google Forms submits.'}
                {syncStatus === 'triggered' && '⚡ Submition trigger found! Initiating DOM scan...'}
                {syncStatus === 'parsing' && '⚙️ NLP Parsing active. Extracting program details & inputs...'}
                {syncStatus === 'synced' && '🎉 Capture synced! New log synchronized matching your dashboard records.'}
              </p>
            </div>

            {/* Mutation observer console outputs */}
            <div className="p-4 bg-[#050d0a] rounded-xl border border-emerald-950/60 font-mono text-[10px] text-brand-green h-[260px] overflow-y-auto space-y-1.5 shadow-inner">
              <p className="text-slate-500 mb-1 leading-tight select-none">--- APPLID MUTATIONOBSERVER CORE ---</p>
              {observerLogs.map((log, idx) => (
                <p key={idx} className="flex gap-1">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span className="text-emerald-300/90 leading-tight">{log}</span>
                </p>
              ))}
            </div>

            {syncStatus === 'synced' && (
              <div className="p-3 bg-brand-green/10 border border-brand-green/30 rounded-lg text-[11px] text-brand-green flex items-center justify-between">
                <span>✓ Direct sync payload indexed!</span>
                <span className="font-mono text-[9px] uppercase font-bold text-slate-300">HTTPS_OK [201]</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
