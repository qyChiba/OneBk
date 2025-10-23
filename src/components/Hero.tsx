'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Heart } from 'lucide-react'
import TypewriterText from './TypewriterText'
import Text3D from './Text3D'
import Button3D from './Button3D'
import SplitText from './SplitText'
import FeatureCards from './FeatureCards'
import FloatingOrbs from './FloatingOrbs'
import RotatingText from './SkillTags'

export default function Hero() {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Orbs Background */}
      <FloatingOrbs />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 py-20 items-start">
            
            {/* 左侧内容 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Title with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Text3D 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient-neon"
                  depth={3}
                  color="#4a9ec7"
                >
                  千叶
                </Text3D>
                <div className="mt-4 sm:mt-6">
                  <SplitText 
                    className="text-2xl sm:text-3xl md:text-4xl text-slate-300 font-normal leading-relaxed"
                    delay={0.5}
                    animationType="slide"
                  >
                    Dawn is coming
                  </SplitText>
                  <SplitText 
                    className="text-2xl sm:text-3xl md:text-4xl text-slate-300 font-normal leading-relaxed mt-2"
                    delay={0.8}
                    animationType="slide"
                  >
                    Open your eyes
                  </SplitText>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
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
                className="grid grid-cols-3 gap-4"
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

              {/* CTA Buttons with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button3D href="#projects" variant="primary">
                  <Zap className="w-5 h-5" />
                  我做过的
                  <ArrowRight className="w-5 h-5" />
                </Button3D>
                <Button3D href="#contact" variant="secondary">
                  <Heart className="w-5 h-5" />
                  联系我
                </Button3D>
              </motion.div>
            </motion.div>

            {/* 右侧内容 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 flex flex-col justify-start"
            >
              {/* Feature Cards */}
              <div className="flex-shrink-0">
                <FeatureCards />
              </div>

              {/* Rotating Text */}
              <div className="flex-shrink-0">
                <RotatingText />
              </div>
            </motion.div>

          </div>

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

