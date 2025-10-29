'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import SkillRadar from '@/components/SkillRadar'
import Projects from '@/components/Projects'
import Stats from '@/components/Stats'
import ProgressTracker from '@/components/ProgressTracker'
import Timeline from '@/components/Timeline'
import DailyQuote from '@/components/DailyQuote'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SoftBackground from '@/components/SoftBackground'
import LoadingAnimation from '@/components/LoadingAnimation'
import BackToTop from '@/components/BackToTop'
import EasterEggs from '@/components/EasterEggs'
import ClickParticles from '@/components/ClickParticles'
import SecretCode from '@/components/SecretCode'
import SoundEasterEgg from '@/components/SoundEasterEgg'
import MouseTrail from '@/components/MouseTrail'
import GradientLight from '@/components/GradientLight'
import MoodSwitcher from '@/components/MoodSwitcher'
import ScrollProgress from '@/components/ScrollProgress'
import ParticleEngine from '@/components/ParticleEngine'

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <main className="min-h-screen relative">
        {/* 背景层 - 光影效果 */}
        <SoftBackground />
        <GradientLight />
        <ParticleEngine />
        
        {/* 页面内容 */}
        <Header />
        <Hero />
        <DailyQuote />
        <About />
        <Skills />
        <SkillRadar />
        <Projects />
        <Stats />
        <ProgressTracker />
        <Timeline />
        <Contact />
        <Footer />
        
        {/* 交互层 */}
        <ScrollProgress />
        <MouseTrail />
        <BackToTop />
        <MoodSwitcher />
        
        {/* 彩蛋系统 */}
        <EasterEggs />
        <ClickParticles />
        <SecretCode />
        <SoundEasterEgg />
      </main>
    </>
  )
}
