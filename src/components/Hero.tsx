'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code, Heart } from 'lucide-react'
import TypewriterEffect from './TypewriterEffect'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* 主标题 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-display mb-4">
                <span className="text-gradient">创作工作室</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 font-body">
                探索 · 创造 · 分享
              </p>
            </motion.div>

            {/* 描述 - 打字机效果 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed font-body min-h-[3.5rem]"
            >
              <TypewriterEffect
                texts={[
                  '嗨！👋 我是千叶，一个热爱编程的高中生',
                  '在这里记录我的学习之旅 ✨',
                  '分享有趣的项目和想法 💡',
                  '用代码创造无限可能 🚀'
                ]}
                speed={80}
              />
            </motion.div>

            {/* 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {['💻 编程', '🎨 设计', '📚 学习', '🚀 创新'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 shadow-soft hover:shadow-hover transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA 按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary flex items-center gap-2"
              >
                <Code className="w-5 h-5" />
                查看项目
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                联系我
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 右侧卡片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: '🎯', title: '专注', desc: '专注于前端开发', color: 'mint' },
              { icon: '⚡', title: '高效', desc: '追求代码质量', color: 'lemon' },
              { icon: '🌟', title: '创新', desc: '探索新技术', color: 'sky' },
              { icon: '💡', title: '思考', desc: '持续学习成长', color: 'mint' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`card-${item.color} p-6 text-center hover-lift`}
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2 font-display">{item.title}</h3>
                <p className="text-sm text-gray-600 font-body">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-sm flex flex-col items-center gap-2"
          >
            <span>向下滚动</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
