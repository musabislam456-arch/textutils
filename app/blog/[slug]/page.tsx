import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import { Clock, Calendar, ArrowLeft, ArrowRight, BookOpen, Sparkles, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found — TextUtils' };

  return {
    title: `${post.title} — TextUtils Guides`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs & Back link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-stone-200 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-mono">
          <span className="font-semibold text-stone-900 uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedDate}
          </span>
        </div>

        <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.2]">
          {post.title}
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Bio Banner */}
        <div className="pt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 text-sm font-bold flex items-center justify-center font-mono">
            {post.author.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900">{post.author.name}</div>
            <div className="text-xs text-stone-600">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="space-y-8 font-serif text-stone-800 text-base sm:text-lg leading-relaxed">
        {/* Intro */}
        <p className="text-stone-900 font-medium text-lg leading-relaxed italic border-l-2 border-stone-400 pl-4 py-1">
          {post.content.intro}
        </p>

        {/* Sections */}
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pt-4">
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight pt-2">
              {section.heading}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-stone-700 leading-relaxed font-normal">
                {p}
              </p>
            ))}

            {/* Render Table if available */}
            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-stone-200/80 bg-white shadow-xs">
                <table className="w-full text-left font-sans text-xs sm:text-sm">
                  <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-900 font-semibold">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 sm:p-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`p-3 sm:p-4 ${cIdx === 0 ? 'font-medium text-stone-900' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Render List if available */}
            {section.listItems && (
              <ul className="space-y-2 my-4 list-disc list-inside font-sans text-sm text-stone-700 bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                {section.listItems.map((item, iIdx) => (
                  <li key={iIdx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Render Callout if available */}
            {section.callout && (
              <div className="my-6 p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 font-sans space-y-1.5">
                <div className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  {section.callout.text}
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div className="pt-6 border-t border-stone-200">
          <h3 className="font-serif-heading text-xl font-bold text-stone-900 mb-2">
            Closing Thoughts
          </h3>
          <p className="text-stone-700">
            {post.content.conclusion}
          </p>
        </div>
      </div>

      {/* Relevant Tool Interactive CTA Box */}
      <div className="my-8 p-6 rounded-2xl bg-stone-900 text-stone-100 font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 max-w-lg">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300">
            Recommended Writing Utility
          </span>
          <h4 className="font-serif-heading text-xl font-bold text-white">
            {post.relatedTool.name}
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed">
            {post.relatedTool.description}
          </p>
        </div>

        <Link
          href={post.relatedTool.href}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-stone-950 text-xs font-bold hover:bg-stone-100 transition-colors shrink-0 shadow-sm"
        >
          <span>Launch Tool</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-stone-200 flex items-center justify-between font-sans text-xs">
        <Link
          href="/blog"
          className="font-semibold text-stone-800 hover:text-stone-950 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
        </Link>

        <Link
          href="/"
          className="font-semibold text-stone-800 hover:text-stone-950 inline-flex items-center gap-1"
        >
          <span>Open TextUtils Suite</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
