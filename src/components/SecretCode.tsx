'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SecretCode() {
  const [input, setInput] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [secretType, setSecretType] = useState('')

  const secrets = {
    'chiba': { emoji: '👋', message: '嗨！你好啊！我是 Chiba！' },
    'code': { emoji: '💻', message: '代码改变世界！' },
    'love': { emoji: '❤️', message: '热爱可抵岁月漫长~' },
    'hello': { emoji: '🌟', message: 'Hello, World! 经典永流传！' },
    'cool': { emoji: '😎', message: '你也很酷哦！' },
    '666': { emoji: '🔥', message: '厉害厉害！' },
    '520': { emoji: '💖', message: '爱编程，爱生活！' },
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 只记录字母和数字
      if (e.key.length === 1) {
        setInput((prev) => (prev + e.key.toLowerCase()).slice(-10))
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  useEffect(() => {
    Object.keys(secrets).forEach((code) => {
      if (input.includes(code)) {
        setSecretType(code)
        setShowSecret(true)
        setInput('')
        
        setTimeout(() => {
          setShowSecret(false)
        }, 3000)
      }
    })
  }, [input])

  const currentSecret = secrets[secretType as keyof typeof secrets]

  return (
    <AnimatePresence>
      {showSecret && currentSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: -50 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 5, 0],
            }}
            transition={{ duration: 0.5 }}
            className="card-sky px-6 py-4 shadow-hover flex items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-4xl"
            >
              {currentSecret.emoji}
            </motion.div>
            <p className="text-lg font-bold font-display">
              {currentSecret.message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

