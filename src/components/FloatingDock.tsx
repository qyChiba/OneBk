'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Home, User, Code, Briefcase, BookOpen, Mail, Loader2, RefreshCw } from 'lucide-react'

const navItems = [
  { name: '首页', href: '#home' },
  { name: '关于', href: '#about' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '博客', href: '#blog' },
  { name: '联系', href: '#contact' },
]

const quotes = [
  { text: '代码改变世界，热爱点亮生活', author: 'Chiba' },
  { text: '每一行代码都是成长的足迹', author: 'Chiba' },
  { text: 'Keep coding, keep smiling!', author: 'Chiba' },
  { text: '永远保持好奇心和学习的热情', author: 'Chiba' },
  { text: '用创造力让想法成为现实', author: 'Chiba' },
  { text: '今天的努力，是明天的惊喜', author: 'Chiba' },
]

function NavItem({ item, mouseX }: any) {
  const ref = useRef<HTMLAnchorElement>(null)
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.15, 1])
  const scale = useSpring(scaleSync, { 
    mass: 0.05, 
    stiffness: 600, 
    damping: 30 
  })

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ 
        scale,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="px-4 py-2 rounded-full text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-colors font-medium whitespace-nowrap hardware-accelerate optimize-render"
    >
      {item.name}
    </motion.a>
  )
}

export default function FloatingDock() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [time, setTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: 22, icon: '☀️', loading: true })
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
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

  // 滚动监听 - 优化性能
  useEffect(() => {
    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          rafId = null
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 换一换语录
  const refreshQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
      setIsRefreshing(false)
    }, 300)
  }



  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.3, // 减少duration
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      } hardware-accelerate optimize-render`}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className={`${
          isScrolled ? 'bg-white/95 shadow-soft' : 'bg-white/80'
        } backdrop-blur-lg rounded-full px-3 md:px-4 lg:px-6 py-2.5 md:py-3 flex items-center gap-2 md:gap-3 lg:gap-4 transition-all relative`}>
          
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-bold font-display text-gradient hardware-accelerate optimize-render"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            Chiba
          </motion.a>

          {/* Dock Style Navigation - 磁性文字导航 */}
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="hidden lg:flex items-center gap-2 hardware-accelerate optimize-render"
            style={{ transform: 'translateZ(0)' }}
          >
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} mouseX={mouseX} />
            ))}
          </motion.div>

          {/* 每日一言 - 直接嵌入菜单 */}
          <div
            className="hidden md:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-sky-50/80 rounded-full flex-1 min-w-[200px] max-w-full hardware-accelerate optimize-render"
          >
            <div className="flex-1 overflow-hidden">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{
                  duration: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap text-center"
                style={{ 
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
              >
                {quotes[currentQuote].text}
              </motion.div>
            </div>
            <motion.button
              onClick={refreshQuote}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 hover:bg-sky-100 rounded-full transition-colors flex-shrink-0 ml-1 hardware-accelerate optimize-render"
              title="换一句"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
              transition={{
                duration: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                  repeat: isRefreshing ? Infinity : 0,
                }}
                style={{ 
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                <RefreshCw className="w-3 h-3 md:w-3.5 md:h-3.5 text-sky-600" />
              </motion.div>
            </motion.button>
          </div>

          {/* 时钟和天气 */}
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-mint-50/80 rounded-full flex-shrink-0">
            <div className="text-sm md:text-base font-bold font-mono text-gradient">
              {String(time.getHours()).padStart(2, '0')}
              <span className="opacity-50">:</span>
              {String(time.getMinutes()).padStart(2, '0')}
            </div>
            
            {weather.loading ? (
              <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin text-mint-600" />
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-base md:text-lg">{weather.icon}</span>
                <span className="text-xs md:text-sm font-bold text-mint-600">{weather.temp}°</span>
              </div>
            )}
          </div>

          {/* Mobile Menu (保持原样) */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-mint-50 transition-colors flex-shrink-0"
            style={{ outline: 'none' }}
          >
            {/* 移动端菜单按钮 */}
          </button>
        </div>
      </div>
    </motion.header>
  )
}

