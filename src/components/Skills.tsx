'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'React / Next.js', level: 90, icon: '⚛️', color: 'mint' },
  { name: 'TypeScript', level: 85, icon: '📘', color: 'sky' },
  { name: 'Tailwind CSS', level: 95, icon: '🎨', color: 'lemon' },
  { name: 'Node.js', level: 75, icon: '💚', color: 'mint' },
  { name: 'Git / GitHub', level: 80, icon: '🔧', color: 'sky' },
  { name: 'Figma / 设计', level: 70, icon: '✨', color: 'lemon' },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">技能栈</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            这些是我正在学习和使用的技术
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`card-${skill.color} p-6 hover-lift`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{skill.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg font-display">{skill.name}</h3>
                  <div className="text-sm text-gray-600 font-body">{skill.level}%</div>
                </div>
              </div>
              
              <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-r from-mint-400 to-mint-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
