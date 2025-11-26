import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

export const HowWeWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.how-card'), {
        y: MOTION.distance.small,
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
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-warm-white" id="how-we-work">
      <div className="max-w-[1200px] mx-auto">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-6 justify-center">
          <div className="cyan-divider-line bg-oled"></div>
          <span className="cyan-divider-label text-grey-500">The Blueprint</span>
        </div>
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] text-grey-900 mb-12 text-center">
          How We Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Step 1 */}
          <div className="how-card p-6 md:p-8 bg-white rounded-lg border border-grey-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-comments text-laser text-xl"></i>
              <h3 className="text-[20px] font-bold text-grey-900">Talk → Touch</h3>
            </div>
            <p className="text-[13px] text-grey-600 leading-relaxed">
              You tell us the goal and how your team actually works today. We map the workflow, pick the core metric, and prototype in days. No decks. You get a working demo and a clear rollout plan.
            </p>
          </div>

          {/* Step 2 */}
          <div className="how-card p-6 md:p-8 bg-white rounded-lg border border-grey-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-chart-line text-laser text-xl"></i>
              <h3 className="text-[20px] font-bold text-grey-900">Evidence → Ship</h3>
            </div>
            <p className="text-[13px] text-grey-600 leading-relaxed">
              We ship when the metric moves: revenue, hours saved, error rate, conversion. If we can't link a feature to an outcome, we don't build it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
