'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Award, Code, BookOpen, Rocket } from 'lucide-react'

const timelineData = [
  {
    year: '2023',
    title: '开始学习编程',
    date: '2023年9月',
    description: '从HTML/CSS开始，踏入编程世界。第一次写出网页的那一刻，我就知道这是我想要的。',
    icon: Code,
    color: 'mint',
    emoji: '🌱',
  },
  {
    year: '2024',
    title: '第一个项目',
    date: '2024年1月',
    description: '完成了第一个个人博客网站，使用 React 和 Tailwind CSS。虽然简单，但这是我的第一步。',
    icon: Award,
    color: 'lemon',
    emoji: '🏆',
  },
  {
    year: '2024',
    title: '学习React',
    date: '2024年6月',
    description: '深入学习React和Next.js框架，理解了组件化思想和服务端渲染的优势。',
    icon: BookOpen,
    color: 'sky',
    emoji: '📚',
  },
  {
    year: '2025',
    title: '持续成长',
    date: '2025年至今',
    description: '不断学习新技术，完成更多项目。每天都在进步，每天都有新收获。',
    icon: Rocket,
    color: 'mint',
    emoji: '🚀',
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // 光束跟随滚动
  const beamY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        {/* Sticky Header */}
        <div className="sticky top-20 z-30 mb-12 backdrop-blur-md bg-gradient-to-b from-[#f0fdf9] to-transparent pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">成长历程</span>
            </h2>
            <p className="text-gray-600 font-body text-lg">
              我的编程学习之旅 🚀
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* 时间线主线 */}
          <div className="absolute left-12 md:left-24 top-0 bottom-0 w-px bg-gray-200" />

          {/* 滚动光束 */}
          <motion.div
            className="absolute left-12 md:left-24 top-0 w-px bg-gradient-to-b from-mint-400 via-sky-400 to-lemon-400"
            style={{ 
              height: beamY,
              boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
            }}
          />

          {/* 时间节点 */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-12"
                >
                  {/* 年份标签 - Sticky */}
                  <div className="flex-shrink-0 w-12 md:w-24">
                    <div className="sticky top-32">
                      <div className="text-2xl md:text-3xl font-bold font-display text-gray-300">
                        {item.year}
                      </div>
                    </div>
                  </div>

                  {/* 圆点指示器 */}
                  <div className="absolute left-12 md:left-24 flex-shrink-0 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                      whileHover={{ scale: 1.5 }}
                      className="w-4 h-4 rounded-full bg-mint-500 border-4 border-white shadow-lg relative z-10"
                    >
                      {/* 脉冲效果 */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-mint-400"
                        animate={{
                          scale: [1, 2, 2],
                          opacity: [0.5, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* 内容卡片 */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`flex-1 card-${item.color} p-6 hover-lift`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Emoji */}
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl"
                      >
                        {item.emoji}
                      </motion.div>

                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-mono mb-2">
                          {item.date}
                        </div>
                        <h3 className="text-2xl font-bold font-display mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 font-body leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* 图标 */}
                      <Icon className="w-6 h-6 text-mint-600 opacity-50" />
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* 底部指示 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 card-sky px-6 py-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.div>
              <span className="font-body text-gray-600">
                未完待续，更多精彩即将到来
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

