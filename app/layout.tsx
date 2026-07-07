import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeRuby — AI code reviews that understand your entire repository",
  description:
    "CodeRuby reviews pull requests using full repository context with RAG and embeddings, so every comment actually understands your codebase.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo2.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo2.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo2.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo2.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full bg-background antialiased",
        spaceGrotesk.variable,
        fraunces.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}