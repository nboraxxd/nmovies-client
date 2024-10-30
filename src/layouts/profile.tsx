import { Outlet } from 'react-router-dom'

import { ProfileNav } from '@/components/profile'

export default function ProfileLayout() {
  return (
    <main className="flex flex-col">
      <ProfileNav />
      <Outlet />
    </main>
  )
}
