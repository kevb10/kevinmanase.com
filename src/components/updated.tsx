"use client";

import { format } from "date-fns";

interface UpdatedProps {
  date: string;
  children: React.ReactNode;
}

export function Updated({ date, children }: UpdatedProps) {
  const formattedDate = format(new Date(date), "MMM d, yyyy");

  return (
    <div className="my-6 pl-4 border-l-2 border-amber-400 dark:border-amber-500">
      <div className="text-xs text-amber-600 dark:text-amber-400 mb-2 font-medium uppercase tracking-wide">
        Updated {formattedDate}
      </div>
      <div className="text-zinc-700 dark:text-zinc-300 text-sm">
        {children}
      </div>
    </div>
  );
}
