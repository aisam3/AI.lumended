import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Script from "next/script"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI HomeBuilder | AI-Powered Construction',
  description: 'Revolutionizing construction with artificial intelligence',
  icons: {
    icon: '/ai-for-homebuilders.png',
    apple: '/ai-for-homebuilders.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Botpress Chatbot */}
        <Script
          src="https://cdn.botpress.cloud/desk/webchat/v4.0/inject.js"
          strategy="afterInteractive"
        />

        <Script
          src="https://files.bpcontent.cloud/2026/01/05/19/20260105195718-VKXYDEWT.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  )
}