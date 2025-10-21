'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    title: '大学生如何开始学习编程？',
    excerpt: '分享我从零基础到能做项目的学习路线和经验，附带资源推荐',
    date: '2024-01-15',
    readTime: '8 分钟',
    category: '学习经验',
    emoji: '📚',
  },
  {
    title: 'LeetCode 刷题心得分享',
    excerpt: '记录我刷算法题的方法和技巧，包括常见题型总结',
    date: '2024-01-10',
    readTime: '6 分钟',
    category: '算法',
    emoji: '🧮',
  },
  {
    title: '用 Next.js 搭建个人博客',
    excerpt: '从零开始搭建现代化博客的完整教程，适合新手',
    date: '2024-01-05',
    readTime: '10 分钟',
    category: '项目实战',
    emoji: '💻',
  },
]

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="blog" className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-mono mb-4 block">
              05. 学习笔记 📝
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">最新文章</h2>
            <p className="text-gray-400">记录我的学习历程和踩坑经验</p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient Header */}
                <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-6xl filter grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -5, 5, -5, 0],
                        transition: { 
                          rotate: { duration: 0.4 },
                          scale: { type: "spring", stiffness: 300 }
                        }
                      }}
                    >
                      {post.emoji}
                    </motion.span>
                  </div>
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1, x: 5 }}
                  >
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold mb-3 group-hover:text-gradient transition-colors line-clamp-2"
                    whileHover={{ x: 5 }}
                  >
                    {post.title}
                  </motion.h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <motion.span 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, color: "#0ea5e9" }}
                    >
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1, color: "#0ea5e9" }}
                    >
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </motion.span>
                  </div>

                  {/* Read More */}
                  <motion.button 
                    className="flex items-center gap-2 text-sm text-primary-500 group-hover:gap-3 transition-all font-medium"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    阅读更多
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button 
              className="px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                gap: "0.75rem",
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              查看所有文章
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

