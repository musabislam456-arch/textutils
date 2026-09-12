'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  CaseSensitive, 
  GitCompare, 
  ListFilter, 
  Search, 
  ShieldCheck, 
  Zap, 
  EyeOff, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { WordCounter } from '@/components/tools/WordCounter';
import { CaseConverter } from '@/components/tools/CaseConverter';
import { DiffChecker } from '@/components/tools/DiffChecker';
import { RemoveDuplicates } from '@/components/tools/RemoveDuplicates';
import { FindReplace } from '@/components/tools/FindReplace';
import { BLOG_POSTS } from '@/data/blog-posts';

type ActiveTool = 'counter' | 'case' | 'diff' | 'duplicates' | 'find-replace';

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('counter');

  const tools = [
    { id: 'counter', name: 'Word Counter', icon: FileText, badge: 'Live Stats' },
    { id: 'case', name: 'Case Converter', icon: CaseSensitive, badge: 'Academic Title Case' },
    { id: 'diff', name: 'Diff Checker', icon: GitCompare, badge: 'Side-by-Side' },
    { id: 'duplicates', name: 'Remove Duplicates', icon: ListFilter, badge: 'List Cleaner' },
    { id: 'find-replace', name: 'Find & Replace', icon: Search, badge: 'Regex & Highlight' },
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Designed for students, authors, and researchers</span>
        </div>

        <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
          Distraction-Free Text Utilities for Thoughtful Writers
        </h1>

        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          A serene, browser-based workspace. Count words, transform case styles, inspect revision diffs, and clean text without ads, tracking, or clutter.
        </p>

        {/* Value Props Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-stone-600 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            100% Private (No server uploads)
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-700" />
            Instant Real-time Processing
          </span>
          <span className="flex items-center gap-1.5">
            <EyeOff className="w-4 h-4 text-stone-700" />
            Zero Ads or Tracking
          </span>
        </div>
      </section>

      {/* Main Workspace Tool Suite Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tool Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-6 scrollbar-none gap-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-stone-200/70 border border-stone-200 shadow-inner">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  id={`home-tool-tab-${tool.id}`}
                  type="button"
                  onClick={() => setActiveTool(tool.id as ActiveTool)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-900' : 'text-stone-600'}`} />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tool Viewport */}
        <div className="transition-opacity duration-200">
          {activeTool === 'counter' && <WordCounter />}
          {activeTool === 'case' && <CaseConverter />}
          {activeTool === 'diff' && <DiffChecker />}
          {activeTool === 'duplicates' && <RemoveDuplicates />}
          {activeTool === 'find-replace' && <FindReplace />}
        </div>
      </section>

      {/* Dedicated Tool Showcase Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-600 font-mono">
              Suite Navigation
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Explore Dedicated Tool Pages
            </h2>
          </div>
          <p className="text-xs text-stone-600 max-w-sm">
            Each tool includes dedicated formatting guidelines, keyboard shortcuts, and deep analytical features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link
            href="/tools/word-counter"
            id="tool-card-word-counter"
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-1">
                Word & Character Counter
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Live metrics for words, spaces, sentences, speaking and reading time, academic page estimates, and Flesch readability grade.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-800 group-hover:text-stone-950">
              <span>Open Word Counter</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tools/case-converter"
            id="tool-card-case-converter"
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                <CaseSensitive className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-1">
                Case Converter
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Transform headings to academic Title Case (Chicago & APA), UPPERCASE, lowercase, Sentence case, camelCase, snake_case, and kebab-case.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-800 group-hover:text-stone-950">
              <span>Open Case Converter</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tools/diff-checker"
            id="tool-card-diff-checker"
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                <GitCompare className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-1">
                Text Diff Checker
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Compare original drafts against revised versions. View highlighted additions and deletions line-by-line, word-by-word, or character-by-character.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-800 group-hover:text-stone-950">
              <span>Open Diff Checker</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tools/remove-duplicates"
            id="tool-card-remove-duplicates"
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                <ListFilter className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-1">
                Remove Duplicate Lines
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clean bibliographic references, citation lists, survey rosters, and code arrays. Sort alphabetically and trim excess whitespace.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-800 group-hover:text-stone-950">
              <span>Open Duplicate Remover</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/tools/find-replace"
            id="tool-card-find-replace"
            className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-900 mb-1">
                Find & Replace
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Search text with whole-word boundaries and RegEx support. Live match count, preview highlights, and step-by-step or bulk replace.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-800 group-hover:text-stone-950">
              <span>Open Find & Replace</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Guides Card */}
          <Link
            href="/blog"
            id="tool-card-guides"
            className="p-6 rounded-2xl bg-stone-900 text-stone-100 shadow-xs hover:bg-stone-800 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-100 mb-4 group-hover:bg-stone-700 transition-colors">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-stone-100 mb-1">
                Writing Guides & Research
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Academic word count brackets, proofreading workflows, and productivity strategies written by experienced manuscript editors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center text-xs font-semibold text-amber-200 group-hover:text-amber-100">
              <span>Read Writing Guides</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Writing Guides & Essays Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-600 font-mono">
              Academic & Editorial Guides
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Writing Insights & Standards
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 inline-flex items-center gap-1 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-stone-200/80 p-6 flex flex-col justify-between shadow-xs hover:border-stone-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 mb-3">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-serif-heading text-lg font-bold text-stone-900 leading-snug mb-2 group-hover:text-amber-900 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-800 text-[10px] font-bold flex items-center justify-center font-mono">
                    {post.author.avatar}
                  </div>
                  <span className="text-xs text-stone-700 font-medium">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-0.5"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Architectural Principles & Privacy Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-2xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">
              Our Design Philosophy
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold leading-tight">
              A writing environment built like a physical desk — quiet, uncluttered, and strictly private.
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Every tool on TextUtils executes 100% inside your browser’s JavaScript engine. Your essays, manuscripts, patient notes, and confidential research drafts never pass through remote API endpoints or databases. Close the tab and your memory clears cleanly.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Zero Analytics Trackers
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Zero Data Telemetry
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Zero Cloud Storage
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
