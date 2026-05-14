import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

export const maxDuration = 120

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const ROOM_PROMPTS: Record<string, string> = {
  'living-room': 'spacious living room with comfortable seating, stylish decor, and inviting ambiance',
  kitchen: 'beautiful kitchen with modern cabinetry, quality appliances, and functional workspace',
  bedroom: 'serene and cozy bedroom with comfortable bedding, warm lighting, and restful atmosphere',
  bathroom: 'luxurious bathroom with clean finishes, spa-like features, and elegant fixtures',
  'dining-room': 'elegant dining room with a statement table, stylish chairs, and ambient lighting',
}

const STYLE_PROMPTS: Record<string, string> = {
  modern: 'modern style with clean lines, neutral palette, minimal ornamentation, and sleek surfaces',
  farmhouse: 'cozy farmhouse style with shiplap walls, reclaimed wood, vintage accents, and warm neutrals',
  scandinavian: 'Scandinavian style with light woods, white walls, hygge textiles, and functional minimalism',
  bohemian: 'bohemian style with rich colors, layered textiles, eclectic art, plants, and global accents',
  traditional: 'traditional style with classic furniture, rich wood tones, symmetrical arrangements, and timeless elegance',
  minimalist: 'minimalist style with maximum negative space, monochromatic palette, purposeful objects only',
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
    const { roomType, style, description } = body

    const roomPrompt = ROOM_PROMPTS[roomType] || ROOM_PROMPTS['living-room']
    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern

    const claudeResponse = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Generate a detailed text-to-image prompt for a photorealistic interior design photograph. Room: ${roomPrompt}. Style: ${stylePrompt}. ${description ? `User notes: ${description}.` : ''} Make it vivid, specific, and optimized for image generation — professional interior photography, perfect lighting, high-end finish. Output only the prompt text, no explanation.`,
      }],
    })

    const enhancedPrompt = claudeResponse.content[0].type === 'text'
      ? claudeResponse.content[0].text
      : `Photorealistic professional interior design, ${roomPrompt}, ${stylePrompt}, perfect lighting, high quality photography`

    const encodedPrompt = encodeURIComponent(enhancedPrompt)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 90_000)

    let imageResponse: Response
    try {
      imageResponse = await fetch(
        `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1360&height=768&model=flux&nologo=true`,
        { method: 'GET', signal: controller.signal }
      )
    } catch (fetchErr) {
      console.error('Pollinations fetch error:', fetchErr)
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    } finally {
      clearTimeout(timeout)
    }

    if (!imageResponse.ok) {
      const body = await imageResponse.text().catch(() => '')
      console.error('Pollinations error:', imageResponse.status, body)
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer())
    const fileName = `interiors/${user.id}/${Date.now()}.png`

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

    await supabase
      .from('profiles')
      .update({ designs_used_this_month: (profile?.designs_used_this_month ?? 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ imageUrl: publicUrl })
  } catch (error) {
    console.error('Generate interior error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
