# 创作工作室 - 现代化个人博客

使用最流行的前端技术栈构建的高性能个人博客网站。

## 🚀 技术栈

- **Next.js 14** - React 框架（App Router）
- **React 18** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS
- **Framer Motion** - 动画库
- **Lucide Icons** - 图标库

## ✨ 特性

- ⚡️ 基于 Next.js 14 App Router 的极速性能
- 🎨 使用 Tailwind CSS 的现代化设计
- 🌊 Framer Motion 驱动的流畅动画
- 📱 完全响应式设计
- 🎯 TypeScript 类型安全
- 🔥 热模块替换（HMR）
- 💎 玻璃态 UI 效果
- 🎭 暗色主题
- ♿️ 无障碍访问

## 📦 开始使用

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
creative-blog/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   └── globals.css     # 全局样式
│   └── components/
│       ├── Header.tsx      # 导航栏
│       ├── Hero.tsx        # 首屏
│       ├── About.tsx       # 关于
│       ├── Skills.tsx      # 技能
│       ├── Projects.tsx    # 项目
│       ├── Stats.tsx       # 统计
│       ├── Blog.tsx        # 博客
│       ├── Contact.tsx     # 联系
│       └── Footer.tsx      # 页脚
├── public/                 # 静态资源
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

## 🎨 自定义

### 修改颜色主题

编辑 `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#667eea',  // 主色
  },
  secondary: {
    500: '#764ba2',  // 辅色
  },
}
```

### 修改字体

编辑 `src/app/layout.tsx`:

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})
```

## 📝 内容管理

所有内容都在组件中硬编码。如需使用 CMS：

1. 集成 Contentful、Sanity 或 Strapi
2. 使用 MDX 进行 Markdown 内容管理
3. 连接到 Headless CMS

## 🚀 部署

### Vercel（推荐）

```bash
npx vercel
```

### Netlify

```bash
npm run build
# 部署 .next 文件夹
```

### Docker

```bash
docker build -t creative-blog .
docker run -p 3000:3000 creative-blog
```

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 💬 联系

- 邮箱: hello@creative.studio
- Twitter: @creative_studio
- GitHub: @creative-studio

---

Made with ❤️ using Next.js & Tailwind CSS
