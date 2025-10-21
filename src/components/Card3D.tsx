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

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
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

      {/* 3D 光晕效果 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 - rotation.y * 2}% ${50 - rotation.x * 2}%, rgba(0, 212, 255, 0.3), transparent 60%)`,
          transform: 'translateZ(-10px)',
        }}
      />
    </motion.div>
  )
}

