'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, MessageCircle, Send } from 'lucide-react'

const contacts = [
  {
    icon: Mail,
    title: '邮箱',
    value: 'hello@chiba.dev',
    link: 'mailto:hello@chiba.dev',
    color: 'mint',
  },
  {
    icon: Github,
    title: 'GitHub',
    value: '@chibadev',
    link: 'https://github.com',
    color: 'lemon',
  },
  {
    icon: MessageCircle,
    title: 'Twitter',
    value: '@chiba_dev',
    link: 'https://twitter.com',
    color: 'sky',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">联系我</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            很高兴认识你！欢迎通过以下方式联系
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`card-${contact.color} p-6 text-center hover-lift group`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block mb-4"
                >
                  <Icon className="w-12 h-12 text-mint-600 group-hover:text-mint-500 transition-colors" />
                </motion.div>
                <h3 className="font-bold text-lg font-display mb-2">{contact.title}</h3>
                <p className="text-sm text-gray-600 font-body">{contact.value}</p>
                
                {/* 悬停发光效果 */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-mint-400 to-sky-400 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="card p-8 text-center"
        >
          <h3 className="text-2xl font-bold font-display mb-4">
            期待与你交流！
          </h3>
          <p className="text-gray-600 font-body mb-6 leading-relaxed max-w-md mx-auto">
            如果你对我的项目感兴趣，或者想一起学习交流，
            欢迎随时联系我 😊
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            发送消息
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
