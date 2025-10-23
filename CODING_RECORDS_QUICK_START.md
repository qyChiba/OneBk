# 刷题记录自动获取 - 快速开始指南

## 🎯 这个脚本能做什么？

**自动获取你在各个平台刷过的所有题目**，包括：
- 📝 题目名称
- 🏆 题目难度
- 📅 完成日期
- 🔗 题目链接

**支持平台**：LeetCode、Codeforces、洛谷、蓝桥杯

---

## ⚡ 3分钟快速开始

### 步骤1：获取Cookie（最重要！）

#### **LeetCode** - 2分钟
1. 打开 https://leetcode.cn 并登录
2. 按 `F12` 打开开发者工具
3. 点击 `Network`（网络）标签
4. 刷新页面（`F5`）
5. 点击任意请求
6. 在右侧找到 `Cookie:` 开头的一行
7. **复制整行**（很长）

<details>
<summary>📷 点击查看截图示例</summary>

```
开发者工具 (F12)
  ↓
Network 标签
  ↓
刷新页面 (F5)
  ↓
点击任意请求
  ↓
Request Headers
  ↓
Cookie: csrftoken=abc123...; LEETCODE_SESSION=xyz789...
       ↑ 复制这整行
```
</details>

#### **Codeforces** - 不需要Cookie
只需要用户名：`mMike`

#### **洛谷** - 同样方法
访问 https://www.luogu.com.cn 并复制Cookie

### 步骤2：配置文件

```bash
# 复制模板
cp scripts/cookies.example.json scripts/cookies.json

# 编辑文件
nano scripts/cookies.json  # 或用任何编辑器
```

填入你的Cookie：
```json
{
  "leetcode": "你复制的LeetCode Cookie",
  "codeforces": {
    "username": "mMike"
  },
  "luogu": "你复制的洛谷 Cookie",
  "lanqiao": "你复制的蓝桥杯 Cookie"
}
```

### 步骤3：运行脚本

```bash
cd OneBk
node scripts/update-coding-records.js
```

### 步骤4：查看结果

脚本会生成 `src/data/coding-records.json`，包含所有题目！

---

## 📊 输出示例

```json
{
  "codeforces": {
    "platform": "Codeforces",
    "stats": {
      "total": 180,
      "easy": 70,
      "medium": 80,
      "hard": 30
    },
    "problems": [
      {
        "id": "1234-A",
        "name": "Watermelon",
        "rating": 800,
        "tags": ["math", "greedy"],
        "solvedAt": "2024-01-20",
        "link": "https://codeforces.com/problemset/problem/1234/A"
      },
      // ... 更多题目
    ]
  }
}
```

---

## ⚠️ 重要提示

### ✅ 安全
- Cookie 只保存在**你的电脑上**
- **永远不会**上传到 GitHub
- 已添加到 `.gitignore`

### 🔄 更新频率
- **建议：每月运行一次**
- Cookie 通常 7-30 天过期
- 过期后重新获取即可

### 🚫 不要做
- ❌ 不要频繁运行（可能被限流）
- ❌ 不要把 Cookie 分享给别人
- ❌ 不要提交 `cookies.json` 到 Git

---

## 🔧 常见问题

### Q: Cookie 在哪里？
**A**: 开发者工具（F12） → Network → 刷新页面 → 点击任意请求 → Request Headers → Cookie

### Q: Cookie 多久过期？
**A**: 通常 7-30 天，过期后重新获取即可

### Q: 运行报错怎么办？
**A**: 
1. 检查 Cookie 是否正确（最常见）
2. 重新获取 Cookie
3. 查看错误信息，可能是网络问题

### Q: 可以只更新部分平台吗？
**A**: 可以！只填写需要更新的平台的 Cookie

---

## 📝 完整文档

详细说明请查看：`scripts/README.md`

---

## 🎉 完成后

运行脚本后，你的网站会自动显示：
- ✅ 所有刷过的题目列表
- ✅ 按平台分类
- ✅ 支持筛选和搜索
- ✅ 显示详细统计

**现在就试试吧！** 🚀

---

## 💡 提示

如果你觉得获取 Cookie 太复杂，也可以：
1. 手动统计题目数量
2. 在配置文件中填写
3. 不运行脚本

但脚本能帮你：
- 📋 **自动统计所有题目**（几百道）
- 🎯 **准确无误**
- ⚡ **只需几秒钟**

值得一试！

