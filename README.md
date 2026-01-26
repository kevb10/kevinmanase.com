# kevinmanase.com

Personal blog. Engineering thoughts, notes on AI coding workflows, and whatever I'm learning.

**Live:** https://www.kevinmanase.com

## Stack

- Next.js 16 (App Router, Turbopack)
- MDX for posts
- Tailwind CSS
- Vercel

## Writing a Post

Create a file in `content/posts/`:

```mdx
---
title: "Post Title"
description: "SEO description"
date: "2026-01-26"
tags: ["tag1", "tag2"]
published: true
---

Your content here. Supports markdown, code blocks, GIFs, and Mermaid diagrams.

<Mermaid chart={`
flowchart LR
    A --> B --> C
`} />
```

## Development

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # production build
```

## Deploy

Pushes to `main` auto-deploy via Vercel. Or manually:

```bash
npx vercel --prod
```

## Content TODO

See [content/TODO.md](content/TODO.md) for post ideas and status.
