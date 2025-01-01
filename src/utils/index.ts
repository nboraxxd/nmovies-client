import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { GenreType } from '@/lib/schemas/common-media.schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currencyFormatter(number: number, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

  return formatter.format(number).replace(/\D00(?=\D*$)/, '')
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function separateGenres(genres?: GenreType[]) {
  const genresTop = genres
    ? genres.length % 2 === 0
      ? genres.slice(0, genres.length / 2)
      : genres.slice(0, genres.length / 2 + 1)
    : undefined

  const genresBottom = genres
    ? genres.length % 2 === 0
      ? genres.slice(genres.length / 2)
      : genres.slice(genres.length / 2 + 1)
    : undefined

  return { genresTop, genresBottom }
}

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSecs).padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
}
