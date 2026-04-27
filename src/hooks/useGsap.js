import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useFadeIn(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options.y ?? 24 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.6,
          delay: options.delay ?? 0,
          ease: options.ease ?? 'power2.out',
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return ref
}

export function useScrollFadeIn(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.7,
          ease: options.ease ?? 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: options.start ?? 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return ref
}

export function useGsapTimeline(fn, deps = []) {
  const tlRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline()
      fn(tlRef.current)
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return tlRef
}
