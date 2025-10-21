'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  radius: number
  vx: number
  vy: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      starsRef.current = []
      const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200)
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 4,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        })
      }
    }

    const drawStar = (star: Star) => {
      const size = star.radius * (1 + star.z / 2)
      const opacity = 0.3 + (star.z / 4) * 0.7
      
      ctx.save()
      ctx.globalAlpha = opacity
      
      // 星星主体
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 2)
      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(0.4, '#00d4ff')
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2)
      ctx.fill()
      
      // 星星闪烁效果
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(star.x, star.y, size, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    const connectStars = () => {
      starsRef.current.forEach((star, i) => {
        starsRef.current.slice(i + 1).forEach(otherStar => {
          const dx = star.x - otherStar.x
          const dy = star.y - otherStar.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = (150 - distance) / 150 * 0.15
            ctx.strokeStyle = '#00d4ff'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(otherStar.x, otherStar.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    const updateStars = () => {
      starsRef.current.forEach(star => {
        // 跟随鼠标
        const dx = mouseRef.current.x - star.x
        const dy = mouseRef.current.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.5
          star.vx += (dx / distance) * force * 0.01
          star.vy += (dy / distance) * force * 0.01
        }
        
        star.x += star.vx
        star.y += star.vy

        // 边界检测
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        // 保持在画布内
        star.x = Math.max(0, Math.min(canvas.width, star.x))
        star.y = Math.max(0, Math.min(canvas.height, star.y))

        // 阻尼
        star.vx *= 0.99
        star.vy *= 0.99
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      updateStars()
      connectStars()
      starsRef.current.forEach(drawStar)
      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    createStars()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createStars()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-5"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

