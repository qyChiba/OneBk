'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Twitter, Linkedin, Sparkles, Zap, Heart, Upload } from 'lucide-react'
import TypewriterText from './TypewriterText'
import Text3D from './Text3D'
import Button3D from './Button3D'
import Card3D from './Card3D'

export default function Hero() {
  const [customAvatar, setCustomAvatar] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 加载自定义头像
  useEffect(() => {
    const saved = localStorage.getItem('customAvatar')
    if (saved) {
      setCustomAvatar(saved)
    }
  }, [])

  // 处理文件上传并压缩
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          
          // 设置最大尺寸（头像使用较小尺寸）
          const maxSize = 512
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
          if (compressedDataUrl.length > 300000) { // 约 300KB
            alert('图片太大，请选择更小的图片')
            return
          }
          
          try {
            setCustomAvatar(compressedDataUrl)
            localStorage.setItem('customAvatar', compressedDataUrl)
          } catch (error) {
            alert('图片保存失败，请选择更小的图片')
            console.error('保存头像失败:', error)
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  // 删除头像
  const handleRemoveAvatar = () => {
    setCustomAvatar('')
    localStorage.removeItem('customAvatar')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Main Title with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Text3D 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient-neon"
                  depth={3}
                  color="#4a9ec7"
                >
                  千叶
                </Text3D>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 sm:mt-6 text-slate-300 font-normal leading-relaxed">
                  Dawn is coming
                  <br />
                  Open your eyes
                </p>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <TypewriterText 
                  texts={[
                    '一个喜欢写代码的高中生 💻',
                    '在这里记录学习和生活 ✨',
                    '热爱编程，享受创造的乐趣 🚀',
                    '永远保持好奇心 ⭐'
                  ]}
                  className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 bg-primary-400/20 rounded-full text-primary-300">
                    💻 编程
                  </span>
                  <span className="px-3 py-1 bg-secondary-400/20 rounded-full text-secondary-300">
                    📚 学习
                  </span>
                  <span className="px-3 py-1 bg-accent-cyan/20 rounded-full text-accent-cyan">
                    🎮 游戏
                  </span>
                </div>
              </motion.div>

              {/* Interactive Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6"
              >
                {[
                  { value: '2年', label: '学编程', emoji: '💻' },
                  { value: '10+', label: '小项目', emoji: '🚀' },
                  { value: '∞', label: '想做的', emoji: '⭐' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-center p-3 sm:p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">
                      {stat.emoji}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button3D href="#projects" variant="primary">
                  <Zap className="w-5 h-5" />
                  我做过的
                  <ArrowRight className="w-5 h-5" />
                </Button3D>
                <Button3D href="#contact" variant="secondary">
                  <Heart className="w-5 h-5" />
                  联系我
                </Button3D>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Interactive Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <Card3D className="w-full h-[400px] lg:h-[500px]" maxRotation={10}>
                <div className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden">
                  <div className="h-full flex flex-col justify-center items-center space-y-6">
                    {/* Avatar with 3D effect and upload button */}
                    <div className="relative group">
                      <motion.div 
                        className="w-32 h-32 rounded-full border-4 border-primary-400/30 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{
                          rotateY: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <img 
                          src={customAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Chiba&backgroundColor=00d4ff,22d3ee"}
                          alt="千叶头像"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      {/* Upload button - appears on hover */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <motion.button
                          onClick={() => fileInputRef.current?.click()}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-2 py-1 text-xs bg-primary-500 hover:bg-primary-600 rounded-full flex items-center gap-1 transition-colors shadow-lg"
                          title="上传头像"
                        >
                          <Upload className="w-3 h-3" />
                          <span>上传</span>
                        </motion.button>
                        {customAvatar && (
                          <motion.button
                            onClick={handleRemoveAvatar}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
                            title="删除头像"
                          >
                            删除
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Floating 3D Elements */}
                    <motion.div 
                      className="absolute top-8 right-8 w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden"
                      style={{ transform: 'translateZ(30px)' }}
                      animate={{
                        y: [0, -20, 0],
                        rotateZ: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <span className="text-2xl">💻</span>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-8 left-8 w-12 h-12 bg-secondary-400/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden"
                      style={{ transform: 'translateZ(40px)' }}
                      animate={{
                        y: [0, 15, 0],
                        rotateZ: [0, -15, 15, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <span className="text-xl">🚀</span>
                    </motion.div>

                    <motion.div 
                      className="absolute top-1/2 -right-4 w-8 h-8 bg-primary-400/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden"
                      style={{ transform: 'translateZ(50px)' }}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <span className="text-sm">✨</span>
                    </motion.div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 mt-16"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group w-14 h-14 glass-strong rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                title={social.label}
              >
                <social.icon className="w-6 h-6 group-hover:text-primary-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary-400/50 rounded-full p-1 neon-glow"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary-400 rounded-full mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

