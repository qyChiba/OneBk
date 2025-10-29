'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterEffectProps {
  texts: string[]
  className?: string
  speed?: number
}

export default function TypewriterEffect({ 
  texts, 
  className = '',
  speed = 100 
}: TypewriterEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]
    
    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === text.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      }, speed / 2)
      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false)
      setCurrentTextIndex((currentTextIndex + 1) % texts.length)
    }
  }, [currentIndex, isDeleting, currentTextIndex, texts, speed])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  )
}

