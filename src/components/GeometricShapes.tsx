'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function GeometricShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 检测性能模式
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

    if (isMobile || isLowEnd) {
      // 低性能模式：只运行部分动画
      animate('.geo-circle', {
        translateX: [20, -20],
        translateY: [-15, 15],
        ease: 'inOut(sine)',
        loop: true,
        alternate: true,
        duration: 4000
      })

      animate('.geo-hexagon', {
        rotate: [30, -30],
        opacity: [0.6, 0.2],
        ease: 'inOut(cubic)',
        loop: true,
        alternate: true,
        duration: 4000
      })
    } else {
      // 高性能模式：运行所有动画
      animate('.geo-triangle', {
        rotate: '1turn',
        duration: 25000,
        ease: 'linear',
        loop: true
      })

      animate('.geo-square', {
        rotate: [30, -30],
        scale: [1.1, 0.9],
        ease: 'inOut(quad)',
        loop: true,
        alternate: true,
        duration: 3000
      })

      animate('.geo-circle', {
        translateX: [20, -20],
        translateY: [-15, 15],
        ease: 'inOut(sine)',
        loop: true,
        alternate: true,
        duration: 4000
      })

      animate('.geo-hexagon', {
        rotate: [40, -40],
        opacity: [0.6, 0.2],
        ease: 'inOut(cubic)',
        loop: true,
        alternate: true,
        duration: 4000
      })
    }

  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-5 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* 三角形 */}
        <polygon
          className="geo-triangle"
          points="100,50 125,100 75,100"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          opacity="0.4"
        />

        {/* 方形 */}
        <rect
          className="geo-square"
          x="200"
          y="150"
          width="60"
          height="60"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          opacity="0.5"
          style={{ transformOrigin: '230px 180px' }}
        />

        {/* 圆形 */}
        <circle
          className="geo-circle"
          cx="1700"
          cy="200"
          r="40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.4"
        />

        {/* 六边形 */}
        <polygon
          className="geo-hexagon"
          points="1800,500 1830,520 1830,560 1800,580 1770,560 1770,520"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          opacity="0.5"
          style={{ transformOrigin: '1800px 540px' }}
        />

        {/* 装饰性脉冲圆（减少数量） */}
        <circle cx="150" cy="900" r="5" fill="#00d4ff" opacity="0.5" className="hidden lg:block">
          <animate attributeName="r" values="5;12;5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
        </circle>

        <circle cx="1600" cy="100" r="6" fill="#22d3ee" opacity="0.4" className="hidden lg:block">
          <animate attributeName="r" values="6;15;6" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

