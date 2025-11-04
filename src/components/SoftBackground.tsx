'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'

function SoftBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 极简云彩效果 - 只1个，减少模糊 */}
      <motion.div
        className="absolute rounded-full blur-xl opacity-10"
        style={{
          width: '500px',
          height: '300px',
          left: '20%',
          top: '10%',
          background: 'radial-gradient(ellipse, rgba(45, 212, 191, 0.2) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 静态水波纹 - 无动画 */}
      <svg className="absolute bottom-0 left-0 w-full opacity-10" height="100" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          fill="none"
          stroke="url(#water-gradient)"
          strokeWidth="2"
          d="M0,50 Q360,30 720,50 T1440,50"
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

