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
    gradient: 'from-purple-500 to-pink-500',
    emoji: '📝',
  },
  {
    title: 'Todo 管理应用',
    description: '课程作业管理工具，帮助同学们高效完成任务',
    tags: ['React', 'Firebase'],
    gradient: 'from-blue-500 to-cyan-500',
    emoji: '✅',
  },
  {
    title: 'LeetCode 刷题记录',
    description: '算法学习记录和题解分享，已刷 200+ 题',
    tags: ['算法', 'Python', 'Java'],
    gradient: 'from-orange-500 to-red-500',
    emoji: '🧮',
  },
  {
    title: 'AI 聊天助手',
    description: '基于 GPT API 的智能对话助手，学习 AI 应用开发',
    tags: ['AI', 'OpenAI', 'Node.js'],
    gradient: 'from-green-500 to-emerald-500',
    emoji: '🤖',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              03. 我的项目 🚀
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">做过的东西</h2>
            <p className="text-gray-400">学习过程中的实践项目</p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className={`relative h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center"
                    >
                      <div className="text-6xl">{project.emoji}</div>
                    </motion.div>
                  </div>
                  
                  {/* Overlay Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-white/5 rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

