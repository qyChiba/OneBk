# 51.la 统计配置说明

## 📊 关于 51.la

51.la 是国内知名的网站统计分析服务，提供实时访问统计、来源分析、地域分布等功能。

## 🚀 快速配置

### 1. 注册 51.la 账号

访问 [51.la官网](https://www.51.la/) 注册账号并登录。

### 2. 创建统计站点

- 登录后进入管理后台
- 点击「新增站点」
- 填写网站信息（网站名称、网址等）
- 选择「JS-SDK Pro」版本（推荐）
- 创建成功后获取 `ID` 和 `CK`

### 3. 配置项目

打开 `src/app/layout.tsx` 文件，找到以下代码：

```typescript
LA.init({
  id: "YOUR_51LA_ID",    // 替换为你的 ID
  ck: "YOUR_51LA_CK"     // 替换为你的 CK
})
```

将 `YOUR_51LA_ID` 和 `YOUR_51LA_CK` 替换为你在51.la后台获取的实际值。

### 示例

```typescript
LA.init({
  id: "JqLTZxEa1abcDEFG",
  ck: "JqLTZxEa1abcDEFG"
})
```

## 🔍 验证配置

### 本地测试

```bash
npm run dev
```

访问 http://localhost:3000，打开浏览器控制台：
- 如果配置正确，控制台应该没有与 LA 相关的错误
- 在 Network 标签中应该能看到 51.la 的请求

### 在线验证

部署后访问你的网站：
- 登录 51.la 后台
- 查看「实时访客」功能
- 应该能看到你的访问记录

## ⚙️ 高级配置（可选）

### 环境变量配置

为了更好地管理配置，可以使用环境变量：

1. 在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_51LA_ID=你的ID
NEXT_PUBLIC_51LA_CK=你的CK
```

2. 修改 `src/app/layout.tsx`：

```typescript
const LA_ID = process.env.NEXT_PUBLIC_51LA_ID;
const LA_CK = process.env.NEXT_PUBLIC_51LA_CK;

// 在 Script 中使用
<Script id="la-init" strategy="afterInteractive">
  {`
    if (typeof LA !== 'undefined') {
      LA.init({
        id: "${LA_ID}",
        ck: "${LA_CK}"
      })
    }
  `}
</Script>
```

3. 将 `.env.local` 添加到 `.gitignore`（已包含）

### Vercel 部署配置

在 Vercel 项目设置中：
1. 进入 Settings -> Environment Variables
2. 添加环境变量：
   - `NEXT_PUBLIC_51LA_ID`: 你的ID
   - `NEXT_PUBLIC_51LA_CK`: 你的CK

## 📈 功能特性

51.la 统计提供以下功能：

- ✅ 实时访客监控
- ✅ 访问来源分析
- ✅ 地域分布统计
- ✅ 页面热度分析
- ✅ 访客行为追踪
- ✅ 设备类型统计
- ✅ 搜索引擎来源

## 🔐 隐私说明

- 统计代码仅收集匿名访问数据
- 不会收集用户敏感信息
- 符合网络安全和隐私保护要求

## 🆘 常见问题

### Q: 为什么看不到统计数据？

A: 检查以下几点：
1. ID 和 CK 是否正确配置
2. 网站是否成功部署
3. 是否在 51.la 后台开启了统计
4. 浏览器是否开启了广告拦截

### Q: 本地开发环境会被统计吗？

A: 是的，localhost 的访问也会被统计。如果不希望统计本地访问，可以：

```typescript
// 仅在生产环境启用统计
{process.env.NODE_ENV === 'production' && (
  <>
    <Script
      id="LA_COLLECT"
      src="//sdk.51.la/js-sdk-pro.min.js"
      strategy="afterInteractive"
      charSet="UTF-8"
    />
    <Script id="la-init" strategy="afterInteractive">
      {`
        LA.init({
          id: "YOUR_51LA_ID",
          ck: "YOUR_51LA_CK"
        })
      `}
    </Script>
  </>
)}
```

### Q: 影响网站性能吗？

A: 不会。使用了 `strategy="afterInteractive"` 策略，确保统计脚本在页面可交互后异步加载，不会阻塞页面渲染。

## 📚 相关链接

- [51.la 官网](https://www.51.la/)
- [51.la 使用文档](https://www.51.la/help/)
- [Next.js Script 组件文档](https://nextjs.org/docs/app/api-reference/components/script)

---

配置完成后记得重启开发服务器：`npm run dev`
