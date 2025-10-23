# 刷题记录自动更新脚本使用说明

## 📝 功能说明

这个脚本可以自动获取你在各个平台的**完整刷题记录**，包括：
- ✅ 所有题目名称
- ✅ 题目难度
- ✅ 完成日期
- ✅ 题目链接
- ✅ 自动统计和分类

## 🚀 使用步骤

### 第一步：获取Cookie

#### **1. LeetCode 中国版**

1. 打开浏览器，访问 https://leetcode.cn
2. 登录你的账号
3. 按 `F12` 打开开发者工具
4. 切换到 `Network`（网络）标签
5. 刷新页面（F5）
6. 点击任意一个请求
7. 在右侧找到 `Request Headers`（请求标头）
8. 找到 `Cookie:` 这一行
9. 复制整行Cookie值（很长的一串文本）

示例：
```
csrftoken=abc123...; LEETCODE_SESSION=xyz789...
```

#### **2. 洛谷**

1. 访问 https://www.luogu.com.cn
2. 登录你的账号
3. 按 `F12` 打开开发者工具
4. 切换到 `Application`（应用）标签
5. 左侧展开 `Cookies` → `https://www.luogu.com.cn`
6. 找到并复制 `_uid` 和 `__client_id` 的值
7. 组合成：`_uid=1553610; __client_id=482c3f8a22bfe06e35bf2981842d9c1837ec8195`

#### **3. Codeforces**

Codeforces 不需要Cookie，只需要用户名。

#### **4. 蓝桥杯**

1. 访问 https://www.lanqiao.cn
2. 登录你的账号
3. 按 `F12` 打开开发者工具
4. 按照上述方法获取Cookie

### 第二步：配置Cookie

1. 复制 `scripts/cookies.example.json` 为 `scripts/cookies.json`
   ```bash
   cp scripts/cookies.example.json scripts/cookies.json
   ```

2. 编辑 `scripts/cookies.json`，填入你的Cookie：
   ```json
   {
     "leetcode": "csrftoken=abc123...; LEETCODE_SESSION=xyz789...",
     "codeforces": {
       "username": "mMike"
     },
     "luogu": "_uid=123456; __client_id=abc123...",
     "lanqiao": "sessionid=xxx; csrftoken=yyy"
   }
   ```

3. **⚠️ 重要：** 将 `cookies.json` 添加到 `.gitignore`，防止泄露

### 第三步：运行脚本

```bash
# 进入OneBk目录
cd OneBk

# 运行脚本
node scripts/update-coding-records.js
```

### 第四步：查看结果

脚本会生成 `src/data/coding-records.json`，包含所有刷题记录：

```json
{
  "leetcode": {
    "platform": "LeetCode",
    "stats": {
      "total": 450,
      "easy": 180,
      "medium": 220,
      "hard": 50
    },
    "problems": [
      {
        "id": "1",
        "title": "两数之和",
        "difficulty": "Easy",
        "solvedAt": "2024-01-20",
        "link": "https://leetcode.cn/problems/two-sum/"
      },
      // ... 更多题目
    ],
    "updateTime": "2024-01-20T10:30:00.000Z"
  },
  "codeforces": {
    // Codeforces 数据
  }
}
```

### 第五步：更新网站

1. 提交更新后的数据：
   ```bash
   git add src/data/coding-records.json
   git commit -m "更新刷题记录"
   git push
   ```

2. 网站会自动部署并显示最新数据

---

## 📅 更新频率建议

- **每月更新一次**即可（刷题数据不需要实时更新）
- Cookie 通常 7-30 天过期，需要重新获取

---

## ⚠️ 注意事项

### 1. **Cookie 安全**
- ❌ **永远不要**将 `cookies.json` 提交到 Git
- ✅ 已在 `.gitignore` 中添加
- ✅ Cookie 只保存在你的本地电脑

### 2. **请求频率**
- 脚本会自动控制请求速度
- 避免频繁运行（建议间隔至少1小时）
- 过于频繁可能被平台限流

### 3. **Cookie 过期**
- Cookie 会定期过期
- 如果脚本报错，先尝试重新获取Cookie
- 不同平台过期时间不同

### 4. **网络问题**
- 确保能正常访问各个平台
- 如果在国外，可能需要调整endpoint

---

## 🔧 故障排查

### 问题1：`未找到 cookies.json 文件`
**解决**：复制 `cookies.example.json` 为 `cookies.json` 并填写Cookie

### 问题2：`Cookie已过期` 或 `未授权`
**解决**：重新登录平台并获取新的Cookie

### 问题3：`API返回错误`
**解决**：
1. 检查网络连接
2. 确认Cookie是否正确
3. 等待一段时间后重试

### 问题4：`获取的数据为空`
**解决**：
1. 确认你的账号有刷题记录
2. 检查用户名是否正确
3. 查看控制台的详细错误信息

---

## 📊 数据格式说明

生成的 `coding-records.json` 格式：

```typescript
{
  [platform: string]: {
    platform: string;        // 平台名称
    stats: {
      total: number;         // 总题数
      easy: number;          // 简单题数
      medium: number;        // 中等题数
      hard: number;          // 困难题数
    };
    problems: Array<{
      id: string;            // 题目ID
      title: string;         // 题目名称
      difficulty: string;    // 难度
      solvedAt: string;      // 完成日期
      link?: string;         // 题目链接
      rating?: number;       // 题目难度值（某些平台）
      tags?: string[];       // 题目标签
    }>;
    updateTime: string;      // 更新时间
  }
}
```

---

## 🎯 下一步

运行脚本后，网站会自动：
1. 读取 `src/data/coding-records.json`
2. 在刷题记录页面展示完整列表
3. 支持按平台、难度、日期筛选
4. 显示题目链接，可直接跳转

---

## 💡 高级用法

### 只更新特定平台

编辑脚本，注释掉不需要的平台：

```javascript
// results.leetcode = await fetchLeetCodeRecords(cookies.leetcode);
results.codeforces = await fetchCodeforcesRecords(cookies.codeforces.username);
// results.luogu = await fetchLuoguRecords(cookies.luogu);
```

### 自动定时更新

创建定时任务（cron job）：

```bash
# Linux/Mac
0 0 * * 0 cd /path/to/OneBk && node scripts/update-coding-records.js

# Windows 任务计划程序
# 设置每周日0点运行脚本
```

---

## 📞 需要帮助？

如果遇到问题：
1. 检查Cookie是否正确
2. 查看控制台错误信息
3. 确认网络连接正常
4. 尝试重新获取Cookie

---

**准备好了就运行脚本吧！🚀**

