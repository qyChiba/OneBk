'use client'

import { motion } from 'framer-motion'
import { Code2, Rocket, Sparkles, Zap, Heart, Star, Trophy, Target } from 'lucide-react'

export default function FeatureCards() {
  const features = [
    {
      icon: Code2,
      title: '代码创作',
      description: '用代码实现想象',
      color: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      icon: Rocket,
      title: '快速学习',
      description: '永不停止探索',
      color: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      icon: Sparkles,
      title: '创意无限',
      description: '让想法成为现实',
      color: 'from-orange-500 to-yellow-500',
      delay: 0.2
    },
    {
      icon: Heart,
      title: '热爱分享',
      description: '知识因分享而美丽',
      color: 'from-red-500 to-rose-500',
      delay: 0.3
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="grid grid-cols-2 gap-4"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.9 + feature.delay,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="relative group"
        >
          {/* 背景发光效果 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`}></div>
          
          {/* 卡片主体 */}
          <div className="relative glass rounded-2xl p-6 h-full flex flex-col items-center justify-center space-y-3 border border-white/10 hover:border-white/30 transition-all duration-300">
            {/* 图标背景 */}
            <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-full h-full bg-slate-900/90 rounded-xl flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* 文字 */}
            <div className="text-center space-y-1">
              <h3 className="text-sm md:text-base font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
            
            {/* 装饰性星星 */}
            <motion.div
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

