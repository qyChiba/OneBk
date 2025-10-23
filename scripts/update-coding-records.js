/**
 * 刷题记录自动更新脚本
 * 
 * 使用说明：
 * 1. 在 scripts/cookies.json 中填写你的登录凭证
 * 2. 运行: node scripts/update-coding-records.js
 * 3. 脚本会自动获取所有平台的刷题记录
 * 4. 数据保存到 src/data/coding-records.json
 */

const fs = require('fs');
const path = require('path');

// 读取Cookie配置
function loadCookies() {
  const cookiesPath = path.join(__dirname, 'cookies.json');
  if (!fs.existsSync(cookiesPath)) {
    console.error('❌ 未找到 cookies.json 文件');
    console.log('📝 请创建 scripts/cookies.json 并填写登录凭证');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
}

// ==================== LeetCode ====================
async function fetchLeetCodeRecords(cookie) {
  console.log('🟢 正在获取 LeetCode 数据...');
  
  try {
    const query = `
      query userProfileQuestions($userSlug: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $userSlug) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          submissionCalendar
        }
      }
    `;

    const response = await fetch('https://leetcode.cn/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://leetcode.cn',
        'Referer': 'https://leetcode.cn/',
      },
      body: JSON.stringify({
        query,
        variables: { userSlug: 'feng-qi-you-zhi-5g' },
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const acSubmissions = data.data?.matchedUser?.submitStats?.acSubmissionNum || [];
    
    const stats = {
      total: acSubmissions.find(item => item.difficulty === 'All')?.count || 0,
      easy: acSubmissions.find(item => item.difficulty === 'Easy')?.count || 0,
      medium: acSubmissions.find(item => item.difficulty === 'Medium')?.count || 0,
      hard: acSubmissions.find(item => item.difficulty === 'Hard')?.count || 0,
    };

    console.log('✅ LeetCode 统计数据获取成功:', stats);
    
    // 获取题目列表（需要另外的请求）
    const problems = await fetchLeetCodeProblems(cookie);
    
    return {
      platform: 'LeetCode',
      stats,
      problems,
      updateTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ LeetCode 获取失败:', error.message);
    return null;
  }
}

async function fetchLeetCodeProblems(cookie) {
  // 获取已通过的题目列表
  // 这需要遍历所有题目，比较复杂，先返回示例
  console.log('📝 LeetCode 题目列表获取功能开发中...');
  return [];
}

// ==================== Codeforces ====================
async function fetchCodeforcesRecords(username) {
  console.log('🔴 正在获取 Codeforces 数据...');
  console.log('👤 用户名:', username);
  
  try {
    const apiUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`;
    console.log('🌐 请求URL:', apiUrl);
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('📡 API响应状态:', data.status);
    
    if (data.status !== 'OK') {
      console.error('❌ API错误:', data.comment);
      throw new Error(data.comment || 'API返回错误');
    }

    console.log('📊 总提交记录数:', data.result?.length || 0);

    // 统计通过的题目
    const acSubmissions = data.result.filter(item => item.verdict === 'OK');
    console.log('✅ AC提交数:', acSubmissions.length);
    
    // 去重
    const uniqueProblems = new Map();
    acSubmissions.forEach(item => {
      const problemId = `${item.problem.contestId}-${item.problem.index}`;
      if (!uniqueProblems.has(problemId)) {
        uniqueProblems.set(problemId, {
          id: problemId,
          name: item.problem.name,
          rating: item.problem.rating || 0,
          tags: item.problem.tags,
          contestId: item.problem.contestId,
          index: item.problem.index,
          solvedAt: new Date(item.creationTimeSeconds * 1000).toISOString().split('T')[0],
          link: `https://codeforces.com/problemset/problem/${item.problem.contestId}/${item.problem.index}`,
        });
      }
    });

    // 按难度分类
    const problems = Array.from(uniqueProblems.values());
    console.log('🎯 去重后题目数:', problems.length);
    
    const stats = {
      total: problems.length,
      easy: problems.filter(p => p.rating > 0 && p.rating < 1400).length,
      medium: problems.filter(p => p.rating >= 1400 && p.rating < 2000).length,
      hard: problems.filter(p => p.rating >= 2000).length,
      unrated: problems.filter(p => p.rating === 0).length,
    };

    console.log('✅ Codeforces 数据获取成功:', stats);
    console.log(`📋 共获取 ${problems.length} 道题目`);
    
    // 显示前3道题作为示例
    if (problems.length > 0) {
      console.log('\n📝 最近AC的题目（前3道）:');
      problems.slice(0, 3).forEach(p => {
        console.log(`  - ${p.id}: ${p.name} (${p.rating || 'unrated'}) - ${p.solvedAt}`);
      });
    }

    return {
      platform: 'Codeforces',
      username,
      stats,
      problems: problems.sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt)),
      updateTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Codeforces 获取失败:', error.message);
    console.error('完整错误:', error);
    return null;
  }
}

