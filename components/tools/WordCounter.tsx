'use client';

import { useState, useMemo, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  Upload, 
  Download, 
  Clipboard, 
  Maximize2, 
  Minimize2, 
  Target, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Volume2, 
  FileText,
  BarChart2
} from 'lucide-react';
import { computeTextStats } from '@/lib/text-utils';

const SAMPLE_ESSAY = `The Architecture of Thought: Writing as Cognitive Clarification

Writing is fundamentally not the transcription of thoughts previously formulated in silence; rather, it is the actual engine through which thoughts achieve articulation and rigor. When an essayist commits an ambiguous intuition to paper, the structural constraints of syntax immediately compel precision. Words demand subjects, predicates require agency, and conclusions insist upon demonstrable premises.

Throughout academic discourse, students frequently succumb to the misconception that exceptional prose arises from raw emotional inspiration. In truth, enduring scholarship emerges through deliberate structural constraints. Consider the discipline of word limits. A five-hundred-word admissions essay or a two-thousand-word historical thesis does not merely restrict volume; it forces the writer to rank arguments hierarchically, discarding trivial tangents in favor of central claims.

Ultimately, clarity of prose reflects clarity of mind. To master the craft of writing is to cultivate an intolerance for intellectual haziness. When we refine our sentences, we are not merely polishing aesthetics; we are clarifying the architecture of how we think.`;

