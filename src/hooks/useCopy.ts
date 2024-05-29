import { useCallback } from 'react'

export const useCopy = (value: string | number) => {
  const onCopy = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.navigator.clipboard.writeText(value.toString())
    }
  }, [value])

  return { value, onCopy }
}
