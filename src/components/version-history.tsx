"use client";

import { format } from "date-fns";

interface ChangelogEntry {
  version: string;
  date: string;
  summary: string;
}

interface VersionHistoryProps {
  created?: string;
  updated?: string;
  changelog?: ChangelogEntry[];
}

function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy");
}

export function VersionHistory({ created, updated, changelog }: VersionHistoryProps) {
  const hasUpdates = updated && updated !== created;
  const hasChangelog = changelog && changelog.length > 0;

  if (!hasUpdates && !hasChangelog) return null;

  return (
    <div className="mb-8 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        {created && <span>Created {formatDate(created)}</span>}
        {hasUpdates && (
          <>
            <span className="text-zinc-400 dark:text-zinc-600">&middot;</span>
            <span>Updated {formatDate(updated)}</span>
          </>
        )}
      </div>

      {hasChangelog && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Version history
          </summary>
          <ul className="mt-3 space-y-2">
            {changelog.map((entry) => (
              <li key={entry.version} className="flex items-start gap-3">
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  v{entry.version}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {entry.summary}
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
