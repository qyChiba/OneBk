'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

const sections = [
  { name: '首页', emoji: '🏠', color: 'mint' },
  { name: '关于', emoji: '👋', color: 'sky' },
  { name: '技能', emoji: '💪', color: 'lemon' },
  { name: '项目', emoji: '🚀', color: 'mint' },
  { name: '联系', emoji: '💌', color: 'sky' },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.floor(latest * sections.length)
      setCurrentSection(Math.min(index, sections.length - 1))
    })
  }, [scrollYProgress])

  return (
    <>
      {/* 顶部进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-mint-400 via-sky-400 to-lemon-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 当前章节指示器 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 left-6 z-40"
      >
        <motion.div
          className={`card-${sections[currentSection].color} px-4 py-2 flex items-center gap-2`}
          key={currentSection}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1 }}
            className="text-2xl"
          >
            {sections[currentSection].emoji}
          </motion.span>
          <span className="font-bold font-display text-sm">
            {sections[currentSection].name}
          </span>
        </motion.div>
      </motion.div>

      {/* 右侧导航点 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-3">
        {sections.map((section, index) => (
          <motion.a
            key={section.name}
            href={`#${section.name === '首页' ? 'home' : section.name === '关于' ? 'about' : section.name === '技能' ? 'skills' : section.name === '项目' ? 'projects' : 'contact'}`}
            whileHover={{ scale: 1.5, x: -5 }}
            className={`block w-3 h-3 rounded-full transition-all ${
              currentSection === index
                ? `bg-${section.color}-500 scale-125`
                : 'bg-gray-300'
            }`}
            title={section.name}
          />
        ))}
      </div>
    </>
  )
}

