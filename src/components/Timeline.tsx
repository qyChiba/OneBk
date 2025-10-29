'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Calendar, Award, Code, BookOpen } from 'lucide-react'

const timelineData = [
  {
    date: '2023.09',
    title: '开始学习编程',
    description: '从HTML/CSS开始，踏入编程世界',
    icon: Code,
    color: 'mint',
  },
  {
    date: '2024.01',
    title: '第一个项目',
    description: '完成了第一个个人博客网站',
    icon: Award,
    color: 'lemon',
  },
  {
    date: '2024.06',
    title: '学习React',
    description: '深入学习React和Next.js框架',
    icon: BookOpen,
    color: 'sky',
  },
  {
    date: '2025.10',
    title: '持续成长',
    description: '不断学习新技术，完成更多项目',
    icon: Calendar,
    color: 'mint',
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">成长历程</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            我的编程学习之旅 🚀
          </p>
        </motion.div>

        <div className="relative">
          {/* 时间线主线 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mint-300 via-sky-300 to-lemon-300 -translate-x-1/2 hidden md:block" />

          {/* 时间节点 */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* 内容卡片 */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`flex-1 card-${item.color} p-6 max-w-sm hover-lift cursor-pointer ${
                      activeIndex === index ? 'ring-2 ring-mint-400' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={activeIndex === index ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 360]
                        } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-mint-600" />
                        </div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-mono mb-1">{item.date}</div>
                        <h3 className="text-xl font-bold font-display mb-2">{item.title}</h3>
                        <p className="text-gray-600 font-body text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* 中心圆点 */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="hidden md:block flex-shrink-0"
                  >
                    <motion.div
                      animate={activeIndex === index ? { 
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(45, 212, 191, 0.4)',
                          '0 0 0 10px rgba(45, 212, 191, 0)',
                          '0 0 0 0 rgba(45, 212, 191, 0)',
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 rounded-full bg-mint-500 border-4 border-white shadow-lg"
                    />
                  </motion.div>

                  {/* 占位 */}
                  <div className="flex-1 max-w-sm hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

