import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Aryan Choudhary - Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Aryan Choudhary, a passionate Full Stack Developer specializing in React, Python, and Machine Learning.",
  keywords: ["Full Stack Developer", "React", "Python", "Machine Learning", "AI", "Web Development", "Aryan Choudhary"],
  authors: [{ name: "Aryan Choudhary" }],
  openGraph: {
    title: "Aryan Choudhary - Full Stack Developer & AI Enthusiast",
    description:
      "Portfolio of Aryan Choudhary, a passionate Full Stack Developer specializing in React, Python, and Machine Learning.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <Navigation />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
