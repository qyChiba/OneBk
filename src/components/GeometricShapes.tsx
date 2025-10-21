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
        {/* 三角形 - 漂浮移动 */}
        <polygon
          className="geo-triangle"
          points="100,50 125,100 75,100"
          fill="none"
          stroke="#4a9ec7"
          strokeWidth="1.5"
          opacity="0.25"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 100,80; 0,0"
            dur="20s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* 方形 - 漂浮移动 */}
        <rect
          className="geo-square"
          x="200"
          y="150"
          width="60"
          height="60"
          fill="none"
          stroke="#5bb5d8"
          strokeWidth="1.5"
          opacity="0.3"
          style={{ transformOrigin: '230px 180px' }}
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -80,120; 0,0"
            dur="18s"
            repeatCount="indefinite"
          />
        </rect>

        {/* 圆形 - 漂浮移动 */}
        <circle
          className="geo-circle"
          cx="1700"
          cy="200"
          r="40"
          fill="none"
          stroke="#6ec3e8"
          strokeWidth="1.5"
          opacity="0.25"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -120,100; 0,0"
            dur="22s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 六边形 - 漂浮移动 */}
        <polygon
          className="geo-hexagon"
          points="1800,500 1830,520 1830,560 1800,580 1770,560 1770,520"
          fill="none"
          stroke="#7a8fa0"
          strokeWidth="1.5"
          opacity="0.3"
          style={{ transformOrigin: '1800px 540px' }}
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 90,-100; 0,0"
            dur="24s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* 装饰性脉冲圆 - 降低亮度 */}
        <circle cx="150" cy="900" r="5" fill="#4a9ec7" opacity="0.3" className="hidden lg:block">
          <animate attributeName="r" values="5;10;5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
        </circle>

        <circle cx="1600" cy="100" r="6" fill="#5bb5d8" opacity="0.25" className="hidden lg:block">
          <animate attributeName="r" values="6;12;6" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0.1;0.25" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

