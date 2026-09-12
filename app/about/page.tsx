import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Heart, Zap, EyeOff, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — TextUtils',
  description: 'The story and philosophy behind TextUtils: distraction-free text utilities created for writers, students, researchers, and editors.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">About TextUtils</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Crafted for Those Who Care About Words
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          TextUtils was founded out of a shared frustration with bloated, ad-ridden online text tools that compromise privacy and interrupt your creative focus.
        </p>
      </div>

      {/* Story Content */}
      <div className="space-y-6 font-serif text-stone-800 text-base sm:text-lg leading-relaxed">
        <p>
          If you have ever needed to count words for a critical college admissions essay or format a journal manuscript, you have likely encountered the standard landscape of online text utilities: flashing banner advertisements, aggressive cookie consent walls, sluggish server round-trips, and interfaces that look like they were abandoned in 2004.
        </p>

        <p>
          Worse still, many traditional web tools transmit your raw text to remote backend servers for processing. For students drafting confidential research, legal scholars reviewing agreements, or authors working on unpublished manuscripts, that represents an unacceptable privacy risk.
        </p>

        <p>
          We created TextUtils with a singular guiding philosophy: <strong>your writing environment should be as clean, tranquil, and dignified as a physical writing desk</strong>.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-stone-900">
            Absolute Client-Side Privacy
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every counter, case conversion, and diff comparison occurs strictly in your browser’s local execution memory. We have no analytics trackers, no backend text databases, and zero interest in your drafts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-stone-900">
            Instantaneous Performance
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Because operations never wait on network requests, results update at 60 frames per second as you type. Whether analyzing 50 words or 50,000 words, feedback is immediate.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-stone-900">
            Distraction-Free Workspace
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            No popup modals, no auto-playing videos, and no intrusive sales funnels. The soft off-white canvas and high-contrast typography reduce eye strain during late-night drafting sessions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-stone-900">
            Academic & Editorial Rigor
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Our algorithms follow recognized standards: Chicago and APA title capitalization rules, Flesch-Kincaid readability formulas, and standard 250-word academic page formatting.
          </p>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-heading text-xl font-bold text-stone-900">
            Ready to polish your writing?
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Jump directly into our Word Counter or explore the Case Converter.
          </p>
        </div>
        <Link
          href="/tools/word-counter"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-stone-50 text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs"
        >
          <span>Open Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
