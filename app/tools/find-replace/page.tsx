import type { Metadata } from 'next';
import { FindReplace } from '@/components/tools/FindReplace';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Find & Replace Tool (RegEx & Whole Word) — TextUtils',
  description: 'Search and replace text in real time with live highlight preview, whole word matching, case sensitivity, and Regular Expression (RegEx) support.',
  keywords: ['find and replace', 'regex text replace', 'bulk word replace', 'text search replace', 'whole word replace', 'find and replace online'],
  openGraph: {
    title: 'Find & Replace Tool — TextUtils',
    description: 'Search and replace text with live highlight preview, whole word matching, and RegEx support.',
  },
};

export default function FindReplacePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800">Tools</span>
          <span>/</span>
          <span className="text-stone-900 font-bold">Find & Replace</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Find & Replace Tool
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Surgical text replacements with live highlight preview. Supports whole-word boundaries, case sensitivity, and full JavaScript regular expressions.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <FindReplace />

      {/* Educational Guide & RegEx Cheat Sheet */}
      <div className="border-t border-stone-200 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif-heading text-2xl font-bold text-stone-900">
            RegEx Patterns for Writers and Editors
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Regular expressions allow you to search for patterns rather than fixed strings. Toggle the <strong>Regular Expression (.*)</strong> flag to use these practical patterns:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-white border border-stone-200/80">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-stone-900">Eliminate Accidental Double Spaces</span>
                <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-amber-900"> {`{2,}`}</code>
              </div>
              <p className="text-stone-600">Finds instances where two or more consecutive spaces were typed. Replace with a single space.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-stone-900">Find All Capitalized Acronyms</span>
                <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-amber-900">\b[A-Z]{`{2,}`}\b</code>
              </div>
              <p className="text-stone-600">Finds all uppercase acronyms like NASA, UNESCO, or APA without catching regular capitalized words.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-stone-900">Find Parenthetical Citations</span>
                <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-amber-900">\([A-Za-z]+,\s*\d{`{4}`}\)</code>
              </div>
              <p className="text-stone-600">Matches citations formatted like (Smith, 2024) across your manuscript.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-stone-900">
              Recommended Reading
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/blog/guide-to-academic-editing-and-proofreading"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span className="font-semibold text-stone-900 block">The Self-Editing Checklist</span>
                <span className="text-stone-600 mt-1 block">Learn which filler words to find and replace first.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
