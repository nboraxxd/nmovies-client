const MOVIES = '/movies'
const TVS = '/tvs'

export const PATH = {
  HOMEPAGE: '/',
  MOVIES: MOVIES,
  MOVIE_DETAIL: `/${MOVIES}/:movieId`,
  TVS: TVS,
  TV_DETAIL: `${TVS}/:tvId`,
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  PROFILE: '/profile',
}
