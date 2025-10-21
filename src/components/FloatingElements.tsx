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

  const floatingShapes = [
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
    { 
      id: 5, 
      size: 90, 
      color: 'from-accent-emerald/20 to-accent-teal/20',
      initialX: '50%',
      initialY: '50%',
      duration: 23
    },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-2xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.initialX,
            top: shape.initialY,
          }}
          animate={{
            x: [0, 100, -50, 50, 0],
            y: [0, -80, 50, -30, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileHover={{ scale: 1.3 }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
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

