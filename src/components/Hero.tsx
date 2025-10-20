'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
          >
            <span className="text-2xl">🎓</span>
            <span className="text-sm text-gray-300">计算机专业 · 大三在读</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            嘿！我是小明
            <br />
            <span className="text-gradient">代码搬运工 🚀</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            一个热爱 <span className="text-primary-500 font-semibold">#编程</span>、
            <span className="text-secondary-500 font-semibold">#学习</span> 和{' '}
            <span className="text-blue-500 font-semibold">#分享</span> 的计算机专业学生
            <br />
            <span className="text-sm">在这里记录我的学习之旅和项目实践 ✨</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { value: '20+', label: '项目经验', emoji: '💻' },
              { value: '3年', label: '学习编程', emoji: '📚' },
              { value: '∞', label: '热爱技术', emoji: '❤️' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.emoji}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all inline-flex items-center justify-center gap-2"
            >
              看看我的项目 🎯
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#blog"
              className="px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              我的博客 📝
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-6"
          >
            {[
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

