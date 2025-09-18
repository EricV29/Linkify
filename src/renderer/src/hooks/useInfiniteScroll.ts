import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  onLoadMore: () => void
}

export function useInfiniteScroll({ hasMore, onLoadMore }: UseInfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      },
      {
        root: scrollerRef.current,
        rootMargin: '0px',
        threshold: 1.0
      }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasMore, onLoadMore])

  return [loaderRef, scrollerRef] as const
}
