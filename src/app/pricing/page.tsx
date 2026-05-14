'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Zap, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { PLANS } from '@/lib/stripe'

const FREE_FEATURES = PLANS.free.features
const PRO_FEATURES = PLANS.pro.features

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const price = billing === 'monthly' ? PLANS.pro.monthlyPrice : Math.round(PLANS.pro.yearlyPrice / 12)
  const savings = Math.round(100 - (PLANS.pro.yearlyPrice / (PLANS.pro.monthlyPrice * 12)) * 100)

  async function handleUpgrade() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billing }),
      })
      const data = await res.json()
      if (res.status === 401) {
        router.push('/login')
        return
      }
      if (!res.ok || !data.url) {
        setError(data.error || 'Checkout failed. Please try again.')
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Simple, transparent pricing</h1>
        <p className="text-slate-500 text-lg">Start free, upgrade when you need more designs</p>

        <div className="inline-flex items-center bg-slate-100 rounded-full p-1 mt-8">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billing === 'yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
            }`}
          >
            Yearly
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
              Save {savings}%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Plan */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-lg text-slate-900">Free</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mt-4 mb-1">$0</div>
            <p className="text-slate-400 text-sm mb-6">Forever free</p>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full" onClick={() => router.push('/signup')}>
              Get started free
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-emerald-500 ring-2 ring-emerald-500 relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              MOST POPULAR
            </span>
          </div>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-lg text-slate-900">Pro</span>
            </div>
            <div className="flex items-end gap-1 mt-4 mb-1">
              <span className="text-3xl font-bold text-slate-900">${price}</span>
              <span className="text-slate-400 text-sm mb-1">/mo</span>
            </div>
            {billing === 'yearly' && (
              <p className="text-sm text-emerald-600 font-medium mb-1">
                Billed ${PLANS.pro.yearlyPrice}/year
              </p>
            )}
            <p className="text-slate-400 text-sm mb-6">
              {billing === 'monthly' ? 'Billed monthly' : `Save $${PLANS.pro.monthlyPrice * 12 - PLANS.pro.yearlyPrice} vs monthly`}
            </p>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {error && (
              <div className="mb-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}
            <Button className="w-full" size="lg" onClick={handleUpgrade} loading={loading}>
              <Sparkles className="w-4 h-4" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What happens after my 3 free designs?',
              a: "You can still browse plant recommendations and view your existing designs. Upgrade to Pro for unlimited AI-generated landscaping images.",
            },
            {
              q: 'Can I cancel my subscription anytime?',
              a: "Yes. Cancel anytime from your account settings. You'll retain Pro access until the end of your billing period.",
            },
            {
              q: 'What AI model generates the images?',
              a: "We use Anthropic's Claude AI to craft optimized prompts and Hugging Face FLUX.1 to generate photorealistic landscaping designs.",
            },
            {
              q: 'Are the plant recommendations accurate for my location?',
              a: "Yes — plant suggestions are filtered by your state's USDA hardiness zones and local climate type (arid, subtropical, continental, etc.) to ensure they will actually thrive.",
            },
          ].map(faq => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
