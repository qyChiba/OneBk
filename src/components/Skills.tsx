'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SplitText from './SplitText'

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
  const progressRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const progressInView = useInView(progressRef, { once: false, margin: '-100px', amount: 0.3 })

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
            <motion.span 
              className="text-primary-500 text-sm font-mono mb-4 block"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              02. 我的武器库 ⚔️
            </motion.span>
            {isInView && (
              <SplitText 
                className="text-4xl md:text-5xl font-bold mb-4 justify-center"
                animationType="bounce"
                delay={0.2}
              >
                技术栈
              </SplitText>
            )}
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              正在学习和使用的技术 📚
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8" ref={progressRef}>
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <motion.h3 
                  className="text-xl font-bold mb-6 pb-4 border-b border-white/10 group-hover:border-primary-400/30 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {skillGroup.category}
                </motion.h3>
                <div className="space-y-6">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <motion.span 
                          className="text-sm text-gray-400 font-mono"
                          whileHover={{ scale: 1.2, color: "#0ea5e9" }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden group-hover:bg-white/10 transition-colors">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={progressInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.2, 
                            delay: index * 0.15 + skillIndex * 0.1 + 0.3,
                            ease: [0.43, 0.13, 0.23, 0.96]
                          }}
                          whileHover={{ 
                            height: "12px",
                            boxShadow: "0 0 20px rgba(14, 165, 233, 0.5)",
                            transition: { duration: 0.2 }
                          }}
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative shadow-lg shadow-primary-500/50"
                        >
                          {progressInView && (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 3
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
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

