import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'

import { Toaster } from '@/components/ui/sonner'
import { TanstackQueryProvider } from '@/components/provider'
import CallToVerify from '@/components/call-to-verify'
import AuthCleanup from '@/components/auth-cleanup'
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
