'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Button3DProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
}

export default function Button3D({ 
  children, 
  onClick, 
  href,
  className = '',
  variant = 'primary'
}: Button3DProps) {
  const variants = {
    primary: {
      base: 'from-primary-500 via-accent-sky to-accent-cyan',
      shadow: 'shadow-primary-500/50',
    },
    secondary: {
      base: 'from-secondary-500 via-accent-orange to-accent-yellow',
      shadow: 'shadow-secondary-500/50',
    },
    accent: {
      base: 'from-accent-emerald via-accent-teal to-accent-cyan',
      shadow: 'shadow-accent-cyan/50',
    },
  }

  const colors = variants[variant]

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`
        relative group px-8 py-4 rounded-xl font-bold
        bg-gradient-to-r ${colors.base}
        shadow-lg ${colors.shadow}
        transform-gpu
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={{
        y: -5,
        scale: 1.05,
        rotateX: -10,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        },
      }}
      whileTap={{
        scale: 0.95,
        y: 0,
        rotateX: 0,
        transition: {
          type: 'spring',
          stiffness: 600,
          damping: 30,
        },
      }}
    >
      {/* 按钮顶部 */}
      <span
        className="relative z-10 flex items-center justify-center gap-2"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </span>

      {/* 按钮侧面（3D 效果） */}
      <div
        className={`
          absolute inset-0 rounded-xl
          bg-gradient-to-b ${colors.base}
          opacity-70
        `}
        style={{
          transform: 'translateZ(-10px)',
          filter: 'brightness(0.7)',
        }}
      />

      {/* 按钮底面阴影 */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-black/40 blur-md"
        style={{
          transform: 'translateZ(-15px) translateY(10px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 光晕效果 */}
      <motion.div
        className={`
          absolute inset-0 rounded-xl
          bg-gradient-to-r ${colors.base}
          opacity-0 group-hover:opacity-50
          blur-xl
        `}
        style={{
          transform: 'translateZ(-20px)',
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </Component>
  )
}

