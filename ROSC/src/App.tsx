import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CommonBuilds } from './components/CommonBuilds'
import { About } from './components/About'
import { Work } from './components/Work'
import { Capabilities } from './components/Capabilities'
import { ClientMarquee } from './components/ClientMarquee'
import { HowWeWork } from './components/HowWeWork'
import { WhyUs } from './components/WhyUs'
import { FinePrint } from './components/FinePrint'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
import { SVGFilters } from './components/SVGFilters'

// Brand Kit Motion Defaults
export const MOTION = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    default: 0.35,
    slow: 0.5,
    reveal: 0.45,
    marquee: 20
  },
  ease: {
    primary: 'power2.out',
    emphatic: 'power2.out',
    playful: 'back.out(1.1)',
    smooth: 'power2.out',
    brandReturn: 'power2.out',
    natural: 'power2.inOut'
  },
  stagger: {
    default: 0.06,
    fast: 0.04,
    slow: 0.1
  },
  distance: {
    small: 15,
    medium: 25,
    large: 35
  }
}

// Brand Kit Colors
export const COLORS = {
  void: '#050505',
  oled: '#090909',
  white: '#fefefe',
  warmWhite: '#faf9f7',
  laser: '#17f7f7',
  alabaster: '#d5dada',
  nickel: '#737373'
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after content loads
      ScrollTrigger.refresh()
    }
  }, [isLoading])

  return (
    <>
      <SVGFilters />
      {isLoading && <Preloader />}

      <div ref={mainRef} className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Header />
        <main>
          <Hero />
          <CommonBuilds />
          <About />
          <Work />
          <Capabilities />
          <ClientMarquee />
          <HowWeWork />
          <WhyUs />
          <FinePrint />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
