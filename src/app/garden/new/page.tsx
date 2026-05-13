'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { STATE_CLIMATES } from '@/lib/plants'
import { Upload, Sparkles, Download, RefreshCw, ChevronDown, ImageIcon, X, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const STYLES = [
  { id: 'modern', label: 'Modern', emoji: '🏙️', desc: 'Minimalist, clean lines' },
  { id: 'cottage', label: 'Cottage', emoji: '🌸', desc: 'Colorful & romantic' },
  { id: 'tropical', label: 'Tropical', emoji: '🌴', desc: 'Lush & exotic' },
  { id: 'xeriscaping', label: 'Xeriscape', emoji: '🌵', desc: 'Drought tolerant' },
  { id: 'naturalistic', label: 'Naturalistic', emoji: '🌿', desc: 'Wild & native' },
  { id: 'formal', label: 'Formal', emoji: '🏛️', desc: 'Symmetrical & elegant' },
  { id: 'japanese', label: 'Japanese', emoji: '🍃', desc: 'Zen & peaceful' },
  { id: 'mediterranean', label: 'Mediterranean', emoji: '🫒', desc: 'Warm & aromatic' },
]

export default function NewGardenPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState('naturalistic')
  const [selectedState, setSelectedState] = useState('')
  const [description, setDescription] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [gardenName, setGardenName] = useState('')

  const supabase = createClient()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setUploadedImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  async function handleGenerate() {
    if (!selectedState) {
      setError('Please select your state first.')
      return
    }
    setLoading(true)
    setError('')
    setGeneratedImage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Please sign in to generate designs.')
        setLoading(false)
        return
      }

      let gardenId: string | null = null
      if (gardenName) {
        const { data: garden } = await supabase.from('gardens').insert({
          user_id: user.id,
          name: gardenName || `${selectedStyle} design`,
          original_image_url: uploadedImage || null,
          state: selectedState,
          style: selectedStyle,
          prompt: description,
          status: 'processing',
        }).select().single()
        gardenId = garden?.id ?? null
      }

      const res = await fetch('/api/generate-landscape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          style: selectedStyle,
          state: selectedState,
          gardenDescription: description,
          gardenId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403) {
          setError(data.error)
        } else {
          setError(data.error || 'Generation failed. Please try again.')
        }
        return
      }

      setGeneratedImage(data.imageUrl)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">New Landscape Design</h1>
        <p className="text-slate-500">Upload a photo (optional), choose a style, and let AI transform your yard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Inputs */}
        <div className="space-y-6">
          {/* Photo Upload */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">
                Upload your yard photo
                <span className="text-slate-400 font-normal text-sm ml-2">(optional)</span>
              </h2>
              {uploadedImage ? (
                <div className="relative rounded-xl overflow-hidden">
                  <Image src={uploadedImage} alt="Uploaded yard" width={600} height={300} className="w-full h-48 object-cover" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
                    isDragActive
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                  )}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">
                    {isDragActive ? 'Drop your photo here' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP up to 10MB</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Choose a landscape style</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      'p-3 rounded-xl text-center border-2 transition-all text-sm',
                      selectedStyle === style.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-emerald-300'
                    )}
                  >
                    <div className="text-xl mb-1">{style.emoji}</div>
                    <div className="font-medium text-slate-800 text-xs">{style.label}</div>
                    <div className="text-slate-400 text-xs mt-0.5 hidden sm:block">{style.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* State + Details */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Location & details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your state <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={e => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white pr-8"
                    >
                      <option value="">Select your state...</option>
                      {STATE_CLIMATES.map(s => (
                        <option key={s.abbreviation} value={s.state}>{s.state}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Design name
                    <span className="text-slate-400 font-normal ml-2">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={gardenName}
                    onChange={e => setGardenName(e.target.value)}
                    placeholder="e.g. Front yard redesign"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Additional details
                    <span className="text-slate-400 font-normal ml-2">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Sunny front yard, 40ft wide. I want low maintenance plants and a stone path to the door."
                    rows={3}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className={cn(
              'rounded-xl p-4 text-sm',
              error.includes('limit') || error.includes('sign in')
                ? 'bg-amber-50 border border-amber-200 text-amber-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            )}>
              {error}
              {error.includes('limit') && (
                <Link href="/pricing" className="ml-2 font-semibold underline">Upgrade to Pro →</Link>
              )}
              {error.includes('sign in') && (
                <Link href="/login" className="ml-2 font-semibold underline">Sign in →</Link>
              )}
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            loading={loading}
            disabled={!selectedState}
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating your design...' : 'Generate AI Design'}
          </Button>
        </div>

        {/* Right: Result */}
        <div>
          <Card className="h-full">
            <CardContent className="flex flex-col h-full min-h-96">
              <h2 className="font-semibold text-slate-900 mb-4">Your AI design</h2>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-600">Creating your landscape...</p>
                    <p className="text-sm mt-1">This takes 15-30 seconds</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={generatedImage}
                      alt="Generated landscape design"
                      width={800}
                      height={450}
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2">
                    <a href={generatedImage} download="yardsage-design.jpg" target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={handleGenerate}
                      loading={loading}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                  </div>
                  <Link href="/plants">
                    <Button variant="outline" size="sm" className="w-full">
                      View plant recommendations for {selectedState} →
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-400">Your design will appear here</p>
                    <p className="text-sm mt-1 text-slate-300">Select a state and click generate</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2">
                    <Lock className="w-3 h-3" />
                    Powered by Claude + FLUX
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
