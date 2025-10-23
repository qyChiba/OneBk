import { NextResponse } from 'next/server'
import { CODING_PLATFORMS_CONFIG } from '@/config/codingPlatforms'

export async function GET() {
  try {
    const { username, platform } = CODING_PLATFORMS_CONFIG.leetcode

    if (!username) {
      return NextResponse.json(
        { error: '请先在 src/config/codingPlatforms.ts 中配置 LeetCode 用户名' },
        { status: 400 }
      )
    }

    const endpoint =
      platform === 'cn'
        ? 'https://leetcode.cn/graphql'
        : 'https://leetcode.com/graphql'

    const query = `
      query userProfileUserQuestionProgressV2($userSlug: String!) {
        userProfileUserQuestionProgressV2(userSlug: $userSlug) {
          numAcceptedQuestions {
            difficulty
            count
          }
          numFailedQuestions {
            difficulty
            count
          }
          numUntouchedQuestions {
            difficulty
            count
          }
        }
      }
    `

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': platform === 'cn' ? 'https://leetcode.cn' : 'https://leetcode.com',
        'Referer': platform === 'cn' ? `https://leetcode.cn/u/${username}/` : `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify({
        query,
        variables: { userSlug: username },
      }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode API 请求失败: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('LeetCode GraphQL errors:', data.errors)
      throw new Error(data.errors[0].message)
    }

    // 解析数据
    const progressData = data.data?.userProfileUserQuestionProgressV2

    if (!progressData) {
      return NextResponse.json(
        { error: '未找到该用户，请检查用户名是否正确' },
        { status: 404 }
      )
    }

    const acceptedQuestions = progressData.numAcceptedQuestions || []

    // 提取通过的题目数量
    const easyCount = acceptedQuestions.find((item: any) => item.difficulty === 'EASY')?.count || 0
    const mediumCount = acceptedQuestions.find((item: any) => item.difficulty === 'MEDIUM')?.count || 0
    const hardCount = acceptedQuestions.find((item: any) => item.difficulty === 'HARD')?.count || 0

    const stats = {
      total: easyCount + mediumCount + hardCount,
      easy: easyCount,
      medium: mediumCount,
      hard: hardCount,
    }

    // LeetCode API 不方便获取最近提交，暂时提供默认值
    const recentProblems = [
      { title: '最近提交记录需要登录查看', difficulty: 'Medium', date: new Date().toISOString().split('T')[0], status: '✅' },
    ]

    return NextResponse.json({
      success: true,
      username,
      stats,
      recentProblems,
    })
  } catch (error: any) {
    console.error('LeetCode API 错误:', error)
    return NextResponse.json(
      { error: error.message || '获取 LeetCode 数据失败' },
      { status: 500 }
    )
  }
}

