'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { name: '首页', href: '#home' },
    { name: '关于', href: '#about' },
    { name: '项目', href: '#projects' },
    { name: '联系', href: '#contact' },
  ]

  return (
    <footer className="py-16 px-6 bg-gradient-to-t from-white/60 to-transparent backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl">
        
        <div className="text-center mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-display text-gradient mb-4"
          >
            Chiba
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-body"
          >
            探索 · 创造 · 分享
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-8 mb-8"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-mint-600 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm font-body"
        >
          <p className="flex items-center justify-center gap-2 mb-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Chiba
          </p>
          <p>© {currentYear} Chiba. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
