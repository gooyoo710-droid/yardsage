# YardSage Setup Guide

## Prerequisites
- Node.js 18+
- Supabase account
- Stripe account
- Anthropic account
- Hugging Face account

---

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the SQL Editor, run the contents of `supabase/schema.sql`.
3. Go to **Storage → New bucket** and create a bucket named `garden-images` with **Public** access enabled.
4. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

5. Enable Google OAuth (optional):
   - Go to **Authentication → Providers → Google**
   - Add your Google OAuth credentials

---

## 2. Stripe Setup

1. Go to [stripe.com](https://stripe.com) and create an account.
2. Create two subscription products:
   - **YardSage Pro Monthly**: $19/month → copy Price ID → `STRIPE_PRICE_ID_MONTHLY`
   - **YardSage Pro Yearly**: $169/year → copy Price ID → `STRIPE_PRICE_ID_YEARLY`
3. Go to **Developers → API Keys** and copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. Set up Webhook:
   - Go to **Developers → Webhooks → Add endpoint**
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

For local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

---

## 3. Anthropic Setup

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an API key.
2. Copy the key → `ANTHROPIC_API_KEY`

---

## 4. Hugging Face Setup

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) and create an access token (read).
2. Copy the token → `HUGGING_FACE_API_KEY`
3. The app uses `black-forest-labs/FLUX.1-schnell` for image generation — no extra setup needed.

---

## 5. Environment Variables

Fill in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_PRICE_ID_YEARLY=price_...

ANTHROPIC_API_KEY=sk-ant-...
HUGGING_FACE_API_KEY=hf_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Key Features

| Feature | Route |
|---------|-------|
| Landing page | `/` |
| Sign up | `/signup` |
| Sign in | `/login` |
| Dashboard | `/dashboard` |
| AI Design | `/garden/new` |
| Plant Guide | `/plants` |
| Pricing | `/pricing` |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Auth + DB**: Supabase
- **Payments**: Stripe
- **AI Prompts**: Anthropic Claude (Haiku)
- **AI Images**: Hugging Face FLUX.1-schnell
