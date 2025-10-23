import { NextResponse } from 'next/server'
import { CODING_PLATFORMS_CONFIG } from '@/config/codingPlatforms'

export async function GET() {
  try {
    const { username } = CODING_PLATFORMS_CONFIG.codeforces

    if (!username) {
      return NextResponse.json(
        { error: '请先在 src/config/codingPlatforms.ts 中配置 Codeforces 用户名' },
        { status: 400 }
      )
    }

    // 获取用户提交记录
    const response = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=100`
    )

    if (!response.ok) {
      throw new Error(`Codeforces API 请求失败: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(data.comment || 'Codeforces API 返回错误')
    }

    // 统计通过的题目
    const acSubmissions = data.result.filter((item: any) => item.verdict === 'OK')

    // 去重（同一题目只计数一次）
    const uniqueProblems = new Map()
    acSubmissions.forEach((item: any) => {
      const problemId = `${item.problem.contestId}-${item.problem.index}`
      if (!uniqueProblems.has(problemId)) {
        uniqueProblems.set(problemId, item)
      }
    })

    // 根据rating分类难度
    const problemsByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    }

    uniqueProblems.forEach((item: any) => {
      const rating = item.problem.rating || 0
      if (rating < 1400) {
        problemsByDifficulty.easy++
      } else if (rating < 2000) {
        problemsByDifficulty.medium++
      } else {
        problemsByDifficulty.hard++
      }
    })

    const stats = {
      total: uniqueProblems.size,
      easy: problemsByDifficulty.easy,
      medium: problemsByDifficulty.medium,
      hard: problemsByDifficulty.hard,
    }

    // 获取最近通过的3道题
    const recentProblems = Array.from(uniqueProblems.values())
      .slice(0, 3)
      .map((item: any) => {
        const rating = item.problem.rating || 0
        let difficulty = 'Medium'
        if (rating < 1400) difficulty = 'Easy'
        else if (rating >= 2000) difficulty = 'Hard'

        return {
          title: `${item.problem.contestId}${item.problem.index}. ${item.problem.name}`,
          difficulty,
          date: new Date(item.creationTimeSeconds * 1000).toISOString().split('T')[0],
          status: '✅',
        }
      })

    return NextResponse.json({
      success: true,
      username,
      stats,
      recentProblems,
    })
  } catch (error: any) {
    console.error('Codeforces API 错误:', error)
    return NextResponse.json(
      { error: error.message || '获取 Codeforces 数据失败' },
      { status: 500 }
    )
  }
}

