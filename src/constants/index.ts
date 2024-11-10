import { FolderHeartIcon, MessageSquareMoreIcon, SettingsIcon } from 'lucide-react'

export const AVATAR_SIZE_LIMIT = 1 * 1024 * 1024 // 1MB

export const TRENDING_TABS = [
  {
    value: 'all',
    name: 'All',
  },
  {
    value: 'movie',
    name: 'Movie',
  },
  {
    value: 'tv',
    name: 'TV Series',
  },
] as const

export const TOP_RATED_TABS = [
  {
    value: 'movie',
    name: 'Movie',
  },
  {
    value: 'tv',
    name: 'TV Series',
  },
] as const

export const FOOTER_LINKS = [
  'home',
  'live',
  'you must watch',
  'contact us',
  'FAQ',
  'Recent release',
  'term of services',
  'premium',
  'Top IMDB',
  'About us',
  'Privacy policy',
] as const

export const PROFILE_NAV = [
  {
    label: 'Profile',
    to: '/profile',
    icon: SettingsIcon,
  },
  {
    label: 'Favorites',
    to: '/profile/favorites',
    icon: FolderHeartIcon,
  },
  {
    label: 'Comments',
    to: '/profile/comments',
    icon: MessageSquareMoreIcon,
  },
] as const

export const MOVIE_DETAIL_INFO = [
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Budget',
    key: 'budget',
  },
  {
    title: 'Revenue',
    key: 'revenue',
  },
] as const
