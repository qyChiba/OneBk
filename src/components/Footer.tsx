'use client'

import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gradient mb-4">小明的代码空间 🚀</h3>
              <p className="text-gray-400 mb-4">
                一个正在成长的程序员，持续学习中...
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">导航</h4>
              <ul className="space-y-2">
                {['首页', '关于', '作品', '博客', '联系'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">学习内容</h4>
              <ul className="space-y-2">
                {['前端开发', '算法', '后端', 'AI 应用'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} 小明. 一个正在学习的大学生 🎓
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              用 <Heart className="w-4 h-4 text-red-500" /> 和 Next.js 制作
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

