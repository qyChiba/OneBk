'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RotatingText() {
  const hobbies = [
    { text: 'coding', emoji: '💻', bgColor: 'bg-blue-500', textColor: 'text-white' },
    { text: '游戏', emoji: '🎮', bgColor: 'bg-purple-500', textColor: 'text-white' },
    { text: '音乐', emoji: '🎵', bgColor: 'bg-pink-500', textColor: 'text-white' },
    { text: '阅读', emoji: '📚', bgColor: 'bg-orange-500', textColor: 'text-white' },
    { text: '运动', emoji: '🏃', bgColor: 'bg-green-500', textColor: 'text-white' },
    { text: '摄影', emoji: '📷', bgColor: 'bg-cyan-500', textColor: 'text-white' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hobbies.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [hobbies.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="w-full"
    >
      <div className="flex items-center justify-center flex-wrap gap-3">
        {/* 固定文字：爱好 */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          爱好
        </motion.span>

        {/* 变化的文字（带背景） */}
        <div className="relative inline-flex items-center">
          {/* 固定的背景框 - 颜色不变 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ delay: 1.2 }}
            className="bg-blue-500 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 overflow-hidden"
          >
            {/* 文字容器 - 只有文字上下移动 */}
            <div className="relative h-12 md:h-14 flex items-center min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="flex items-center gap-2 whitespace-nowrap text-white"
                >
                  <span className="text-3xl">{hobbies[currentIndex].emoji}</span>
                  <span className="text-4xl md:text-5xl font-bold">
                    {hobbies[currentIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 进度指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex gap-2 justify-center mt-8"
      >
        {hobbies.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'w-8 bg-gradient-to-r from-primary-400 to-secondary-400' 
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

