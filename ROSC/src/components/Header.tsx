import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { MOTION } from '../App'

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    if (menuOverlayRef.current) {
      if (menuOpen) {
        gsap.to(menuOverlayRef.current, {
          opacity: 1,
          duration: MOTION.duration.default,
          ease: MOTION.ease.primary
        })
        if (menuLinksRef.current) {
          gsap.from(menuLinksRef.current.children, {
            y: 30,
            opacity: 0,
            stagger: MOTION.stagger.fast,
            duration: MOTION.duration.default,
            ease: MOTION.ease.smooth,
            delay: 0.1
          })
        }
      } else {
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.primary
        })
      }
    }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-blur">
      <div className="px-4 md:px-8 lg:px-12 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo - Porous Cube + M/L */}
          <a href="/" className="relative z-50 flex items-center gap-3">
            <img
              src="./assets/logos/porous-cube.png"
              alt="Material Lab"
              className="h-8 w-auto max-h-8"
              style={{ maxHeight: '32px', maxWidth: '32px' }}
            />
            <img
              src="./assets/logos/material-lab-micro-logo-white.svg"
              alt="M/L"
              className="h-4 w-auto"
              style={{ height: '16px', width: 'auto', maxHeight: '16px' }}
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#services" className="nav-link text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#work" className="nav-link relative text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              Work
              <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 bg-laser rounded-full"></span>
            </a>
            <a href="#how-we-work" className="nav-link text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              The Blueprint
            </a>
            <a href="#about" className="nav-link text-[13px] font-medium text-white/80 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="btn-primary ml-4 px-5 py-2.5 text-[12px] font-semibold flex items-center gap-1">
              Book a Working Session <i className="fa-solid fa-arrow-up-right text-[10px]"></i>
            </a>
          </div>

          {/* Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="menu-toggle relative z-50 flex flex-col gap-1.5 p-2 lg:hidden text-white"
          >
            <div className="flex w-5 h-2 flex-col items-start justify-between">
              <span className={`menu-line-top w-full h-px bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
              <span className={`menu-line-bottom w-full h-px bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuOverlayRef}
        className={`menu-overlay fixed inset-0 bg-oled z-40 opacity-0 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="h-full flex flex-col justify-center px-6 py-20">
          <nav ref={menuLinksRef} className="space-y-4">
            <a href="#services" onClick={toggleMenu} className="menu-link block text-4xl font-bold text-white hover:text-laser transition-colors">
              Capabilities
            </a>
            <a href="#work" onClick={toggleMenu} className="menu-link block text-4xl font-bold text-white hover:text-laser transition-colors">
              Work
            </a>
            <a href="#how-we-work" onClick={toggleMenu} className="menu-link block text-4xl font-bold text-white hover:text-laser transition-colors">
              The Blueprint
            </a>
            <a href="#about" onClick={toggleMenu} className="menu-link block text-4xl font-bold text-white hover:text-laser transition-colors">
              About
            </a>
            <a href="#contact" onClick={toggleMenu} className="menu-link block text-4xl font-bold text-white hover:text-laser transition-colors">
              Book a Call
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
