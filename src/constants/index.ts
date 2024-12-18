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
    name: 'TV Shows',
  },
] as const

export const TOP_RATED_TABS = [
  {
    value: 'movie',
    name: 'Movie',
  },
  {
    value: 'tv',
    name: 'TV Shows',
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
    label: 'Reviews',
    to: '/profile/reviews',
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

export const RATING_OPTIONS = [
  {
    value: '0-4.9',
    name: '0 - 49',
  },
  {
    value: '5-6.9',
    name: '50 - 69',
  },
  {
    value: '7-10',
    name: '70 - 100',
  },
] as const

export const MOVIE_SORT_OPTIONS = [
  {
    value: 'popularity.desc',
    name: 'Popularity Descending',
  },
  {
    value: 'popularity.asc',
    name: 'Popularity Ascending',
  },
  {
    value: 'primary_release_date.desc',
    name: 'Release Date Descending',
  },
  {
    value: 'primary_release_date.asc',
    name: 'Release Date Ascending',
  },
  {
    value: 'title.asc',
    name: 'Title (A-Z)',
  },
  {
    value: 'title.desc',
    name: 'Title (Z-A)',
  },
  {
    value: 'revenue.desc',
    name: 'Revenue Descending',
  },
  {
    value: 'revenue.asc',
    name: 'Revenue Ascending',
  },
  {
    value: 'vote_average.desc',
    name: 'Rating Descending',
  },
  {
    value: 'vote_average.asc',
    name: 'Rating Ascending',
  },
  {
    value: 'vote_count.desc',
    name: 'Votes Count Descending',
  },
  {
    value: 'vote_count.asc',
    name: 'Votes Count Ascending',
  },
  {
    value: 'original_title.asc',
    name: 'Original Title (A-Z)',
  },
  {
    value: 'original_title.desc',
    name: 'Original Title (Z-A)',
  },
] as const

export const MOVIE_SORT_LIST = MOVIE_SORT_OPTIONS.map((option) => option.value)

export const TV_SORT_OPTIONS = [
  {
    value: 'popularity.desc',
    name: 'Popularity Descending',
  },
  {
    value: 'popularity.asc',
    name: 'Popularity Ascending',
  },
  {
    value: 'first_air_date.desc',
    name: 'First Air Date Descending',
  },
  {
    value: 'first_air_date.asc',
    name: 'First Air Date Ascending',
  },
  {
    value: 'name.asc',
    name: 'Name (A-Z)',
  },
  {
    value: 'name.desc',
    name: 'Name (Z-A)',
  },
  {
    value: 'vote_average.desc',
    name: 'Rating Descending',
  },
  {
    value: 'vote_average.asc',
    name: 'Rating Ascending',
  },
  {
    value: 'vote_count.desc',
    name: 'Votes Count Descending',
  },
  {
    value: 'vote_count.asc',
    name: 'Votes Count Ascending',
  },
  {
    value: 'original_name.asc',
    name: 'Original Name (A-Z)',
  },
  {
    value: 'original_name.desc',
    name: 'Original Name (Z-A)',
  },
] as const

export const TV_SORT_LIST = TV_SORT_OPTIONS.map((option) => option.value)
