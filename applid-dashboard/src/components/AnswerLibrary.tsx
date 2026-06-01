/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Plus, 
  ArrowRight, 
  Library, 
  FileText,
  HelpCircle,
  Building2,
  Brain
} from 'lucide-react';
import { LibraryItem } from '../types';

interface AnswerLibraryProps {
  library: LibraryItem[];
  onAddLibraryItem: (item: LibraryItem) => void;
}

export default function AnswerLibrary({ library, onAddLibraryItem }: AnswerLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // AI Composer States
  const [selectedRefIds, setSelectedRefIds] = useState<string[]>([]);
  const [targetCompany, setTargetCompany] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [loadingComposer, setLoadingComposer] = useState(false);
  const [draftResult, setDraftResult] = useState<string | null>(null);
  const [errorComposer, setErrorComposer] = useState<string | null>(null);

  // Filter library
  const categories = ['All', 'Why Us / Fit', 'Technical', 'Community', 'Leadership'];
  
  const filteredLibrary = library.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItemId(id);
    setTimeout(() => setCopiedItemId(null), 1800);
  };

  const toggleRefSelection = (id: string) => {
    if (selectedRefIds.includes(id)) {
      setSelectedRefIds(selectedRefIds.filter(x => x !== id));
    } else {
      setSelectedRefIds([...selectedRefIds, id]);
    }
  };

  const handleComposeWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt || !targetCompany) {
      setErrorComposer('Please fill out both the target organization and prompt.');
      return;
    }

    setLoadingComposer(true);
    setErrorComposer(null);
    setDraftResult(null);

    // Collect answers corresponding to selectedRefIds
    const pastAnswers = library
      .filter(item => selectedRefIds.includes(item.id))
      .map(item => `Question: ${item.question}\nAnswer: ${item.answer}`);

    try {
      const response = await fetch('/api/suggest-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: newPrompt,
          targetCompany,
          pastAnswers
        }),
      });

      if (!response.ok) {
        throw new Error('Server side error while processing draft.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setDraftResult(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorComposer(err.message || 'An unexpected error occurred during synthesis.');
    } finally {
      setLoadingComposer(false);
    }
  };

  // Add the draft response straight to user's library as a newly engineered piece!
  const handleSaveDraftToLibrary = () => {
    if (!draftResult) return;
    const newItem: LibraryItem = {
      id: `lib-ai-${Date.now()}`,
      question: newPrompt,
      answer: draftResult,
      category: 'General',
      company: targetCompany,
      position: 'AI Generated Draft',
      timestamp: new Date().toISOString()
    };
    onAddLibraryItem(newItem);
    setDraftResult(null);
    setNewPrompt('');
    setTargetCompany('');
    setSelectedRefIds([]);
    alert('🎉 Generated workspace answer saved to library!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
          Answer Library
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Every question & answer parsed from Google Forms is compiled here. Search, copy, or compose new responses.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: searchable Answer Listing */}
        <div className="xl:col-span-7 space-y-4">
          <div className="p-5 bg-emerald-deep bg-opacity-70 border border-emerald-950 rounded-xl space-y-4">
            
            {/* Search Input */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search previously written answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#050d0a] hover:border-emerald-900/80 focus:border-brand-green/70 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none border border-emerald-950 placeholder-slate-600 transition-all font-sans"
                />
              </div>

              {/* Categorization tabs */}
              <div className="flex overflow-x-auto gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`text-xs font-mono px-3 py-2 rounded whitespace-nowrap cursor-pointer transition-all ${
                      categoryFilter === cat
                        ? 'bg-brand-green/90 text-[#050d0a] font-semibold'
                        : 'bg-[#050d0a] text-slate-400 hover:text-white hover:bg-emerald-950'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              💡 Click "Ref" to select past answers. You can feed them into the Smart AI Composer on the right to draft a brand new response!
            </p>
          </div>

          {/* Cards Log Container */}
          <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredLibrary.length === 0 ? (
              <div className="text-center py-12 bg-[#071a15]/20 border border-emerald-950 rounded-xl">
                <Library className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No recorded answers match search</p>
                <p className="text-xs text-slate-600 mt-1">Submit forms using the Chrome extension to index contents</p>
              </div>
            ) : (
              filteredLibrary.map((item) => {
                const isSelected = selectedRefIds.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    className={`p-4 bg-emerald-deep bg-opacity-60 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-brand-green bg-[#07241c]/50' 
                        : 'border-emerald-950/60 hover:border-emerald-900'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Written for <strong className="text-slate-300">{item.company}</strong> ({item.position})
                          </span>
                        </div>
                        <h4 className="text-sm font-display font-medium text-white pt-1">
                          {item.question}
                        </h4>
                      </div>

                      {/* Select & Copy Controls */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => toggleRefSelection(item.id)}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded border cursor-pointer select-none transition-all ${
                            isSelected 
                              ? 'bg-brand-green/10 border-brand-green text-brand-green font-semibold' 
                              : 'bg-[#050d0a] border-emerald-950/80 text-slate-400 hover:text-white'
                          }`}
                          title="Use as AI writing reference context"
                        >
                          {isSelected ? '✓ Selected' : '+ Use Ref'}
                        </button>
                        <button
                          onClick={() => handleCopy(item.answer, item.id)}
                          className="p-1.5 bg-[#050d0a] hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-400 border border-emerald-950 rounded-lg transition-all"
                          title="Copy Answer to Clipboard"
                        >
                          {copiedItemId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-brand-green" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3.5 p-3 bg-[#050d0a]/65 border border-emerald-950/50 rounded-lg text-xs leading-relaxed text-slate-300 font-sans whitespace-pre-wrap">
                      {item.answer}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: AI Smart Answers Generator */}
        <div className="xl:col-span-5 p-5 bg-emerald-deep bg-opacity-70 border border-emerald-950 rounded-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-5 h-5 text-brand-green animate-pulse" />
            <div>
              <h3 className="text-md font-display font-medium text-white">Smart Answer Composer</h3>
              <p className="text-xs text-slate-400">Reuse your past voice responses to draft new ones</p>
            </div>
          </div>

          <form onSubmit={handleComposeWithAI} className="space-y-4">
            
            {/* Context status */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-900/30 rounded-lg">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Reference Context Source</span>
              {selectedRefIds.length === 0 ? (
                <p className="text-[#e2e8f0]/90 text-xs mt-1 italic">
                  ⚠️ No references selected. Select references from the left sidebar to adapt your historic style details, or draft from generic AI parameters.
                </p>
              ) : (
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xs text-emerald-400 font-mono font-semibold">
                    ✓ {selectedRefIds.length} reference submissions active
                  </span>
                  <button 
                    type="button"
                    onClick={() => setSelectedRefIds([])}
                    className="text-[10px] font-mono text-slate-400 hover:text-white underline"
                  >
                    Clear References
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Target Organization</label>
              <div className="relative">
                <Building2 className="absolute left-2.5 top-2 py-0.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Stripe, Techstars, NSF Grant"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-[#050d0a] border border-emerald-950 focus:border-brand-green/60 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none placeholder-slate-700 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">New Essay Prompt</label>
              <textarea 
                required
                rows={3}
                placeholder="Paste the prompt here (e.g. 'How will you make our engineering workflows automated and fault tolerant?')"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                className="w-full bg-[#050d0a] border border-emerald-950 focus:border-brand-green/60 rounded-lg px-3 py-2 text-sm text-white outline-none placeholder-slate-700 transition-all font-sans resize-y"
              />
            </div>

            {errorComposer && (
              <div className="p-3 bg-red-950/40 border border-red-900 text-xs text-red-400 rounded-lg font-mono">
                {errorComposer}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingComposer}
              className={`w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-[#050d0a] font-semibold rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                loadingComposer ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loadingComposer ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#050d0a] border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Voice Draft...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Generate Custom Essay response</span>
                </>
              )}
            </button>
          </form>

          {/* AI Answer composition outcome feedback */}
          {draftResult && (
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-green font-semibold">Voice Synced Draft Complete</span>
                <span className="text-slate-500 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                  Gemini 3.5 Flash Model
                </span>
              </div>

              <div className="p-4 bg-[#050d0a] border border-emerald-950 rounded-xl">
                <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {draftResult}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(draftResult, 'composed')}
                  className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/5 text-xs text-slate-300 font-semibold rounded-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Draft
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraftToLibrary}
                  className="flex-1 py-1.5 bg-emerald-950/55 hover:bg-emerald-900/40 border border-brand-green/30 text-xs text-emerald-300 font-semibold rounded-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Commit to Library
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
