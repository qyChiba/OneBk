'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Copy, Check } from 'lucide-react'

const codeSnippets = [
  {
    language: 'JavaScript',
    code: `console.log("Hello, World! 👋");
// 我的第一行代码
function sayHi() {
  return "嗨！我是千叶";
}`,
    icon: '📜',
  },
  {
    language: 'React',
    code: `function MyComponent() {
  return (
    <div>
      <h1>Hello React! ⚛️</h1>
    </div>
  )
}`,
    icon: '⚛️',
  },
  {
    language: 'CSS',
    code: `.beautiful {
  background: linear-gradient(
    135deg, 
    #2dd4bf, 
    #38bdf8
  );
  animation: shine 2s infinite;
}`,
    icon: '🎨',
  },
]

export default function InteractiveCodeBlock() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [output, setOutput] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRun = () => {
    setOutput(`✨ ${codeSnippets[activeTab].language} 代码运行中...`)
    setTimeout(() => {
      setOutput(`✅ 运行成功！${codeSnippets[activeTab].icon}`)
    }, 1000)
    setTimeout(() => setOutput(''), 3000)
  }

  return (
    <div className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            <span className="text-gradient">代码展示</span>
          </h2>
          <p className="text-gray-600 font-body">
            互动式代码编辑器 💻
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* 标签页 */}
          <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-200">
            {codeSnippets.map((snippet, index) => (
              <motion.button
                key={snippet.language}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === index
                    ? 'bg-mint-500 text-white shadow-soft'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                style={{ outline: 'none' }}
              >
                <span className="mr-2">{snippet.icon}</span>
                {snippet.language}
              </motion.button>
            ))}
          </div>

          {/* 代码区域 */}
          <div className="relative">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 font-mono text-sm text-gray-800 overflow-x-auto bg-gradient-to-br from-mint-50 to-sky-50"
            >
              {codeSnippets[activeTab].code}
            </motion.pre>

            {/* 操作按钮 */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/80 rounded-lg hover:bg-white shadow-soft"
                style={{ outline: 'none' }}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </motion.button>

              <motion.button
                onClick={handleRun}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 shadow-soft"
                style={{ outline: 'none' }}
              >
                <Play className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* 输出区域 */}
          {output && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 bg-gray-50 px-6 py-4 font-mono text-sm"
            >
              {output}
            </motion.div>
          )}
        </div>

        <p className="text-center text-gray-500 mt-6 font-body text-sm">
          💡 点击运行按钮或复制代码试试
        </p>
      </div>
    </div>
  )
}

