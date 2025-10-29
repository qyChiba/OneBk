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

  // 生成粒子
  const createParticles = (count: number) => {
    const colors = ['#2dd4bf', '#38bdf8', '#facc15']
    return Array.from({ length: count }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }))
  }

  useEffect(() => {
    setParticles(createParticles(30))
  }, [])

  // 监听滚动速度
  useEffect(() => {
    let rafId: number
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = Math.abs(currentScrollY - lastScrollY.current)
      setScrollVelocity(velocity)
      lastScrollY.current = currentScrollY

      // 滚动速度超过阈值时添加粒子
      if (velocity > 5) {
        setParticles((prev) => [
          ...prev.slice(-25),
          ...createParticles(Math.min(5, Math.floor(velocity / 10))),
        ])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 粒子物理更新
  useEffect(() => {
    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx + scrollVelocity * 0.1,
            y: p.y + p.vy,
            vy: p.vy + 0.05, // 重力
            life: p.life - 0.01,
          }))
          .filter((p) => p.life > 0 && p.y < window.innerHeight + 50)
      )
    }

    const interval = setInterval(updateParticles, 16) // ~60fps
    return () => clearInterval(interval)
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

