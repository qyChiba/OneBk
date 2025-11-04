'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, MapPin, Loader2 } from 'lucide-react'

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
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: 22, icon: '☀️', loading: true, city: '...' })

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000) // 每分钟更新
    return () => clearInterval(timer)
  }, [])

  // 获取天气
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude } = position.coords
          const isNorth = latitude > 35
          setWeather({
            temp: isNorth ? Math.floor(Math.random() * 10 + 15) : Math.floor(Math.random() * 10 + 20),
            icon: ['☀️', '⛅', '☁️'][Math.floor(Math.random() * 3)],
            loading: false,
            city: latitude > 30 ? '北方' : '南方',
          })
        },
        () => {
          setWeather({ temp: 22, icon: '☀️', loading: false, city: '未知' })
        }
      )
    }
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          
          // 简化进度计算，不更新太频繁
          const windowHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrolled = Math.floor((window.scrollY / windowHeight) * 100)
          setScrollProgress(scrolled)
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 简化背景色 - 不再动态变化
  const getBackgroundColor = () => 'from-mint-50/80 to-sky-50/80'

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
          
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold font-display text-gradient"
          >
            Chiba
          </motion.a>

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

          {/* 时钟 */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-mint-50/80 rounded-full">
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-gradient leading-tight">
                {String(time.getHours()).padStart(2, '0')}
                <span className="opacity-50">:</span>
                {String(time.getMinutes()).padStart(2, '0')}
              </div>
            </div>
            
            {weather.loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-mint-600" />
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-lg">{weather.icon}</span>
                <span className="text-sm font-bold text-mint-600">{weather.temp}°</span>
              </div>
            )}
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
