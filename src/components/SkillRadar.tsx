'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: '前端开发', value: 85 },
  { name: '后端开发', value: 65 },
  { name: 'UI设计', value: 75 },
  { name: '算法', value: 70 },
  { name: '项目管理', value: 60 },
  { name: '团队协作', value: 80 },
]

export default function SkillRadar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const points = skills.length
  const angleStep = (Math.PI * 2) / points
  const centerX = 150
  const centerY = 150
  const maxRadius = 120

  // 计算雷达图点的坐标
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  // 生成路径
  const pathData = skills.map((skill, i) => {
    const point = getPoint(i, skill.value)
    return `${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`
  }).join(' ') + ' Z'

  return (
    <section className="py-16 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            <span className="text-gradient">能力雷达图</span>
          </h2>
          <p className="text-gray-600 font-body">
            我的综合技能评估 📊
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 雷达图 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="card p-8"
          >
            <svg viewBox="0 0 300 300" className="w-full h-auto">
              {/* 背景网格 */}
              {[20, 40, 60, 80, 100].map((percent, i) => {
                const r = (percent / 100) * maxRadius
                return (
                  <circle
                    key={i}
                    cx={centerX}
                    cy={centerY}
                    r={r}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                )
              })}

              {/* 轴线 */}
              {skills.map((_, i) => {
                const angle = angleStep * i - Math.PI / 2
                const x = centerX + maxRadius * Math.cos(angle)
                const y = centerY + maxRadius * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                )
              })}

              {/* 数据区域 */}
              <motion.path
                d={pathData}
                fill="url(#radar-gradient)"
                fillOpacity="0.4"
                stroke="#2dd4bf"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />

              {/* 数据点 */}
              {skills.map((skill, i) => {
                const point = getPoint(i, skill.value)
                return (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#2dd4bf"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.5 }}
                  />
                )
              })}

              {/* 渐变定义 */}
              <defs>
                <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* 技能列表 */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="font-medium font-body">{skill.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-mint-400 to-sky-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.value}%` } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-mint-600 w-10 text-right font-mono">
                    {skill.value}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

