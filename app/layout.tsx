import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TextUtils — Distraction-Free Text Tools for Writers & Students',
  description: 'Clean, distraction-free text utilities, word counters, and writing guides for writers, students, and editors. Fast, client-side, and privacy-first.',
  keywords: ['word counter', 'character counter', 'case converter', 'diff checker', 'remove duplicate lines', 'find and replace', 'essay word count', 'student writing tools'],
  authors: [{ name: 'TextUtils Editorial' }],
  metadataBase: new URL('https://textutils.toolbay.site'),
  openGraph: {
    title: 'TextUtils — Distraction-Free Text Tools for Writers & Students',
    description: 'Clean, distraction-free text utilities, word counters, and writing guides for writers, students, and editors.',
    type: 'website',
    locale: 'en_US',
    url: 'https://textutils.toolbay.site',
    siteName: 'TextUtils',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextUtils — Text Tools for Writers & Students',
    description: 'Word & character counting, case conversion, text diff comparisons, and duplicate line removal in a clean distraction-free workspace.',
  },
  verification: {
    google: '8dLMBNTBkGFQ3zq4GYwdQbjC1ciAalZ87g56dZR1mks',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable} ${mono.variable}`}>
      <body
        suppressHydrationWarning
        className="font-sans min-h-screen bg-[#FAF8F5] text-stone-900 antialiased flex flex-col selection:bg-amber-100 selection:text-stone-900"
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* <!-- CHATBOT_SCRIPT_START --> */}
        {/* <!-- Paste client's chatbot <script> embed code here --> */}
        {/* <!-- CHATBOT_SCRIPT_END --> */}
      </body>
    </html>
  );
}
