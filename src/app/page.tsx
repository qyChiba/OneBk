'use client'

import dynamic from 'next/dynamic'
import FloatingDock from '@/components/FloatingDock'
import Hero from '@/components/Hero'
import About from '@/components/About'
import SoftBackground from '@/components/SoftBackground'
import LoadingAnimation from '@/components/LoadingAnimation'

// 懒加载非关键组件
// const DailyQuote = dynamic(() => import('@/components/DailyQuote')) // 已移至菜单栏
const LayoutGrid = dynamic(() => import('@/components/LayoutGrid'))
const ScrollVelocity = dynamic(() => import('@/components/ScrollVelocity'))
const InteractiveCodeBlock = dynamic(() => import('@/components/InteractiveCodeBlock'))
const Skills = dynamic(() => import('@/components/Skills'))
const SkillRadar = dynamic(() => import('@/components/SkillRadar'))
const ExpandableCards = dynamic(() => import('@/components/ExpandableCards'))
const Projects = dynamic(() => import('@/components/Projects'))
const Stats = dynamic(() => import('@/components/Stats'))
const ProgressTracker = dynamic(() => import('@/components/ProgressTracker'))
const Timeline = dynamic(() => import('@/components/Timeline'))
const Blog = dynamic(() => import('@/components/Blog'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

// 交互层组件 - 优化加载
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'))
const MouseTrail = dynamic(() => import('@/components/MouseTrail'))
const GradientLight = dynamic(() => import('@/components/GradientLight'))
const ParticleEngine = dynamic(() => import('@/components/ParticleEngine'))
const BackToTop = dynamic(() => import('@/components/BackToTop'))

// 彩蛋系统已移除

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <main className="min-h-screen relative animation-container">
        {/* 背景层 - 极简模式，禁用重型效果 */}
        <SoftBackground />
        {/* <GradientLight /> 禁用以提升滚动性能 */}
        {/* <ParticleEngine /> 禁用以提升滚动性能 */}
        
        {/* 页面内容 - 性能优化容器 */}
        <div className="optimize-render">
          <FloatingDock />
          <Hero />
          {/* <DailyQuote /> 已移至菜单栏，不再在此处显示 */}
          <About />
          <LayoutGrid />
          <ScrollVelocity />
          <InteractiveCodeBlock />
          <Skills />
          <SkillRadar />
          <ExpandableCards />
          <Projects />
          <Stats />
          <ProgressTracker />
          <Timeline />
          <Blog />
          <Contact />
          <Footer />
        </div>
        
        {/* 交互层 - 优化性能 */}
        <div className="hardware-accelerate optimize-render">
          <ScrollProgress />
          {/* <MouseTrail /> 禁用以提升滚动性能 */}
          <BackToTop />
        </div>
        
        {/* 彩蛋系统已移除 */}
      </main>
    </>
  )
}
