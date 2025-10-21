'use client'

import { motion } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface Text3DProps {
  children: string
  className?: string
  depth?: number
  color?: string
}

export default function Text3D({ 
  children, 
  className = '', 
  depth = 5,
  color = '#00d4ff'
}: Text3DProps) {
  const textRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return

    const rect = textRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotateX = (y / rect.height) * 20
    const rotateY = (x / rect.width) * -20

    textRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(50px)
    `
  }

  const handleMouseLeave = () => {
    if (!textRef.current) return
    textRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(50px)
    `
  }

  return (
    <motion.div
      ref={textRef}
      className={`relative inline-block ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      {/* 3D 深度层 */}
      {[...Array(depth)].map((_, i) => (
        <span
          key={i}
          className="absolute inset-0 select-none"
          style={{
            transform: `translateZ(${-i * 2}px)`,
            color: color,
            opacity: 1 - i / depth,
            textShadow: `0 0 ${20 - i * 2}px ${color}`,
          }}
          aria-hidden="true"
        >
          {children}
        </span>
      ))}

      {/* 前景文字 */}
      <span
        className="relative block"
        style={{
          transform: 'translateZ(0px)',
          textShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
        }}
      >
        {children}
      </span>

      {/* 反射效果 */}
      <motion.span
        className="absolute inset-0 select-none"
        style={{
          transform: 'translateZ(-20px) scaleY(-1)',
          opacity: 0.2,
          background: `linear-gradient(to bottom, ${color}00, ${color}80)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </motion.div>
  )
}

