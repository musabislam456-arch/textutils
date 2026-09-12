'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">Contact</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Have a suggestion for a new text utility? Found an edge case in our diff checker? Or an educator looking to use TextUtils in the classroom? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-stone-900">
                Message Received
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, {name}. Our editorial and engineering team reviews all student and educator feedback within 24 to 48 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSubject('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-stone-50 text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-stone-800">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-stone-800">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@university.edu"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-category" className="text-xs font-semibold text-stone-800">
                    Inquiry Category
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:outline-none"
                  >
                    <option value="General Feedback">General Feedback</option>
                    <option value="Feature Request">Feature Request / New Tool Idea</option>
                    <option value="Bug Report">Bug Report / Text Parsing Issue</option>
                    <option value="Academic Inquiry">Classroom / University Licensing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-stone-800">
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your note"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-semibold text-stone-800">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or bug details..."
                  className="w-full p-3.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400 font-sans"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-stone-50 text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Support Sidebar Info */}
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <h3 className="font-serif-heading text-base font-bold text-stone-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-600" />
              <span>Direct Inquiries</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              For security disclosures or institutional curriculum partnerships, email us directly at:
            </p>
            <div className="font-mono text-xs font-semibold text-stone-900 bg-stone-100 p-2 rounded">
              support@textutils.app
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <h3 className="font-serif-heading text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-600" />
              <span>Response Window</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We respond to inquiries Monday through Friday within 24 to 48 hours. Feedback from student writers directly influences our roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
