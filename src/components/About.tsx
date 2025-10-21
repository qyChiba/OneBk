'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import CharacterReveal from './CharacterReveal'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [customImage, setCustomImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 动态统计数据
  const [runningTime, setRunningTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [visitCount, setVisitCount] = useState(0)
  const [todayVisits, setTodayVisits] = useState(0)

  // 网站启动时间（设置为今天零点）
  const startDate = new Date(new Date().setHours(0, 0, 0, 0))

  // 更新运行时间
  useEffect(() => {
    const updateRunningTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setRunningTime({ days, hours, minutes, seconds })
    }

    updateRunningTime()
    const timer = setInterval(updateRunningTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // 访问量统计 - 页面加载时只计数一次
  useEffect(() => {
    const hasCountedThisSession = sessionStorage.getItem('hasCountedVisit')
    
    if (!hasCountedThisSession) {
      // 总访问量
      const totalVisits = localStorage.getItem('totalVisits')
      const currentCount = totalVisits ? parseInt(totalVisits) : 0
      const newCount = currentCount + 1
      localStorage.setItem('totalVisits', newCount.toString())
      setVisitCount(newCount)

      // 今日访问量
      const today = new Date().toDateString()
      const lastVisitDate = localStorage.getItem('lastVisitDate')
      const todayVisitsCount = localStorage.getItem('todayVisits')

      if (lastVisitDate === today) {
        const count = todayVisitsCount ? parseInt(todayVisitsCount) : 0
        const newTodayCount = count + 1
        localStorage.setItem('todayVisits', newTodayCount.toString())
        setTodayVisits(newTodayCount)
      } else {
        localStorage.setItem('lastVisitDate', today)
        localStorage.setItem('todayVisits', '1')
        setTodayVisits(1)
      }
      
      // 标记本次会话已计数
      sessionStorage.setItem('hasCountedVisit', 'true')
    } else {
      // 只读取不增加
      const totalVisits = localStorage.getItem('totalVisits')
      setVisitCount(totalVisits ? parseInt(totalVisits) : 0)
      
      const todayVisitsCount = localStorage.getItem('todayVisits')
      setTodayVisits(todayVisitsCount ? parseInt(todayVisitsCount) : 0)
    }
  }, [])

  // 加载自定义图片
  useEffect(() => {
    const saved = localStorage.getItem('aboutImage')
    if (saved) {
      setCustomImage(saved)
    }
  }, [])

  // 处理文件上传并压缩
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请上传图片文件')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.onload = () => {
          // 创建 canvas 进行压缩
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // 设置最大尺寸
          const maxSize = 800
          let width = img.width
          let height = img.height
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height
              height = maxSize
            }
          }
          
          canvas.width = width
          canvas.height = height
          ctx?.drawImage(img, 0, 0, width, height)
          
          // 压缩图片
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)
          
          // 检查压缩后的大小
          if (compressedDataUrl.length > 500000) { // 约 500KB
            alert('图片太大，请选择更小的图片')
            return
          }
          
          try {
            setCustomImage(compressedDataUrl)
            localStorage.setItem('aboutImage', compressedDataUrl)
          } catch (error) {
            alert('图片保存失败，请选择更小的图片')
            console.error('保存图片失败:', error)
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  // 删除图片
  const handleRemoveImage = () => {
    setCustomImage('')
    localStorage.removeItem('aboutImage')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={item} className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              01. 关于我 🙋‍♂️
            </span>
            {isInView && (
              <CharacterReveal className="text-4xl md:text-5xl font-bold mb-4">
                我的故事
              </CharacterReveal>
            )}
            <p className="text-gray-400 max-w-2xl mx-auto">
              一个热爱编程的计算机专业大学生，喜欢折腾各种技术
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={item} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                嗨！👋 我是千叶，一个喜欢写代码的高中生。从初中开始接触编程，到现在已经两年了。
              </p>
              <p className="text-gray-400 leading-relaxed">
                平时喜欢做一些小项目、刷刷题，偶尔写写学习笔记。觉得用代码创造东西很有趣，虽然经常遇到 bug，但解决问题的感觉很棒！
              </p>

              {/* 动态统计 - 网站运行时间和访问量 */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                {/* 网站运行时间 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="glass-strong rounded-xl p-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl"></div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-300">
                    <span className="text-lg">🚀</span>
                    网站已运行
                  </h4>
                  <div className="grid grid-cols-4 gap-2 relative z-10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400 font-mono">{runningTime.days}</div>
                      <div className="text-xs text-slate-400 mt-1">天</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-400 font-mono">{runningTime.hours}</div>
                      <div className="text-xs text-slate-400 mt-1">时</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-cyan font-mono">{runningTime.minutes}</div>
                      <div className="text-xs text-slate-400 mt-1">分</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-orange font-mono">{runningTime.seconds}</div>
                      <div className="text-xs text-slate-400 mt-1">秒</div>
                    </div>
                  </div>
                </motion.div>

                {/* 访问量统计 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="glass-strong rounded-xl p-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl"></div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-300">
                    <span className="text-lg">👀</span>
                    访问统计
                  </h4>
                  <div className="grid grid-cols-2 gap-3 relative z-10">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">总访问量</div>
                      <div className="text-2xl font-bold text-gradient font-mono">{visitCount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">今日访问</div>
                      <div className="text-2xl font-bold text-gradient-warm font-mono">{todayVisits}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Expertise Tags */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4">我在学 📚</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    '前端开发 💻',
                    '算法题 🧮',
                    '做小项目 🚀',
                    'Python 🐍',
                    'JavaScript 📜',
                    '瞎折腾 🎨',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div variants={item} className="relative">
              <div className="aspect-square glass rounded-3xl relative overflow-hidden group">
                {/* 背景图片或默认渐变 */}
                {customImage ? (
                  <img 
                    src={customImage} 
                    alt="自定义图片" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:scale-110 transition-transform duration-500" />
                )}
                
                {/* 上传按钮 - 悬停时显示 */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <motion.button
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                    title="上传图片"
                  >
                    <Upload className="w-4 h-4" />
                    <span>上传图片</span>
                  </motion.button>
                  {customImage && (
                    <motion.button
                      onClick={handleRemoveImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-lg"
                      title="删除图片"
                    >
                      删除
                    </motion.button>
                  )}
                </div>

                {/* Center Icon - 只在没有自定义图片时显示 */}
                {!customImage && (
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-48 h-48 rounded-full border-2 border-white/20 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl font-bold"
                      >
                        创
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* Corner Decorations */}
                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/20 z-10" />
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/20 z-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

