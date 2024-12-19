import { Outlet } from 'react-router-dom'

import { ProfileNav } from '@/components/profile'

export default function ProfileLayout() {
  return (
    <main className="container flex grow flex-col sm:px-6 lg:px-8">
      <ProfileNav />
      <Outlet />
    </main>
  )
}
