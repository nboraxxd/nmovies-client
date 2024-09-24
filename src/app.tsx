import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import { TanstackQueryProvider } from '@/components/provider'
import '@/globals.css'

export default function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  )
}
