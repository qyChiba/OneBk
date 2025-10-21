'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle3D {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

export default function SpiralParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle3D[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particlesRef.current = []
      const particleCount = 60

      const colors = ['#4a9ec7', '#5bb5d8', '#6ec3e8', '#7a8fa0', '#8b9dc1', '#6a9fb8']

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.3 + Math.random() * 0.4,
        })
      }
    }

    const drawParticle = (particle: Particle3D) => {
      ctx.save()
      ctx.globalAlpha = particle.alpha

      // 粒子光晕
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(0.5, particle.color + '40')
      gradient.addColorStop(1, particle.color + '00')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fill()

      // 粒子核心
      ctx.fillStyle = particle.color + 'aa'
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界检测 - 从对面重新进入
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // 轻微的随机漂移
        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02

        // 限制速度
        const maxSpeed = 1
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed
          particle.vy = (particle.vy / speed) * maxSpeed
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      particlesRef.current.forEach(drawParticle)

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none z-5 hidden lg:block"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

