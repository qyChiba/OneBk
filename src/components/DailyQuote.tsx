'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { memo } from 'react'

const quotes = [
  { text: '代码改变世界，热爱点亮生活', author: 'Chiba' },
  { text: '每一行代码都是成长的足迹', author: 'Chiba' },
  { text: 'Keep coding, keep smiling!', author: 'Chiba' },
  { text: '永远保持好奇心和学习的热情', author: 'Chiba' },
  { text: '用创造力让想法成为现实', author: 'Chiba' },
  { text: '今天的努力，是明天的惊喜', author: 'Chiba' },
]

function DailyQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
      setIsRefreshing(false)
    }, 300)
  }

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-sky p-8 text-center relative overflow-hidden"
        >
          {/* 装饰星星 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 right-4 text-lemon-400"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-4 left-4 text-mint-400"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>

          {/* 每日一言 */}
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm text-gray-500 mb-4 font-body">💭 每日一言</h3>
            <p className="text-2xl md:text-3xl font-bold font-display text-gray-800 mb-4 leading-relaxed">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-gray-600 font-body">— {quotes[currentQuote].author}</p>
          </motion.div>

          {/* 换一换按钮 */}
          <motion.button
            onClick={refreshQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isRefreshing}
            className="mt-6 px-6 py-2 bg-white/60 rounded-full text-gray-700 hover:bg-white transition-all flex items-center gap-2 mx-auto shadow-soft hover:shadow-hover"
            style={{ outline: 'none' }}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            换一换
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(DailyQuote)

