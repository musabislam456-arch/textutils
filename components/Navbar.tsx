'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  FileText, 
  CaseSensitive, 
  GitCompare, 
  ListFilter, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

const TOOLS = [
  {
    name: 'Word Counter',
    href: '/tools/word-counter',
    description: 'Track words, characters, reading time & readability level.',
    icon: FileText,
  },
  {
    name: 'Case Converter',
    href: '/tools/case-converter',
    description: 'Convert between Title Case, UPPER, lower, camelCase, and more.',
    icon: CaseSensitive,
  },
  {
    name: 'Text Diff Checker',
    href: '/tools/diff-checker',
    description: 'Compare revisions line-by-line or word-by-word with visual diffs.',
    icon: GitCompare,
  },
  {
    name: 'Remove Duplicate Lines',
    href: '/tools/remove-duplicates',
    description: 'Clean lists, citations, and deduplicate entries instantly.',
    icon: ListFilter,
  },
  {
    name: 'Find & Replace',
    href: '/tools/find-replace',
    description: 'Search with regex, match whole words, and batch replace.',
    icon: Search,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isToolActive = pathname.startsWith('/tools');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
            id="nav-brand-link"
          >
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-amber-900 transition-colors">
              T
            </span>
            <div className="flex flex-col">
              <span className="font-serif-heading text-xl font-bold tracking-tight text-stone-900">
                TextUtils
              </span>
              <span className="text-[10px] tracking-widest text-stone-500 uppercase -mt-1 font-medium">
                Writer & Student Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                id="nav-tools-dropdown-btn"
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isToolActive 
                    ? 'text-stone-900 bg-stone-200/60 font-semibold' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-80 rounded-xl bg-white border border-stone-200/80 shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1"
                  id="nav-tools-dropdown-panel"
                >
                  <div className="text-[11px] font-semibold tracking-wider text-stone-600 uppercase px-3 py-1.5">
                    Writing & Editing Utilities
                  </div>
                  <div className="space-y-1">
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = pathname === tool.href;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                            isActive ? 'bg-stone-100 text-stone-900' : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="p-1.5 rounded-md bg-stone-100 text-stone-800 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-stone-900">{tool.name}</div>
                            <div className="text-xs text-stone-500 line-clamp-1">{tool.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Quick Tools */}
            <Link
              href="/tools/word-counter"
              id="nav-link-word-counter"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/tools/word-counter'
                  ? 'text-stone-900 bg-stone-200/60 font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Word Counter
            </Link>

            <Link
              href="/tools/diff-checker"
              id="nav-link-diff-checker"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/tools/diff-checker'
                  ? 'text-stone-900 bg-stone-200/60 font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Diff Checker
            </Link>

            <Link
              href="/blog"
              id="nav-link-blog"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-stone-900 bg-stone-200/60 font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>Guides & Blog</span>
            </Link>

            <Link
              href="/about"
              id="nav-link-about"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/about'
                  ? 'text-stone-900 bg-stone-200/60 font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              id="nav-link-contact"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/contact'
                  ? 'text-stone-900 bg-stone-200/60 font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Quick Action Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/tools/word-counter"
              id="nav-btn-start-writing"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-lg shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Scratchpad</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-4">
          <div className="text-xs font-semibold text-stone-600 uppercase tracking-wider px-2 pt-2">
            Tools
          </div>
          <div className="grid grid-cols-1 gap-1">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-stone-100 text-stone-800 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-stone-600" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-stone-200 pt-3 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-100"
            >
              Guides & Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-100"
            >
              About TextUtils
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-100"
            >
              Contact & Support
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-100"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
