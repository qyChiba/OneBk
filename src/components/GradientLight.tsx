'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function GradientLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId: number
    
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 跟随鼠标的渐变光影 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 mix-blend-screen"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* 副光晕 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 mix-blend-screen"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 150,
          mass: 0.8,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

