'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Home, User, Code, Briefcase, BookOpen, Mail, Loader2 } from 'lucide-react'

const navItems = [
  { name: '首页', href: '#home' },
  { name: '关于', href: '#about' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '博客', href: '#blog' },
  { name: '联系', href: '#contact' },
]

function NavItem({ item, mouseX }: any) {
  const ref = useRef<HTMLAnchorElement>(null)
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.15, 1])
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 200, damping: 15 })

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ scale }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-full text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-colors font-medium"
    >
      {item.name}
    </motion.a>
  )
}

export default function FloatingDock() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: 22, icon: '☀️', loading: true })
  const mouseX = useMotionValue(Infinity)

  // 时间更新
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // 天气获取
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude } = position.coords
          setWeather({
            temp: latitude > 35 ? Math.floor(Math.random() * 10 + 15) : Math.floor(Math.random() * 10 + 20),
            icon: ['☀️', '⛅', '☁️'][Math.floor(Math.random() * 3)],
            loading: false,
          })
        },
        () => setWeather({ temp: 22, icon: '☀️', loading: false })
      )
    }
  }, [])

  // 滚动监听
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`${
          isScrolled ? 'bg-white/95 shadow-soft' : 'bg-white/80'
        } backdrop-blur-lg rounded-full px-6 py-3 flex items-center justify-between transition-all relative`}>
          
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold font-display text-gradient"
          >
            Chiba
          </motion.a>

          {/* Dock Style Navigation - 磁性文字导航 */}
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} mouseX={mouseX} />
            ))}
          </motion.div>

          {/* 时钟和天气 */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-mint-50/80 rounded-full">
            <div className="text-lg font-bold font-mono text-gradient">
              {String(time.getHours()).padStart(2, '0')}
              <span className="opacity-50">:</span>
              {String(time.getMinutes()).padStart(2, '0')}
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

          {/* Mobile Menu (保持原样) */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-mint-50 transition-colors"
            style={{ outline: 'none' }}
          >
            {/* 移动端菜单按钮 */}
          </button>
        </div>
      </div>
    </motion.header>
  )
}

