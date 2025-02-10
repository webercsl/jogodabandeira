import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProvider } from "@/components/convex-client-provider";

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogo da bandeira",
  description: "Um jogo divertido e educativo onde você testa seus conhecimentos sobre bandeiras de diferentes países.",
  openGraph: {
    title: "Jogo da bandeira",
    description: "Teste seus conhecimentos sobre bandeiras de diferentes países.",
    url: "https://jogodabandeira.com.br/",
    siteName: "Jogo da bandeira",
    images: [
      {
        url: "https://adventurous-tortoise-457.convex.cloud/api/storage/12df4e6f-3d0f-48c6-9547-7ce286f1813f",
        width: 1024,
        height: 1024,
        alt: "Logo do Jogo da Bandeira",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jogo da bandeira",
    description: "Jogo divertido e educativo sobre bandeiras.",
    images: ["https://adventurous-tortoise-457.convex.cloud/api/storage/12df4e6f-3d0f-48c6-9547-7ce286f1813f"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-1262571996393910",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262571996393910"
          crossOrigin="anonymous">
        </Script>
      </head>
      <body
        className={nunito.className}
        style={{
          backgroundColor: "#15202b",
        }}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Analytics />
            <SpeedInsights />
            <Navbar />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
