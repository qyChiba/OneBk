'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Twitter, Linkedin, Sparkles, Zap, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 glass-strong rounded-full neon-glow"
              >
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-medium text-primary-200">计算机专业 · 大三在读</span>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
              >
                <span className="block">嘿！我是</span>
                <span className="block text-gradient-neon animate-pulse-slow">小明</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl mt-4">
                  <span className="text-gradient">代码创造者</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block ml-4"
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-xl text-slate-300 leading-relaxed">
                  一个热爱{' '}
                  <span className="text-primary-400 font-bold bg-primary-500/20 px-2 py-1 rounded">#编程</span>
                  、
                  <span className="text-secondary-400 font-bold bg-secondary-500/20 px-2 py-1 rounded">#学习</span>
                  {' '}和{' '}
                  <span className="text-accent-cyan font-bold bg-accent-cyan/20 px-2 py-1 rounded">#分享</span>
                  {' '}的计算机专业学生
                </p>
                <p className="text-lg text-slate-400">
                  在这里记录我的学习之旅和项目实践 ✨
                </p>
              </motion.div>

              {/* Interactive Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { value: '20+', label: '项目经验', emoji: '💻' },
                  { value: '3年', label: '学习编程', emoji: '📚' },
                  { value: '∞', label: '热爱技术', emoji: '❤️' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">
                      {stat.emoji}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-cyan rounded-xl font-semibold neon-glow hover:neon-glow-green transition-all inline-flex items-center justify-center gap-3"
                >
                  <Zap className="w-5 h-5" />
                  看看我的项目
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-strong rounded-xl font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-3"
                >
                  <Heart className="w-5 h-5 text-secondary-400" />
                  联系我
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <motion.div
                whileHover={{ rotateY: 10, rotateX: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-96 lg:h-[500px]"
              >
                {/* Main Card */}
                <div className="absolute inset-0 glass-strong rounded-3xl p-8 neon-glow">
                  <div className="h-full flex flex-col justify-center items-center space-y-6">
                    {/* Avatar */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 rounded-full border-4 border-primary-400/30 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-secondary-500/20"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-3xl font-bold"
                      >
                        创
                      </motion.div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-8 right-8 w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center"
                    >
                      <span className="text-2xl">💻</span>
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-8 left-8 w-12 h-12 bg-secondary-400/20 rounded-full flex items-center justify-center"
                    >
                      <span className="text-xl">🚀</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-1/2 -right-4 w-8 h-8 bg-primary-400/20 rounded-full flex items-center justify-center"
                    >
                      <span className="text-sm">✨</span>
                    </motion.div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-cyan/20 rounded-3xl blur-xl animate-pulse-slow" />
              </motion.div>
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

