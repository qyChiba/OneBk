'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-mint-50 via-sky-50 to-lemon-50"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="text-center">
        {/* 旋转圆环 */}
        <motion.div
          className="w-16 h-16 mx-auto mb-4 border-4 border-mint-200 border-t-mint-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* 加载文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-display font-semibold text-gradient"
        >
          Loading...
        </motion.p>
        
        {/* 跳动的点 */}
        <div className="flex gap-1 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-mint-400 rounded-full"
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 0.6,
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

