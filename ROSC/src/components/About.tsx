import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.about-animate'), {
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
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-warm-white relative overflow-hidden" id="about">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Text */}
          <div>
            <p className="about-animate text-[17px] md:text-[19px] font-semibold text-grey-900 leading-[1.5] mb-4">
              We started Material Lab because we kept meeting founders who were great at their craft but stuck when it came to tech. So we became the team they can call.
            </p>
            <p className="about-animate text-[14px] text-grey-600 leading-[1.6]">
              We come from tech, design, and business. We know how to build things that look good, work well, and actually get used. And we care enough to treat your product like it's our own.
            </p>
          </div>

          {/* Right Side */}
          <div>
            <h2 className="about-animate text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] leading-[1.05] text-grey-900 mb-8">
              Good Partners,<br/>Good Software <span className="inline-block w-8 md:w-10 h-6 md:h-8 bg-laser/40 rounded-none align-middle"></span>
            </h2>

            <div className="about-animate flex items-center gap-6">
              <a href="#services" className="btn-outline-dark px-5 py-2.5 border border-grey-900 text-grey-900 text-[12px] font-medium rounded-none flex items-center gap-1 hover:bg-grey-900 hover:text-white transition-colors">
                Our Capabilities <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
              </a>
              <a href="#work" className="text-link text-[12px] font-medium text-grey-900 flex items-center gap-1 hover:text-laser transition-colors">
                See Our Work <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
