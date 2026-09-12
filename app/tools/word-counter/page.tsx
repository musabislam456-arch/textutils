import type { Metadata } from 'next';
import { WordCounter } from '@/components/tools/WordCounter';
import Link from 'next/link';
import { FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Word & Character Counter — TextUtils',
  description: 'Count words, characters with/without spaces, sentences, paragraphs, reading time, speaking time, and Flesch readability grade level in real time.',
  keywords: ['word counter', 'character counter', 'word frequency', 'reading time calculator', 'flesch readability', 'essay word counter'],
  openGraph: {
    title: 'Word & Character Counter — TextUtils',
    description: 'Count words, characters, sentences, reading time, speaking time, and Flesch readability grade level in real time.',
  },
};

export default function WordCounterPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800">Tools</span>
          <span>/</span>
          <span className="text-stone-900 font-bold">Word Counter</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Word & Character Counter
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Accurate, instant text analysis. Track words, characters (with and without whitespace), sentences, paragraphs, speaking pace, and readability grade levels.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <WordCounter />

      {/* Educational Guide Section */}
      <div className="border-t border-stone-200 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-900 mb-3">
              How TextUtils Measures Words & Readability
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Unlike simplistic counters that merely split strings on whitespace, TextUtils uses Unicode-aware boundary matching. Hyphenated compound words, contractions (e.g. <em>don’t</em>, <em>scholar’s</em>), and international accent characters are treated consistently according to academic publishing guidelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">Reading Time (225 wpm)</span>
                Standard silent adult reading speed falls between 200 and 250 words per minute. TextUtils uses a calibrated 225 wpm benchmark to estimate reading duration.
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">Speaking Time (130 wpm)</span>
                Professional oral presentations, seminar speeches, and keynote deliveries average 130 to 140 words per minute to maintain listener comprehension.
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">Flesch Reading Ease Formula</span>
                Calculates difficulty using average sentence length and syllable density per word. Scores above 60 represent standard high-school readability.
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">Academic Page Estimates</span>
                Standard MLA/APA double-spaced 12pt Times New Roman formatting yields roughly 250 words per page. Single-spaced formatting yields ~500 words.
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif-heading text-xl font-bold text-stone-900 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Does TextUtils store or transmit my essay?</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  No. TextUtils processes your text exclusively inside your client browser’s memory. No text is sent to an external server, no cookies are logged, and closing your tab completely purges all data.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">How can I hit a strict target word count?</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Use the Target Word Count tracker at the top of the scratchpad. Set your assignment requirement (e.g., 500 words for Common App, 2,000 for a term paper), and the live progress bar will highlight your pacing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Related Guides */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-stone-900">
              Recommended Reading
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/blog/word-count-standards-for-essays"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors group"
              >
                <span className="font-semibold text-stone-900 block group-hover:text-amber-900">
                  Word Count Standards for Essays
                </span>
                <span className="text-stone-600 mt-1 block">
                  Complete guidelines for high school, admissions, and college submissions.
                </span>
              </Link>

              <Link
                href="/blog/writing-productivity-tips"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors group"
              >
                <span className="font-semibold text-stone-900 block group-hover:text-amber-900">
                  Writing Productivity Tips
                </span>
                <span className="text-stone-600 mt-1 block">
                  How to draft 1,500 clean words daily using intervals and distraction-free writing.
                </span>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Student Privacy Guarantee</span>
            </div>
            <h4 className="font-serif-heading text-base font-bold">Safe for Unreleased Manuscripts</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Never paste sensitive research or unpublished theses into ad-heavy online counters that store logs. TextUtils operates as a closed sandbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
