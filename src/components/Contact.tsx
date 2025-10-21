'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, MessageCircle, MapPin } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contactMethods = [
    { 
      icon: Mail, 
      label: '邮箱', 
      value: '1470689462@qq.com',
      link: 'mailto:1470689462@qq.com',
      color: 'from-primary-400 to-accent-cyan'
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      value: 'github.com/qyChiba',
      link: 'https://github.com/qyChiba',
      color: 'from-slate-600 to-slate-800'
    },
    { 
      icon: MessageCircle, 
      label: 'QQ', 
      value: '1470689462',
      link: '#',
      color: 'from-secondary-400 to-accent-orange'
    },
  ]

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary-400 text-sm font-mono mb-4 block"
            >
              06. 联系我 📞
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              让我们
              <span className="text-gradient"> 一起交流</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              无论是技术交流、组队做项目，还是单纯想聊聊天，都欢迎联系我！😊
            </motion.p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 group hover:neon-glow cursor-pointer"
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2,
                    transition: { 
                      rotate: { duration: 0.5 },
                      scale: { type: "spring", stiffness: 400 }
                    }
                  }}
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center`}
                >
                  <method.icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-2 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  {method.label}
                </motion.h3>
                <motion.p 
                  className="text-slate-400 group-hover:text-slate-300 transition-colors break-all"
                  whileHover={{ scale: 1.02, color: "#cbd5e1" }}
                >
                  {method.value}
                </motion.p>
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
