import NextTopLoader from 'nextjs-toploader'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import { TanstackQueryProvider } from '@/components/provider'
import '@/globals.css'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <TanstackQueryProvider>
      <NextTopLoader showSpinner={false} color="#e00000" />
      <RouterProvider router={router} />
      <Toaster />
    </TanstackQueryProvider>
  )
}
