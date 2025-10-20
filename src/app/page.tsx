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

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
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

