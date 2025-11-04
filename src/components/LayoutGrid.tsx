'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Sparkles, Code, Heart, Zap, Award, BookOpen, X } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Code,
    title: '代码热爱者',
    description: '从初中开始编程，已经写了上千行代码',
    fullContent: '编程不仅是我的技能，更是我的热爱。从第一次写出 Hello World 开始，我就被代码的魅力深深吸引。每当解决一个难题，看到程序成功运行，那种成就感是无可比拟的。',
    color: 'mint',
    emoji: '💻',
    gridClass: 'col-span-2 md:col-span-3 row-span-1', // 左上大横向
  },
  {
    id: 2,
    icon: Sparkles,
    title: '创意无限',
    description: '喜欢尝试新技术和新想法',
    fullContent: '我相信创造力是程序员最重要的能力之一。每个项目都是一次创新的机会，我喜欢探索新的技术栈，尝试不同的解决方案，让每个作品都有独特的亮点。',
    color: 'lemon',
    emoji: '✨',
    gridClass: 'col-span-2 md:col-span-1 row-span-1', // 右上小正方形
  },
  {
    id: 3,
    icon: Heart,
    title: '热爱生活',
    description: '编程之余也享受生活的美好',
    fullContent: '生活不只有代码，还有诗和远方。我喜欢在编程之余听音乐、看书、运动，保持身心健康。平衡的生活让我能够更好地专注于学习和创作。',
    color: 'sky',
    emoji: '💖',
    gridClass: 'col-span-2 md:col-span-1 row-span-1', // 左下小正方形
  },
  {
    id: 4,
    icon: Zap,
    title: '高效学习',
    description: '保持专注，持续进步',
    fullContent: '效率是成功的关键。我善于制定学习计划，使用番茄工作法保持专注。每天坚持学习新知识，积少成多，不断提升自己的技术水平。',
    color: 'mint',
    emoji: '⚡',
    gridClass: 'col-span-2 md:col-span-3 row-span-1', // 右下大横向
  },
]

function Card3D({ feature, index, isInView, onSelect }: any) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const Icon = feature.icon

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${feature.id}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
      } : {}}
      transition={{ 
        delay: index * 0.03, // 减少延迟
        duration: 0.2, // 减少duration
        ease: [0.16, 1, 0.3, 1], // 自定义缓动函数，更流畅
      }}
      whileHover={{ 
        scale: 1.08, 
        z: 50,
        transition: {
          duration: 0.15, // 减少duration
          ease: [0.16, 1, 0.3, 1],
        }
      }}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      className={`${feature.gridClass} card-${feature.color} p-8 cursor-pointer relative overflow-hidden flex flex-col justify-center hardware-accelerate optimize-render`}
    >
      {/* 背景装饰 */}
      <motion.div 
        className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
          willChange: 'transform',
        }}
      />
      
      {/* 图标 */}
      <motion.div
        layoutId={`icon-${feature.id}`}
        className="mb-4 relative z-10"
        style={{
          transform: 'translateZ(20px)',
          willChange: 'transform',
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3, // 减少duration
            repeat: Infinity,
            delay: index * 0.2, // 减少延迟
            ease: 'easeInOut',
          }}
          className="text-5xl"
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {feature.emoji}
        </motion.div>
      </motion.div>

      {/* 内容 */}
      <motion.h3 
        layoutId={`title-${feature.id}`} 
        className="text-xl font-bold font-display mb-2 relative z-10"
        style={{
          transform: 'translateZ(15px)',
          willChange: 'transform',
        }}
      >
        {feature.title}
      </motion.h3>
      <motion.p 
        layoutId={`desc-${feature.id}`} 
        className="text-sm text-gray-600 font-body leading-relaxed relative z-10"
        style={{
          transform: 'translateZ(10px)',
          willChange: 'transform',
        }}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  )
}

export default function LayoutGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selected = features.find(f => f.id === selectedId)

  return (
    <section className="py-24 px-6" ref={ref} style={{ perspective: '1000px' }}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">我的特点</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            点击卡片查看详情 ✨
          </p>
        </motion.div>

        {/* Layout Grid - 仿图片交错布局 */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 auto-rows-[200px] overflow-visible"
        >
          {features.map((feature, index) => (
            <Card3D
              key={feature.id}
              feature={feature}
              index={index}
              isInView={isInView}
              onSelect={() => setSelectedId(feature.id)}
            />
          ))}
        </motion.div>

        {/* 展开的详情弹窗 */}
        {selectedId && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className={`card-${selected.color} p-8 max-w-2xl w-full relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center transition-colors"
                style={{ outline: 'none' }}
              >
                <X className="w-5 h-5 text-gray-700" />
              </motion.button>

              {/* 图标 */}
              <motion.div
                layoutId={`icon-${selectedId}`}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 1 }}
                  className="text-7xl"
                >
                  {selected.emoji}
                </motion.div>
              </motion.div>

              {/* 标题 */}
              <motion.h3
                layoutId={`title-${selectedId}`}
                className="text-3xl font-bold font-display mb-4"
              >
                {selected.title}
              </motion.h3>

              {/* 简短描述 */}
              <motion.p
                layoutId={`desc-${selectedId}`}
                className="text-lg text-gray-600 font-body mb-6"
              >
                {selected.description}
              </motion.p>

              {/* 完整内容 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 rounded-2xl p-6"
              >
                <p className="text-gray-700 font-body leading-relaxed">
                  {selected.fullContent}
                </p>
              </motion.div>

              {/* 底部提示 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-gray-500 text-sm mt-6"
              >
                点击外部或按 ESC 关闭
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

