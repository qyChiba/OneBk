'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Twitter, Linkedin, Sparkles, Zap, Heart } from 'lucide-react'
import TypewriterText from './TypewriterText'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight break-words"
              >
                <span className="block text-gradient-neon">千叶</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 sm:mt-6 text-slate-300 font-normal leading-relaxed">
                  Dawn is coming
                  <br />
                  Open your eyes
                </span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <TypewriterText 
                  texts={[
                    '一个喜欢写代码的高中生 💻',
                    '在这里记录学习和生活 ✨',
                    '热爱编程，享受创造的乐趣 🚀',
                    '永远保持好奇心 ⭐'
                  ]}
                  className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 bg-primary-400/20 rounded-full text-primary-300">
                    💻 编程
                  </span>
                  <span className="px-3 py-1 bg-secondary-400/20 rounded-full text-secondary-300">
                    📚 学习
                  </span>
                  <span className="px-3 py-1 bg-accent-cyan/20 rounded-full text-accent-cyan">
                    🎮 游戏
                  </span>
                </div>
              </motion.div>

              {/* Interactive Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6"
              >
                {[
                  { value: '2年', label: '学编程', emoji: '💻' },
                  { value: '10+', label: '小项目', emoji: '🚀' },
                  { value: '∞', label: '想做的', emoji: '⭐' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-center p-3 sm:p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">
                      {stat.emoji}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 600, damping: 20 }
                  }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 via-accent-sky to-accent-cyan rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-400/50 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  我做过的
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { type: "spring", stiffness: 600, damping: 20 }
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 glass-strong rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400" />
                  联系我
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[400px] lg:h-[500px]">
                {/* Main Card */}
                <div className="absolute inset-0 glass-strong rounded-3xl p-8">
                  <div className="h-full flex flex-col justify-center items-center space-y-6">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full border-4 border-primary-400/30 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chiba&backgroundColor=00d4ff,22d3ee"
                        alt="千叶头像"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💻</span>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 w-12 h-12 bg-secondary-400/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">🚀</span>
                    </div>

                    <div className="absolute top-1/2 -right-4 w-8 h-8 bg-primary-400/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">✨</span>
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-cyan/20 rounded-3xl blur-xl" />
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 mt-16"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group w-14 h-14 glass-strong rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                title={social.label}
              >
                <social.icon className="w-6 h-6 group-hover:text-primary-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary-400/50 rounded-full p-1 neon-glow"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary-400 rounded-full mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

