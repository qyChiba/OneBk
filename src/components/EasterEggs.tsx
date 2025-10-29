'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles, Heart, Star, Zap } from 'lucide-react'

export default function EasterEggs() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [secretMessage, setSecretMessage] = useState('')
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  // 彩蛋1: Konami Code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        setKonamiIndex(konamiIndex + 1)
        
        if (konamiIndex === konamiCode.length - 1) {
          triggerKonamiEasterEgg()
          setKonamiIndex(0)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex])

  // 彩蛋2: 连续点击页面 - 优化版
  useEffect(() => {
    let resetTimer: NodeJS.Timeout
    
    const handleClick = () => {
      setClickCount((prev) => {
        const newCount = prev + 1
        
        if (newCount >= 10) {
          triggerClickEasterEgg()
          return 0
        }
        
        return newCount
      })
      
      // 清除之前的定时器，重新计时
      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => setClickCount(0), 3000)
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => {
      document.removeEventListener('click', handleClick)
      clearTimeout(resetTimer)
    }
  }, [])

  // 彩蛋3: 特定时间（生日快乐）
  useEffect(() => {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    
    // 如果是10月21日（网站生日）
    if (month === 10 && day === 21) {
      setSecretMessage('🎂 网站生日快乐！')
    }
  }, [])

  const triggerKonamiEasterEgg = () => {
    setSecretMessage('🎮 你发现了 Konami Code！超级开发者！')
    setShowConfetti(true)
    
    setTimeout(() => {
      setSecretMessage('')
      setShowConfetti(false)
    }, 5000)
  }

  const triggerClickEasterEgg = () => {
    setSecretMessage('🎉 哇！你点击了10次！')
    
    // 创建粒子爆炸
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
    setParticles(newParticles)
    
    setTimeout(() => {
      setSecretMessage('')
      setParticles([])
    }, 3000)
  }

  // 彩蛋4: 鼠标移动画彩虹 - 优化版（节流）
  const [rainbow, setRainbow] = useState<{ x: number; y: number; id: number }[]>([])
  const [isRainbowMode, setIsRainbowMode] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setIsRainbowMode((prev) => {
          const newMode = !prev
          setSecretMessage(newMode ? '🌈 彩虹模式开启！移动鼠标试试' : '')
          setTimeout(() => setSecretMessage(''), 2000)
          return newMode
        })
      }
    }

    window.addEventListener('keypress', handleKeyPress, { passive: true })
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  useEffect(() => {
    if (isRainbowMode) {
      let lastTime = 0
      const throttle = 50 // 每50ms最多触发一次
      
      const handleMouseMove = (e: MouseEvent) => {
        const now = Date.now()
        if (now - lastTime < throttle) return
        
        lastTime = now
        setRainbow((prev) => [
          ...prev,
          { x: e.clientX, y: e.clientY, id: now },
        ].slice(-15)) // 减少到15个
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => window.removeEventListener('mousemove', handleMouseMove)
    } else {
      setRainbow([])
    }
  }, [isRainbowMode])

  return (
    <>
      {/* 秘密消息 */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 card-lemon px-8 py-4 shadow-hover"
          >
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-2xl font-bold font-display text-center"
            >
              {secretMessage}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 五彩纸屑 */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className={`fixed w-4 h-4 rounded-full z-50 ${
                  i % 3 === 0 ? 'bg-mint-400' : i % 3 === 1 ? 'bg-lemon-400' : 'bg-sky-400'
                }`}
                style={{ pointerEvents: 'none' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* 点击粒子爆炸 */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ x: particle.x, y: particle.y, scale: 1, opacity: 1 }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 200,
              y: particle.y + (Math.random() - 0.5) * 200,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="fixed w-3 h-3 bg-mint-400 rounded-full z-50"
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </AnimatePresence>

      {/* 彩虹鼠标轨迹 */}
      <AnimatePresence>
        {rainbow.map((point, i) => (
          <motion.div
            key={point.id}
            initial={{ x: point.x, y: point.y, opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1 }}
            className={`fixed w-4 h-4 rounded-full z-40 ${
              i % 3 === 0 ? 'bg-mint-300' : i % 3 === 1 ? 'bg-lemon-300' : 'bg-sky-300'
            }`}
            style={{ 
              pointerEvents: 'none',
              left: point.x - 8,
              top: point.y - 8,
            }}
          />
        ))}
      </AnimatePresence>

      {/* 点击计数提示 */}
      {clickCount >= 5 && clickCount < 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 text-sm text-gray-500 font-body"
        >
          再点击 {10 - clickCount} 次... 🤔
        </motion.div>
      )}
    </>
  )
}

