import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.contact-animate'), {
        y: MOTION.distance.medium,
        opacity: 0,
        stagger: MOTION.stagger.default,
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
    <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-12 bg-oled relative overflow-hidden" id="contact">
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-8 justify-center contact-animate">
          <div className="cyan-divider-line"></div>
          <span className="cyan-divider-label">Let's Talk</span>
        </div>
        <h2
          ref={headlineRef}
          className="cta-headline text-[40px] md:text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] text-white mb-6 contact-animate"
        >
          Got something you want to build?
        </h2>
        <p className="text-[14px] text-white/70 mb-8 contact-animate">
          Let's talk. Bring a napkin sketch, a half-baked idea, or a full brief. We'll figure it out together.
        </p>
        <a
          href="mailto:damini@materiallab.io"
          className="btn-primary inline-flex px-6 py-3 text-[14px] font-semibold items-center gap-2 contact-animate"
        >
          Start a conversation <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
        </a>
      </div>
    </section>
  )
}
