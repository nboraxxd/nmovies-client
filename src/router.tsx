import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import MainLayout from '@/layouts/main'
import NotFound from '@/pages/not-found'
import Homepage from '@/pages/home'
import MovieDetailPage from '@/pages/movie-detail'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ProfilePage from '@/pages/profile'
import ProfileLayout from '@/layouts/profile'
import LoggedInLayout from '@/layouts/logged-in'
import LoggedOutLayout from '@/layouts/logged-out'
import VerifyEmailPage from '@/pages/verify-email'
import TvDetailPage from '@/pages/tv-detail'
import MoviesPage from '@/pages/movies'

export const router = createBrowserRouter([
  {
    path: PATH.HOMEPAGE,
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: PATH.MOVIES,
        element: <MoviesPage />,
      },
      {
        path: PATH.MOVIE_DETAIL,
        element: <MovieDetailPage />,
      },
      {
        path: PATH.TV_DETAIL,
        element: <TvDetailPage />,
      },
      {
        element: <LoggedOutLayout />,
        children: [
          {
            path: PATH.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: PATH.LOGIN,
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <LoggedInLayout />,
        children: [
          {
            path: PATH.PROFILE,
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: PATH.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
])
