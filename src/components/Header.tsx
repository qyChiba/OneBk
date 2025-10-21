'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: '首页', href: '#home' },
  { name: '关于', href: '#about' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '博客', href: '#blog' },
  { name: '联系', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation - Bubble Menu */}
          <nav className="hidden md:flex items-center gap-3 mx-auto">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  delay: index * 0.1,
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
                className="relative px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-cyan/20 backdrop-blur-md border border-white/20 shadow-lg hover:border-primary-400/50 transition-all group overflow-hidden"
              >
                {/* 气泡内部光晕 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* 气泡高光 */}
                <div className="absolute top-1 left-3 w-2 h-2 rounded-full bg-white/40 blur-sm" />
                <div className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-white/30 blur-sm" />
                
                {/* 文字 */}
                <span className="relative z-10">{item.name}</span>
                
                {/* 悬浮时的脉冲效果 */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/30 to-secondary-400/30 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button - Bubble Style */}
          <motion.button
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 5px 20px rgba(0, 212, 255, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white relative z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500/30 via-secondary-500/30 to-accent-cyan/30 backdrop-blur-md border border-white/30 shadow-lg overflow-hidden"
          >
            {/* 气泡高光 */}
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/50 blur-sm" />
            
            {/* 图标 */}
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="relative z-10"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
            
            {/* 背景脉冲 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Navigation - Bubble Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="md:hidden fixed top-20 right-6 left-6 backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded-3xl p-6 shadow-2xl border border-white/10 z-40"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                  }}
                  transition={{ 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ 
                    scale: 1.05, 
                    x: 5,
                    boxShadow: "0 5px 20px rgba(0, 212, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative py-3 px-5 text-white font-medium text-center rounded-full bg-gradient-to-br from-primary-500/15 via-secondary-500/15 to-accent-cyan/15 backdrop-blur-sm border border-white/20 shadow-lg group overflow-hidden"
                >
                  {/* 气泡高光 */}
                  <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-white/40 blur-sm" />
                  <div className="absolute bottom-2 right-5 w-1.5 h-1.5 rounded-full bg-white/30 blur-sm" />
                  
                  {/* 气泡内部光晕 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 文字 */}
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* 悬浮渐变背景 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
            
            {/* 装饰性气泡 */}
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-primary-400/30 blur-md animate-pulse" />
            <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-secondary-400/30 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

