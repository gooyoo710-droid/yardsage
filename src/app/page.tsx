import Link from 'next/link'
import { Sparkles, MapPin, CreditCard, TreePine, ArrowRight, Star, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI Landscape Design',
    description: 'Upload a photo of your yard and get photorealistic AI-generated landscaping designs in seconds.',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: MapPin,
    title: 'Climate-Smart Plants',
    description: 'Get personalized plant recommendations based on your US state, USDA hardiness zone, and local climate.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: TreePine,
    title: '500+ Plant Species',
    description: 'Explore our comprehensive database of native and cultivated plants with care guides and seasonal calendars.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: CreditCard,
    title: 'Simple Pricing',
    description: 'Start free with 3 designs/month. Upgrade to Pro for unlimited designs and the full plant database.',
    color: 'text-blue-600 bg-blue-50',
  },
]

const LANDSCAPE_STYLES = [
  { name: 'Modern', emoji: '🏙️', description: 'Clean lines, ornamental grasses' },
  { name: 'Cottage', emoji: '🌸', description: 'Colorful perennials, climbing roses' },
  { name: 'Tropical', emoji: '🌴', description: 'Lush palms, bird of paradise' },
  { name: 'Xeriscape', emoji: '🌵', description: 'Drought-tolerant, native plants' },
  { name: 'Japanese', emoji: '🍃', description: 'Zen garden, maples, bamboo' },
  { name: 'Mediterranean', emoji: '🫒', description: 'Lavender, rosemary, terracotta' },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    text: 'Transformed my front yard from brown patchy grass to a beautiful xeriscape. My water bill dropped 60%!',
    rating: 5,
  },
  {
    name: 'James K.',
    location: 'Portland, OR',
    text: 'The plant recommendations were spot-on for our Pacific Northwest climate. Everything is thriving in the first season.',
    rating: 5,
  },
  {
    name: 'Linda P.',
    location: 'Charlotte, NC',
    text: 'Finally figured out what plants survive our hot humid summers. The AI design gave me a vision I could actually execute.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-emerald-400 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-400 blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-700/50 border border-emerald-600 rounded-full px-4 py-1.5 text-sm text-emerald-200 mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by Claude AI & FLUX
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Dream Yard,<br />
              <span className="text-emerald-300">Designed by AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-xl leading-relaxed">
              Upload a photo of your yard. Choose your style. Get a photorealistic AI landscaping design — plus personalized plant picks for your US state and climate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 w-full sm:w-auto">
                  Start for free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/plants">
                <Button size="lg" variant="outline" className="border-emerald-400 text-white hover:bg-emerald-800 w-full sm:w-auto">
                  Browse plants
                </Button>
              </Link>
            </div>
            <p className="text-emerald-300 text-sm mt-4">No credit card required · 3 free AI designs</p>
          </div>
        </div>
      </section>

      {/* Landscape styles */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">Design Styles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {LANDSCAPE_STYLES.map(style => (
              <Link key={style.name} href="/garden/new" className="text-center p-4 rounded-xl hover:bg-emerald-50 transition-colors group">
                <div className="text-3xl mb-2">{style.emoji}</div>
                <div className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700">{style.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{style.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Everything you need for a beautiful yard</h2>
          <p className="text-slate-500 max-w-xl mx-auto">YardSage combines AI design with expert horticultural data so you get designs that look great AND actually grow.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(feature => (
            <Card key={feature.title} hover>
              <CardContent>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-emerald-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload your yard', desc: 'Take a photo or describe your outdoor space — front yard, backyard, side yard.' },
              { step: '2', title: 'Choose your style', desc: 'Pick from 8 curated landscaping styles: modern, cottage, tropical, xeriscape, and more.' },
              { step: '3', title: 'Get your design', desc: 'Receive a photorealistic AI rendering plus a full plant list suited to your state and climate.' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg">
                Try it free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Homeowners love YardSage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <Card key={t.name}>
              <CardContent>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your yard?</h2>
          <p className="text-emerald-100 mb-6">Join thousands of homeowners who&apos;ve upgraded their outdoor spaces with YardSage.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                Get started free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-800">
                View pricing
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-emerald-200">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> No credit card</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 3 free designs</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  )
}
