import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — TextUtils',
  description: 'Terms of service and acceptable usage guidelines for TextUtils writing and text processing tools.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Terms of Service</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-stone-600 text-xs font-mono">
          Last Updated: January 15, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-serif">
        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TextUtils, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you should discontinue using the suite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            2. Permitted Use & Academic Integrity
          </h2>
          <p>
            TextUtils is provided free of charge for personal, academic, educational, and commercial purposes. You retain 100% intellectual property ownership of all text and manuscripts processed using our tools.
          </p>
          <p>
            You agree to use TextUtils in compliance with all relevant institutional academic integrity policies and applicable local laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            3. Disclaimer of Warranties
          </h2>
          <p>
            TextUtils is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. While we strive for absolute algorithmic accuracy in word counting, case conversion, and diff analysis, we cannot guarantee error-free results for non-standard characters, proprietary file encodings, or atypical grammatical formulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall TextUtils, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, including submission deadline penalties or typographical inaccuracies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            5. Modifications
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of TextUtils following any updates constitutes acceptance of the modified terms.
          </p>
        </section>
      </div>
    </div>
  );
}
