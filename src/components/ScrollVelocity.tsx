'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ScrollVelocityProps {
  skills: string[]
  direction?: 'left' | 'right'
  speed?: number
}

function ScrollVelocityText({ skills, direction = 'left', speed = 25 }: ScrollVelocityProps) {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimationControls()

  // 将技能数组重复3次以确保无缝循环
  const repeatedSkills = [...skills, ...skills, ...skills]

  useEffect(() => {
    if (isPaused) {
      controls.stop()
    } else {
      controls.start({
        x: direction === 'left' ? [`0%`, `-${100 / 3}%`] : [`-${100 / 3}%`, `0%`],
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        },
      })
    }
  }, [isPaused, direction, speed, controls])

  return (
    <div
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex">
        <motion.div
          className="flex gap-6 items-center flex-shrink-0 hardware-accelerate optimize-render"
          animate={controls}
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {repeatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-3 bg-white/80 backdrop-blur-sm
                         rounded-full shadow-soft border border-gray-100
                         group-hover:border-mint-300 group-hover:shadow-md
                         transition-all duration-150 hardware-accelerate optimize-render" // 减少duration
              style={{ transform: 'translateZ(0)' }}
            >
              <span className="text-base md:text-lg font-medium text-gray-700
                             group-hover:text-mint-600 whitespace-nowrap">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function ScrollVelocity() {
  const skillsRow1 = [
    '⚛️ React',
    '▲ Next.js',
    '📘 TypeScript',
    '🎨 Tailwind CSS',
  ]

  const skillsRow2 = [
    '💚 Node.js',
    '🔧 Git',
    '✨ Framer Motion',
    '🎯 GSAP',
    '⚙️ Webpack',
    '📦 npm',
  ]

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-3"
          >
            <span className="text-gradient">技能标签云</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 font-body text-base"
          >
            自动循环滚动 · 鼠标悬停暂停 ⏸️
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* 第一行 - 向左滚动 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative py-6"
          >
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32
                          bg-gradient-to-r from-[#f0fdf9] via-[#f0fdf9] to-transparent
                          z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32
                          bg-gradient-to-l from-[#f0fdf9] via-[#f0fdf9] to-transparent
                          z-10 pointer-events-none" />

            <ScrollVelocityText
              skills={skillsRow1}
              direction="left"
              speed={25}
            />
          </motion.div>

          {/* 第二行 - 向右滚动 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative py-6"
          >
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32
                          bg-gradient-to-r from-[#f0fdf9] via-[#f0fdf9] to-transparent
                          z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32
                          bg-gradient-to-l from-[#f0fdf9] via-[#f0fdf9] to-transparent
                          z-10 pointer-events-none" />

            <ScrollVelocityText
              skills={skillsRow2}
              direction="right"
              speed={30}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 font-body text-sm inline-flex items-center gap-2">
            <span className="text-mint-400">💡</span>
            鼠标悬停在任意标签上可暂停滚动
          </p>
        </motion.div>
      </div>
    </section>
  )
}

