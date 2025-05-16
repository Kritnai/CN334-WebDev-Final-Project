'use client'

import { Suspense } from 'react'
import SheetDetail from './DetailPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SheetDetail />
    </Suspense>
  )
}
