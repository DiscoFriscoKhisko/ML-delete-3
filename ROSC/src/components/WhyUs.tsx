import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

const reasons = [
  { icon: 'fa-arrows-rotate', title: 'Small team, real partnership', description: 'You work with us directly. No layers, no runaround.' },
  { icon: 'fa-hammer', title: 'Built for your workflow', description: 'Everything we build fits how your team already operates: tools, rituals, constraints.' },
  { icon: 'fa-bullseye', title: 'Metric-first delivery', description: 'We don\'t sell features. We solve problems.' },
  { icon: 'fa-window-maximize', title: 'Production, not prototypes', description: 'We stay through evaluations, rollout, and reliability so the system is actually used.' },
  { icon: 'fa-robot', title: 'AI where it counts', description: 'We use LLMs and agents only where they reduce cost, time, or complexity. Nowhere else.' },
  { icon: 'fa-users', title: 'A tech team for non-technical teams', description: 'Most of our clients are strong in ops or marketing, not engineering. We handle "everything tech" so you can focus on the business.' }
]

export const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.why-item'), {
        y: MOTION.distance.small,
        stagger: MOTION.stagger.fast,
        duration: MOTION.duration.default,
        ease: MOTION.ease.smooth,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-oled relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-6 justify-center">
          <div className="cyan-divider-line"></div>
          <span className="cyan-divider-label">Why Us</span>
        </div>
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] text-white mb-12 text-center">
          Why Teams Choose Us
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="why-item text-center p-4 rounded-none hover:-translate-y-1 transition-transform">
              <i className={`fa-solid ${reason.icon} text-laser text-2xl mb-3`}></i>
              <h3 className="text-[14px] font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-[11px] text-white/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
