'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LogoEasterEgg from './LogoEasterEgg'

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // 计算滚动进度
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 根据滚动进度动态计算背景色
  const getBackgroundColor = () => {
    if (scrollProgress < 25) return 'from-mint-50/80 to-sky-50/80'
    if (scrollProgress < 50) return 'from-sky-50/80 to-lemon-50/80'
    if (scrollProgress < 75) return 'from-lemon-50/80 to-mint-50/80'
    return 'from-mint-50/80 to-sky-50/80'
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className={`${
          isScrolled 
            ? `bg-gradient-to-r ${getBackgroundColor()} shadow-soft` 
            : 'bg-white/80'
        } backdrop-blur-lg rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 relative overflow-hidden`}>
          
          {/* 进度指示条 */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-mint-400 via-sky-400 to-lemon-400"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
          
          {/* Logo - 带彩蛋 */}
          <a href="#home">
            <LogoEasterEgg />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-all duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-mint-50 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-white/95 backdrop-blur-lg rounded-3xl shadow-soft overflow-hidden"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-4 text-gray-700 hover:bg-mint-50 hover:text-mint-600 transition-colors font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
