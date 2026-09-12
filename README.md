# TextUtils

**Live site:** [textutils.toolbay.site](https://textutils.toolbay.site)

Distraction-free text tools for writers, students, and editors — fast, client-side, and privacy-first.

## Features

- **Word Counter** / character counter
- **Case Converter**
- **Diff Checker** — compare two texts
- **Remove Duplicate Lines**
- **Find & Replace**
- Writing guides on the blog for SEO
- 100% client-side, no uploads

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS, Google Fonts (Newsreader, Plus Jakarta Sans, JetBrains Mono)
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
data/           Blog post data
```

## License

All rights reserved.
