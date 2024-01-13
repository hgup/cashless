import type { Metadata } from "next"
// import { Inter } from 'next/font/google'
import "./globals.css"

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Cashless",
  description: "for Brindhavan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="inter">{children}</body>
    </html>
  )
}
