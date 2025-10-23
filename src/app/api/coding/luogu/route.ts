import { NextResponse } from 'next/server'
import { CODING_PLATFORMS_CONFIG } from '@/config/codingPlatforms'

export async function GET() {
  try {
    const { username } = CODING_PLATFORMS_CONFIG.luogu

    if (!username) {
      return NextResponse.json(
        { error: '请先在 src/config/codingPlatforms.ts 中配置洛谷用户名' },
        { status: 400 }
      )
    }

    // 由于洛谷API可能有访问限制，这里提供一个简化的实现
    // 用户可以手动配置数据，或者等待未来更好的API支持
    
    // 暂时返回提示信息，建议用户手动配置
    return NextResponse.json({
      success: false,
      error: '洛谷API暂时无法访问，请在配置文件中手动填写数据',
      username,
      stats: {
        total: 0,
        easy: 0,
        medium: 0,
        hard: 0,
      },
      recentProblems: [],
      hint: '请在 src/config/codingPlatforms.ts 中将 luogu.enabled 设为 false，并填写 manualData',
    })
  } catch (error: any) {
    console.error('洛谷 API 错误:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '洛谷API访问失败，建议改用手动配置', 
        username: CODING_PLATFORMS_CONFIG.luogu.username 
      },
      { status: 500 }
    )
  }
}

