import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Droplets, Sun, Layers, Calendar, AlertTriangle, CheckCircle, ShoppingCart, Leaf } from 'lucide-react'
import { PLANTS } from '@/lib/plants'
import { PLANT_DETAILS } from '@/lib/plant-details'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

export async function generateStaticParams() {
  return PLANTS.map(p => ({ id: p.id }))
}

const WATER_LABELS = { low: 'Low water', moderate: 'Moderate', high: 'High water' }
const SUN_LABELS = { full_sun: 'Full sun', part_shade: 'Part shade', full_shade: 'Full shade' }
const TYPE_LABELS: Record<string, string> = {
  tree: 'Tree', shrub: 'Shrub', perennial: 'Perennial',
  annual: 'Annual', grass: 'Grass', groundcover: 'Groundcover', vine: 'Vine',
}

export default async function PlantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = PLANTS.find(p => p.id === id)
  const detail = PLANT_DETAILS[id]

  if (!plant || !detail) notFound()

  const similar = PLANTS.filter(p =>
    p.id !== plant.id &&
    (p.type === plant.type || p.climates.some(c => plant.climates.includes(c)))
  ).slice(0, 3)

  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(detail.amazonSearchTerm)}&tag=cratefulfinds-20`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/plants"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Plant Guide
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{plant.name}</h1>
            <p className="text-slate-400 italic mt-1">{plant.scientificName}</p>
          </div>
          <Badge variant="default" className="capitalize text-sm">{TYPE_LABELS[plant.type]}</Badge>
        </div>

        <p className="text-slate-600 text-lg leading-relaxed mt-4">{plant.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium">
            <Droplets className="w-4 h-4" />
            {WATER_LABELS[plant.waterNeeds]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg font-medium">
            <Sun className="w-4 h-4" />
            {SUN_LABELS[plant.sunlight]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium">
            <Layers className="w-4 h-4" />
            {plant.height}
          </span>
          {plant.bloomSeason && (
            <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium">
              Blooms: {plant.bloomSeason}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {plant.benefits.map(b => (
            <Badge key={b} variant="emerald">{b}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Care Instructions */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              Care Instructions
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-900 text-sm">Watering</span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">{detail.care.watering}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-900 text-sm">Sunlight</span>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">{detail.care.sunlight}</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-stone-600" />
                  <span className="font-semibold text-stone-900 text-sm">Soil</span>
                </div>
                <p className="text-sm text-stone-800 leading-relaxed">{detail.care.soil}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seasons */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Seasonal Guide
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-400 pl-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Best Planting Time</p>
                <p className="text-sm text-slate-600 leading-relaxed">{detail.seasons.bestPlantingTime}</p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Bloom / Growth Season</p>
                <p className="text-sm text-slate-600 leading-relaxed">{detail.seasons.bloomOrGrowth}</p>
              </div>
              <div className="border-l-4 border-slate-300 pl-4">
                <p className="text-sm font-semibold text-slate-700 mb-1">Dormancy</p>
                <p className="text-sm text-slate-600 leading-relaxed">{detail.seasons.dormancy}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems & Solutions */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Common Problems & Solutions
            </h2>
            <div className="space-y-4">
              {detail.problems.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-slate-800">{item.problem}</p>
                  </div>
                  <div className="flex items-start gap-2 ml-6">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hardiness & Info */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Plant Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">USDA Zones</p>
                <p className="text-slate-800 font-medium">{plant.zones.slice(0, 4).join(', ')}{plant.zones.length > 4 ? ` +${plant.zones.length - 4}` : ''}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Maintenance</p>
                <p className="text-slate-800 font-medium capitalize">{plant.maintenance}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Mature Height</p>
                <p className="text-slate-800 font-medium">{plant.height}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Native Regions</p>
                <p className="text-slate-800 font-medium">{plant.nativeRegions.join(', ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amazon affiliate */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Ready to plant?</h2>
              <p className="text-slate-600 text-sm">Find {plant.name} and related supplies on Amazon.</p>
            </div>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
              Shop on Amazon
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            As an Amazon Associate, YardSage earns from qualifying purchases. This helps us keep the app free.
          </p>
        </div>

        {/* Similar plants */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Similar Plants</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {similar.map(p => (
                <Link key={p.id} href={`/plants/${p.id}`}>
                  <Card hover>
                    <CardContent>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-sm">{p.name}</h3>
                          <p className="text-xs text-slate-400 italic">{p.scientificName}</p>
                        </div>
                        <Badge variant="default" className="text-xs shrink-0 capitalize">{TYPE_LABELS[p.type]}</Badge>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.description}</p>
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg">{WATER_LABELS[p.waterNeeds]}</span>
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg">{SUN_LABELS[p.sunlight]}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
