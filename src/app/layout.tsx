import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProvider } from "@/components/convex-client-provider";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adivinhe a bandeira",
  description: "Um jogo divertido e educativo onde você testa seus conhecimentos sobre bandeiras de diferentes países.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={nunito.className}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
