'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Code2, Palette, BookOpen, Rocket, Clock } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // 网站运行时间统计（从2025年10月21日开始）
  const [runningTime, setRunningTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const startDate = new Date('2025-10-21T00:00:00')

  useEffect(() => {
    const updateRunningTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setRunningTime({ days, hours, minutes, seconds })
    }

    updateRunningTime()
    const timer = setInterval(updateRunningTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: Code2,
      title: '前端开发',
      desc: '熟悉 React / Next.js 生态',
      color: 'mint',
    },
    {
      icon: Palette,
      title: 'UI设计',
      desc: '注重用户体验与美感',
      color: 'lemon',
    },
    {
      icon: BookOpen,
      title: '持续学习',
      desc: '保持对新技术的好奇心',
      color: 'sky',
    },
    {
      icon: Rocket,
      title: '项目实践',
      desc: '通过实战提升能力',
      color: 'mint',
    },
  ]

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">关于我</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            一个热爱编程与创作的高中生
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* 左侧内容 */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold font-display mb-6">我的故事 📖</h3>
              <div className="space-y-4 text-gray-600 font-body leading-relaxed">
                <p>
                  嗨！我是<strong className="text-mint-600">千叶</strong>，一个对编程充满热情的高中生。
                </p>
                <p>
                  从初中开始接触编程，到现在已经两年了。我喜欢用代码创造有趣的东西，
                  每次解决一个问题都让我感到无比兴奋！
                </p>
                <p>
                  平时喜欢做一些小项目、刷刷题，偶尔写写学习笔记。
                  觉得用代码创造东西很有趣，虽然经常遇到 bug，但解决问题的感觉真的很棒！
                </p>
              </div>
            </motion.div>

            {/* 网站运行时间 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="card-mint p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-mint-600" />
                <h4 className="font-bold font-display text-lg">网站运行时间 🚀</h4>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-600 font-mono">
                    {runningTime.days}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">天</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600 font-mono">
                    {runningTime.hours}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">时</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-lemon-600 font-mono">
                    {runningTime.minutes}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">分</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-600 font-mono animate-pulse">
                    {runningTime.seconds}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">秒</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右侧特长网格 */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`card-${feature.color} p-6 text-center hover-lift`}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-mint-600" />
                  <h4 className="font-bold text-lg mb-2 font-display">{feature.title}</h4>
                  <p className="text-sm text-gray-600 font-body">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
