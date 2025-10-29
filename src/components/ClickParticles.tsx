'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
}

const emojis = ['✨', '💫', '⭐', '🌟', '💖', '💚', '💛', '💙']

export default function ClickParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 10% 概率触发
      if (Math.random() > 0.1) return

      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))

      setParticles((prev) => [...prev, ...newParticles])

      // 2秒后清理
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)))
      }, 2000)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y - 50 - Math.random() * 50,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
            rotate: (Math.random() - 0.5) * 360,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed text-2xl z-50 pointer-events-none"
          style={{
            left: 0,
            top: 0,
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

