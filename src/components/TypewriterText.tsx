'use client'

import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'

interface TypewriterTextProps {
  texts: string[]
  className?: string
}

export default function TypewriterText({ texts, className = '' }: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = texts[currentIndex]
    let charIndex = 0

    const typeText = () => {
      if (charIndex < text.length) {
        setCurrentText(text.substring(0, charIndex + 1))
        charIndex++
        setTimeout(typeText, 100)
      } else {
        setTimeout(() => {
          eraseText()
        }, 2000)
      }
    }

    const eraseText = () => {
      if (charIndex > 0) {
        setCurrentText(text.substring(0, charIndex - 1))
        charIndex--
        setTimeout(eraseText, 50)
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }
    }

    // 文字出现动画
    animate(textRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      ease: 'out(expo)'
    })

    typeText()
  }, [currentIndex, texts])

  return (
    <div ref={textRef} className={`font-mono ${className}`}>
      {currentText}
      <span className="inline-block w-0.5 h-6 bg-primary-400 ml-1 animate-pulse" />
    </div>
  )
}

