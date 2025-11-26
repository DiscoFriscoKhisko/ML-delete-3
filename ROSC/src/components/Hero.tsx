import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PrismScene } from './PrismScene'
import { MOTION } from '../App'

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate badges
    if (badgesRef.current) {
      tl.from(badgesRef.current.children, {
        y: -15,
        stagger: MOTION.stagger.fast,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    }

    // Animate title
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: MOTION.distance.medium,
        duration: MOTION.duration.default,
        ease: MOTION.ease.smooth
      }, '-=0.2')
    }

    // Animate CTAs
    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: MOTION.distance.small,
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PrismScene />
      </div>

      {/* Top Badges */}
      <div className="relative z-20 text-center pt-16">
        <div ref={badgesRef} className="flex justify-center items-center gap-4 flex-wrap">
          <span className="magnetic-badge hero-badge">Metric-Obsessed</span>
          <span className="magnetic-badge hero-badge">Zero Bloat</span>
          <span className="magnetic-badge hero-badge">100% IP Ownership</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="relative z-20 text-center flex-1 flex flex-col justify-center py-12">
        <h1
          ref={titleRef}
          className="hero-title text-[32px] md:text-[48px] lg:text-[64px] xl:text-[72px] font-bold tracking-[-0.03em] leading-[1.1] text-white max-w-4xl mx-auto"
        >
          We build it. You own it. It just works.
        </h1>
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
      <div className="relative z-20 flex justify-between items-end">
        <div className="max-w-[420px]">
          <p className="text-[12px] text-white/70 leading-relaxed">
            Material Lab is an AI-native product studio that works like an extended tech team. We build and integrate LLM-powered workflows, apps, and GTM systems that increase revenue, save hours, and reduce errors.
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
