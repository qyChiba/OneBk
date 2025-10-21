'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={item} className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              01. 关于我 🙋‍♂️
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">我的故事</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              一个热爱编程的计算机专业大学生，喜欢折腾各种技术
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={item} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                嗨！👋 我是千叶，一个喜欢写代码的高中生。从初中开始接触编程，到现在已经两年了。
              </p>
              <p className="text-gray-400 leading-relaxed">
                平时喜欢做一些小项目、刷刷题，偶尔写写学习笔记。觉得用代码创造东西很有趣，虽然经常遇到 bug，但解决问题的感觉很棒！
              </p>

              {/* Expertise Tags */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4">我在学 📚</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    '前端开发 💻',
                    '算法题 🧮',
                    '做小项目 🚀',
                    'Python 🐍',
                    'JavaScript 📜',
                    '瞎折腾 🎨',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div variants={item} className="relative">
              <div className="aspect-square glass rounded-3xl p-8 relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Center Icon */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-48 h-48 rounded-full border-2 border-white/20 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        rotate: -360,
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl font-bold"
                    >
                      创
                    </motion.div>
                  </motion.div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/20" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

