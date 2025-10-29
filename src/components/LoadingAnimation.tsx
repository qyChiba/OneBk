'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 模拟加载进度
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 30
      })
    }, 200)

    const loadTimer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    }, 1500)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: progress >= 100 ? 0 : 1,
        scale: progress >= 100 ? 1.5 : 1
      }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-mint-50 via-sky-50 to-lemon-50"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="text-center">
        {/* 静态圆环 - 不旋转 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-32 h-32 mx-auto mb-6"
        >
          {/* 外圆环 - 静止 */}
          <div className="absolute inset-0 border-4 border-mint-200 rounded-full" />
          
          {/* 进度圆环 */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          
          {/* 中心进度 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold font-display text-gradient"
            >
              {Math.floor(progress)}%
            </motion.div>
          </div>
        </motion.div>
        
        {/* 加载文字 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-display font-semibold text-gradient mb-2"
        >
          Loading...
        </motion.p>
        
        {/* 进度条 */}
        <div className="w-64 h-2 bg-white/60 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-mint-400 via-sky-400 to-lemon-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* 跳动的点 */}
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-mint-400 rounded-full"
              animate={{ 
                y: [-8, 8, -8],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

