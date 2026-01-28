import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";
import { VersionHistory } from "@/components/version-history";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Kevin Manase"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@kevinmanase",
      creator: "@kevinmanase",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Kevin Manase",
      url: "https://kevinmanase.com/about",
    },
    datePublished: post.created || post.date,
    dateModified: post.updated || post.date,
    publisher: {
      "@type": "Person",
      name: "Kevin Manase",
      url: "https://kevinmanase.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kevinmanase.com/posts/${slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
      <header className="mb-10">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 inline-block"
        >
          &larr; Back to writing
        </Link>
        <h1 className="font-serif text-3xl font-medium tracking-tight mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <VersionHistory
        created={post.created}
        updated={post.updated}
        changelog={post.changelog}
      />

      <div className="prose-custom">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </div>
    </article>
    </>
  );
}
