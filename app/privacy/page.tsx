import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — TextUtils',
  description: 'Our commitment to zero data collection: 100% client-side text processing, no tracking cookies, and total privacy for your writing.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Privacy Policy</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-stone-600 text-xs font-mono">
          Last Updated: January 15, 2026 • Version 2.1
        </p>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
        <div>
          <strong className="block font-semibold">The Short Version:</strong>
          We never see, transmit, store, or sell any text you type or paste into TextUtils. Everything runs client-side in your local browser sandbox.
        </div>
      </div>

      <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-serif">
        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            1. Client-Side Architecture & Text Processing
          </h2>
          <p>
            TextUtils operates as a client-side static web application. When you input text into our Word Counter, Case Converter, Diff Checker, Duplicate Remover, or Find & Replace tool, all calculations, regular expression executions, and text transformations take place exclusively within your device’s browser JavaScript engine.
          </p>
          <p>
            Your words are never transmitted to our servers or third-party cloud infrastructure. As soon as you refresh or close your browser tab, the text in memory is immediately and irreversibly purged.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            2. Cookies and Tracking Technologies
          </h2>
          <p>
            We do not use advertising tracking cookies, behavioral profiling cookies, or cross-site tracking pixels. We do not sell user data to data brokers or advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            3. Local Storage Preferences
          </h2>
          <p>
            TextUtils may optionally store non-sensitive user preferences (such as your target word count preference or dark mode settings if enabled) in your browser’s standard <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">localStorage</code>. This data never leaves your device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            4. Contact Inquiries
          </h2>
          <p>
            If you voluntarily submit feedback via our Contact form, we collect only the name, email address, and message content you provide to respond to your inquiry. We retain contact emails only for customer support purposes and never share them with third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-heading text-xl font-bold text-stone-900 font-sans">
            5. Contacting Us
          </h2>
          <p>
            If you have questions regarding our privacy architecture, contact our team at{' '}
            <a href="mailto:privacy@textutils.app" className="text-stone-950 font-semibold underline">
              privacy@textutils.app
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
