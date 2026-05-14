import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Sparkles, Plus, Crown, MapPin, Calendar, ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PLANS } from '@/lib/plans'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: profile }, { data: gardens }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('gardens')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(12),
  ])

  const isPro = profile?.subscription_status === 'pro'
  const designsUsed = profile?.designs_used_this_month ?? 0
  const designsLimit = PLANS.free.limit
  const params = await searchParams

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {params.success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Crown className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-700 font-medium">Welcome to Pro! Unlimited AI designs are now unlocked.</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
          </h1>
          <p className="text-slate-500 mt-0.5">Your landscaping projects</p>
        </div>
        <Link href="/garden/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New design
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Designs this month</p>
              <p className="text-xl font-bold text-slate-900">
                {designsUsed}
                {!isPro && <span className="text-sm font-normal text-slate-400"> / {designsLimit}</span>}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total designs</p>
              <p className="text-xl font-bold text-slate-900">{gardens?.length ?? 0}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPro ? 'bg-amber-50' : 'bg-slate-50'}`}>
              <Crown className={`w-5 h-5 ${isPro ? 'text-amber-500' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Plan</p>
              <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {isPro ? 'Pro' : 'Free'}
                <Badge variant={isPro ? 'warning' : 'default'} className="text-xs">
                  {isPro ? 'Active' : 'Upgrade'}
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage bar for free users */}
      {!isPro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              {designsLimit - designsUsed} free design{designsLimit - designsUsed !== 1 ? 's' : ''} remaining this month
            </p>
            <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${(designsUsed / designsLimit) * 100}%` }}
              />
            </div>
          </div>
          <Link href="/pricing">
            <Button size="sm" className="shrink-0 gap-1.5">
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      )}

      {/* Gardens Grid */}
      <h2 className="font-semibold text-slate-900 mb-4">Your designs</h2>

      {!gardens || gardens.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">No designs yet</h3>
            <p className="text-slate-400 text-sm mb-6">Create your first AI landscaping design</p>
            <Link href="/garden/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create first design
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gardens.map(garden => (
            <Card key={garden.id} hover>
              <div className="relative aspect-video bg-slate-100 rounded-t-2xl overflow-hidden">
                {garden.generated_image_url ? (
                  <Image
                    src={garden.generated_image_url}
                    alt={garden.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant={garden.status === 'completed' ? 'success' : 'warning'} className="capitalize">
                    {garden.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-3">
                <h3 className="font-semibold text-slate-900 truncate">{garden.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {garden.state}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Sparkles className="w-3 h-3" /> {garden.style}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(garden.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          <Link href="/garden/new">
            <Card className="border-dashed border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-48 text-slate-400 hover:text-emerald-600">
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">New design</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
}
