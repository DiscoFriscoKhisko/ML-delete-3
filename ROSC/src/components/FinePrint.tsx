import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

export const FinePrint: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.fine-print-card'), {
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
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-warm-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-6 justify-center">
          <div className="cyan-divider-line bg-oled"></div>
          <span className="cyan-divider-label text-grey-500">Details</span>
        </div>
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] text-grey-900 mb-12 text-center">
          The Fine Print
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pricing */}
          <div className="fine-print-card p-6 md:p-8 bg-white rounded-lg border border-grey-200 hover:shadow-lg transition-shadow">
            <h3 className="text-[18px] font-bold text-grey-900 mb-3">Pricing</h3>
            <p className="text-[13px] text-grey-600 leading-relaxed mb-3">
              After our first chat, you get a fixed-price proposal. Clear investment, clear return.
            </p>
            <p className="text-[11px] text-grey-500">
              After launch: complimentary bug support, plus optional maintenance if you'd like us to stay close.
            </p>
          </div>

          {/* Timeline */}
          <div className="fine-print-card p-6 md:p-8 bg-white rounded-lg border border-grey-200 hover:shadow-lg transition-shadow">
            <h3 className="text-[18px] font-bold text-grey-900 mb-3">Timeline</h3>
            <p className="text-[13px] text-grey-600 leading-relaxed">
              <strong>Small tools:</strong> 1–2 weeks<br />
              <strong>Larger platforms:</strong> up to 3 months
            </p>
          </div>

          {/* Product Ownership */}
          <div className="fine-print-card p-6 md:p-8 bg-white rounded-lg border border-grey-200 hover:shadow-lg transition-shadow">
            <h3 className="text-[18px] font-bold text-grey-900 mb-3">Product Ownership</h3>
            <p className="text-[13px] text-grey-600 leading-relaxed">
              <strong>Who owns the code?</strong> You do. We're here as long as we're useful.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
