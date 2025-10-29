'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface EnhancedProgressProps {
  label: string
  current: number
  target: number
  color?: string
}

export default function EnhancedProgress({ 
  label, 
  current, 
  target,
  color = 'mint'
}: EnhancedProgressProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleComplete = () => {
    if (percentage >= 100 && !showCelebration) {
      setShowCelebration(true)
      // 播放成功音效
      playSuccessSound()
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  const playSuccessSound = () => {
    if (typeof window === 'undefined') return
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  useState(() => {
    if (percentage >= 100) handleComplete()
  })

  return (
    <div className="relative">
      {/* 标签和数值 */}
      <div className="flex justify-between mb-3">
        <span className="font-medium font-body">{label}</span>
        <span className="font-bold text-mint-600 font-mono">
          {current} / {target}
        </span>
      </div>

      {/* 进度条容器 */}
      <div className="relative h-4 bg-white/60 rounded-full overflow-hidden">
        {/* 进度填充 */}
        <motion.div
          className="h-full bg-gradient-to-r from-mint-400 via-sky-400 to-lemon-400 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 流光效果 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* 粒子效果 */}
          {percentage > 0 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 w-1 h-1 bg-white rounded-full"
                  animate={{
                    x: ['0%', '100%'],
                    y: [-4, 4, -4],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'linear',
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* 百分比标签 */}
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: percentage > 10 ? 1 : 0 }}
        >
          {percentage}%
        </motion.div>
      </div>

      {/* 完成庆祝效果 */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {/* 光束发射 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-lemon-400 to-transparent origin-bottom"
                initial={{ 
                  rotate: i * 45,
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [1, 0.5, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom center' }}
              />
            ))}

            {/* 粒子散开 */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#2dd4bf', '#38bdf8', '#facc15'][i % 3],
                }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            ))}

            {/* 完成消息 */}
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: -40 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 card-lemon px-6 py-3 whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lemon-600" />
                <span className="font-bold font-display">目标达成！🎉</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

