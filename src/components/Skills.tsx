'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  {
    category: '前端开发',
    items: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Vue / Nuxt', level: 85 },
    ],
  },
  {
    category: '设计工具',
    items: [
      { name: 'Figma / Sketch', level: 92 },
      { name: 'Adobe CC', level: 88 },
      { name: 'Blender', level: 75 },
    ],
  },
  {
    category: '其他技术',
    items: [
      { name: 'Three.js', level: 80 },
      { name: 'Node.js', level: 85 },
      { name: 'Git / DevOps', level: 88 },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-black to-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              02. 我的武器库 ⚔️
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">技术栈</h2>
            <p className="text-gray-400">正在学习和使用的技术 📚</p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">
                  {skillGroup.category}
                </h3>
                <div className="space-y-6">
                  {skillGroup.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-400 font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

