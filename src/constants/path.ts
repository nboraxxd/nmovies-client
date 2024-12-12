const MOVIES = '/movies'
const TVS = '/tvs'
const PROFILE = '/profile'

export const PATH = {
  HOMEPAGE: '/',
  MOVIES,
  MOVIE_DETAIL: `/${MOVIES}/:movieId`,
  TVS,
  TV_DETAIL: `${TVS}/:tvId`,
  PERSON: `/people/:personId`,
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  PROFILE,
  MY_FAVORITES: `${PROFILE}/favorites`,
}
