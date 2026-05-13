import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['3 AI designs/month', '10 plant recommendations', 'Basic climate data'],
    limit: 3,
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 19,
    yearlyPrice: 169,
    features: [
      'Unlimited AI designs',
      'Full plant database (500+ species)',
      'Seasonal care calendar',
      'Watering & fertilizer schedule',
      'Priority support',
    ],
    monthlyPriceId: process.env.STRIPE_PRICE_ID_MONTHLY!,
    yearlyPriceId: process.env.STRIPE_PRICE_ID_YEARLY!,
  },
}
