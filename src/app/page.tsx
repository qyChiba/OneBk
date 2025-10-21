'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Stats from '@/components/Stats'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import FloatingElements from '@/components/FloatingElements'
import WaveBackground from '@/components/WaveBackground'
import StarField from '@/components/StarField'
import GeometricShapes from '@/components/GeometricShapes'
import RotatingCube from '@/components/RotatingCube'
import { detectPerformance, type PerformanceConfig } from '@/lib/performanceConfig'

export default function Home() {
  const [perfConfig, setPerfConfig] = useState<PerformanceConfig | null>(null)

  useEffect(() => {
    setPerfConfig(detectPerformance())
  }, [])

  // 服务端渲染时显示加载状态
  if (!perfConfig) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Blog />
        <Contact />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 根据性能配置条件渲染动画背景 */}
      {perfConfig.enableParticles && <ParticleBackground />}
      {perfConfig.enableStarField && <StarField />}
      {perfConfig.enableGeometricShapes && <GeometricShapes />}
      {perfConfig.enableWaveBackground && <WaveBackground />}
      {perfConfig.enableFloatingElements && <FloatingElements />}
      {perfConfig.enableRotatingCube && <RotatingCube />}
      
      {/* 页面内容 */}
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}

