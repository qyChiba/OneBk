'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LogoEasterEgg() {
  const [clicks, setClicks] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const handleClick = () => {
    setClicks((prev) => prev + 1)
    
    if (clicks >= 6) {
      setShowSecret(true)
      setTimeout(() => {
        setShowSecret(false)
        setClicks(0)
      }, 3000)
    }
  }

  return (
    <>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer select-none relative"
      >
        <motion.span
          animate={clicks > 3 ? {
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold font-display text-gradient"
        >
          Chiba
        </motion.span>

        {/* 点击次数提示 */}
        {clicks > 0 && clicks < 7 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-mint-500 text-white rounded-full flex items-center justify-center text-xs"
          >
            {clicks}
          </motion.div>
        )}
      </motion.div>

      {/* 秘密消息 */}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setShowSecret(false)
            setClicks(0)
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="card-mint p-12 text-center max-w-md"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold font-display text-gradient mb-4">
              恭喜你发现了彩蛋！
            </h3>
            <p className="text-gray-600 font-body text-lg mb-6">
              感谢你的好奇心！<br />
              继续探索会有更多惊喜哦 ✨
            </p>
            <div className="text-4xl">
              {['🌟', '💫', '✨', '🎨', '🚀'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="inline-block mx-2"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-6">点击任意处关闭</p>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