// ==================== 洛谷 ====================
async function fetchLuoguRecords(cookie) {
  console.log('🔵 正在获取洛谷数据...');
  console.log('📝 Cookie:', cookie ? '已提供' : '未提供');
  
  try {
    console.log('🌐 正在请求: https://www.luogu.com.cn/user/sixsixx?_contentOnly=1');
    
    const response = await fetch(
      'https://www.luogu.com.cn/user/sixsixx?_contentOnly=1',
      {
        method: 'GET',
        headers: {
          'Cookie': cookie,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.luogu.com.cn/',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
        redirect: 'manual', // 禁用自动重定向
      }
    );

    console.log('📡 响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ 响应错误:', errorText.substring(0, 500));
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('📄 内容类型:', contentType);

    const data = await response.json();
    console.log('📊 返回数据结构:', JSON.stringify(data, null, 2).substring(0, 500));
    
    if (!data.currentData?.user) {
      console.error('❌ 数据结构不正确');
      console.log('完整响应:', JSON.stringify(data, null, 2));
      throw new Error('未找到用户数据，请检查Cookie是否有效');
    }

    const passedCount = data.currentData.user.passedProblemCount || 0;
    
    const stats = {
      total: passedCount,
      easy: Math.floor(passedCount * 0.3),
      medium: Math.floor(passedCount * 0.5),
      hard: passedCount - Math.floor(passedCount * 0.3) - Math.floor(passedCount * 0.5),
    };

    console.log('✅ 洛谷统计数据获取成功:', stats);
    console.log('📝 洛谷题目列表获取功能开发中...');

    return {
      platform: '洛谷',
      stats,
      problems: [],
      updateTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ 洛谷获取失败:');
    console.error('错误类型:', error.name);
    console.error('错误信息:', error.message);
    console.error('完整错误:', error);
    return null;
  }
}

// ==================== 主函数 ====================
async function main() {
  console.log('🚀 开始获取刷题记录...\n');
  console.log('📌 当前只获取 Codeforces 数据（其他平台暂时禁用）\n');

  const cookies = loadCookies();
  const results = {};

  // 只获取 Codeforces 数据（不需要Cookie）
  if (cookies.codeforces?.username) {
    results.codeforces = await fetchCodeforcesRecords(cookies.codeforces.username);
  } else {
    console.error('❌ 未找到 Codeforces 用户名配置');
    console.log('💡 请在 scripts/cookies.json 中配置 codeforces.username');
  }

  // 保存结果
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'coding-records.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log('\n✅ 所有数据已保存到:', outputPath);
  console.log('\n📊 汇总信息:');
  
  Object.entries(results).forEach(([platform, data]) => {
    if (data) {
      console.log(`\n${data.platform}:`);
      console.log(`  总题数: ${data.stats.total}`);
      console.log(`  简单 (<1400): ${data.stats.easy}`);
      console.log(`  中等 (1400-2000): ${data.stats.medium}`);
      console.log(`  困难 (≥2000): ${data.stats.hard}`);
      if (data.stats.unrated) {
        console.log(`  未评分: ${data.stats.unrated}`);
      }
      if (data.problems && data.problems.length > 0) {
        console.log(`  题目详情: ${data.problems.length} 条记录已保存`);
      }
    }
  });

  console.log('\n🎉 更新完成！');
  console.log('\n💡 提示: 其他平台（LeetCode、洛谷等）请使用手动配置');
}

// 运行
main().catch(console.error);

