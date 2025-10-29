'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, TrendingUp } from 'lucide-react'

const goals = [
  {
    title: '学习 Next.js',
    current: 80,
    target: 100,
    color: 'mint',
    icon: '📚',
  },
  {
    title: '刷题目标',
    current: 250,
    target: 500,
    color: 'sky',
    icon: '🧮',
  },
  {
    title: '完成项目',
    current: 12,
    target: 20,
    color: 'lemon',
    icon: '🚀',
  },
  {
    title: 'GitHub Stars',
    current: 45,
    target: 100,
    color: 'mint',
    icon: '⭐',
  },
]

export default function ProgressTracker() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            <span className="text-gradient">目标追踪</span>
          </h2>
          <p className="text-gray-600 font-body">
            2025 年度学习目标 🎯
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const percentage = Math.round((goal.current / goal.target) * 100)
            
            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`card-${goal.color} p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {goal.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold font-display">{goal.title}</h3>
                      <p className="text-sm text-gray-600 font-body">
                        {goal.current} / {goal.target}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-mint-600 font-display">
                      {percentage}%
                    </div>
                    {percentage >= 100 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs text-green-600"
                      >
                        ✅ 已完成
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 进度条 */}
                <div className="relative h-3 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-mint-400 to-sky-400 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : {}}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  >
                    {/* 流光效果 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>

                {/* 增长趋势 */}
                {percentage < 100 && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>持续进步中...</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

