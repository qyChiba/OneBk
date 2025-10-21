'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function GeometricShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 三角形动画
    animate('.geo-triangle', {
      rotate: '1turn',
      duration: 20000,
      ease: 'linear',
      loop: true
    })

    // 方形动画
    animate('.geo-square', {
      rotate: [45, -45],
      scale: [1.2, 0.8],
      ease: 'inOut(quad)',
      loop: true,
      alternate: true,
      duration: 2000
    })

    // 圆形动画
    animate('.geo-circle', {
      translateX: [30, -30],
      translateY: [-20, 20],
      scale: [1.1, 0.9],
      ease: 'inOut(sine)',
      loop: true,
      alternate: true,
      duration: 3000
    })

    // 六边形动画
    animate('.geo-hexagon', {
      rotate: [60, -60],
      opacity: [0.8, 0.3],
      ease: 'inOut(cubic)',
      loop: true,
      alternate: true,
      duration: 3000
    })

    // 线条动画
    animate('.geo-line', {
      strokeDashoffset: [0, 100],
      ease: 'inOut(sine)',
      duration: 3000,
      loop: true,
      alternate: true
    })

    // 路径变形动画
    animate('.geo-morph', {
      d: ['M50,50 Q75,25 100,50 T150,50', 'M50,50 Q75,75 100,50 T150,50'],
      ease: 'inOut(quad)',
      duration: 2000,
      loop: true,
      alternate: true
    })

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

        {/* 动画线条 */}
        <path
          className="geo-line"
          d="M100,800 Q400,750 700,800 T1300,800"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="10 5"
        />

        {/* 变形路径 */}
        <path
          className="geo-morph"
          d="M50,50 Q75,25 100,50 T150,50"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          opacity="0.4"
          transform="translate(300, 400)"
        />

        {/* 更多装饰性图形 */}
        <circle cx="150" cy="900" r="5" fill="#00d4ff" opacity="0.6">
          <animate attributeName="r" values="5;15;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        <circle cx="1600" cy="100" r="8" fill="#22d3ee" opacity="0.5">
          <animate attributeName="r" values="8;20;8" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
        </circle>

        <circle cx="900" cy="300" r="6" fill="#fb923c" opacity="0.4">
          <animate attributeName="r" values="6;18;6" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.15;0.4" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

