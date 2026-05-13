import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

export const maxDuration = 60

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const STYLE_PROMPTS: Record<string, string> = {
  modern: 'minimalist modern landscaping with clean lines, ornamental grasses, concrete pavers, and sculptural plants',
  cottage: 'charming English cottage garden with colorful perennials, climbing roses, foxglove, and rustic stone paths',
  tropical: 'lush tropical landscaping with palm trees, bird of paradise, large-leafed plants, and natural stone features',
  xeriscaping: 'beautiful drought-tolerant xeriscape garden with native plants, decorative gravel, succulents, and desert flowers',
  naturalistic: 'naturalistic garden with native wildflowers, ornamental grasses, meandering paths, and natural stone borders',
  formal: 'elegant formal garden with symmetrical hedges, topiary, rose garden, and classical stone elements',
  japanese: 'serene Japanese zen garden with maple trees, moss, bamboo, raked gravel, stone lanterns, and koi pond',
  mediterranean: 'Mediterranean garden with lavender, rosemary, terracotta pots, olive trees, and natural stone walls',
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status, designs_used_this_month')
      .eq('id', user.id)
      .single()

    if (profile?.subscription_status === 'free' && (profile?.designs_used_this_month ?? 0) >= 3) {
      return NextResponse.json(
        { error: 'Monthly design limit reached. Upgrade to Pro for unlimited designs.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { style, state, gardenDescription, gardenId } = body

    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.naturalistic

    const claudeResponse = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Generate a detailed text-to-image prompt for a photorealistic residential landscape design. Style: ${stylePrompt}. Location: ${state}, USA. ${gardenDescription ? `User notes: ${gardenDescription}.` : ''} Make it vivid, specific, and optimized for image generation — professional landscape photography, bright natural lighting. Output only the prompt text, no explanation.`,
      }],
    })

    const enhancedPrompt = claudeResponse.content[0].type === 'text'
      ? claudeResponse.content[0].text
      : `Photorealistic professional landscape design, ${stylePrompt}, ${state} USA, bright natural lighting, high quality photography`

    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: enhancedPrompt }),
      }
    )

    if (!hfResponse.ok) {
      const errText = await hfResponse.text()
      console.error('HuggingFace error:', errText)
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    const buffer = Buffer.from(await hfResponse.arrayBuffer())
    const fileName = `${user.id}/${Date.now()}.png`

    const storageClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    const { error: uploadError } = await storageClient.storage
      .from('garden-images')
      .upload(fileName, buffer, { contentType: 'image/png' })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
    }

    const { data: { publicUrl } } = storageClient.storage
      .from('garden-images')
      .getPublicUrl(fileName)

    if (gardenId) {
      await supabase
        .from('gardens')
        .update({ generated_image_url: publicUrl, status: 'completed' })
        .eq('id', gardenId)
        .eq('user_id', user.id)
    }

    await supabase
      .from('profiles')
      .update({ designs_used_this_month: (profile?.designs_used_this_month ?? 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ imageUrl: publicUrl })
  } catch (error) {
    console.error('Generate landscape error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
