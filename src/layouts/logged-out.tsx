import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function LoggedOutLayout() {
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next')

  const isAuth = useAuthStore((state) => state.isAuth)

  return isAuth ? <Navigate to={next ?? PATH.HOMEPAGE} replace /> : <Outlet />
}
