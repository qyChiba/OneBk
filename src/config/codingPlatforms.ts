// 刷题平台配置文件
// 请在这里填写你在各个平台的用户名

export const CODING_PLATFORMS_CONFIG = {
  // LeetCode 中国版
  leetcode: {
    username: 'feng-qi-you-zhi-5g', // ✅ 已配置
    platform: 'cn', // 'cn' 表示中国版，'com' 表示国际版
    enabled: false, // 改为手动配置
    manualData: {
      total: 0, // TODO: 填写你的LeetCode总题数
      easy: 0,
      medium: 0,
      hard: 0,
      recentProblems: [],
    },
  },

  // Codeforces
  codeforces: {
    username: 'mMike', // ✅ 已配置
    enabled: false, // 改为手动配置
    manualData: {
      total: 0, // TODO: 填写你的Codeforces总题数
      easy: 0,
      medium: 0,
      hard: 0,
      recentProblems: [],
    },
  },

  // 洛谷
  luogu: {
    username: 'sixsixx', // 用户名（用于显示）
    enabled: false, // 洛谷API暂时无法访问，改为手动配置
    manualData: {
      total: 0, // TODO: 填写你在洛谷完成的总题数
      easy: 0,  // TODO: 填写简单题数量
      medium: 0, // TODO: 填写中等题数量
      hard: 0,   // TODO: 填写困难题数量
      recentProblems: [
        // TODO: 手动添加最近完成的题目
        // { title: 'P1001 A+B Problem', difficulty: 'Easy', date: '2024-01-20', status: '✅' },
      ],
    },
  },

  // 蓝桥杯（暂时需要手动配置数据）
  // UID: 3060729 - 可以登录蓝桥杯查看你的刷题记录，然后在下面手动填写
  lanqiao: {
    enabled: false, // 蓝桥杯没有公开API，设为false使用手动数据
    manualData: {
      total: 0, // TODO: 填写你在蓝桥杯完成的总题数
      easy: 0,  // TODO: 填写简单题数量
      medium: 0, // TODO: 填写中等题数量
      hard: 0,   // TODO: 填写困难题数量
      recentProblems: [
        // TODO: 手动添加最近完成的题目
        // { title: '题目名称', difficulty: 'Easy', date: '2024-01-20', status: '✅' },
      ],
    },
  },

  // AtCoder
  atcoder: {
    username: '', // TODO: 如果有 AtCoder 账号，请填写用户名
    enabled: false, // AtCoder没有公开API，暂时设为false
    manualData: {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      recentProblems: [],
    },
  },
}

// 说明：
// 1. 填写 username 后，保存文件即可自动获取数据
// 2. enabled: true 表示启用自动获取（需要平台支持API）
// 3. enabled: false 的平台需要手动填写 manualData
// 4. 蓝桥杯和AtCoder由于没有公开API，需要手动更新数据

