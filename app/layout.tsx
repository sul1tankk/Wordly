import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordly — English every day",
  description: "Vocabulary, grammar and English practice from A1 to B2.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"><script dangerouslySetInnerHTML={{__html: `try{document.documentElement.dataset.theme=localStorage.getItem("wordly-theme")==="dark"?"dark":"light"}catch(e){}`}} />{children}</body>
    </html>
  );
}
