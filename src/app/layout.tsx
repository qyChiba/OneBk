import type { Metadata } from 'next'
import { Poppins, Montserrat, Nunito, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Chiba - 青春创作空间',
  description: '千叶的个人网站 - 一个喜欢写代码的高中生',
  keywords: ['千叶', 'Chiba', '编程', '学习', '项目', '高中生', '技术'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${poppins.variable} ${montserrat.variable} ${nunito.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        
        {/* 51.la 统计代码 */}
        <Script
          id="LA_COLLECT"
          src="//sdk.51.la/js-sdk-pro.min.js"
          strategy="afterInteractive"
          charSet="UTF-8"
        />
        <Script id="la-init" strategy="afterInteractive">
          {`
            LA.init({
              id: "3O6i20SbW4QMR1VL",
              ck: "3O6i20SbW4QMR1VL"
            })
          `}
        </Script>
      </body>
    </html>
  )
}

