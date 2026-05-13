export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_status: 'free' | 'pro' | 'cancelled'
  subscription_id?: string
  stripe_customer_id?: string
  designs_used_this_month: number
  created_at: string
}

export interface Garden {
  id: string
  user_id: string
  name: string
  original_image_url?: string
  generated_image_url?: string
  state: string
  style: LandscapeStyle
  prompt?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
}

export type LandscapeStyle =
  | 'modern'
  | 'cottage'
  | 'tropical'
  | 'xeriscaping'
  | 'naturalistic'
  | 'formal'
  | 'japanese'
  | 'mediterranean'

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  plan: 'monthly' | 'yearly'
  current_period_end: string
  created_at: string
}
