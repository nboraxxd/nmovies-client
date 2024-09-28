import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import MainLayout from '@/layouts/main'
import NotFound from '@/pages/not-found'
import Homepage from '@/pages/home'
import MovieDetail from '@/pages/movie-detail'

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
        path: PATH.MOVIE_DETAIL,
        element: <MovieDetail />,
      },
    ],
  },
])
