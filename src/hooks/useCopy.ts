import { useCallback, useEffect, useState } from 'react'

const DEFAULT_TIMEOUT = 1500 // ms

export const useCopy = (value: string | number) => {
  const [hasCopied, setHasCopied] = useState(false)
  const onCopy = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.navigator.clipboard.writeText(value.toString())
      setHasCopied(true)
    }
  }, [value])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (hasCopied) {
      timeoutId = setTimeout(() => {
        setHasCopied(false)
      }, DEFAULT_TIMEOUT)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [hasCopied])

  return { value, onCopy, hasCopied }
}
