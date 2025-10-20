import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: '小明的代码空间 🚀 | 计算机专业大学生',
  description: '一个热爱编程的计算机专业学生，记录学习、项目和生活',
  keywords: ['编程', '学习', '项目', '大学生', '计算机', '技术博客'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}

