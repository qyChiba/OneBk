'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SparklesTextProps {
  text: string
  className?: string
}

export default function SparklesText({ text, className = '' }: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    const addSparkle = () => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      
      setSparkles((prev) => [...prev, newSparkle])
      
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 1000)
    }

    const interval = setInterval(addSparkle, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      
      {/* 闪光效果 */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-lemon-400 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-lemon-300 blur-sm" />
        </motion.div>
      ))}
    </div>
  )
}

