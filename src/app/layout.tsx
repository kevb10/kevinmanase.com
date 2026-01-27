import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kevinmanase.com"),
  title: {
    default: "Kevin Manase",
    template: "%s | Kevin Manase",
  },
  description: "Engineering thoughts, system design, and notes on building software.",
  keywords: ["software engineering", "system design", "programming", "web development"],
  authors: [{ name: "Kevin Manase" }],
  creator: "Kevin Manase",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevinmanase.com",
    siteName: "Kevin Manase",
    title: "Kevin Manase",
    description: "Engineering thoughts, system design, and notes on building software.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kevinmanase",
    creator: "@kevinmanase",
    title: "Kevin Manase",
    description: "Engineering thoughts, system design, and notes on building software.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-zinc-100 dark:border-zinc-900">
            <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="font-serif text-xl font-medium tracking-tight hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
              >
                Kevin Manase
              </Link>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Writing
                </Link>
                <Link
                  href="/about"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  About
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            <div className="max-w-5xl mx-auto px-6 py-12">{children}</div>
          </main>
          <footer className="border-t border-zinc-100 dark:border-zinc-900">
            <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-zinc-500 dark:text-zinc-500">
              <p>Kevin Manase</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
