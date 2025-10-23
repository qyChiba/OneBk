'use client'

import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Calendar, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CODING_PLATFORMS_CONFIG } from '@/config/codingPlatforms'

// 平台数据类型
interface PlatformData {
  name: string
  icon: string
  color: string
  stats: {
    total: number
    easy: number
    medium: number
    hard: number
  }
  recentProblems: {
    title: string
    difficulty: string
    date: string
    status: string
  }[]
  link: string
  loading?: boolean
  error?: string
}

// 只保留能调用API的平台：Codeforces
const defaultPlatforms: PlatformData[] = [
  {
    name: 'Codeforces',
    icon: '🔴',
    color: 'from-red-500 to-pink-500',
    stats: { total: 0, easy: 0, medium: 0, hard: 0 },
    recentProblems: [],
    link: 'https://codeforces.com',
    loading: true,
  },
]

const difficultyColors = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
}

export default function CodingRecords() {
  const [platforms, setPlatforms] = useState<PlatformData[]>(defaultPlatforms)

  useEffect(() => {
    // Codeforces使用API自动获取
    if (CODING_PLATFORMS_CONFIG.codeforces.username) {
      fetchCodeforces(CODING_PLATFORMS_CONFIG.codeforces.username)
    }
  }, [])

  const [heatmapData, setHeatmapData] = useState<any[]>([])
  const [tagStats, setTagStats] = useState<{ tag: string; count: number }[]>([])
  const [ratingDistribution, setRatingDistribution] = useState<{ range: string; count: number }[]>([])

  const fetchCodeforces = async (username: string) => {
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`
      )
      const data = await response.json()

      if (data.status === 'OK') {
        // 统计通过的题目
        const acSubmissions = data.result.filter((item: any) => item.verdict === 'OK')
        
        // 去重
        const uniqueProblems = new Map()
        const tagCounter = new Map<string, number>()
        const heatmap = new Map<string, number>()
        
        acSubmissions.forEach((item: any) => {
          const problemId = `${item.problem.contestId}-${item.problem.index}`
          const date = new Date(item.creationTimeSeconds * 1000).toISOString().split('T')[0]
          
          // 统计热力图数据
          heatmap.set(date, (heatmap.get(date) || 0) + 1)
          
          if (!uniqueProblems.has(problemId)) {
            uniqueProblems.set(problemId, {
              title: `${item.problem.contestId}${item.problem.index}. ${item.problem.name}`,
              difficulty: item.problem.rating >= 2000 ? 'Hard' : item.problem.rating >= 1400 ? 'Medium' : 'Easy',
              date,
              status: '✅',
              rating: item.problem.rating || 0,
            })
            
            // 统计标签
            if (item.problem.tags) {
              item.problem.tags.forEach((tag: string) => {
                tagCounter.set(tag, (tagCounter.get(tag) || 0) + 1)
              })
            }
          }
        })

        const problems = Array.from(uniqueProblems.values())
        const stats = {
          total: problems.length,
          easy: problems.filter((p: any) => p.rating > 0 && p.rating < 1400).length,
          medium: problems.filter((p: any) => p.rating >= 1400 && p.rating < 2000).length,
          hard: problems.filter((p: any) => p.rating >= 2000).length,
        }

        // 生成最近365天的热力图数据
        const today = new Date()
        const heatmapArray = []
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]
          heatmapArray.push({
            date: dateStr,
            count: heatmap.get(dateStr) || 0,
          })
        }

        // 统计Rating分布
        const ratingDist = [
          { range: '800-1199', count: problems.filter((p: any) => p.rating >= 800 && p.rating < 1200).length },
          { range: '1200-1599', count: problems.filter((p: any) => p.rating >= 1200 && p.rating < 1600).length },
          { range: '1600-1999', count: problems.filter((p: any) => p.rating >= 1600 && p.rating < 2000).length },
          { range: '2000-2399', count: problems.filter((p: any) => p.rating >= 2000 && p.rating < 2400).length },
          { range: '2400+', count: problems.filter((p: any) => p.rating >= 2400).length },
        ]

        // Top 10 标签
        const topTags = Array.from(tagCounter.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([tag, count]) => ({ tag, count }))

        setHeatmapData(heatmapArray)
        setTagStats(topTags)
        setRatingDistribution(ratingDist)

        setPlatforms((prev) =>
          prev.map((p) =>
            p.name === 'Codeforces'
              ? { ...p, stats, recentProblems: problems.slice(0, 3), loading: false }
              : p
          )
        )
      }
    } catch (error) {
      console.error('Codeforces获取失败:', error)
      setPlatforms((prev) =>
        prev.map((p) =>
          p.name === 'Codeforces' ? { ...p, loading: false, error: '获取失败' } : p
        )
      )
    }
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-6xl mb-4"
        >
          🧮
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          刷题记录
        </h2>
        <p className="text-gray-400 text-lg">记录在各大平台的算法学习之旅 🚀</p>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
          <div className="text-3xl font-bold mb-1">
            {platforms.reduce((sum, p) => sum + p.stats.total, 0)}
          </div>
          <div className="text-sm text-gray-400">总题数</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <div className="text-3xl font-bold mb-1">1</div>
          <div className="text-sm text-gray-400">Codeforces</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-blue-400" />
          <div className="text-3xl font-bold mb-1">
            {Math.round(
              (platforms.reduce((sum, p) => sum + p.stats.total, 0) / 365) * 10
            ) / 10}
          </div>
          <div className="text-sm text-gray-400">日均题数</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-400" />
          <div className="text-3xl font-bold mb-1">365</div>
          <div className="text-sm text-gray-400">坚持天数</div>
        </motion.div>
      </motion.div>

      {/* Platform Records */}
      <div className="space-y-8">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-6 md:p-8 hover:bg-white/5 transition-all"
          >
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-4xl"
                >
                  {platform.icon}
                </motion.span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{platform.name}</h3>
                    {platform.loading && (
                      <Loader2 className="w-5 h-5 animate-spin text-primary-400" />
                    )}
                  </div>
                  {platform.error ? (
                    <p className="text-sm text-red-400 mt-1">
                      ⚠️ {platform.error}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-1">
                      {platform.loading ? '正在获取数据...' : `共完成 ${platform.stats.total} 道题目`}
                    </p>
                  )}
                </div>
              </div>
              <motion.a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
              >
                访问平台 →
              </motion.a>
            </div>

            {/* Stats Bar */}
            <div className="mb-6">
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-400">简单</span>
                    <span className="text-gray-400">{platform.stats.easy}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(platform.stats.easy / platform.stats.total) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-yellow-400">中等</span>
                    <span className="text-gray-400">{platform.stats.medium}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(platform.stats.medium / platform.stats.total) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className="h-full bg-yellow-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400">困难</span>
                    <span className="text-gray-400">{platform.stats.hard}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(platform.stats.hard / platform.stats.total) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className="h-full bg-red-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Problems */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">最近完成</h4>
              <div className="space-y-2">
                {platform.recentProblems.map((problem, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + pIndex * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/0 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg">{problem.status}</span>
                      <span className="text-sm font-medium">{problem.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          difficultyColors[problem.difficulty as keyof typeof difficultyColors]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{problem.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 可视化数据区域 - 只在有数据时显示 */}
      {heatmapData.length > 0 && (
        <div className="mt-12 space-y-8">
          {/* 提交热力图 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold">📅 提交热力图</h3>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="inline-grid grid-flow-col gap-1 min-w-max">
                {heatmapData.map((day, index) => {
                  const intensity = day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / 2))
                  const colors = [
                    'bg-white/5',
                    'bg-green-500/30',
                    'bg-green-500/50',
                    'bg-green-500/70',
                    'bg-green-500',
                  ]
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3 + index * 0.001 }}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      className={`w-3 h-3 rounded-sm ${colors[intensity]} transition-all cursor-pointer relative group`}
                      title={`${day.date}: ${day.count} 题`}
                    >
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-20">
                        {day.date}: {day.count} 题
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400">
              <span>少</span>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    ['bg-white/5', 'bg-green-500/30', 'bg-green-500/50', 'bg-green-500/70', 'bg-green-500'][i]
                  }`}
                />
              ))}
              <span>多</span>
            </div>
          </motion.div>

          {/* 题目标签图 */}
          {tagStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-primary-400" />
                <h3 className="text-2xl font-bold">🏷️ 题目标签分布 (Top 10)</h3>
              </div>
              <div className="space-y-3">
                {tagStats.map((tag, index) => {
                  const maxCount = Math.max(...tagStats.map((t) => t.count))
                  const percentage = maxCount > 0 ? (tag.count / maxCount) * 100 : 0
                  const colors = [
                    'from-purple-500 to-pink-500',
                    'from-blue-500 to-cyan-500',
                    'from-green-500 to-emerald-500',
                    'from-yellow-500 to-orange-500',
                    'from-red-500 to-rose-500',
                    'from-indigo-500 to-purple-500',
                    'from-teal-500 to-green-500',
                    'from-orange-500 to-red-500',
                    'from-cyan-500 to-blue-500',
                    'from-pink-500 to-purple-500',
                  ]
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.08 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center text-sm font-bold text-white border border-primary-500/50">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white truncate pr-2">{tag.tag}</span>
                            <span className="text-lg font-bold text-primary-400 flex-shrink-0">{tag.count}</span>
                          </div>
                          <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1.2, delay: 1.6 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                              className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full relative shadow-lg`}
                            >
                              {/* 流动光效 */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                  x: ['-100%', '200%'],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'linear',
                                  repeatDelay: 1,
                                }}
                              />
                              {/* 脉冲效果 */}
                              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all rounded-full" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* 统计信息 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm text-gray-400"
              >
                <span>📊 共 {tagStats.reduce((sum, t) => sum + t.count, 0)} 个标签实例</span>
                <span>🎯 涵盖 {tagStats.length} 种题型</span>
              </motion.div>
            </motion.div>
          )}

          {/* Rating难度概览 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold">📊 难度统计</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {ratingDistribution.map((item, index) => {
                const colors = [
                  { bg: 'from-green-500 to-green-600', text: 'text-green-400' },
                  { bg: 'from-cyan-500 to-cyan-600', text: 'text-cyan-400' },
                  { bg: 'from-yellow-500 to-yellow-600', text: 'text-yellow-400' },
                  { bg: 'from-orange-500 to-orange-600', text: 'text-orange-400' },
                  { bg: 'from-red-500 to-red-600', text: 'text-red-400' },
                ]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="bg-white/5 rounded-2xl p-4 text-center border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className={`text-3xl font-bold mb-2 ${colors[index].text} group-hover:scale-110 transition-transform`}>
                      {item.count}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{item.range}</div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${colors[index].bg} rounded-full`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-12 text-gray-500 text-sm"
      >
        <p>💡 数据会定期更新，记录每一次进步</p>
      </motion.div>
    </div>
  )
}

