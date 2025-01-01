import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import MainLayout from '@/layouts/main'
import ProfileLayout from '@/layouts/profile'
import LoggedInLayout from '@/layouts/logged-in'
import LoggedOutLayout from '@/layouts/logged-out'
import TvsPage from '@/pages/tvs'
import Homepage from '@/pages/home'
import LoginPage from '@/pages/login'
import MoviesPage from '@/pages/movies'
import SearchPage from '@/pages/search'
import NotFound from '@/pages/not-found'
import ProfilePage from '@/pages/profile'
import RegisterPage from '@/pages/register'
import TvDetailPage from '@/pages/tv-detail'
import MyReviewsPage from '@/pages/my-reviews'
import VerifyEmailPage from '@/pages/verify-email'
import MovieDetailPage from '@/pages/movie-detail'
import MyFavoritesPage from '@/pages/my-favorites'
import PersonDetailPage from '@/pages/person-detail'
import ResetPasswordPage from '@/pages/reset-password'
import ForgotPasswordPage from '@/pages/forgot-password'
import { ScrollTopProvider } from '@/components/provider'

export const router = createBrowserRouter([
  {
    path: PATH.HOMEPAGE,
    element: (
      <ScrollTopProvider>
        <MainLayout />
      </ScrollTopProvider>
    ),
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
        path: PATH.TVS,
        element: <TvsPage />,
      },
      {
        path: PATH.SEARCH,
        element: <SearchPage />,
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
        path: PATH.PERSON,
        element: <PersonDetailPage />,
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
          {
            path: PATH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: PATH.RESET_PASSWORD,
            element: <ResetPasswordPage />,
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
              {
                path: PATH.MY_FAVORITES,
                element: <MyFavoritesPage />,
              },
              {
                path: PATH.MY_REVIEWS,
                element: <MyReviewsPage />,
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
