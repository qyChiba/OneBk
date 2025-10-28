'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CountUpAnimation from './CountUpAnimation'
import { Code, Coffee, BookOpen, Award } from 'lucide-react'

const stats = [
  {
    icon: Code,
    value: 20,
    suffix: '+',
    label: '完成项目',
    color: 'mint',
  },
  {
    icon: Coffee,
    value: 500,
    suffix: '+',
    label: '杯咖啡',
    color: 'lemon',
  },
  {
    icon: BookOpen,
    value: 1000,
    suffix: '+',
    label: '行代码',
    color: 'sky',
  },
  {
    icon: Award,
    value: 100,
    suffix: '%',
    label: '热爱编程',
    color: 'mint',
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="py-16 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`card-${stat.color} p-6 text-center hover-lift`}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-mint-600" />
                </motion.div>
                
                <div className="text-3xl font-bold font-display text-gradient mb-2">
                  <CountUpAnimation 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-sm text-gray-600 font-body">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
