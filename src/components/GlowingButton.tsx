'use client'

import { motion } from 'framer-motion'

interface GlowingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function GlowingButton({ 
  children, 
  onClick,
  variant = 'primary' 
}: GlowingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-full font-bold font-display overflow-hidden ${
        variant === 'primary' 
          ? 'bg-gradient-to-r from-mint-400 to-mint-500 text-white'
          : 'bg-white border-2 border-mint-400 text-mint-600'
      }`}
      style={{ outline: 'none' }}
    >
      {/* 发光层 */}
      <motion.div
        className={`absolute inset-0 ${
          variant === 'primary' 
            ? 'bg-gradient-to-r from-mint-300 to-sky-300'
            : 'bg-gradient-to-r from-mint-200 to-sky-200'
        } opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* 脉冲圆环 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-mint-300"
        animate={{
          scale: [1, 1.2, 1.2],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      {/* 闪光扫过 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* 文字 */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

