'use client';

import { useState } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Undo2, 
  Sparkles, 
  ArrowRightLeft,
  CheckCircle2
} from 'lucide-react';
import { 
  toTitleCase, 
  toSentenceCase, 
  toCamelCase, 
  toSnakeCase, 
  toKebabCase, 
  toPascalCase, 
  toAlternatingCase, 
  toInvertCase, 
  toConstantCase 
} from '@/lib/text-utils';

const SAMPLE_TEXT = `the importance of academic integrity in higher education: an exploratory analysis of citation ethics and digital source verification.`;

export function CaseConverter({ initialText = '' }: { initialText?: string }) {
  const [text, setText] = useState(initialText || SAMPLE_TEXT);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const applyConversion = (type: string, fn: (val: string) => string) => {
    if (!text) return;
    setHistory(prev => [...prev.slice(-10), text]);
    const updated = fn(text);
    setText(updated);
    setLastAction(type);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setText(previous);
    setLastAction('Undo');
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

  const wordCount = text.trim() ? (text.match(/[\p{L}\p{N}'’-]+/gu) || []).length : 0;
  const charCount = text.length;

  return (
    <div className="space-y-6">
      {/* Transformation Action Buttons Bar */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-stone-700" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              Select Transformation Case
            </h3>
          </div>
          {lastAction && (
            <span className="text-xs font-medium text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50">
              Applied: {lastAction}
            </span>
          )}
        </div>

        {/* Primary Case Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => applyConversion('UPPERCASE', t => t.toUpperCase())}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">UPPERCASE</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">ALL LETTERS CAPITAL</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('lowercase', t => t.toLowerCase())}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">lowercase</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">all letters small</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('Title Case', toTitleCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">Title Case</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">Chicago / AP Academic</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('Sentence case', toSentenceCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">Sentence case</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">First letter capitalized</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('Capitalized Words', t => 
              t.replace(/\b[a-z]/g, l => l.toUpperCase())
            )}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">Capitalized Words</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">Every Single Word</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('camelCase', toCamelCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">camelCase</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">codeIdentifiers</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('snake_case', toSnakeCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">snake_case</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">variable_naming</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('kebab-case', toKebabCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">kebab-case</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">url-slugs-style</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('PascalCase', toPascalCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">PascalCase</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">ClassNamesStyle</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('CONSTANT_CASE', toConstantCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">CONSTANT_CASE</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">GLOBAL_CONFIG</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('aLtErNaTiNg cAsE', toAlternatingCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">aLtErNaTiNg</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">sPoNgEbOb cAsE</span>
          </button>

          <button
            type="button"
            onClick={() => applyConversion('Invert cASE', toInvertCase)}
            className="flex flex-col items-start p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-stone-800 transition-all text-left group"
          >
            <span className="text-xs font-bold font-mono">Invert Case</span>
            <span className="text-[11px] text-stone-600 group-hover:text-stone-300">Flip Lower & Upper</span>
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Editor Controls Bar */}
        <div className="bg-stone-50/70 border-b border-stone-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-stone-600 font-mono">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} characters</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                history.length > 0
                  ? 'text-stone-800 hover:bg-stone-200'
                  : 'text-stone-600 opacity-50 cursor-not-allowed'
              }`}
              title="Undo last change"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo ({history.length})</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>

            <button
              type="button"
              onClick={() => setText(SAMPLE_TEXT)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-md"
              title="Load sample headline"
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
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-md"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          id="case-converter-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert case..."
          className="w-full h-64 sm:h-80 p-4 sm:p-6 text-stone-800 text-base leading-relaxed bg-white focus:outline-none resize-y custom-scrollbar font-serif selection:bg-amber-100"
          spellCheck="false"
        />
      </div>

      {/* Guide Callout for Title Case Rules */}
      <div className="bg-[#FAF8F5] border border-stone-200 p-4 rounded-xl text-xs text-stone-600 leading-relaxed">
        <h4 className="font-semibold text-stone-800 mb-1 font-serif-heading text-sm">
          About TextUtils Title Case Standard:
        </h4>
        <p>
          Unlike naive scripts that capitalize every letter, TextUtils’s Title Case complies with academic stylebooks (MLA, APA, and Chicago Manual of Style). It keeps articles (<code className="bg-stone-100 px-1 py-0.5 rounded">a, an, the</code>), short prepositions (<code className="bg-stone-100 px-1 py-0.5 rounded">in, of, to, at, by, for</code>), and coordinating conjunctions (<code className="bg-stone-100 px-1 py-0.5 rounded">and, but, or</code>) in lowercase unless they appear at the beginning or end of a title or subtitle.
        </p>
      </div>
    </div>
  );
}
