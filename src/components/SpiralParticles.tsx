'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle3D {
  x: number
  y: number
  z: number
  angle: number
  radius: number
  speed: number
  size: number
  color: string
}

export default function SpiralParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle3D[]>([])
  const angleRef = useRef(0)

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
      const particleCount = 150

      const colors = ['#00d4ff', '#22d3ee', '#38bdf8', '#fb923c', '#fbbf24', '#10b981']

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 8
        const radius = (i / particleCount) * 200

        particlesRef.current.push({
          x: 0,
          y: 0,
          z: i * 2,
          angle: angle,
          radius: radius,
          speed: 0.01 + Math.random() * 0.02,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const drawParticle = (particle: Particle3D) => {
      // 3D 投影
      const scale = 300 / (300 + particle.z)
      const x2d = canvas.width / 2 + particle.x * scale
      const y2d = canvas.height / 2 + particle.y * scale
      const size = particle.size * scale

      if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) return

      ctx.save()
      ctx.globalAlpha = scale * 0.8

      // 粒子光晕
      const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3)
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(0.5, particle.color + '80')
      gradient.addColorStop(1, particle.color + '00')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2)
      ctx.fill()

      // 粒子核心
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const updateParticles = () => {
      angleRef.current += 0.005

      particlesRef.current.forEach((particle) => {
        particle.angle += particle.speed

        // 螺旋运动
        particle.x = Math.cos(particle.angle) * particle.radius
        particle.y = Math.sin(particle.angle) * particle.radius
        particle.z = Math.sin(angleRef.current + particle.angle) * 150

        // 循环
        if (particle.z > 300) {
          particle.z = -300
        }
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      updateParticles()

      // 按 Z 值排序（远的先画）
      const sorted = [...particlesRef.current].sort((a, b) => a.z - b.z)
      sorted.forEach(drawParticle)

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

