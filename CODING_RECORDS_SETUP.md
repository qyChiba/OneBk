# 刷题记录功能使用说明

## 🎯 功能说明

本系统支持自动获取以下平台的刷题记录：
- ✅ **LeetCode 中国版** - 自动获取（支持API）
- ✅ **Codeforces** - 自动获取（支持API）
- ✅ **洛谷** - 自动获取（支持API）
- ⚠️ **蓝桥杯** - 手动配置（无公开API）
- ⚠️ **AtCoder** - 手动配置（无公开API）

---

## 📝 配置步骤

### 第一步：打开配置文件

编辑文件：`src/config/codingPlatforms.ts`

### 第二步：填写用户名

```typescript
export const CODING_PLATFORMS_CONFIG = {
  // LeetCode 中国版
  leetcode: {
    username: '你的LeetCode用户名',  // 👈 在这里填写
    platform: 'cn',  // 中国版固定为 'cn'
    enabled: true,   // 保持为 true 启用自动获取
  },

  // Codeforces
  codeforces: {
    username: '你的Codeforces用户名',  // 👈 在这里填写
    enabled: true,  // 保持为 true 启用自动获取
  },

  // 洛谷
  luogu: {
    username: '你的洛谷用户名或UID',  // 👈 在这里填写
    enabled: true,  // 保持为 true 启用自动获取
  },

  // 蓝桥杯（手动配置）
  lanqiao: {
    enabled: false,  // 保持为 false
    manualData: {
      total: 100,     // 👈 填写总题数
      easy: 40,       // 👈 填写简单题数
      medium: 50,     // 👈 填写中等题数
      hard: 10,       // 👈 填写困难题数
      recentProblems: [
        { 
          title: '题目名称', 
          difficulty: 'Easy',  // Easy/Medium/Hard
          date: '2024-01-20',  // 日期格式：YYYY-MM-DD
          status: '✅' 
        },
        // 可以添加更多最近完成的题目...
      ],
    },
  },

  // AtCoder（手动配置）
  atcoder: {
    username: '你的AtCoder用户名',  // 仅用于显示
    enabled: false,  // 保持为 false
    manualData: {
      total: 50,      // 👈 填写总题数
      easy: 20,       // 👈 填写简单题数
      medium: 25,     // 👈 填写中等题数
      hard: 5,        // 👈 填写困难题数
      recentProblems: [
        { 
          title: 'ABC 280 A - Problem', 
          difficulty: 'Easy', 
          date: '2024-01-20', 
          status: '✅' 
        },
        // 可以添加更多...
      ],
    },
  },
}
```

### 第三步：保存并刷新

1. 保存配置文件 `src/config/codingPlatforms.ts`
2. 如果开发服务器正在运行，它会自动重新加载
3. 打开浏览器访问网站，点击"刷题记录"卡片
4. 系统会自动获取已配置平台的数据

---

## 🔍 如何获取用户名

### LeetCode 中国版
1. 访问：https://leetcode.cn
2. 登录你的账号
3. 点击右上角头像 → 进入个人主页
4. 浏览器地址栏中 `/u/` 后面的就是你的用户名
   - 例如：`https://leetcode.cn/u/qyChiba` → 用户名是 `qyChiba`

### Codeforces
1. 访问：https://codeforces.com
2. 登录你的账号
3. 点击右上角用户名 → 进入个人主页
4. 浏览器地址栏中 `/profile/` 后面的就是你的用户名
   - 例如：`https://codeforces.com/profile/tourist` → 用户名是 `tourist`

### 洛谷
1. 访问：https://www.luogu.com.cn
2. 登录你的账号
3. 点击右上角头像 → 进入个人主页
4. 浏览器地址栏中 `/user/` 后面的就是你的UID或用户名
   - 例如：`https://www.luogu.com.cn/user/123456` → 填写 `123456`

---

## 💡 常见问题

### Q1: 为什么有些平台显示"获取失败"？

**原因可能有：**
- 用户名填写错误
- 该用户的个人资料未公开
- 网络连接问题
- API访问限制

**解决方法：**
1. 检查用户名是否正确（区分大小写）
2. 确保你的个人资料是公开的
3. 等待几分钟后重新打开页面
4. 查看浏览器控制台的错误信息

### Q2: 如何更新手动配置的数据（蓝桥杯、AtCoder）？

直接编辑 `src/config/codingPlatforms.ts` 文件中的 `manualData` 部分，保存后刷新页面即可。

### Q3: 数据多久更新一次？

- **自动获取的平台**：每次打开刷题记录弹窗时都会重新获取最新数据
- **手动配置的平台**：需要手动编辑配置文件更新

### Q4: 能否添加更多平台？

可以！按照现有模式在以下文件中添加：
1. `src/config/codingPlatforms.ts` - 添加配置
2. `src/app/api/coding/[platform]/route.ts` - 创建API路由（如果有API）
3. `src/components/CodingRecords.tsx` - 添加到 defaultPlatforms 数组

### Q5: 为什么LeetCode的最近题目没有显示难度？

LeetCode的GraphQL API在提交记录中不直接返回题目难度，需要额外请求。目前简化处理为统一显示 "Medium"。你可以手动调整代码来获取完整难度信息。

---

## 🛠️ 高级配置

### 禁用某个平台

如果你不想显示某个平台，可以将 `enabled` 设置为 `false`：

```typescript
leetcode: {
  username: '',
  platform: 'cn',
  enabled: false,  // 👈 设为 false 禁用
},
```

### 使用LeetCode国际版

将 `platform` 改为 `'com'`：

```typescript
leetcode: {
  username: '你的用户名',
  platform: 'com',  // 👈 改为 'com' 使用国际版
  enabled: true,
},
```

---

## 📞 需要帮助？

如果遇到问题：
1. 检查浏览器控制台的错误信息
2. 确认用户名填写正确
3. 查看各平台是否能正常访问
4. 检查网络连接

---

## ✨ 示例配置

完整示例（已填写虚拟数据）：

```typescript
export const CODING_PLATFORMS_CONFIG = {
  leetcode: {
    username: 'qyChiba',
    platform: 'cn',
    enabled: true,
  },

  codeforces: {
    username: 'qyChiba',
    enabled: true,
  },

  luogu: {
    username: '123456',
    enabled: true,
  },

  lanqiao: {
    enabled: false,
    manualData: {
      total: 85,
      easy: 30,
      medium: 40,
      hard: 15,
      recentProblems: [
        { title: '成绩统计', difficulty: 'Easy', date: '2024-01-15', status: '✅' },
        { title: '递增序列', difficulty: 'Medium', date: '2024-01-14', status: '✅' },
      ],
    },
  },

  atcoder: {
    username: 'qyChiba',
    enabled: false,
    manualData: {
      total: 125,
      easy: 50,
      medium: 55,
      hard: 20,
      recentProblems: [
        { title: 'ABC 280 A - Parity', difficulty: 'Easy', date: '2024-01-12', status: '✅' },
      ],
    },
  },
}
```

---

**祝你刷题愉快！🎉**

