'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Upload, Sparkles, Download, RefreshCw, ImageIcon, X, Lock, Sofa } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const ROOM_TYPES = [
  { id: 'living-room', label: 'Living Room', emoji: '🛋️' },
  { id: 'kitchen', label: 'Kitchen', emoji: '🍳' },
  { id: 'bedroom', label: 'Bedroom', emoji: '🛏️' },
  { id: 'bathroom', label: 'Bathroom', emoji: '🚿' },
  { id: 'dining-room', label: 'Dining Room', emoji: '🍽️' },
]

const STYLES = [
  { id: 'modern', label: 'Modern', desc: 'Clean lines & neutrals' },
  { id: 'farmhouse', label: 'Farmhouse', desc: 'Cozy & rustic charm' },
  { id: 'scandinavian', label: 'Scandinavian', desc: 'Light & functional' },
  { id: 'bohemian', label: 'Bohemian', desc: 'Eclectic & layered' },
  { id: 'traditional', label: 'Traditional', desc: 'Classic & timeless' },
  { id: 'minimalist', label: 'Minimalist', desc: 'Less is more' },
]

export default function InteriorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState('living-room')
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [description, setDescription] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

      const res = await fetch('/api/generate-interior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: selectedRoom,
          style: selectedStyle,
          description,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Generation failed. Please try again.')
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <Sofa className="w-5 h-5 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Interior Design</h1>
        </div>
        <p className="text-slate-500">Choose a room and style, then let AI reimagine your interior space.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Inputs */}
        <div className="space-y-6">
          {/* Room Type */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Select room type</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROOM_TYPES.map(room => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={cn(
                      'p-3 rounded-xl text-center border-2 transition-all',
                      selectedRoom === room.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-200 hover:border-violet-300'
                    )}
                  >
                    <div className="text-2xl mb-1">{room.emoji}</div>
                    <div className="font-medium text-slate-800 text-xs">{room.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Choose a design style</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      'p-3 rounded-xl text-left border-2 transition-all',
                      selectedStyle === style.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-200 hover:border-violet-300'
                    )}
                  >
                    <div className="font-medium text-slate-800 text-sm">{style.label}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{style.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">
                Upload a room photo
                <span className="text-slate-400 font-normal text-sm ml-2">(optional)</span>
              </h2>
              {uploadedImage ? (
                <div className="relative rounded-xl overflow-hidden">
                  <Image src={uploadedImage} alt="Uploaded room" width={600} height={300} className="w-full h-48 object-cover" />
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
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 hover:border-violet-400 hover:bg-violet-50/30'
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

          {/* Additional Details */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">
                Additional details
                <span className="text-slate-400 font-normal text-sm ml-2">(optional)</span>
              </h2>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="e.g. 12x15 ft room with south-facing windows. I want a cozy reading nook and built-in shelving."
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
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
            className="w-full bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
            onClick={handleGenerate}
            loading={loading}
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating your design...' : 'Generate AI Interior Design'}
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
                    <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-violet-600 border-t-transparent animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-600">Designing your space...</p>
                    <p className="text-sm mt-1">This takes 15–30 seconds</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={generatedImage}
                      alt="Generated interior design"
                      width={800}
                      height={450}
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2">
                    <a href={generatedImage} download="yardsage-interior.jpg" target="_blank" rel="noreferrer" className="flex-1">
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
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-slate-400">Your design will appear here</p>
                    <p className="text-sm mt-1 text-slate-300">Choose a room and style, then click generate</p>
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
