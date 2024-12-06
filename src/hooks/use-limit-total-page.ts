import { useEffect, useState } from 'react'

export default function useLimitTotalPages(totalPages?: number) {
  const [limitTotalPages, setLimitTotalPages] = useState<number>()

  useEffect(() => {
    if (totalPages) {
      setLimitTotalPages(totalPages <= 500 ? totalPages : 500)
    }
  }, [totalPages])

  return limitTotalPages
}
