import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Kevin Manase - engineer, builder, writer.",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium tracking-tight mb-8">
        About
      </h1>

      <div className="space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <p>
          I&apos;m Kevin — an engineer who builds things on the internet.
        </p>

        <p>
          This blog is where I write about software engineering, system design,
          and whatever I&apos;m learning. It&apos;s primarily a note to myself,
          but I figured I&apos;d put it out into the world in case it&apos;s useful
          to someone else.
        </p>

        <p>
          Writing helps me think. When I can&apos;t explain something clearly, it
          usually means I don&apos;t understand it well enough yet.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-900">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-4">
          Connect
        </h2>
        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/kevb10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/kevinmanase"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
