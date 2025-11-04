'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, Star, Zap, Target } from 'lucide-react'

const achievements = [
  {
    id: 1,
    icon: Star,
    title: '2023 年度总结',
    preview: '学习了 React 和 Next.js...',
    content: '今年是我编程学习的重要一年。从基础的 HTML/CSS 开始，逐步深入到 React 生态系统。完成了 5 个个人项目，刷了 100+ 道算法题。最大的收获是学会了如何将想法转化为代码。',
    stats: { projects: 5, problems: 100, days: 365 },
    color: 'mint',
  },
  {
    id: 2,
    icon: Zap,
    title: '技术突破时刻',
    preview: '掌握了 TypeScript 和状态管理...',
    content: '在学习过程中遇到了很多挑战，但每次突破都让我更加热爱编程。特别是理解了 TypeScript 的类型系统和 React 的状态管理后，代码质量提升了一个层次。',
    stats: { bugs: 50, solutions: 50, growth: 200 },
    color: 'lemon',
  },
  {
    id: 3,
    icon: Target,
    title: '未来规划',
    preview: '继续深入学习，探索更多可能...',
    content: '接下来的目标是深入学习后端开发，掌握数据库设计，并完成一个全栈项目。同时继续刷题，提升算法能力。希望能为开源社区做出贡献！',
    stats: { goals: 10, passion: 100, dreams: '∞' },
    color: 'sky',
  },
]

export default function ExpandableCards() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            <span className="text-gradient">我的故事</span>
          </h2>
          <p className="text-gray-600 font-body">
            点击卡片展开查看更多 📖
          </p>
        </div>

        <div className="space-y-4">
          {achievements.map((item, index) => {
            const Icon = item.icon
            const isExpanded = expandedId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
                className={`card-${item.color} cursor-pointer hover-lift`}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                {/* 头部 */}
                <motion.div
                  className="flex items-center justify-between p-6"
                  layout="position"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      animate={isExpanded ? {
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 text-mint-600" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-display mb-1">
                        {item.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-sm text-gray-600 font-body">
                          {item.preview}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </motion.div>

                {/* 展开内容 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-white/40">
                        {/* 详细内容 */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-gray-700 font-body leading-relaxed mb-6 mt-4"
                        >
                          {item.content}
                        </motion.p>

                        {/* 统计数据 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="grid grid-cols-3 gap-4"
                        >
                          {Object.entries(item.stats).map(([key, value], i) => (
                            <motion.div
                              key={key}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                              className="text-center p-3 bg-white/60 rounded-xl"
                            >
                              <div className="text-2xl font-bold text-mint-600 mb-1">
                                {value}
                              </div>
                              <div className="text-xs text-gray-600 capitalize">
                                {key}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

