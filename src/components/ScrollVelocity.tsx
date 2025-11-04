'use client'

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useRef } from 'react'

interface ScrollVelocityProps {
  text: string
  defaultVelocity?: number
}

function ScrollVelocityText({ text, defaultVelocity = 1 }: ScrollVelocityProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(velocityFactor, (latest) => {
    return `${latest * defaultVelocity * -1}%`
  })

  return (
    <div ref={targetRef} className="relative overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-8"
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="block">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function ScrollVelocity() {
  const skills = [
    { text: '⚛️ React', icon: '⚛️' },
    { text: '▲ Next.js', icon: '▲' },
    { text: '📘 TypeScript', icon: '📘' },
    { text: '🎨 Tailwind CSS', icon: '🎨' },
    { text: '💚 Node.js', icon: '💚' },
    { text: '🔧 Git', icon: '🔧' },
  ]

  return (
    <div className="py-16 overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
          <span className="text-gradient">技能标签</span>
        </h2>
        <p className="text-gray-600 font-body text-sm">
          滚动速度会影响标签移动速度 🚀
        </p>
      </div>

      <div className="space-y-4">
        {/* 第一行 - 向右滚动 */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f0fdf9] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f0fdf9] to-transparent z-10" />
          
          <ScrollVelocityText
            text={skills.slice(0, 3).map(s => s.text).join('  •  ')}
            defaultVelocity={1}
          />
        </div>

        {/* 第二行 - 向左滚动 */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f0fdf9] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f0fdf9] to-transparent z-10" />
          
          <ScrollVelocityText
            text={skills.slice(3).map(s => s.text).join('  •  ')}
            defaultVelocity={-1}
          />
        </div>
      </div>

      <p className="text-center text-gray-500 mt-6 font-body text-xs">
        💡 快速滚动页面，文字移动会加速
      </p>
    </div>
  )
}

