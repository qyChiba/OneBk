'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveBackground() {
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)
  const wave3Ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    const createWaveAnimation = (element: SVGPathElement, duration: number, delay: number) => {
      gsap.to(element, {
        attr: { d: "M0,160 Q250,180 500,160 T1000,160 T1500,160 V300 H0 Z" },
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      })
    }

    if (wave1Ref.current) createWaveAnimation(wave1Ref.current, 4, 0)
    if (wave2Ref.current) createWaveAnimation(wave2Ref.current, 5, 0.5)
    if (wave3Ref.current) createWaveAnimation(wave3Ref.current, 6, 1)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-64 pointer-events-none z-0 opacity-30">
      <svg
        className="w-full h-full"
        viewBox="0 0 1500 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path
          ref={wave1Ref}
          d="M0,160 Q250,140 500,160 T1000,160 T1500,160 V300 H0 Z"
          fill="url(#waveGradient1)"
        />
        <path
          ref={wave2Ref}
          d="M0,180 Q250,160 500,180 T1000,180 T1500,180 V300 H0 Z"
          fill="url(#waveGradient2)"
        />
        <path
          ref={wave3Ref}
          d="M0,200 Q250,180 500,200 T1000,200 T1500,200 V300 H0 Z"
          fill="url(#waveGradient3)"
        />
      </svg>
    </div>
  )
}

