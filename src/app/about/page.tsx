import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Kevin Manase - manages agents that write code, writes about making that work.",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-medium tracking-tight mb-8">
        About
      </h1>

      <div className="space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <p>
          My job used to be writing code. Now it&apos;s managing agents that
          write code.
        </p>

        <p>
          I learned this the hard way. Mass-produced slop. Shipped fragile code.
          Watched context windows fill with garbage. Eventually figured out what
          works.
        </p>

        <p>
          These are notes on making that work. Test-first, vibecheck, no slop.
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
