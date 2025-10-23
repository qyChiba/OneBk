'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Layout, Server, Smartphone, GitBranch } from 'lucide-react'

export default function SkillOrbit() {
  const skills = [
    { icon: Code2, name: 'Frontend', color: 'from-blue-400 to-cyan-400' },
    { icon: Server, name: 'Backend', color: 'from-green-400 to-emerald-400' },
    { icon: Database, name: 'Database', color: 'from-purple-400 to-pink-400' },
    { icon: Layout, name: 'UI/UX', color: 'from-orange-400 to-red-400' },
    { icon: Smartphone, name: 'Mobile', color: 'from-yellow-400 to-amber-400' },
    { icon: GitBranch, name: 'Git', color: 'from-indigo-400 to-blue-400' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative w-full h-72 md:h-80"
    >
      {/* 中心核心 - 固定不动 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center z-10"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.5)',
            '0 0 40px rgba(0, 212, 255, 0.8)',
            '0 0 20px rgba(0, 212, 255, 0.5)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <span className="text-2xl md:text-3xl font-bold text-white">
          技能
        </span>
      </motion.div>

      {/* 旋转容器 - 包含轨道和所有图标 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* 虚线轨道 */}
        <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full" />

        {/* 6个技能图标 - 固定在圆周上 */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 360
          const radius = 120

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) translate(-50%, -50%)`
              }}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.2, zIndex: 20 }}
                animate={{
                  rotate: -360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {/* 发光效果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-50 blur-md rounded-full`}></div>
                
                {/* 图标容器 */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full glass border-2 border-white/20 flex items-center justify-center">
                  <skill.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* 标签 - hover时显示 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-xs text-white"
                >
                  {skill.name}
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

