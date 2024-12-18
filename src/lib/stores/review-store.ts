import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ReviewDataResponseType } from '@/lib/schemas/reviews.schema'

type ReviewStore = {
  review: ReviewDataResponseType | null
  setReview: (review: ReviewDataResponseType | null) => void
}

export const useReviewStore = create<ReviewStore>()(
  devtools(
    (set) => ({
      review: null,
      setReview: (review) => set({ review }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'reviewStore',
    }
  )
)
