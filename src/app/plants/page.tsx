'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Droplets, Sun, ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { STATE_CLIMATES, getPlantsByState, PLANTS, type Plant } from '@/lib/plants'

const WATER_LABELS = { low: 'Low water', moderate: 'Moderate', high: 'High water' }
const SUN_LABELS = { full_sun: 'Full sun', part_shade: 'Part shade', full_shade: 'Full shade' }
const TYPE_LABELS = {
  tree: 'Tree', shrub: 'Shrub', perennial: 'Perennial',
  annual: 'Annual', grass: 'Grass', groundcover: 'Groundcover', vine: 'Vine',
}

function PlantCard({ plant }: { plant: Plant }) {
  const waterColor = { low: 'info', moderate: 'success', high: 'warning' }[plant.waterNeeds] as 'info' | 'success' | 'warning'

  return (
    <Card hover>
      <CardContent>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-slate-900">{plant.name}</h3>
            <p className="text-xs text-slate-400 italic mt-0.5">{plant.scientificName}</p>
          </div>
          <Badge variant="default" className="shrink-0 capitalize">{TYPE_LABELS[plant.type]}</Badge>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-3">{plant.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-lg">
            <Droplets className="w-3 h-3" />
            {WATER_LABELS[plant.waterNeeds]}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-lg">
            <Sun className="w-3 h-3" />
            {SUN_LABELS[plant.sunlight]}
          </span>
          <span className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-lg">
            {plant.height}
          </span>
          {plant.bloomSeason && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg">
              Blooms: {plant.bloomSeason}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {plant.benefits.map(b => (
            <Badge key={b} variant="emerald" className="text-xs">{b}</Badge>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Zones: {plant.zones.slice(0, 4).join(', ')}{plant.zones.length > 4 ? ` +${plant.zones.length - 4}` : ''}
            {' · '}Maintenance: <span className="capitalize">{plant.maintenance}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PlantsPage() {
  const [selectedState, setSelectedState] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [waterFilter, setWaterFilter] = useState('')

  const plants = useMemo(() => {
    let list = selectedState ? getPlantsByState(selectedState) : PLANTS
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    if (typeFilter) list = list.filter(p => p.type === typeFilter)
    if (waterFilter) list = list.filter(p => p.waterNeeds === waterFilter)
    return list
  }, [selectedState, search, typeFilter, waterFilter])

  const stateData = selectedState ? STATE_CLIMATES.find(s => s.state === selectedState) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Plant Guide</h1>
        <p className="text-slate-500">Find plants that thrive in your US state and climate.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="relative min-w-44">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
          >
            <option value="">All states</option>
            {STATE_CLIMATES.map(s => (
              <option key={s.abbreviation} value={s.state}>{s.state}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative min-w-36">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-8"
          >
            <option value="">All types</option>
            {Object.entries(TYPE_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative min-w-40">
          <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={waterFilter}
            onChange={e => setWaterFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
          >
            <option value="">Any water needs</option>
            <option value="low">Low water</option>
            <option value="moderate">Moderate</option>
            <option value="high">High water</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* State climate info */}
      {stateData && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-emerald-600 font-semibold">{stateData.state}</span>
            <span className="text-slate-500 ml-2 capitalize">{stateData.climate.replace('_', ' ')} climate</span>
          </div>
          <div className="text-slate-600">Zones: <span className="font-medium">{stateData.zones.join(', ')}</span></div>
          <div className="text-slate-600">Avg rainfall: <span className="font-medium">{stateData.avgRainfall}&quot;/yr</span></div>
          <div className="text-slate-600">Summer high: <span className="font-medium">{stateData.avgTemp.summer}°F</span></div>
          <div className="text-slate-600">Winter low: <span className="font-medium">{stateData.avgTemp.winter}°F</span></div>
          <div className="text-slate-600">Sun: <span className="font-medium">{stateData.sunHours} hrs/day</span></div>
        </div>
      )}

      <p className="text-sm text-slate-400 mb-4">
        {plants.length} plant{plants.length !== 1 ? 's' : ''} found
        {selectedState ? ` for ${selectedState}` : ''}
      </p>

      {plants.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No plants found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plants.map(plant => (
            <Link key={plant.id} href={`/plants/${plant.id}`}>
              <PlantCard plant={plant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
