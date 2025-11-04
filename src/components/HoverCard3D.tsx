'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HoverCard3DProps {
  children: React.ReactNode
  className?: string
}

export default function HoverCard3D({ children, className = '' }: HoverCard3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`${className} relative`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* 光泽效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-3xl pointer-events-none"
        style={{
          transform: `translateX(${rotateY * 2}px) translateY(${rotateX * 2}px)`,
        }}
      />
      
      {children}
    </motion.div>
  )
}

