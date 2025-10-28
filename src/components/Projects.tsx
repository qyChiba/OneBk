'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className={`card-${project.color} p-8 hover-lift cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">{project.icon}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