export function WordCounter({ initialText = '' }: { initialText?: string }) {
  const [text, setText] = useState(initialText || SAMPLE_ESSAY);
  const [targetWordCount, setTargetWordCount] = useState<number>(500);
  const [copied, setCopied] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [filterStopWords, setFilterStopWords] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => {
    return computeTextStats(text, filterStopWords);
  }, [text, filterStopWords]);

  const targetProgress = targetWordCount > 0 
    ? Math.min(100, Math.round((stats.words / targetWordCount) * 100))
    : 0;

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

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(prev => prev ? prev + '\n' + clipText : clipText);
      }
    } catch {
      // clipboard permission denied or not supported in iframe
    }
  };

  const handleClear = () => {
    if (confirm('Clear all text from the counter?')) {
      setText('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setText(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'textutils-document.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`space-y-6 ${zenMode ? 'fixed inset-0 z-50 bg-[#FAF8F5] p-6 overflow-y-auto' : ''}`}>
      {/* Zen Mode Header Bar */}
      {zenMode && (
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-serif-heading text-lg font-bold text-stone-900">Zen Focus Writing</span>
            <span className="text-xs text-stone-600 font-mono">({stats.words} words • {stats.characters} chars)</span>
          </div>
          <button
            onClick={() => setZenMode(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-200 text-stone-800 hover:bg-stone-300"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Exit Zen Mode</span>
          </button>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Words</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 mt-1">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-600 mt-1 font-mono">
            {stats.words === 0 ? 'Empty' : `${stats.pagesDoubleSpaced} double-spaced pgs`}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Characters</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 mt-1">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-600 mt-1 font-mono">
            {stats.charactersNoSpaces.toLocaleString()} no spaces
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">Sentences</div>
          <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-stone-900 mt-1">
            {stats.sentences.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-600 mt-1 font-mono">
            {stats.paragraphs} {stats.paragraphs === 1 ? 'paragraph' : 'paragraphs'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-600" />
            <span>Reading Time</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-heading text-stone-900 mt-1">
            {stats.readingTimeFormatted}
          </div>
          <div className="text-[11px] text-stone-600 mt-1">
            at ~225 words/min
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-stone-600" />
            <span>Speaking Time</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif-heading text-stone-900 mt-1">
            {stats.speakingTimeFormatted}
          </div>
          <div className="text-[11px] text-stone-600 mt-1">
            at ~130 words/min
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-stone-600" />
            <span>Reading Level</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-stone-900 mt-1 truncate">
            {stats.readingGradeLevel.split(' ')[0]}
          </div>
          <div className="text-[11px] text-stone-600 mt-1 truncate" title={stats.readingGradeLevel}>
            Score: {stats.readingEaseScore}/100
          </div>
        </div>
      </div>

      {/* Target Word Count Goal Tracker */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-stone-700" />
            <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Target Word Count Goal:
            </span>
            <span className="text-xs font-mono font-bold text-stone-900">
              {stats.words} / {targetWordCount} words ({targetProgress}%)
            </span>
          </div>

          {/* Quick preset goal buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-stone-600 mr-1 text-[11px]">Presets:</span>
            {[
              { label: '250w (Short)', value: 250 },
              { label: '500w (Prompt)', value: 500 },
              { label: '1,000w (Essay)', value: 1000 },
              { label: '2,500w (Paper)', value: 2500 },
            ].map(preset => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setTargetWordCount(preset.value)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  targetWordCount === preset.value
                    ? 'bg-stone-900 text-stone-50'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
            <div className="flex items-center gap-1 ml-1">
              <input
                type="number"
                min="10"
                step="50"
                value={targetWordCount}
                onChange={(e) => setTargetWordCount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-16 px-1.5 py-0.5 text-xs border border-stone-200 rounded font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                aria-label="Custom target words"
              />
              <span className="text-[11px] text-stone-600">w</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              targetProgress >= 100 ? 'bg-emerald-600' : 'bg-stone-800'
            }`}
            style={{ width: `${Math.min(100, targetProgress)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-stone-600 mt-1 font-mono">
          <span>
            {stats.words < targetWordCount 
              ? `${targetWordCount - stats.words} words remaining` 
              : `Goal reached! (+${stats.words - targetWordCount} words past)`}
          </span>
          <span>{stats.words} / {targetWordCount}</span>
        </div>
      </div>

      {/* Editor & Control Ribbon */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Editor Toolbar */}
        <div className="bg-stone-50/70 border-b border-stone-200 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
            <FileText className="w-4 h-4 text-stone-600" />
            <span className="font-serif-heading font-semibold text-stone-900">Scratchpad Editor</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Copy text to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Upload text file"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import .txt</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.md,.rtf"
              className="hidden"
            />

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Download text file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={() => setText(SAMPLE_ESSAY)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Load sample essay text"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sample</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded-md transition-colors"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={() => setZenMode(!zenMode)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors ml-1"
              title={zenMode ? 'Exit Zen Mode' : 'Enter Zen Fullscreen Mode'}
            >
              {zenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{zenMode ? 'Exit Zen' : 'Zen Focus'}</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          id="word-counter-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to calculate words, characters, reading time, and readability grade..."
          className="w-full h-80 sm:h-96 p-4 sm:p-6 text-stone-800 text-base leading-relaxed bg-white focus:outline-none resize-y custom-scrollbar font-serif selection:bg-amber-100 selection:text-stone-900"
          spellCheck="true"
        />

        {/* Bottom Status Ribbon */}
        <div className="bg-stone-50 border-t border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-stone-600 font-mono">
          <div className="flex items-center gap-3">
            <span>{stats.words} words</span>
            <span>•</span>
            <span>{stats.characters} characters</span>
            <span>•</span>
            <span>{stats.lines} lines</span>
          </div>
          <div>
            <span>Flesch Grade: {stats.readingGradeLevel}</span>
          </div>
        </div>
      </div>

      {/* Keyword Frequency & Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Keywords Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-stone-700" />
              <h3 className="text-sm font-semibold font-serif-heading text-stone-900">
                Keyword Density & Repetition
              </h3>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filterStopWords}
                onChange={(e) => setFilterStopWords(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-400"
              />
              <span>Filter common filler words</span>
            </label>
          </div>

          {stats.topKeywords.length === 0 ? (
            <p className="text-xs text-stone-600 italic py-4 text-center">
              Type or paste at least a few sentences to reveal word frequency.
            </p>
          ) : (
            <div className="space-y-2">
              {stats.topKeywords.map((item) => (
                <div key={item.word} className="flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-800 font-medium">{item.word}</span>
                  <div className="flex items-center gap-3 w-1/2">
                    <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-stone-700 rounded-full"
                        style={{ width: `${Math.min(100, item.percentage * 8)}%` }}
                      />
                    </div>
                    <span className="font-mono text-stone-600 w-16 text-right">
                      {item.count}x ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Readability & Academic Paper Estimates */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
          <h3 className="text-sm font-semibold font-serif-heading text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-700" />
            <span>Academic Formatting & Readability</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-600">Standard Double-Spaced Pages (~250 words):</span>
              <span className="font-mono font-semibold text-stone-900">{stats.pagesDoubleSpaced} pages</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-600">Single-Spaced Pages (~500 words):</span>
              <span className="font-mono font-semibold text-stone-900">{stats.pagesSingleSpaced} pages</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-600">Average Words per Sentence:</span>
              <span className="font-mono font-semibold text-stone-900">
                {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : '0'} words
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-600">Average Characters per Word:</span>
              <span className="font-mono font-semibold text-stone-900">
                {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : '0'} chars
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-600">Flesch Reading Ease Index:</span>
              <span className="font-mono font-semibold text-stone-900">
                {stats.readingEaseScore} / 100 ({stats.readingGradeLevel})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
