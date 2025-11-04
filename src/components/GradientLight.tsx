'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function GradientLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastTime = 0
    const throttle = 50 // 节流50ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < throttle) return
      
      lastTime = now
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 优化的渐变光影 - 只保留一层 */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-2xl opacity-20 mix-blend-screen"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{
          type: 'tween',
          duration: 0.3,
          ease: 'easeOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.35) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

