import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Break-Even Calculator (THB)",
  description: "Calculate your business break-even point in Thai Baht",
  keywords: [
    "break-even calculator",
    "business finance",
    "THB",
    "profit analysis",
  ],
  authors: [{ name: "Zaw Hlaing Phyo" }],
  openGraph: {
    title: "Break-Even Calculator (THB)",
    description: "Calculate your business break-even point in Thai Baht",
    url: "https://yourdomain.com",
    siteName: "Break-Even Calculator",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
