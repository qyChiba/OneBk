'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 根据设备性能调整浮动元素数量
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  const floatingShapes = isMobile ? [
    { 
      id: 1, 
      size: 100, 
      color: 'from-primary-400/15 to-accent-cyan/15',
      initialX: '20%',
      initialY: '30%',
      duration: 25
    },
    { 
      id: 2, 
      size: 80, 
      color: 'from-secondary-400/15 to-accent-orange/15',
      initialX: '70%',
      initialY: '60%',
      duration: 30
    },
  ] : [
    { 
      id: 1, 
      size: 120, 
      color: 'from-primary-400/20 to-accent-cyan/20',
      initialX: '10%',
      initialY: '20%',
      duration: 20
    },
    { 
      id: 2, 
      size: 80, 
      color: 'from-secondary-400/20 to-accent-orange/20',
      initialX: '80%',
      initialY: '30%',
      duration: 25
    },
    { 
      id: 3, 
      size: 100, 
      color: 'from-accent-cyan/20 to-primary-500/20',
      initialX: '15%',
      initialY: '70%',
      duration: 22
    },
    { 
      id: 4, 
      size: 60, 
      color: 'from-secondary-500/20 to-accent-yellow/20',
      initialX: '85%',
      initialY: '60%',
      duration: 18
    },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-2xl pointer-events-auto cursor-grab active:cursor-grabbing`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.initialX,
            top: shape.initialY,
          }}
          animate={{
            x: [0, 60, -30, 30, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileHover={{ scale: 1.3 }}
        />
      ))}

      {/* 跟随鼠标的光晕 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary-400/10 to-accent-cyan/10 blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
    </div>
  )
}

