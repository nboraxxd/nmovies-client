import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'

import { Toaster } from '@/components/ui/sonner'
import AuthCleanup from '@/components/auth-cleanup'
import CallToVerify from '@/components/call-to-verify'
import { TanstackQueryProvider } from '@/components/provider'
import '@/globals.css'

export default function App() {
  return (
    <TanstackQueryProvider>
      <CallToVerify />
      <AuthCleanup />
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  )
}
