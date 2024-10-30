import queryString from 'query-string'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function LoggedInLayout() {
  const { pathname } = useLocation()
  const next = queryString.stringify({ next: pathname })

  const isAuth = useAuthStore((state) => state.isAuth)

  return isAuth ? <Outlet /> : <Navigate to={{ pathname: PATH.LOGIN, search: next }} replace />
}
