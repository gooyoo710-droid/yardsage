import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YardSage — AI Landscaping Planner',
  description: 'Transform your yard with AI-powered landscaping designs and personalized plant recommendations for every US state.',
  keywords: 'landscaping, AI garden design, plant recommendations, yard planning, US states',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen bg-slate-50 antialiased">
        <Navbar user={user} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
