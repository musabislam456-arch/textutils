'use client';

import { useState, useMemo } from 'react';
import * as Diff from 'diff';
import { 
  GitCompare, 
  ArrowRightLeft, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Columns2, 
  Rows, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';

const SAMPLE_DRAFT_1 = `Academic writing requires high dedication and lot of time. Students often make mistakes with citations because they don't understand APA style guidelines. When writing a first draft, it is very important to make sure that you write quickly and don't stop. Many professors say that good papers take three revisions to be ready.`;

const SAMPLE_DRAFT_2 = `Academic scholarship demands rigorous intellectual dedication and significant cognitive endurance. Researchers frequently stumble over citation mechanics because they misunderstand the nuances of APA and Chicago style guidelines. When drafting an initial manuscript, scholars must prioritize momentum without pausing to self-censor. Ultimately, peer reviewers agree that high-caliber papers require at least four systematic revisions to achieve publication quality.`;

type DiffMode = 'words' | 'lines' | 'chars';
type ViewMode = 'unified' | 'split';

export function DiffChecker() {
  const [originalText, setOriginalText] = useState(SAMPLE_DRAFT_1);
  const [modifiedText, setModifiedText] = useState(SAMPLE_DRAFT_2);
  const [diffMode, setDiffMode] = useState<DiffMode>('words');
  const [viewMode, setViewMode] = useState<ViewMode>('unified');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [copied, setCopied] = useState(false);

  const diffResults = useMemo(() => {
    const textA = ignoreCase ? originalText.toLowerCase() : originalText;
    const textB = ignoreCase ? modifiedText.toLowerCase() : modifiedText;

    if (diffMode === 'lines') {
      return Diff.diffLines(textA, textB, { ignoreWhitespace });
    } else if (diffMode === 'chars') {
      return Diff.diffChars(textA, textB, { ignoreCase });
    } else {
      // words
      const cleanedA = ignoreWhitespace ? textA.replace(/[ \t]+/g, ' ') : textA;
      const cleanedB = ignoreWhitespace ? textB.replace(/[ \t]+/g, ' ') : textB;
      return Diff.diffWords(cleanedA, cleanedB, { ignoreCase });
    }
  }, [originalText, modifiedText, diffMode, ignoreCase, ignoreWhitespace]);

  // Statistics
  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    for (const part of diffResults) {
      if (part.added) added += (diffMode === 'words' ? part.value.trim().split(/\s+/).filter(Boolean).length : part.value.length);
      else if (part.removed) removed += (diffMode === 'words' ? part.value.trim().split(/\s+/).filter(Boolean).length : part.value.length);
      else unchanged += (diffMode === 'words' ? part.value.trim().split(/\s+/).filter(Boolean).length : part.value.length);
    }

    return { added, removed, unchanged };
  }, [diffResults, diffMode]);

  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const handleCopyReport = async () => {
    const summary = `TextUtils Diff Report (${diffMode}):\n+ ${stats.added} added\n- ${stats.removed} removed\n\n${diffResults.map(p => {
      if (p.added) return `[+ ${p.value.trim()} +]`;
      if (p.removed) return `[- ${p.value.trim()} -]`;
      return p.value;
    }).join(' ')}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Configuration Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Mode Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-700 uppercase tracking-wider text-[11px] mr-1">
            Compare By:
          </span>
          {(['words', 'lines', 'chars'] as DiffMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setDiffMode(mode)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                diffMode === mode
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {mode}
            </button>
          ))}

          <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

          {/* View Mode */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('unified')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'unified'
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Unified View"
            >
              <Rows className="w-3.5 h-3.5" />
              <span>Unified</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'split'
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              title="Side-by-Side Split View"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>
        </div>

        {/* Toggles & Options */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-stone-600 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
            />
            <span>Ignore Case</span>
          </label>

          <label className="flex items-center gap-1.5 text-stone-600 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
            />
            <span>Ignore Spaces</span>
          </label>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-stone-700 bg-stone-100 hover:bg-stone-200 font-medium transition-colors"
            title="Swap Original and Modified texts"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setOriginalText(SAMPLE_DRAFT_1);
              setModifiedText(SAMPLE_DRAFT_2);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-stone-700 hover:bg-stone-100"
            title="Load sample draft comparison"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Sample</span>
          </button>
        </div>
      </div>

      {/* Input Panes (Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Original Text Pane */}
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="bg-stone-50/70 border-b border-stone-200 px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-xs font-semibold text-stone-800 font-serif-heading">
                Original Text (Draft A)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOriginalText('')}
              className="text-stone-600 hover:text-stone-800 text-xs"
              title="Clear original text"
            >
              Clear
            </button>
          </div>
          <textarea
            id="diff-original-textarea"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste original version of your essay, paper, or code here..."
            className="w-full h-48 sm:h-56 p-4 text-stone-800 text-sm leading-relaxed focus:outline-none resize-y custom-scrollbar font-serif selection:bg-rose-100"
          />
        </div>

        {/* Modified Text Pane */}
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="bg-stone-50/70 border-b border-stone-200 px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-stone-800 font-serif-heading">
                Modified Text (Draft B)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setModifiedText('')}
              className="text-stone-600 hover:text-stone-800 text-xs"
              title="Clear modified text"
            >
              Clear
            </button>
          </div>
          <textarea
            id="diff-modified-textarea"
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="Paste revised version of your essay, paper, or code here..."
            className="w-full h-48 sm:h-56 p-4 text-stone-800 text-sm leading-relaxed focus:outline-none resize-y custom-scrollbar font-serif selection:bg-emerald-100"
          />
        </div>
      </div>

      {/* Diff Result Container */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Results Header with Statistics */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-serif-heading font-semibold text-stone-900 text-sm">
              <GitCompare className="w-4 h-4 text-stone-700" />
              <span>Differences Visualization</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-semibold">
                <Plus className="w-3 h-3" />
                {stats.added} {diffMode === 'words' ? 'words added' : 'added'}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-rose-100/70 text-rose-800 font-semibold">
                <Minus className="w-3 h-3" />
                {stats.removed} {diffMode === 'words' ? 'words deleted' : 'deleted'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Diff!' : 'Copy Diff Summary'}</span>
          </button>
        </div>

        {/* Visual Diff Rendering */}
        <div className="p-6">
          {viewMode === 'unified' ? (
            /* Unified View */
            <div className="font-serif text-base leading-relaxed bg-[#FAF8F5] p-5 rounded-lg border border-stone-200/60 custom-scrollbar max-h-96 overflow-y-auto whitespace-pre-wrap">
              {diffResults.map((part, index) => {
                if (part.added) {
                  return (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-950 font-medium px-1 py-0.5 rounded mx-0.5 border border-emerald-300"
                    >
                      {part.value}
                    </span>
                  );
                }
                if (part.removed) {
                  return (
                    <span
                      key={index}
                      className="bg-rose-100 text-rose-950 line-through opacity-80 px-1 py-0.5 rounded mx-0.5 border border-rose-300"
                    >
                      {part.value}
                    </span>
                  );
                }
                return <span key={index} className="text-stone-800">{part.value}</span>;
              })}
            </div>
          ) : (
            /* Side-by-Side Split View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F5] p-4 rounded-lg border border-stone-200/60 custom-scrollbar max-h-96 overflow-y-auto font-serif text-sm leading-relaxed">
                <div className="text-[11px] font-mono text-stone-600 uppercase font-semibold mb-2 pb-1 border-b border-stone-200">
                  Original (showing deletions)
                </div>
                {diffResults.map((part, index) => {
                  if (part.added) return null;
                  if (part.removed) {
                    return (
                      <span key={index} className="bg-rose-100 text-rose-950 line-through px-1 py-0.5 rounded border border-rose-300">
                        {part.value}
                      </span>
                    );
                  }
                  return <span key={index} className="text-stone-800">{part.value}</span>;
                })}
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-lg border border-stone-200/60 custom-scrollbar max-h-96 overflow-y-auto font-serif text-sm leading-relaxed">
                <div className="text-[11px] font-mono text-stone-600 uppercase font-semibold mb-2 pb-1 border-b border-stone-200">
                  Modified (showing additions)
                </div>
                {diffResults.map((part, index) => {
                  if (part.removed) return null;
                  if (part.added) {
                    return (
                      <span key={index} className="bg-emerald-100 text-emerald-950 font-medium px-1 py-0.5 rounded border border-emerald-300">
                        {part.value}
                      </span>
                    );
                  }
                  return <span key={index} className="text-stone-800">{part.value}</span>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
