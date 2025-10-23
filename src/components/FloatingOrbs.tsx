'use client'

import { motion } from 'framer-motion'

export default function FloatingOrbs() {
  const orbs = [
    {
      size: 'w-72 h-72',
      position: 'top-20 -right-20',
      color: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      duration: 20,
      delay: 0
    },
    {
      size: 'w-96 h-96',
      position: 'top-40 -left-32',
      color: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      duration: 25,
      delay: 2
    },
    {
      size: 'w-64 h-64',
      position: 'bottom-32 right-20',
      color: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20',
      duration: 22,
      delay: 1
    },
    {
      size: 'w-80 h-80',
      position: '-bottom-20 left-20',
      color: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
      duration: 28,
      delay: 3
    }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} ${orb.color} rounded-full blur-3xl`}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay
          }}
        />
      ))}
    </div>
  )
}

