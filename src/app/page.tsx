'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Stats from '@/components/Stats'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DynamicBackground from '@/components/DynamicBackground'
import LoadingAnimation from '@/components/LoadingAnimation'

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <main className="min-h-screen relative">
        <DynamicBackground />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
