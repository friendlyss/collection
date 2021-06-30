import { useMemo } from 'react'
import { Collection as Collect } from 'collect.js'

export function useCollect<T>(array: T[], fn?: (collect: Collect<T>) => T[]) {
  const data = useMemo(() => {
    const all = array

    return fn ? fn(new Collect(all)) : all
  }, [array])

  return { data }
}