'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
}

export default function ParticleEngine() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 生成粒子 - 优化版
  const createParticles = (count: number) => {
    const colors = ['#2dd4bf', '#38bdf8', '#facc15']
    return Array.from({ length: count }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }))
  }

  useEffect(() => {
    setParticles(createParticles(15)) // 30 → 15
  }, [])

  // 禁用滚动监听 - 极致优化
  // 不再根据滚动生成新粒子，减少滚动时的性能消耗

  // 粒子物理更新 - 降低频率
  useEffect(() => {
    let rafId: number
    let lastUpdate = 0
    const updateInterval = 33 // 30fps足够（人眼难以察觉）
    
    const updateParticles = (timestamp: number) => {
      if (timestamp - lastUpdate > updateInterval) {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.vx + scrollVelocity * 0.1,
              y: p.y + p.vy,
              vy: p.vy + 0.05,
              life: p.life - 0.015, // 更快消失
            }))
            .filter((p) => p.life > 0 && p.y < window.innerHeight + 50)
        )
        lastUpdate = timestamp
      }
      rafId = requestAnimationFrame(updateParticles)
    }

    rafId = requestAnimationFrame(updateParticles)
    return () => cancelAnimationFrame(rafId)
  }, [scrollVelocity])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
          }}
        />
      ))}
    </div>
  )
}

