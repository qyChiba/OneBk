'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  animationType?: 'fade' | 'slide' | 'bounce' | 'scale'
}

export default function SplitText({ 
  children, 
  className = '', 
  delay = 0,
  animationType = 'fade'
}: SplitTextProps) {
  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  }

  const getChildVariant = () => {
    switch (animationType) {
      case 'slide':
        return {
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
          hidden: {
            opacity: 0,
            y: 20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
        }
      case 'bounce':
        return {
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              damping: 8,
              stiffness: 200,
            },
          },
          hidden: {
            opacity: 0,
            y: -20,
            scale: 0.8,
          },
        }
      case 'scale':
        return {
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          },
          hidden: {
            opacity: 0,
            scale: 0,
          },
        }
      default: // fade
        return {
          visible: {
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          },
          hidden: {
            opacity: 0,
          },
        }
    }
  }

  const child = getChildVariant()

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

