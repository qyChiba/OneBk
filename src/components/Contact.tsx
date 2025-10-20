'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Github } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('消息已发送！')
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black to-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              06. 联系我 💬
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">一起交流</h2>
            <p className="text-gray-400">有问题或想法？随时联系我！</p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">想一起做点什么？</h3>
                <p className="text-gray-400 leading-relaxed">
                  无论是技术交流、组队做项目，还是单纯想聊聊天，都欢迎联系我！😊
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {[
                  { icon: Mail, label: '邮箱', value: 'xiaoming@example.com' },
                  { icon: Github, label: 'GitHub', value: 'github.com/xiaoming' },
                  { icon: MapPin, label: '学校', value: '某某大学 · 计算机学院' },
                ].map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{method.label}</div>
                      <div className="font-medium">{method.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="md:col-span-3 glass rounded-2xl p-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  主题
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="项目咨询"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  留言
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="告诉我您的想法..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    发送消息
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

