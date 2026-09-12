import type { Metadata } from 'next';
import { CaseConverter } from '@/components/tools/CaseConverter';
import Link from 'next/link';
import { CaseSensitive, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Converter (Title Case, UPPERCASE, camelCase) — TextUtils',
  description: 'Convert text between Title Case (APA/Chicago), Sentence case, UPPERCASE, lowercase, camelCase, snake_case, and kebab-case instantly with undo support.',
  keywords: ['case converter', 'title case converter', 'uppercase to lowercase', 'sentence case', 'camelcase converter', 'chicago title case', 'apa capitalization'],
  openGraph: {
    title: 'Case Converter — TextUtils',
    description: 'Transform case styles instantly. Supports academic Title Case, Sentence case, developer casing, and alternating case.',
  },
};

export default function CaseConverterPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-800">Tools</span>
          <span>/</span>
          <span className="text-stone-900 font-bold">Case Converter</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Case Converter & Heading Capitalizer
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Transform text casing with one click. Features grammar-aware Title Case complying with Chicago and APA stylebooks, alongside developer conventions like camelCase and snake_case.
        </p>
      </div>

      {/* Main Interactive Tool */}
      <CaseConverter />

      {/* Educational Guide Section */}
      <div className="border-t border-stone-200 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-900 mb-3">
              Understanding Capitalization Conventions
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Academic journals, stylebooks, and software applications enforce distinct capitalization standards. Choosing the appropriate case ensures your headers and code identifiers look professional.
            </p>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 text-sm block mb-1">Title Case (Headline Style)</span>
                <p className="text-stone-600 leading-relaxed mb-2">
                  Used in book titles, research paper headings (MLA and Chicago), and major subheaders. Capitalizes the first and last word, all major words (nouns, verbs, adjectives, adverbs), and lowercase articles, coordinating conjunctions, and prepositions of four or fewer letters.
                </p>
                <code className="text-amber-900 font-mono bg-amber-50 px-2 py-0.5 rounded">
                  Example: The History of the Modern University and Its Impact on Research
                </code>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 text-sm block mb-1">Sentence Case</span>
                <p className="text-stone-600 leading-relaxed mb-2">
                  Standard in European academia, APA reference lists, scientific journal titles, and modern user interface design. Only the first letter of the sentence and proper nouns are capitalized.
                </p>
                <code className="text-amber-900 font-mono bg-amber-50 px-2 py-0.5 rounded">
                  Example: The history of the modern university and its impact on research
                </code>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                <span className="font-bold text-stone-900 text-sm block mb-1">Developer & Programmatic Casings</span>
                <ul className="space-y-1.5 list-disc list-inside text-stone-600">
                  <li><strong className="text-stone-800 font-mono">camelCase:</strong> Used for JavaScript and TypeScript variables (<code className="bg-stone-100 px-1 py-0.5 rounded">studentWordCount</code>).</li>
                  <li><strong className="text-stone-800 font-mono">snake_case:</strong> Standard in Python and database field names (<code className="bg-stone-100 px-1 py-0.5 rounded">submission_draft_two</code>).</li>
                  <li><strong className="text-stone-800 font-mono">kebab-case:</strong> Standard for URL slugs and CSS class names (<code className="bg-stone-100 px-1 py-0.5 rounded">academic-writing-guide</code>).</li>
                  <li><strong className="text-stone-800 font-mono">CONSTANT_CASE:</strong> Used for global constants and environment configurations (<code className="bg-stone-100 px-1 py-0.5 rounded">MAX_WORD_LIMIT</code>).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-lg font-bold text-stone-900">
              Related Text Tools
            </h3>
            <div className="space-y-3 text-xs">
              <Link
                href="/tools/word-counter"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span className="font-semibold text-stone-900 block">Word & Character Counter</span>
                <span className="text-stone-600 mt-1 block">Check length and readability of your transformed text.</span>
              </Link>
              <Link
                href="/tools/diff-checker"
                className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span className="font-semibold text-stone-900 block">Text Diff Checker</span>
                <span className="text-stone-600 mt-1 block">Compare changes before and after case conversion.</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
