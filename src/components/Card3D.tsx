'use client'

import { motion } from 'framer-motion'
import { useState, useRef, MouseEvent } from 'react'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  maxRotation?: number
}

export default function Card3D({ children, className = '', maxRotation = 15 }: Card3DProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * maxRotation
    const rotateY = ((centerX - x) / centerX) * maxRotation

    // 计算鼠标位置百分比
    const mouseX = (x / rect.width) * 100
    const mouseY = (y / rect.height) * 100

    setRotation({ x: rotateX, y: rotateY })
    setMousePosition({ x: mouseX, y: mouseY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovering(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(50px)',
        }}
      >
        {children}
      </div>

      {/* 鼠标跟随光斑效果 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 212, 255, 0.15), transparent 40%)`,
          transform: 'translateZ(0px)',
        }}
      />

      {/* 边缘高光效果 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              transparent 0%, 
              transparent 60%, 
              rgba(0, 212, 255, 0.2) 80%, 
              transparent 100%
            )
          `,
          transform: 'translateZ(5px)',
        }}
      />

      {/* 彩虹光晕效果 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        animate={{
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `
            radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(0, 212, 255, 0.1),
              rgba(34, 211, 238, 0.05) 20%,
              rgba(251, 146, 60, 0.03) 40%,
              transparent 70%
            )
          `,
          transform: 'translateZ(-10px)',
        }}
      />

      {/* 外围发光边框 - 和卡片同样大小 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        animate={{
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `
            linear-gradient(
              ${Math.atan2(mousePosition.y - 50, mousePosition.x - 50) * (180 / Math.PI)}deg,
              rgba(0, 212, 255, 0.3),
              rgba(34, 211, 238, 0.2),
              rgba(251, 146, 60, 0.1),
              transparent
            )
          `,
          boxShadow: `
            inset 0 0 60px rgba(0, 212, 255, 0.2),
            0 0 30px rgba(0, 212, 255, 0.3)
          `,
        }}
      />
    </motion.div>
  )
}

