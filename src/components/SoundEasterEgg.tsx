'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 文字转音效映射（使用 Web Audio API 模拟）
const playSound = (type: string) => {
  if (typeof window === 'undefined') return
  
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // 根据不同类型设置不同音频
  switch (type) {
    case 'success':
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.3)
      break
    case 'coin':
      oscillator.frequency.value = 1000
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
      break
    case 'level-up':
      [523, 659, 784].forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3)
        osc.start(audioContext.currentTime + i * 0.1)
        osc.stop(audioContext.currentTime + i * 0.1 + 0.3)
      })
      break
  }
}

export default function SoundEasterEgg() {
  const [storyProgress, setStoryProgress] = useState(0)
  const [showStory, setShowStory] = useState(false)

  const story = [
    { text: '这是一个热爱编程的高中生...', emoji: '👨‍💻', sound: 'coin' },
    { text: '他每天都在学习新技术...', emoji: '📚', sound: 'coin' },
    { text: '遇到bug也不放弃...', emoji: '🐛', sound: 'coin' },
    { text: '终于做出了自己的网站！', emoji: '🎉', sound: 'success' },
    { text: '感谢你的访问！', emoji: '💖', sound: 'level-up' },
  ]

  useEffect(() => {
    let count = 0
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') {
        count++
        if (count === 3) {
          setShowStory(true)
          setStoryProgress(0)
          count = 0
        }
        setTimeout(() => { count = 0 }, 2000)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  useEffect(() => {
    if (showStory && storyProgress < story.length) {
      playSound(story[storyProgress].sound)
      const timer = setTimeout(() => {
        if (storyProgress < story.length - 1) {
          setStoryProgress(storyProgress + 1)
        } else {
          setTimeout(() => setShowStory(false), 2000)
        }
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [showStory, storyProgress])

  return (
    <AnimatePresence>
      {showStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowStory(false)}
        >
          <motion.div
            key={storyProgress}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="card-mint p-12 max-w-lg text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5 }}
              className="text-7xl mb-6"
            >
              {story[storyProgress].emoji}
            </motion.div>
            
            <p className="text-2xl font-bold font-display mb-6">
              {story[storyProgress].text}
            </p>
            
            {/* 进度指示 */}
            <div className="flex gap-2 justify-center">
              {story.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === storyProgress ? 'bg-mint-500 scale-150' : 'bg-gray-300'
                  } transition-all`}
                />
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">
              {storyProgress < story.length - 1 ? '等待下一章...' : '故事结束，点击关闭'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

