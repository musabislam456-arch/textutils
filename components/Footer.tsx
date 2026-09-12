import Link from 'next/link';
import { FileText, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#FAF8F5] text-stone-700 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-stone-900 text-stone-100 flex items-center justify-center font-serif font-bold text-base">
                T
              </span>
              <span className="font-serif-heading text-lg font-bold text-stone-900 tracking-tight">
                TextUtils
              </span>
            </Link>
            <p className="text-xs text-stone-600 leading-relaxed">
              Distraction-free text utilities designed for writers, students, researchers, and editors. Minimalist tools that respect your attention and your privacy.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Client-Side Processing</span>
            </div>
          </div>

          {/* Tools Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Core Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/word-counter" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Word & Character Counter</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/case-converter" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Case Converter (Title/Upper/Camel)</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/diff-checker" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Text Diff Checker</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/remove-duplicates" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Remove Duplicate Lines</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/find-replace" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Find & Replace (Regex & Whole Word)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Essays Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Guides & Articles
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog/word-count-standards-for-essays" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Word Count Standards for Essays</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/writing-productivity-tips" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Writing Productivity Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/guide-to-academic-editing-and-proofreading" className="hover:text-stone-950 hover:underline inline-flex items-center gap-1">
                  <span>Self-Editing & Proofreading Checklist</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-stone-900 font-medium hover:underline inline-flex items-center gap-1 mt-1">
                  <span>Browse All Guides</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
              Company & Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-stone-950 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-950 hover:underline">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-stone-950 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-950 hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>
            © {new Date().getFullYear()} TextUtils. All rights reserved. Crafted for writers, researchers, and students.
          </p>
          <div className="flex items-center gap-4 text-stone-600">
            <span>Client-Side Local Sandbox</span>
            <span>•</span>
            <span>No Cookies / No Tracking</span>
            <span>•</span>
            <span>Offline Capable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
