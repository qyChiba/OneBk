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
    const throttle = 60 // 30 → 60ms，减少触发频率

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      setCursorGlow({ x: e.clientX, y: e.clientY })
      
      if (now - lastTime < throttle) return

      lastTime = now
      setTrails((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: now },
      ].slice(-8)) // 12 → 8，减少轨迹点
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* 光标光晕 - 禁用脉冲动画 */}
      <div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-100"
        style={{
          left: cursorGlow.x - 12,
          top: cursorGlow.y - 12,
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
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

