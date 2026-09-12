'use client';

import { useState, useMemo } from 'react';
import { 
  ListFilter, 
  Copy, 
  Trash2, 
  Download, 
  Sparkles, 
  ArrowUpDown, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

const SAMPLE_LIST = `Smith, J. (2021). The Psychology of Focused Writing. Oxford Press.
Davis, M. (2019). Structural Analysis of Prose. Academic Books.
Smith, J. (2021). The Psychology of Focused Writing. Oxford Press.
Taylor, R. (2022). Principles of Academic Editing. Cambridge.
Taylor, R. (2022). Principles of Academic Editing. Cambridge.
Davis, M. (2019). Structural Analysis of Prose. Academic Books.
Miller, K. (2023). Cognitive Science in the Classroom. MIT Press.
Taylor, R. (2022). Principles of Academic Editing. Cambridge.`;

export function RemoveDuplicates() {
  const [inputText, setInputText] = useState(SAMPLE_LIST);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [sortOption, setSortOption] = useState<'original' | 'asc' | 'desc'>('original');
  const [retention, setRetention] = useState<'first' | 'last'>('first');
  const [copied, setCopied] = useState(false);

  // Deduplication logic
  const { cleanedText, originalCount, uniqueCount, duplicatesRemoved } = useMemo(() => {
    if (!inputText) {
      return { cleanedText: '', originalCount: 0, uniqueCount: 0, duplicatesRemoved: 0 };
    }

    let lines = inputText.split(/\r?\n/);
    const rawOriginalCount = lines.length;

    if (trimWhitespace) {
      lines = lines.map(l => l.trim());
    }

    if (removeEmptyLines) {
      lines = lines.filter(l => l.length > 0);
    }

    // Deduplicate
    const seen = new Set<string>();
    const resultLines: string[] = [];

    const linesToProcess = retention === 'last' ? [...lines].reverse() : lines;

    for (const line of linesToProcess) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        resultLines.push(line);
      }
    }

    let finalLines = retention === 'last' ? resultLines.reverse() : resultLines;

    // Sorting
    if (sortOption === 'asc') {
      finalLines = [...finalLines].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    } else if (sortOption === 'desc') {
      finalLines = [...finalLines].sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
    }

    const removed = rawOriginalCount - finalLines.length;

    return {
      cleanedText: finalLines.join('\n'),
      originalCount: rawOriginalCount,
      uniqueCount: finalLines.length,
      duplicatesRemoved: Math.max(0, removed)
    };
  }, [inputText, caseSensitive, trimWhitespace, removeEmptyLines, sortOption, retention]);

  const percentageReduction = originalCount > 0
    ? Math.round((duplicatesRemoved / originalCount) * 100)
    : 0;

  const handleCopy = async () => {
    if (!cleanedText) return;
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!cleanedText) return;
    const blob = new Blob([cleanedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deduplicated-lines.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Real-time stats banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Original Lines</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 mt-1">
            {originalCount}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800">Unique Remaining</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-emerald-700 mt-1">
            {uniqueCount}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-rose-800">Duplicates Removed</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-rose-700 mt-1">
            {duplicatesRemoved}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Reduction</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 mt-1">
            {percentageReduction}%
          </div>
        </div>
      </div>

      {/* Deduplication Options Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
            />
            <span>Case Sensitive</span>
          </label>

          <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
            />
            <span>Trim Whitespace</span>
          </label>

          <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
            />
            <span>Remove Empty Lines</span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-600 font-medium">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs font-medium text-stone-800 focus:outline-none"
            >
              <option value="original">Preserve Order</option>
              <option value="asc">Alphabetical (A → Z)</option>
              <option value="desc">Reverse (Z → A)</option>
            </select>
          </div>

          {/* Retention */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-600 font-medium">Keep:</span>
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value as any)}
              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs font-medium text-stone-800 focus:outline-none"
            >
              <option value="first">First Occurrence</option>
              <option value="last">Last Occurrence</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setInputText(SAMPLE_LIST)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-stone-700 hover:bg-stone-100 rounded-md font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Sample List</span>
          </button>
        </div>
      </div>

      {/* Input & Output Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Lines */}
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="bg-stone-50/70 border-b border-stone-200 px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 font-serif-heading">
              <ListFilter className="w-4 h-4 text-stone-600" />
              <span>Input Lines ({originalCount})</span>
            </div>
            <button
              type="button"
              onClick={() => setInputText('')}
              className="text-xs text-stone-600 hover:text-stone-900"
            >
              Clear
            </button>
          </div>
          <textarea
            id="duplicates-input-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your list with one entry per line (citations, names, emails, keywords)..."
            className="w-full h-80 sm:h-96 p-4 text-stone-800 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none resize-y custom-scrollbar"
            spellCheck="false"
          />
        </div>

        {/* Deduplicated Output */}
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="bg-stone-50/70 border-b border-stone-200 px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 font-serif-heading">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Deduplicated Output ({uniqueCount} unique lines)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-200 rounded-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <textarea
            id="duplicates-output-textarea"
            readOnly
            value={cleanedText}
            placeholder="Cleaned unique lines will automatically appear here..."
            className="w-full h-80 sm:h-96 p-4 text-stone-800 text-xs sm:text-sm font-mono leading-relaxed bg-[#FAF8F5]/50 focus:outline-none resize-y custom-scrollbar"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
