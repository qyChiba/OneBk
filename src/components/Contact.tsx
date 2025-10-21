'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, MessageCircle, MapPin, Twitter, Linkedin } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contactMethods = [
    { 
      icon: Mail, 
      label: '邮箱', 
      value: '1470689462@qq.com',
      link: 'mailto:1470689462@qq.com',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      value: 'github.com/qyChiba',
      link: 'https://github.com/qyChiba',
      color: 'from-gray-600 to-gray-800'
    },
    { 
      icon: MessageCircle, 
      label: 'QQ', 
      value: '1470689462',
      link: '#',
      color: 'from-green-500 to-emerald-500'
    },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/qyChiba' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
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
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center`}
                >
                  <method.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{method.label}</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors break-all">
                  {method.value}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-gradient">社交媒体</h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-8 h-8 text-slate-400 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-block glass rounded-2xl px-8 py-4">
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>中国 · 北京 · 某某大学</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
