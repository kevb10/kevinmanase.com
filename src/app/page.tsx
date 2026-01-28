import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-16">
        <h1 className="font-serif text-3xl font-medium tracking-tight mb-4">
          Hey, I&apos;m Kevin
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          My job used to be writing code. Now it&apos;s managing agents that write
          code. These are notes on making that work.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-6">
          Writing
        </h2>
        {posts.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-500 italic">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul className="space-y-1">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex items-baseline gap-4 py-3 -mx-3 px-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <time
                    dateTime={post.date}
                    className="text-sm text-zinc-400 dark:text-zinc-600 tabular-nums shrink-0"
                  >
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </time>
                  <span className="font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
