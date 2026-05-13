import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <Leaf className="w-5 h-5 text-emerald-400" />
              YardSage
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered landscaping planner for US homeowners. Transform your yard with personalized plant recommendations and design inspiration.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/garden/new" className="hover:text-white transition-colors">AI Design</Link></li>
              <li><Link href="/plants" className="hover:text-white transition-colors">Plant Guide</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign up</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-xs text-center">
          © {new Date().getFullYear()} YardSage. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
