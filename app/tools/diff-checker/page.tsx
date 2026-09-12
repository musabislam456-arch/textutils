import type { Metadata } from 'next';
import { DiffChecker } from '@/components/tools/DiffChecker';
import Link from 'next/link';
import { GitCompare, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Text Diff Checker (Compare Revisions Side-by-Side) — TextUtils',
  description: 'Compare two text drafts side-by-side or unified with visual highlight. See additions and deletions line-by-line or word-by-word with 100% client-side privacy.',
  keywords: ['text diff checker', 'compare text', 'diff tool', 'essay revision comparison', 'side by side text diff', 'word diff', 'line diff'],
  openGraph: {
    title: 'Text Diff Checker — TextUtils',
    description: 'Compare two text drafts side-by-side or unified with visual highlight of changes.',
  },
};

export default function DiffCheckerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800">Tools</span>
          <span>/</span>
          <span className="text-stone-900 font-bold">Diff Checker</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Text Diff Checker
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Inspect textual revisions with optical clarity. Spot additions, deletions, and subtle word swaps between essay drafts, peer reviews, or contract clauses.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <DiffChecker />

      {/* Educational Guide Section */}
      <div className="border-t border-stone-200 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-900 mb-3">
              Why Writers & Researchers Need Text Diff Comparisons
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              When applying edits suggested by an advisor, co-author, or peer reviewer, it is remarkably easy to accidentally overwrite critical data or leave orphaned fragments. A visual diff tool provides immediate certainty by highlighting exact textual mutations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 text-sm block mb-1">Word-Level vs Line-Level</span>
                <p className="text-stone-600 leading-relaxed">
                  Use <strong>Word Diff</strong> for paragraph editing and prose polishing. Use <strong>Line Diff</strong> when comparing structured lists, bibliographies, poetry, or code snippets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 text-sm block mb-1">Contract & Syllabus Verification</span>
                <p className="text-stone-600 leading-relaxed">
                  Legal agreements, tenancy leases, and revised university assignment prompts often contain tiny changes in dates or penalties. Diff checking catches silent alterations instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-stone-900">
              Editing Resources
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/blog/guide-to-academic-editing-and-proofreading"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span className="font-semibold text-stone-900 block">The Self-Editing Checklist</span>
                <span className="text-stone-600 mt-1 block">A 4-pass workflow for revising academic drafts.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
