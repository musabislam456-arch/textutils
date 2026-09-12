import type { Metadata } from 'next';
import { RemoveDuplicates } from '@/components/tools/RemoveDuplicates';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines (Clean Lists & Citations) — TextUtils',
  description: 'Deduplicate text lists, bibliographies, research citations, and survey datasets. Options for case sensitivity, whitespace trimming, and alphabetical sorting.',
  keywords: ['remove duplicate lines', 'deduplicate list', 'unique lines', 'remove duplicate citations', 'alphabetize list', 'list cleaner'],
  openGraph: {
    title: 'Remove Duplicate Lines — TextUtils',
    description: 'Deduplicate text lists, bibliographies, research citations, and survey datasets instantly.',
  },
};

export default function RemoveDuplicatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800">Tools</span>
          <span>/</span>
          <span className="text-stone-900 font-bold">Remove Duplicates</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Remove Duplicate Lines & List Cleaner
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Clean messy bibliographies, email rosters, survey exports, and research entries. Deduplicate with case sensitivity options, whitespace stripping, and alphabetical ordering.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <RemoveDuplicates />

      {/* Educational Guide Section */}
      <div className="border-t border-stone-200 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif-heading text-2xl font-bold text-stone-900">
            Practical Applications for Students & Academics
          </h2>
          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-4 rounded-xl bg-white border border-stone-200/80">
              <span className="font-bold text-stone-900 text-sm block mb-1">Deduplicating Works Cited & Bibliographies</span>
              <p className="text-stone-600 leading-relaxed">
                When compiling citations from reference managers like Zotero, Mendeley, or Google Scholar across multiple chapters, identical book entries frequently sneak into your bibliography. TextUtils cleans duplicate entries in milliseconds while preserving formatting.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80">
              <span className="font-bold text-stone-900 text-sm block mb-1">Alphabetizing Research References</span>
              <p className="text-stone-600 leading-relaxed">
                APA and MLA style guidelines require bibliographies to be strictly arranged alphabetically by author surname. Use the <strong>Sort: Alphabetical (A → Z)</strong> option to deduplicate and alphabetize simultaneously.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-stone-900">
              Related Tools
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/tools/find-replace"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span className="font-semibold text-stone-900 block">Find & Replace Tool</span>
                <span className="text-stone-600 mt-1 block">Batch replace recurring terms or citation prefixes.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
