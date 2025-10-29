'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: '个人博客系统',
    description: '用 Next.js 搭建的全栈博客，支持 Markdown 写作',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    color: 'mint',
    icon: '📝',
  },
  {
    title: 'Todo 管理应用',
    description: '课程作业管理工具，帮助同学们高效完成任务',
    tags: ['React', 'Firebase'],
    color: 'lemon',
    icon: '✅',
  },
  {
    title: 'LeetCode 刷题记录',
    description: '算法学习记录和题解分享，已刷 200+ 题',
    tags: ['算法', 'Python', 'Java'],
    color: 'sky',
    icon: '🧮',
  },
  {
    title: 'AI 聊天助手',
    description: '基于 GPT API 的智能对话助手，学习 AI 应用开发',
    tags: ['AI', 'OpenAI', 'Node.js'],
    color: 'mint',
    icon: '🤖',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">我的项目</span>
          </h2>
          <p className="text-gray-600 font-body text-lg">
            这些是我在学习过程中的实践作品
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isFlipped = flippedCard === index
            
            return (
              <div
                key={project.title}
                className="relative h-96"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.6,
                  }}
                  whileHover={{ y: -12 }}
                  onClick={() => setFlippedCard(isFlipped ? null : index)}
                  className="relative w-full h-full cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* 卡片正面 */}
                    <div
                      className={`absolute inset-0 card-${project.color} p-8 hover-lift group`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
              <div className="flex items-start justify-between mb-6">
                <motion.div 
                  className="text-5xl"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {project.icon}
                </motion.div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors hover-glow"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: -15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors hover-glow"
                  >
                    <Github className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display mb-3">{project.title}</h3>
              <p className="text-gray-600 font-body mb-6 leading-relaxed">
                {project.description}
              </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center text-xs text-gray-500">
                        点击查看详情 →
                      </div>
                    </div>

                    {/* 卡片背面 */}
                    <div
                      className={`absolute inset-0 card-lemon p-8 flex flex-col items-center justify-center text-center`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mb-6"
                      >
                        {project.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold font-display mb-4">
                        项目详情
                      </h3>
                      
                      <p className="text-gray-600 font-body mb-6">
                        查看代码和演示
                      </p>

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-6 py-3 bg-mint-500 text-white rounded-full font-medium flex items-center gap-2"
                          style={{ outline: 'none' }}
                        >
                          <Github className="w-5 h-5" />
                          源代码
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-6 py-3 bg-white border-2 border-mint-400 text-mint-600 rounded-full font-medium flex items-center gap-2"
                          style={{ outline: 'none' }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          在线预览
                        </motion.button>
                      </div>

                      <p className="text-xs text-gray-500 mt-6">
                        点击返回 ←
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
