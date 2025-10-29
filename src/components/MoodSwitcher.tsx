'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sun, Cloud, Zap, Heart } from 'lucide-react'

const moods = [
  { 
    name: '元气满满', 
    icon: Sun, 
    color: 'lemon',
    bg: 'from-lemon-100 to-lemon-200',
    emoji: '☀️',
    message: '充满能量的一天！'
  },
  { 
    name: '平静专注', 
    icon: Cloud, 
    color: 'sky',
    bg: 'from-sky-100 to-sky-200',
    emoji: '☁️',
    message: '保持专注，稳步前进'
  },
  { 
    name: '灵感爆发', 
    icon: Zap, 
    color: 'mint',
    bg: 'from-mint-100 to-mint-200',
    emoji: '⚡',
    message: '创意无限！'
  },
  { 
    name: '热爱编程', 
    icon: Heart, 
    color: 'mint',
    bg: 'from-pink-100 to-pink-200',
    emoji: '💖',
    message: 'Keep coding with love!'
  },
]

export default function MoodSwitcher() {
  const [currentMood, setCurrentMood] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  const switchMood = (index: number) => {
    setCurrentMood(index)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 2000)
  }

  const Icon = moods[currentMood].icon

  return (
    <div className="fixed top-24 right-6 z-40">
      {/* 当前心情显示 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="card p-4 cursor-pointer mb-3"
        onClick={() => switchMood((currentMood + 1) % moods.length)}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Icon className="w-6 h-6 text-mint-600" />
          </motion.div>
          <div>
            <div className="text-xs text-gray-500 font-body">今日心情</div>
            <div className="text-sm font-bold font-display">{moods[currentMood].name}</div>
          </div>
        </div>
      </motion.div>

      {/* 心情选择器 */}
      <div className="grid grid-cols-2 gap-2">
        {moods.map((mood, index) => {
          const MoodIcon = mood.icon
          return (
            <motion.button
              key={mood.name}
              onClick={() => switchMood(index)}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-2xl transition-all ${
                currentMood === index
                  ? `bg-gradient-to-br ${mood.bg} shadow-hover`
                  : 'bg-white/60 hover:bg-white shadow-soft'
              }`}
              style={{ outline: 'none' }}
            >
              <MoodIcon className={`w-5 h-5 mx-auto ${
                currentMood === index ? 'text-gray-800' : 'text-gray-500'
              }`} />
            </motion.button>
          )
        })}
      </div>

      {/* 心情消息 */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 right-full mr-4 card-lemon p-4 whitespace-nowrap"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{moods[currentMood].emoji}</span>
              <p className="font-body font-medium">{moods[currentMood].message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

