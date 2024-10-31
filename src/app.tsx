import NextTopLoader from 'nextjs-toploader'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'

import { Toaster } from '@/components/ui/sonner'
import { TanstackQueryProvider } from '@/components/provider'
import CallToVerify from '@/components/call-to-verify'
import '@/globals.css'

export default function App() {
  return (
    <TanstackQueryProvider>
      <NextTopLoader showSpinner={false} color="#e00000" />
      <CallToVerify />
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  )
}
