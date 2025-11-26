import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MOTION } from '../App'

export const Preloader: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    if (logoRef.current) {
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: MOTION.duration.slow,
        ease: MOTION.ease.smooth
      })
    }

    if (textRef.current) {
      tl.to(textRef.current, {
        opacity: 1,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      }, '-=0.3')
    }
  }, [])

  return (
    <div className="preloader fixed inset-0 z-[10000] bg-oled flex items-center justify-center">
      <div className="text-center">
        <img
          ref={logoRef}
          src="./assets/logos/material-lab-meteor-glyph-hires.png"
          alt="Material Lab"
          className="preloader-logo h-20 md:h-24 mx-auto opacity-0 scale-95"
        />
        <p
          ref={textRef}
          className="preloader-text text-[14px] text-white/60 mt-6 opacity-0"
        >
          Getting things ready...
        </p>
      </div>
    </div>
  )
}
