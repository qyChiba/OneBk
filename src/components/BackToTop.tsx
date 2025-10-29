'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handlePullStart = () => {
    setIsPulling(true)
    setPullDistance(0)
  }

  const handlePull = (event: MouseEvent | TouchEvent) => {
    if (!isPulling) return

    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
    const startY = window.innerHeight - 120 // 初始位置
    const distance = Math.max(0, clientY - startY)
    
    setPullDistance(distance)
    y.set(distance)
  }

  const handlePullEnd = () => {
    if (!isPulling) return
    
    setIsPulling(false)
    
    // 如果拉动超过50px，触发回到顶部
    if (pullDistance > 50) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    
    setPullDistance(0)
    y.set(0)
  }

  useEffect(() => {
    if (isPulling) {
      window.addEventListener('mousemove', handlePull as any)
      window.addEventListener('mouseup', handlePullEnd)
      window.addEventListener('touchmove', handlePull as any)
      window.addEventListener('touchend', handlePullEnd)
      
      return () => {
        window.removeEventListener('mousemove', handlePull as any)
        window.removeEventListener('mouseup', handlePullEnd)
        window.removeEventListener('touchmove', handlePull as any)
        window.removeEventListener('touchend', handlePullEnd)
      }
    }
  }, [isPulling, pullDistance])

  const ropeOpacity = pullDistance > 0 ? 1 : 0.3

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-40"
          style={{ outline: 'none' }}
        >
          {/* 绳子 */}
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-mint-300 to-mint-400 rounded-full origin-bottom transition-all duration-300"
            style={{
              height: `${60 + pullDistance}px`,
              opacity: ropeOpacity,
            }}
          />

          {/* 拉环 - 圆形拉手 */}
          <motion.div
            onMouseDown={handlePullStart}
            onTouchStart={handlePullStart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0.2}
            onDrag={(_, info) => {
              const distance = Math.max(0, info.point.y - (window.innerHeight - 120))
              setPullDistance(distance)
            }}
            onDragEnd={handlePullEnd}
            className={`w-14 h-14 rounded-full ${
              pullDistance > 50 
                ? 'bg-white/90 border-4 border-lemon-400' 
                : 'bg-white/90 border-4 border-mint-400'
            } shadow-soft hover:shadow-hover flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 backdrop-blur-sm`}
            style={{ 
              outline: 'none',
              y: pullDistance > 0 ? pullDistance : 0,
            }}
          >
            {/* 小箭头或圆点 */}
            <motion.div
              animate={{
                y: isPulling ? [-2, 2, -2] : [-3, 3, -3],
                scale: pullDistance > 50 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                y: { duration: 1, repeat: Infinity },
                scale: { duration: 0.3 }
              }}
              className="flex flex-col gap-1"
            >
              <div className={`w-2 h-2 rounded-full ${
                pullDistance > 50 ? 'bg-lemon-500' : 'bg-mint-500'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                pullDistance > 50 ? 'bg-lemon-500' : 'bg-mint-500'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                pullDistance > 50 ? 'bg-lemon-500' : 'bg-mint-500'
              }`} />
            </motion.div>
          </motion.div>

          {/* 提示文字 */}
          <AnimatePresence>
            {isPulling && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-xs font-body">
                  {pullDistance > 50 ? '松手回到顶部 ⬆️' : '继续往下拉 👇'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 拉动时的光效 */}
          {pullDistance > 50 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(250, 204, 21, 0.4)',
                  '0 0 0 20px rgba(250, 204, 21, 0)',
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
