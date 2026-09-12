'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Replace, 
  Copy, 
  Trash2, 
  Undo2, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Code
} from 'lucide-react';

const SAMPLE_TEXT = `The qualitative data indicates that the participants experienced cognitive fatigue during the testing phase. Furthermore, the qualitative data demonstrates that participants in the morning cohort performed significantly better than participants in the evening cohort. According to the researcher, this data suggests a strong correlation between rest and cognitive retention.`;

export function FindReplace() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [findStr, setFindStr] = useState('qualitative data');
  const [replaceStr, setReplaceStr] = useState('empirical findings');
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Build RegExp safely without mutating state inside useMemo
  const { searchRegex, regexError } = useMemo(() => {
    if (!findStr) return { searchRegex: null, regexError: null };

    try {
      let pattern = findStr;
      if (!useRegex) {
        // Escape special regex characters
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }

      const flags = matchCase ? 'g' : 'gi';
      return { searchRegex: new RegExp(pattern, flags), regexError: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid regular expression';
      return { searchRegex: null, regexError: msg };
    }
  }, [findStr, matchCase, wholeWord, useRegex]);

  // Match count
  const matchCount = useMemo(() => {
    if (!searchRegex || !text) return 0;
    const matches = text.match(searchRegex);
    return matches ? matches.length : 0;
  }, [text, searchRegex]);

  const handleReplaceAll = () => {
    if (!searchRegex || !text || matchCount === 0) return;
    setHistory(prev => [...prev.slice(-10), text]);
    const updated = text.replace(searchRegex, replaceStr);
    setText(updated);
  };

  const handleReplaceOne = () => {
    if (!searchRegex || !text || matchCount === 0) return;
    setHistory(prev => [...prev.slice(-10), text]);
    // Replace first occurrence only
    const nonGlobalFlags = matchCase ? '' : 'i';
    let pattern = findStr;
    if (!useRegex) pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (wholeWord) pattern = `\\b${pattern}\\b`;
    const singleRegex = new RegExp(pattern, nonGlobalFlags);
    const updated = text.replace(singleRegex, replaceStr);
    setText(updated);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setText(previous);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Generate highlighted preview text
  const highlightedContent = useMemo(() => {
    if (!searchRegex || !text || matchCount === 0) return text;
    
    // Split text by matching occurrences using a fresh local RegExp
    const localRegex = new RegExp(searchRegex.source, searchRegex.flags);
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = localRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index), isMatch: false });
      }
      parts.push({ text: match[0], isMatch: true });
      lastIndex = match.index + match[0].length;
      if (match[0].length === 0) break; // Avoid infinite loop on empty match
    }

    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), isMatch: false });
    }

    return parts;
  }, [text, searchRegex, matchCount]);

  return (
    <div className="space-y-6">
      {/* Search & Replace Panel */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Find Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="find-input" className="font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-stone-600" />
                <span>Find Text</span>
              </label>
              <span className={`font-mono text-xs font-semibold ${matchCount > 0 ? 'text-amber-800' : 'text-stone-600'}`}>
                {findStr ? `${matchCount} ${matchCount === 1 ? 'match' : 'matches'} found` : 'Enter search term'}
              </span>
            </div>
            <div className="relative">
              <input
                id="find-input"
                type="text"
                value={findStr}
                onChange={(e) => setFindStr(e.target.value)}
                placeholder="Word, sentence, or regex..."
                className="w-full px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono"
              />
            </div>
            {regexError && (
              <p className="text-xs text-rose-600 font-mono mt-1">{regexError}</p>
            )}
          </div>

          {/* Replace Input */}
          <div className="space-y-1.5">
            <label htmlFor="replace-input" className="font-semibold text-stone-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Replace className="w-3.5 h-3.5 text-stone-600" />
              <span>Replace With</span>
            </label>
            <input
              id="replace-input"
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder="Replacement text..."
              className="w-full px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 font-mono"
            />
          </div>
        </div>

        {/* Options & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
          {/* Flags */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
              />
              <span>Match Case (Aa)</span>
            </label>

            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
              />
              <span>Whole Word Only</span>
            </label>

            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
              />
              <span>Regular Expression (.*)</span>
            </label>

            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Hide Highlights' : 'Show Highlights'}</span>
            </button>
          </div>

          {/* Action Execution Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplaceOne}
              disabled={matchCount === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                matchCount > 0
                  ? 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  : 'bg-stone-50 text-stone-600 opacity-50 cursor-not-allowed'
              }`}
            >
              Replace Next
            </button>

            <button
              type="button"
              onClick={handleReplaceAll}
              disabled={matchCount === 0}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                matchCount > 0
                  ? 'bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-xs'
                  : 'bg-stone-200 text-stone-600 opacity-50 cursor-not-allowed'
              }`}
            >
              Replace All ({matchCount})
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Highlight Container */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Header Toolbar */}
        <div className="bg-stone-50/70 border-b border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono text-stone-600">
            {text.length} characters • {text.trim() ? (text.match(/[\p{L}\p{N}'’-]+/gu) || []).length : 0} words
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                history.length > 0 ? 'text-stone-800 hover:bg-stone-200' : 'text-stone-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo ({history.length})</span>
            </button>

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
              onClick={() => setText(SAMPLE_TEXT)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sample</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (text) {
                  setHistory(prev => [...prev, text]);
                  setText('');
                }
              }}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-md"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          id="find-replace-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to search and replace..."
          className="w-full h-64 sm:h-72 p-4 sm:p-6 text-stone-800 text-base leading-relaxed bg-white focus:outline-none resize-y custom-scrollbar font-serif selection:bg-amber-100"
          spellCheck="false"
        />

        {/* Live Match Preview Overlay Box */}
        {showPreview && matchCount > 0 && Array.isArray(highlightedContent) && (
          <div className="border-t border-stone-200 bg-[#FAF8F5] p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-2 font-mono">
              <span className="font-semibold text-stone-800 uppercase tracking-wider">Live Match Highlight Preview:</span>
              <span className="text-amber-900 font-bold">{matchCount} highlighted matches</span>
            </div>
            <div className="font-serif text-sm leading-relaxed p-4 bg-white rounded-lg border border-stone-200/80 max-h-48 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
              {highlightedContent.map((chunk, idx) => (
                chunk.isMatch ? (
                  <mark key={idx} className="bg-amber-200 text-amber-950 font-semibold px-0.5 rounded">
                    {chunk.text}
                  </mark>
                ) : (
                  <span key={idx} className="text-stone-800">{chunk.text}</span>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
