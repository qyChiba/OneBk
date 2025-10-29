'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  color: string
  icon: string
}

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // 自动播放
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="relative">
      {/* 轮播容器 */}
      <div className="relative h-96 overflow-hidden rounded-3xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className={`absolute inset-0 card-${currentProject.color} p-8 flex flex-col items-center justify-center text-center`}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentProject.icon}
            </motion.div>
            
            <h3 className="text-3xl font-bold font-display mb-4">
              {currentProject.title}
            </h3>
            
            <p className="text-gray-600 font-body mb-6 max-w-md">
              {currentProject.description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 控制按钮 */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-soft flex items-center justify-center pointer-events-auto hover:bg-mint-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-soft flex items-center justify-center pointer-events-auto hover:bg-mint-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </motion.button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            whileHover={{ scale: 1.2 }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-mint-500'
                : 'w-2 bg-gray-300 hover:bg-mint-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

