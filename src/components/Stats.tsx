'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      const targets = { projects: 20, clients: 200, awards: 2, satisfaction: 50 }
      const increments = {
        projects: targets.projects / steps,
        clients: targets.clients / steps,
        awards: targets.awards / steps,
        satisfaction: targets.satisfaction / steps,
      }

      let step = 0
      const timer = setInterval(() => {
        step++
        setCounts({
          projects: Math.min(Math.floor(increments.projects * step), targets.projects),
          clients: Math.min(Math.floor(increments.clients * step), targets.clients),
          awards: Math.min(Math.floor(increments.awards * step), targets.awards),
          satisfaction: Math.min(Math.floor(increments.satisfaction * step), targets.satisfaction),
        })

        if (step >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])


  return (
    <section id="stats" className="py-32 bg-gradient-to-b from-gray-950 to-black" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              04. 我的成长 📈
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">学习历程</h2>
            <p className="text-gray-400">一些有趣的数据统计</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '💻', value: counts.projects, label: '做过的项目', suffix: '+' },
              { icon: '📚', value: counts.clients, label: '刷过的算法题', suffix: '+' },
              { icon: '☕', value: counts.awards, label: '杯咖啡', suffix: 'K' },
              { icon: '🌙', value: counts.satisfaction, label: '熬夜写代码', suffix: '晚' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-8 text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gradient mb-2 font-mono">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

