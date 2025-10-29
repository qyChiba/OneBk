'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Trail {
  x: number
  y: number
  id: number
}

export default function MouseTrail() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastTime = 0
    const throttle = 30

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < throttle) {
        setCursorGlow({ x: e.clientX, y: e.clientY })
        return
      }

      lastTime = now
      setCursorGlow({ x: e.clientX, y: e.clientY })
      
      setTrails((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: now },
      ].slice(-12))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* 光标光晕 */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorGlow.x - 16,
          top: cursorGlow.y - 16,
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* 粒子轨迹 */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className={`fixed w-2 h-2 rounded-full pointer-events-none z-40 ${
            i % 3 === 0 ? 'bg-mint-400' : i % 3 === 1 ? 'bg-lemon-400' : 'bg-sky-400'
          }`}
          initial={{
            x: trail.x - 4,
            y: trail.y - 4,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

