const MOVIES = '/movies'
const TVS = '/tvs'
const PROFILE = '/profile'

export const PATH = {
  HOMEPAGE: '/',

  MOVIES,
  MOVIE_DETAIL: `/${MOVIES}/:movieId`,

  TVS,
  TV_DETAIL: `${TVS}/:tvId`,

  SEARCH: '/search',
  PERSON: `/people/:personId`,

  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',

  PROFILE,
  MY_FAVORITES: `${PROFILE}/favorites`,
  MY_REVIEWS: `${PROFILE}/reviews`,
}
