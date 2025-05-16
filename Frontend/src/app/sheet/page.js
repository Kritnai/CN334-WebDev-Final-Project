'use client'

import { Suspense } from 'react'
import SheetPage from './SheetPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SheetPage />
    </Suspense>
  )
}
