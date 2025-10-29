'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'

function SoftBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 优化后的云彩效果 - 只保留2个 */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: `${400 + i * 150}px`,
            height: `${250 + i * 80}px`,
            left: `${i * 50}%`,
            top: `${15 + i * 30}%`,
            background: i === 0 ? 
              'radial-gradient(ellipse, rgba(45, 212, 191, 0.25) 0%, transparent 70%)' :
              'radial-gradient(ellipse, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
            willChange: 'transform',
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 简化的水波纹 - 只保留一层 */}
      <svg className="absolute bottom-0 left-0 w-full opacity-15" height="120" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          fill="none"
          stroke="url(#water-gradient)"
          strokeWidth="2"
          animate={{
            d: [
              'M0,60 Q360,40 720,60 T1440,60',
              'M0,60 Q360,80 720,60 T1440,60',
              'M0,60 Q360,40 720,60 T1440,60',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default memo(SoftBackground)

