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
        path: PATH.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.MOVIE_DETAIL,
        element: <MovieDetailPage />,
      },
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
])
