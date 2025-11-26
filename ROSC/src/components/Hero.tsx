import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PrismScene } from './PrismScene'
import { MOTION } from '../App'

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Animate badges
    if (badgesRef.current) {
      tl.from(badgesRef.current.children, {
        y: -20,
        opacity: 0,
        stagger: MOTION.stagger.fast,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    }

    // Animate title
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: MOTION.distance.large,
        opacity: 0,
        duration: MOTION.duration.slow,
        ease: MOTION.ease.smooth
      }, '-=0.2')
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: MOTION.distance.medium,
        opacity: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      }, '-=0.3')
    }

    // Animate CTAs
    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: MOTION.distance.small,
        opacity: 0,
        stagger: MOTION.stagger.fast,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      }, '-=0.2')
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between px-4 md:px-8 lg:px-12 pt-20 pb-8 overflow-hidden"
    >
      {/* PrismScene Background - Full screen canvas */}
      <div className="absolute inset-0">
        <PrismScene />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/50 pointer-events-none z-[1]" />

      {/* Top Badges */}
      <div className="relative z-10 text-center pt-16">
        <div ref={badgesRef} className="flex justify-center items-center gap-4 flex-wrap">
          <span className="magnetic-badge hero-badge">Metric-Obsessed</span>
          <span className="magnetic-badge hero-badge">Zero Bloat</span>
          <span className="magnetic-badge hero-badge">100% IP Ownership</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center py-12">
        <h1
          ref={titleRef}
          className="hero-title text-[32px] md:text-[48px] lg:text-[64px] xl:text-[72px] font-bold tracking-[-0.03em] leading-[1.1] text-white max-w-4xl mx-auto"
        >
          We build it. You own it. It just works.
        </h1>
        <p
          ref={subtitleRef}
          className="hero-subtitle text-[14px] md:text-[16px] text-white/70 mt-8 max-w-2xl mx-auto leading-relaxed"
        >
          We're a small studio that builds apps, websites, and workflows for teams who'd rather focus on their business than manage engineers. You bring the idea. We handle everything tech and make it beautiful.
        </p>
        <p className="text-[12px] text-white/50 mt-4">
          Come to us when you have a problem worth solving. We'll figure out the build together.
        </p>
        <div ref={ctaRef} className="flex justify-center gap-4 mt-8">
          <a href="#work" className="btn-primary px-5 py-2.5 text-[12px] font-semibold flex items-center gap-1">
            See The Work <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
          </a>
          <a href="#how-we-work" className="btn-secondary px-5 py-2.5 text-[12px] font-medium flex items-center gap-1">
            How We Work <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
          </a>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="max-w-[320px]">
          <p className="text-[11px] text-white/60 leading-relaxed">
            For <span className="text-white font-medium">small, non-technical teams</span> who want high-quality software without building an engineering org.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-white/60 leading-relaxed">
            <span className="text-white font-medium">damini@materiallab.io</span>
          </p>
        </div>
      </div>
    </section>
  )
}
