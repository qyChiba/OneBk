# 🚀 免费部署指南

## 方案一：Vercel 部署（推荐）

### 1. 准备工作
- 确保项目在本地运行正常：`npm run dev`
- 确保所有依赖已安装：`npm install`

### 2. 创建 GitHub 仓库
```bash
# 在项目根目录执行
git init
git add .
git commit -m "Initial commit: 个人博客项目"
```

然后到 GitHub 创建新仓库，并推送代码：
```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 3. 部署到 Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 保持默认设置，点击 "Deploy"
6. 等待部署完成（通常 2-3 分钟）选哟

### 4. 获取免费域名
- Vercel 会自动分配一个免费域名：`你的项目名.vercel.app`
- 可以随时在 Vercel 控制台修改项目名称

---

## 方案二：Netlify 部署

### 1. 构建项目
```bash
npm run build
```

### 2. 部署步骤
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 选择 "Deploy manually" 或连接 GitHub
4. 上传 `out` 文件夹（需要先配置静态导出）

### 3. 配置静态导出
在 `next.config.js` 中添加：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

---

## 方案三：GitHub Pages

### 1. 配置静态导出
修改 `next.config.js`：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/你的仓库名',
  assetPrefix: '/你的仓库名/'
}
```

### 2. 构建和部署
```bash
npm run build
# 将 out 文件夹内容复制到仓库根目录
```

---

## 🎯 推荐方案：Vercel

**优势：**
- ✅ 完美支持 Next.js
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署（Git 推送触发）
- ✅ 免费额度充足
- ✅ 支持自定义域名

**免费额度：**
- 100GB 带宽/月
- 无限静态网站
- 100 个 Serverless 函数
- 完全够用

---

## 🔧 部署后优化

### 1. 性能优化
- 图片优化：使用 Next.js Image 组件
- 代码分割：自动处理
- 缓存策略：自动配置

### 2. SEO 优化
- 在 `layout.tsx` 中完善 meta 信息
- 添加 sitemap.xml
- 配置 robots.txt

### 3. 监控和分析
- 集成 Google Analytics
- 使用 Vercel Analytics
- 配置错误监控

---

## 📝 常见问题

### Q: 部署后样式丢失？
A: 检查 Tailwind CSS 配置，确保生产环境正确构建

### Q: 动画效果不工作？
A: 确保 Framer Motion 在客户端正确加载

### Q: 如何更新内容？
A: 直接修改代码并推送到 GitHub，Vercel 会自动重新部署

### Q: 可以绑定自定义域名吗？
A: 可以，在 Vercel 控制台添加自定义域名即可

---

## 🎉 完成！

部署成功后，你就拥有了一个：
- 🌐 全球可访问的个人博客
- 🚀 高性能的现代化网站  
- 📱 完美响应式设计
- 🔄 自动部署更新

**免费域名示例：** `your-blog-name.vercel.app`
