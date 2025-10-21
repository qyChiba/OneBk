'use client'

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

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 多层动画背景 */}
      <ParticleBackground />
      <StarField />
      <GeometricShapes />
      <WaveBackground />
      <FloatingElements />
      <RotatingCube />
      
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

