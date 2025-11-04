'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Zap, ZapOff } from 'lucide-react'

interface PerformanceToggleProps {
  onToggle: (enabled: boolean) => void
}

export default function PerformanceToggle({ onToggle }: PerformanceToggleProps) {
  const [highPerf, setHighPerf] = useState(false)

  const toggle = () => {
    const newState = !highPerf
    setHighPerf(newState)
    onToggle(newState)
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-24 left-6 z-40 px-4 py-3 rounded-full ${
        highPerf
          ? 'bg-gradient-to-r from-lemon-400 to-lemon-500 text-white'
          : 'bg-white/90 border-2 border-gray-300 text-gray-600'
      } shadow-soft hover:shadow-hover flex items-center gap-2`}
      style={{ outline: 'none' }}
    >
      {highPerf ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
      <span className="text-sm font-bold font-display">
        {highPerf ? '⚡ 极速' : '🐌 省电'}
      </span>
    </motion.button>
  )
}

