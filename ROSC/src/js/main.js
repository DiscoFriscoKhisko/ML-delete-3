import Alpine from 'alpinejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { geoGraticule, geoPath } from 'd3-geo'
import { geoPolyhedralWaterman } from 'd3-geo-projection'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, ScrollSmoother)

// ===== BRAND KIT MOTION DEFAULTS (Softened for warmth & partnership feel) =====
const MOTION = {
  duration: {
    instant: 0.1,      // Magnetic hover response (100ms)
    fast: 0.2,         // Faster for snappier, friendly feel
    default: 0.35,     // Reduced - feels more natural & effortless
    slow: 0.5,         // Softer reveal timing
    reveal: 0.45,      // For scroll reveals - slightly faster
    marquee: 20        // Infinite marquee (20s)
  },
  ease: {
    primary: 'power2.out',     // Softer than power3
    emphatic: 'power2.out',    // Changed from power3 - less dramatic
    playful: 'back.out(1.1)',  // Reduced bounce for subtlety
    smooth: 'power2.out',      // Softer - less dramatic
    brandReturn: 'power2.out', // Smooth return
    natural: 'power2.inOut'    // For organic movements
  },
  stagger: {
    default: 0.06,     // Slightly faster stagger for friendlier feel
    fast: 0.04,
    slow: 0.1
  },
  distance: {
    small: 15,         // Further reduced travel distances
    medium: 25,
    large: 35          // Subtler movements
  }
}

// ===== BRAND KIT COLOR PALETTE =====
const COLORS = {
  black: '#090909',
  white: '#fefefe',
  cyanGlow: '#17f7f7',
  alabaster: '#d5dada',
  nickel: '#737373'
}

// Preloader animation - Simplified for warmth
function initPreloader() {
  const preloader = document.querySelector('.preloader')
  const logo = document.querySelector('.preloader-logo')
  const text = document.querySelector('.preloader-text')

  if (!preloader || !logo) return

  const tl = gsap.timeline({
    onComplete: () => {
      // Simple fade out instead of dramatic slide
      gsap.to(preloader, {
        opacity: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.natural,
        onComplete: () => {
          preloader.style.display = 'none'
          pageEntranceAnimation()
        }
      })
    }
  })

  // Simple logo fade in with subtle scale
  tl.to(logo, {
    opacity: 1,
    scale: 1,
    duration: MOTION.duration.slow,
    ease: MOTION.ease.smooth
  })

  // Fade in friendly text
  if (text) {
    tl.to(text, {
      opacity: 1,
      duration: MOTION.duration.default,
      ease: MOTION.ease.primary
    }, '-=0.3')
  }

  // Brief pause to show the branding
  tl.to({}, { duration: 0.8 })
}

// Line-by-line text reveal animations
function initLineReveals() {
  const elements = document.querySelectorAll('.line-reveal')

  elements.forEach(el => {
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line-child'
    })

    // Wrap each line in overflow hidden container
    split.lines.forEach(line => {
      const wrapper = document.createElement('div')
      wrapper.className = 'line-wrapper'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: MOTION.duration.slow,
      stagger: MOTION.stagger.default,
      ease: MOTION.ease.smooth,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })
}

// Image clip-path reveal animations
function initImageReveals() {
  const images = document.querySelectorAll('.reveal-image')

  images.forEach(img => {
    gsap.from(img, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2,
      ease: MOTION.ease.smooth,
      scrollTrigger: {
        trigger: img,
        start: 'top 80%'
      }
    })
  })
}

// Magnetic button effects
function initMagneticButtons() {
  const magnetics = document.querySelectorAll('.magnetic')

  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: MOTION.duration.instant,  // Brand kit: 100ms snappy response
        ease: MOTION.ease.primary
      })
    })

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.brandReturn  // Brand kit: smooth spring-like return
      })
    })
  })
}

// Set viewport height CSS variable
function setVH() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
setVH()
window.addEventListener('resize', setVH)

// Alpine.js Store for global state
document.addEventListener('alpine:init', () => {
  Alpine.store('menu', {
    open: false,
    toggle() {
      this.open = !this.open
    },
    close() {
      this.open = false
    }
  })

  Alpine.store('cursor', {
    active: false,
    icon: null
  })
})

// Custom Cursor Component - Accurate to original
Alpine.data('cursor', () => ({
  active: false,
  icon: 'fa-arrow-up-right',

  init() {
    const cursor = this.$refs.cursor

    // Smooth cursor tracking
    document.addEventListener('pointermove', (e) => {
      const left = e.clientX - cursor.offsetWidth / 2
      const top = e.clientY - cursor.offsetHeight / 2
      cursor.style.left = `${left}px`
      cursor.style.top = `${top}px`
    })

    // Add hover detection to interactive elements
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.active = true
      })
      el.addEventListener('mouseleave', () => {
        this.active = false
      })
    })
  }
}))

// Navigation Component - Accurate menu animations
Alpine.data('navigation', () => ({
  menuOpen: false,
  activeMenuWidth: 0,
  activeMenuHeight: 0,

  toggleMenu() {
    this.menuOpen = !this.menuOpen
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden'
      this.animateMenuOpen()
    } else {
      document.body.style.overflow = ''
      this.animateMenuClose()
    }
  },

  animateMenuOpen() {
    const menu = document.querySelector('.menu-overlay')
    const menuLinks = document.querySelectorAll('.menu-link')

    // Get current dimensions for scale animation
    const newWidth = menu.offsetWidth
    const newHeight = menu.offsetHeight
    const fromWidth = this.activeMenuWidth || newWidth * 0.5
    const fromHeight = this.activeMenuHeight || newHeight * 0.5

    gsap.set(menu, {
      transformOrigin: 'top right',
      scaleX: fromWidth / newWidth,
      scaleY: fromHeight / newHeight,
      opacity: 1
    })

    const tl = gsap.timeline()

    tl.to(menu, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.4,
      ease: 'power4.out'
    })

    tl.from(menuLinks, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.2')

    this.activeMenuWidth = newWidth
    this.activeMenuHeight = newHeight
  },

  animateMenuClose() {
    const menu = document.querySelector('.menu-overlay')

    gsap.to(menu, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.set(menu, { scaleX: 1, scaleY: 1 })
      }
    })
  }
}))

// Page entrance animation - Softened for natural feel
function pageEntranceAnimation() {
  const ellipse = document.querySelector('.js-reveal-ellipse')
  const heroTitle = document.querySelector('.hero-title')
  const heroSubtitle = document.querySelector('.hero-subtitle')
  const heroBadges = document.querySelectorAll('.hero-badge')
  const heroCtaBtns = document.querySelectorAll('.hero-cta-btn')

  if (!ellipse) return

  const tl = gsap.timeline()

  // Ellipse reveal - faster, softer, more welcoming
  tl.to(ellipse, {
    attr: { rx: 2700, ry: 2150 },
    duration: 0.6,  // Further reduced for effortless feel
    ease: 'power2.out'  // Softer easing
  })

  // Hero badges first (establishes context)
  if (heroBadges.length) {
    tl.from(heroBadges, {
      y: -MOTION.distance.small,
      opacity: 0,
      stagger: MOTION.stagger.fast,
      duration: MOTION.duration.default,
      ease: MOTION.ease.primary
    }, '-=0.3')
  }

  // Hero title - reduced travel distance
  if (heroTitle) {
    tl.from(heroTitle, {
      y: MOTION.distance.large,
      opacity: 0,
      duration: MOTION.duration.slow,
      ease: MOTION.ease.smooth
    }, '-=0.2')
  }

  // Subtitle - even smaller movement
  if (heroSubtitle) {
    tl.from(heroSubtitle, {
      y: MOTION.distance.medium,
      opacity: 0,
      duration: MOTION.duration.default,
      ease: MOTION.ease.primary
    }, '-=0.3')
  }

  // CTA buttons with playful bounce
  if (heroCtaBtns.length) {
    tl.from(heroCtaBtns, {
      y: MOTION.distance.small,
      opacity: 0,
      stagger: MOTION.stagger.fast,
      duration: MOTION.duration.default,
      ease: MOTION.ease.playful
    }, '-=0.2')
  }
}

// Scroll animations with ScrollTrigger (Softened values)
function initScrollAnimations() {
  // Fade in elements on scroll - reduced travel for subtlety
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
      y: MOTION.distance.medium,  // Reduced from 50
      opacity: 0,
      duration: MOTION.duration.reveal,
      ease: MOTION.ease.smooth,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',  // Start slightly earlier
        toggleActions: 'play none none reverse'
      }
    })
  })

  // Logo items stagger animation
  const logoItems = document.querySelectorAll('.logo-item')
  if (logoItems.length) {
    gsap.from(logoItems, {
      y: MOTION.distance.small,
      opacity: 0,
      stagger: MOTION.stagger.default,
      duration: MOTION.duration.default,
      ease: MOTION.ease.smooth,
      scrollTrigger: {
        trigger: '.logo-grid',
        start: 'top 85%'
      }
    })
  }

  // Parallax image sections
  initParallaxSections()

  // Horizontal scrolling text
  initHorizontalScroll()

  // SplitText character animations
  initSplitTextAnimations()
}

// Parallax scroll effect for images
function initParallaxSections() {
  const parallaxSections = document.querySelectorAll('.parallax-section')

  parallaxSections.forEach(section => {
    const images = section.querySelector('.parallax-images')
    if (!images) return

    const windowHeight = window.innerHeight

    ScrollTrigger.matchMedia({
      // Desktop
      '(pointer: fine)': () => {
        gsap.to(images, {
          y: () => -(images.offsetHeight - windowHeight),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${images.offsetHeight - windowHeight}`,
            scrub: true
          }
        })
      },
      // Mobile - with pin
      '(pointer: coarse)': () => {
        gsap.to(images, {
          y: () => -(images.offsetHeight - (windowHeight * 1.1)),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${images.offsetHeight - (windowHeight * 1.1)}`,
            scrub: true,
            pin: true
          }
        })
      }
    })
  })
}

// Horizontal scroll marquee effect
function initHorizontalScroll() {
  const scrollContainers = document.querySelectorAll('.horizontal-scroll')

  scrollContainers.forEach(container => {
    ScrollTrigger.matchMedia({
      '(pointer: fine)': () => {
        gsap.to(container, {
          xPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 100%',
            end: 'bottom -100%',
            scrub: true
          }
        })
      },
      '(pointer: coarse)': () => {
        gsap.set(container, { xPercent: 0 })
      }
    })
  })
}

// SplitText character animations - exact values from original
function initSplitTextAnimations() {
  const splitHeadings = document.querySelectorAll('.split-text')

  splitHeadings.forEach(heading => {
    const splitText = new SplitText(heading, { type: 'chars' })
    const chars = splitText.chars

    // Set initial state
    chars.forEach(char => {
      gsap.set(char, {
        yPercent: -60,
        rotate: 10
      })
    })

    // Animate on scroll
    gsap.to(chars, {
      yPercent: 0,
      rotate: 0,
      ease: 'back.inOut(4)',
      stagger: 0.35,
      duration: 2.5,
      scrollTrigger: {
        trigger: heading,
        start: 'top 77%',
        end: 'bottom 20%',
        scrub: true
      }
    })
  })
}

// Horizontal loop utility for marquee
function gsapHorizontalLoop(items, config) {
  items = gsap.utils.toArray(items)
  config = config || {}

  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  })

  let length = items.length
  let startX = items[0].offsetLeft
  let times = []
  let widths = []
  let xPercents = []
  let curIndex = 0
  let pixelsPerSecond = (config.speed || 1) * 100
  let snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1)

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'))
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / w * 100 + gsap.getProperty(el, 'xPercent'))
      return xPercents[i]
    }
  })

  gsap.set(items, { x: 0 })

  let totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0)

  for (let i = 0; i < length; i++) {
    let item = items[i]
    let curX = xPercents[i] / 100 * widths[i]
    let distanceToStart = item.offsetLeft + curX - startX
    let distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX')

    tl.to(item, {
      xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0)
      .fromTo(item, {
        xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond)

    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index, vars) {
    vars = vars || {}
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length)
    let newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > curIndex ? 1 : -1)
    }
    curIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  tl.next = vars => toIndex(curIndex + 1, vars)
  tl.previous = vars => toIndex(curIndex - 1, vars)
  tl.current = () => curIndex
  tl.toIndex = (index, vars) => toIndex(index, vars)
  tl.times = times

  if (config.reversed) {
    tl.vars.onReverseComplete()
    tl.reverse()
  }

  return tl
}

// Initialize marquee loops
function initMarqueeLoops() {
  const marquees = document.querySelectorAll('.marquee-items')

  marquees.forEach(marquee => {
    gsapHorizontalLoop(marquee.children, {
      repeat: -1,
      speed: 0.5,
      reversed: false
    })
  })
}

// Image load fade-in
function initImageLoadAnimations() {
  const images = document.querySelectorAll('img[data-animate]')

  images.forEach(img => {
    img.style.opacity = '0'
    img.onload = () => {
      gsap.to(img, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  })
}

// ===== CAPABILITIES PIN AND REVEAL ANIMATION =====
function initCapabilitiesPinReveal() {
  const section = document.querySelector('.capabilities-section')
  const wrapper = document.querySelector('.capabilities-wrapper')
  const left = document.querySelector('.capabilities-left')
  const right = document.querySelector('.capabilities-right')
  const cards = document.querySelectorAll('.capabilities-right .capability-card')
  const indicators = document.querySelectorAll('.capability-indicator')

  if (!section || !wrapper || !left || !right || cards.length === 0) return

  // Only apply pin on desktop
  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': () => {
      // Pin the left side while right side scrolls
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 80px', // Account for fixed header
        end: () => `+=${right.offsetHeight - window.innerHeight + 160}`,
        pin: left,
        pinSpacing: false,
        invalidateOnRefresh: true
      })

      // Update active indicator based on scroll position
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => updateActiveIndicator(index),
          onEnterBack: () => updateActiveIndicator(index)
        })
      })

      // Card reveal animations - softened travel distance
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: MOTION.distance.large,  // Reduced from 80
          opacity: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.smooth,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    },
    // Mobile - no pin, just card animations
    '(max-width: 1023px)': () => {
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: MOTION.distance.medium,  // Reduced from 60
          opacity: 0,
          duration: MOTION.duration.default,
          ease: MOTION.ease.smooth,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }
  })

  // Helper function to update active indicator
  function updateActiveIndicator(activeIndex) {
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add('active')
      } else {
        indicator.classList.remove('active')
      }
    })
  }

  // Click handlers for indicators
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const targetIndex = parseInt(indicator.dataset.target)
      const targetCard = cards[targetIndex]
      if (targetCard) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: targetCard, offsetY: 100 },
          ease: 'power3.inOut'
        })
      }
    })
  })
}

// ===== TOKEN GENERATION EFFECT (LLM-style text reveal) =====
function initTokenGeneration() {
  const tokenElements = document.querySelectorAll('.token-reveal')

  if (tokenElements.length === 0) return

  tokenElements.forEach(el => {
    // Split text into characters
    const split = new SplitText(el, { type: 'chars', charsClass: 'char' })

    // Animate characters appearing one by one
    gsap.from(split.chars, {
      opacity: 0,
      stagger: 0.015, // 15ms between characters - rapid typing feel
      duration: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none' // Play once, don't reverse
      }
    })
  })
}

// Material Lab specific animations
function initMaterialLabAnimations() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut'
        })
      }
    })
  })

  // Hero badges animation
  const heroBadges = document.querySelectorAll('.hero-badge')
  if (heroBadges.length) {
    gsap.from(heroBadges, {
      y: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      delay: 1.5,
      ease: 'power3.out'
    })
  }

  // Hero CTAs animation - softer, no bounce
  const heroCtas = document.querySelectorAll('.hero-cta-btn')
  if (heroCtas.length) {
    gsap.from(heroCtas, {
      scale: 0.95,
      y: 10,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      delay: 1.8,
      ease: 'power2.out'  // Removed bounce
    })
  }

  // Capability cards animation is now handled by initCapabilitiesPinReveal()

  // Work items animation
  const workItems = document.querySelectorAll('.work-item')
  if (workItems.length) {
    gsap.from(workItems, {
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: workItems[0].parentElement,
        start: 'top 70%'
      }
    })
  }

  // How We Work cards - softer reveal with y movement instead of x
  const howWeWorkCards = document.querySelectorAll('.how-we-work-card')
  if (howWeWorkCards.length) {
    howWeWorkCards.forEach((card, i) => {
      gsap.from(card, {
        y: 25,  // Changed from x to y (less jarring)
        rotation: i % 2 === 0 ? -1.5 : 1.5,  // Subtle organic tilt
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',  // Softer
        scrollTrigger: {
          trigger: card,
          start: 'top 82%'  // Start earlier
        }
      })
    })
  }

  // Why choose us items - softer, no bounce for professional feel
  const whyItems = document.querySelectorAll('.why-item')
  if (whyItems.length) {
    gsap.from(whyItems, {
      scale: 0.95,  // Less dramatic start
      y: 15,        // Add slight y movement
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',  // Removed bounce
      scrollTrigger: {
        trigger: whyItems[0].parentElement,
        start: 'top 78%'
      }
    })
  }

  // Fine print cards
  const finePrintCards = document.querySelectorAll('.fine-print-card')
  if (finePrintCards.length) {
    gsap.from(finePrintCards, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: finePrintCards[0].parentElement,
        start: 'top 75%'
      }
    })
  }

  // CTA section headline
  const ctaHeadline = document.querySelector('.cta-headline')
  if (ctaHeadline) {
    const split = new SplitText(ctaHeadline, { type: 'words' })
    gsap.from(split.words, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaHeadline,
        start: 'top 80%'
      }
    })
  }

  // Footer logo animation
  const footerLogo = document.querySelector('.footer-logo')
  if (footerLogo) {
    gsap.from(footerLogo, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerLogo,
        start: 'top 85%'
      }
    })
  }

  // Section headings fade up
  document.querySelectorAll('.section-heading').forEach(heading => {
    gsap.from(heading, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%'
      }
    })
  })
}

// ===== GSAP-ONLY HOVER HANDLERS (Brand Kit Motion) =====

// Button hover effects (btn-primary, btn-secondary, btn-tertiary, btn-outline-dark)
function initButtonHovers() {
  // Primary buttons (cyan outline, transparent bg)
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundColor: 'rgba(23, 247, 247, 0.15)',
        borderColor: 'rgba(23, 247, 247, 0.8)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        backgroundColor: 'transparent',
        borderColor: 'rgba(23, 247, 247, 0.5)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })

  // Secondary buttons (white outline)
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        backgroundColor: 'rgba(254, 254, 254, 0.1)',
        borderColor: 'rgba(254, 254, 254, 0.5)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        backgroundColor: 'transparent',
        borderColor: 'rgba(254, 254, 254, 0.2)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })

  // Tertiary buttons (link style with underline)
  document.querySelectorAll('.btn-tertiary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        color: '#17f7f7',
        borderBottomColor: '#17f7f7',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        color: '#d5dada',
        borderBottomColor: 'transparent',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })

  // Dark outline buttons
  document.querySelectorAll('.btn-outline-dark').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.02,
        backgroundColor: '#090909',
        color: '#fefefe',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        backgroundColor: 'transparent',
        color: '#090909',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Navigation link hover effects
function initNavLinkHovers() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#fefefe',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: 'rgba(254, 254, 254, 0.8)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })

  // Menu links (mobile) - mint color on hover
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#17f7f7',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: '#fefefe',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Electric lift hover effect (-8px Y translation)
function initElectricLiftHovers() {
  document.querySelectorAll('.electric-lift').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        y: -2,  // Brand kit: subtle -2px lift (was -8px)
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        y: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Grainy aura hover effect
function initGrainyAuraHovers() {
  document.querySelectorAll('.grainy-aura').forEach(el => {
    const before = el.querySelector('::before')
    const after = el.querySelector('::after')

    el.addEventListener('mouseenter', () => {
      // Animate pseudo-elements via CSS custom properties
      gsap.to(el, {
        '--aura-opacity': 0.8,
        '--noise-opacity': 0.05,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        '--aura-opacity': 0,
        '--noise-opacity': 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Footer and social link hovers
function initFooterLinkHovers() {
  document.querySelectorAll('.social-link, .footer-nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#17f7f7',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: 'rgba(254, 254, 254, 0.6)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })

  document.querySelectorAll('.text-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#737373',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: '#090909',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Custom cursor scale animation
function initCursorScale() {
  const cursor = document.querySelector('.custom-cursor')
  if (!cursor) return

  // Create quickTo for smooth cursor tracking
  const xTo = gsap.quickTo(cursor, 'left', { duration: 0.2, ease: 'power2.out' })
  const yTo = gsap.quickTo(cursor, 'top', { duration: 0.2, ease: 'power2.out' })

  document.addEventListener('pointermove', (e) => {
    xTo(e.clientX - cursor.offsetWidth / 2)
    yTo(e.clientY - cursor.offsetHeight / 2)
  })

  // Scale on interactive elements
  document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 1,
        duration: MOTION.duration.fast,
        ease: MOTION.ease.playful
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 0,
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })
}

// Menu hamburger animation
function initMenuHamburgerAnimation() {
  const menuToggle = document.querySelector('.menu-toggle')
  const lineTop = document.querySelector('.menu-line-top')
  const lineBottom = document.querySelector('.menu-line-bottom')

  if (!menuToggle || !lineTop || !lineBottom) return

  // Watch for Alpine menuOpen state changes
  const observer = new MutationObserver(() => {
    const isOpen = menuToggle.closest('[x-data]')?.__x?.$data?.menuOpen

    if (isOpen) {
      gsap.to(lineTop, {
        rotation: 45,
        y: 4,
        duration: MOTION.duration.default,
        ease: MOTION.ease.emphatic
      })
      gsap.to(lineBottom, {
        rotation: -45,
        y: -4,
        duration: MOTION.duration.default,
        ease: MOTION.ease.emphatic
      })
    } else {
      gsap.to(lineTop, {
        rotation: 0,
        y: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.emphatic
      })
      gsap.to(lineBottom, {
        rotation: 0,
        y: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.emphatic
      })
    }
  })
}

// Work card transition animations (replaces Alpine x-transition)
function initWorkCardTransitions() {
  const cards = document.querySelectorAll('.work-card')

  cards.forEach(card => {
    // Set initial state
    gsap.set(card, { opacity: 0, scale: 0.95 })

    // Watch for x-show changes via Alpine
    const checkVisibility = () => {
      const isVisible = card.style.display !== 'none'
      if (isVisible) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.primary
        })
      }
    }

    // Use MutationObserver to detect display changes
    const observer = new MutationObserver(checkVisibility)
    observer.observe(card, { attributes: true, attributeFilter: ['style'] })
  })
}

// Depth card hover effect (Softened - less electric, more gentle lift)
function initDepthCardHovers() {
  document.querySelectorAll('.depth-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -4,  // Increased lift for more visible feedback
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(23, 247, 247, 0.15)',  // Simpler, softer
        borderColor: 'rgba(23, 247, 247, 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
}

// Header scroll blur effect (Brand Kit: semi-transparent header with backdrop blur on scroll)
function initHeaderScrollBlur() {
  const header = document.querySelector('header')
  if (!header) return

  ScrollTrigger.create({
    start: 'top -100',
    onEnter: () => {
      gsap.to(header, {
        backgroundColor: 'rgba(9, 9, 9, 0.85)',
        backdropFilter: 'blur(12px)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    },
    onLeaveBack: () => {
      gsap.to(header, {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    }
  })
}

// Capability indicator animations
function initCapabilityIndicatorAnimations() {
  const indicators = document.querySelectorAll('.capability-indicator')

  indicators.forEach(indicator => {
    const dot = indicator.querySelector('.indicator-dot')

    // Watch for active class changes
    const observer = new MutationObserver(() => {
      const isActive = indicator.classList.contains('active')

      if (isActive) {
        gsap.to(indicator, {
          opacity: 1,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.primary
        })
        gsap.to(dot, {
          backgroundColor: '#17f7f7',
          scale: 1.25,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.playful
        })
      } else {
        gsap.to(indicator, {
          opacity: 0.4,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.primary
        })
        gsap.to(dot, {
          backgroundColor: '#737373',
          scale: 1,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.primary
        })
      }
    })

    observer.observe(indicator, { attributes: true, attributeFilter: ['class'] })
  })
}

// ===== BRAND KIT: TAB NAVIGATION WITH ANIMATED UNDERLINE =====
function initTabNavigation() {
  const tabNavs = document.querySelectorAll('.tab-nav')

  tabNavs.forEach(tabNav => {
    const tabs = tabNav.querySelectorAll('.tab-trigger')
    const underline = tabNav.querySelector('.tab-underline')

    if (!tabs.length || !underline) return

    // Set initial underline position to active tab
    const activeTab = tabNav.querySelector('.tab-trigger.active') || tabs[0]
    if (activeTab) {
      activeTab.classList.add('active')
      const rect = activeTab.getBoundingClientRect()
      const parentRect = tabNav.getBoundingClientRect()
      gsap.set(underline, {
        width: rect.width,
        x: rect.left - parentRect.left
      })
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all
        tabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        // Animate underline to new position
        const rect = tab.getBoundingClientRect()
        const parentRect = tabNav.getBoundingClientRect()

        gsap.to(underline, {
          width: rect.width,
          x: rect.left - parentRect.left,
          duration: MOTION.duration.default,
          ease: MOTION.ease.primary
        })
      })

      // Hover effect - text color
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          gsap.to(tab, {
            color: 'rgba(254, 254, 254, 0.9)',
            duration: MOTION.duration.fast,
            ease: MOTION.ease.primary
          })
        }
      })

      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          gsap.to(tab, {
            color: 'rgba(213, 218, 218, 0.7)',
            duration: MOTION.duration.fast,
            ease: MOTION.ease.primary
          })
        }
      })
    })
  })
}

// ===== BRAND KIT: HOVER CAPTION EFFECTS =====
function initHoverCaptions() {
  document.querySelectorAll('[data-hover-caption]').forEach(el => {
    const caption = el.querySelector('.hover-caption')
    if (!caption) return

    el.addEventListener('mouseenter', () => {
      gsap.to(caption, {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })

    el.addEventListener('mouseleave', () => {
      gsap.to(caption, {
        opacity: 0,
        y: 8,
        duration: MOTION.duration.default,
        ease: MOTION.ease.primary
      })
    })
  })
}

// ===== BRAND KIT: KINETIC GRID (Canvas-based) =====
function initKineticGrid() {
  const canvas = document.getElementById('kinetic-grid')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const gridSize = 20
  const maxDistance = 150
  const moveStrength = 40
  const returnDamping = 0.1

  // Detect background and set color accordingly
  const section = canvas.closest('section')
  const bgColor = section ? window.getComputedStyle(section).backgroundColor : 'rgb(9, 9, 9)'
  const isDark = bgColor.includes('rgb(9') || bgColor.includes('rgb(0') || bgColor.includes('#090909')
  const gridColor = isDark ? '#17f7f7' : '#090909'

  let mouseX = -1000
  let mouseY = -1000
  const points = []

  // Resize canvas to match container
  function resizeCanvas() {
    const container = canvas.parentElement
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight

    // Reinitialize grid points
    initPoints()
  }

  function initPoints() {
    points.length = 0
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    for (let y = 0; y <= gridSize; y++) {
      for (let x = 0; x <= gridSize; x++) {
        points.push({
          originX: x * cellWidth,
          originY: y * cellHeight,
          x: x * cellWidth,
          y: y * cellHeight
        })
      }
    }
  }

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })

  canvas.addEventListener('mouseleave', () => {
    mouseX = -1000
    mouseY = -1000
  })

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5
    ctx.globalAlpha = 0.4

    // Update points
    points.forEach(point => {
      const dx = mouseX - point.x
      const dy = mouseY - point.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < maxDistance) {
        const force = (maxDistance - dist) / maxDistance
        const angle = Math.atan2(dy, dx)
        point.x = point.originX - Math.cos(angle) * force * moveStrength
        point.y = point.originY - Math.sin(angle) * force * moveStrength
      } else {
        point.x += (point.originX - point.x) * returnDamping
        point.y += (point.originY - point.y) * returnDamping
      }
    })

    // Draw horizontal lines
    for (let y = 0; y <= gridSize; y++) {
      ctx.beginPath()
      for (let x = 0; x <= gridSize; x++) {
        const point = points[y * (gridSize + 1) + x]
        if (x === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      }
      ctx.stroke()
    }

    // Draw vertical lines
    for (let x = 0; x <= gridSize; x++) {
      ctx.beginPath()
      for (let y = 0; y <= gridSize; y++) {
        const point = points[y * (gridSize + 1) + x]
        if (y === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      }
      ctx.stroke()
    }

    // Draw dots at ALL grid intersections with cyan glow (Brand Kit compliance)
    if (isDark) {
      ctx.shadowColor = COLORS.cyanGlow
      ctx.shadowBlur = 4
    }
    ctx.fillStyle = gridColor
    ctx.globalAlpha = 0.8
    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.shadowBlur = 0  // Reset shadow

    requestAnimationFrame(animate)
  }

  // Initialize
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  animate()
}

// ===== BRAND KIT: DYMAXION MAP (Waterman Butterfly Projection) =====
// Uses d3-geo and d3-geo-projection for authentic Waterman butterfly map
function initDymaxionGlobe() {
  const canvas = document.getElementById('dymaxion-globe')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const container = canvas.parentElement
  const size = Math.min(container.offsetWidth, container.offsetHeight) || 400
  const color = '#17f7f7'
  const rotationSpeed = 0.08  // Slowed down for subtlety

  // City coordinates (lat, lng) - BLR and SF only
  const cities = [
    { name: 'BLR', lat: 12.9716, lng: 77.5946 },
    { name: 'SF', lat: 37.7749, lng: -122.4194 }
  ]

  // Setup d3-geo Waterman projection
  const projection = geoPolyhedralWaterman()
  const pathGenerator = geoPath()
    .projection(projection)
    .context(ctx)
  const graticule = geoGraticule()

  let rotation = 0

  function render() {
    ctx.clearRect(0, 0, size, size)

    // Update rotation
    rotation += rotationSpeed
    projection.rotate([rotation, -30, 0]) // Rotate world, tilt slightly
    projection.fitSize([size, size], { type: 'Sphere' }) // Fit to canvas

    // Style
    ctx.lineWidth = 0.5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    // Draw Graticule (the world grid) - characteristic of Waterman projection
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.globalAlpha = 0.3
    pathGenerator(graticule())
    ctx.stroke()

    // Draw Outline (the projection shape - butterfly)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.globalAlpha = 0.8
    pathGenerator({ type: 'Sphere' })
    ctx.stroke()

    // Draw cities
    cities.forEach(city => {
      const coords = [city.lng, city.lat]
      const projected = projection(coords)

      if (projected) {
        const [x, y] = projected

        // Glow effect
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = 0.4
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // City dot with cyan glow (Brand Kit enhancement)
        ctx.shadowColor = COLORS.cyanGlow
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.fillStyle = COLORS.white
        ctx.globalAlpha = 1
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0  // Reset shadow

        // City label
        ctx.font = '10px monospace'
        ctx.fillStyle = color
        ctx.globalAlpha = 0.9
        ctx.fillText(city.name.toUpperCase(), x + 5, y + 3)

        // Leader line
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.6
        ctx.moveTo(x, y)
        ctx.lineTo(x + 4, y + 2)
        ctx.stroke()
      }
    })

    requestAnimationFrame(render)
  }

  // High DPI setup
  const dpr = window.devicePixelRatio || 1
  canvas.width = size * dpr
  canvas.height = size * dpr
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  ctx.scale(dpr, dpr)

  render()
}

// ===== BRAND KIT: STAGGERED TEXT REVEAL =====
function initStaggeredReveal() {
  const elements = document.querySelectorAll('.stagger-reveal')

  elements.forEach((el, index) => {
    // Use SplitText for word-level animation
    const split = new SplitText(el, { type: 'words', wordsClass: 'word' })

    gsap.from(split.words, {
      y: 40,
      opacity: 0,
      duration: MOTION.duration.slow,  // Brand kit: 700ms
      stagger: MOTION.stagger.fast,    // Brand kit: 60ms
      ease: MOTION.ease.emphatic,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1 // Stagger between elements
    })
  })
}

// ===== BRAND KIT: GRAINY AURA CURSOR =====
function initGrainyCursor() {
  // Only on desktop devices with fine pointer
  if (window.matchMedia('(pointer: coarse)').matches) return

  const cursor = document.createElement('div')
  cursor.className = 'grainy-cursor'
  cursor.innerHTML = `
    <div class="cursor-glow"></div>
    <div class="cursor-noise"></div>
  `
  document.body.appendChild(cursor)

  // Create quickTo for smooth movement
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'none' })
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'none' })

  document.addEventListener('mousemove', (e) => {
    xTo(e.clientX - 128)
    yTo(e.clientY - 128)
  })

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      opacity: 0,
      duration: MOTION.duration.fast
    })
  })

  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      opacity: 0.6,
      duration: MOTION.duration.fast
    })
  })
}

// ===== BRAND KIT: MAGNETIC BADGE EFFECTS (Softened for warmth) =====
function initMagneticBadges() {
  const badges = document.querySelectorAll('.magnetic-badge')
  const strength = 0.3  // Reduced from 0.5 for gentler feel

  badges.forEach(badge => {
    badge.addEventListener('mousemove', (e) => {
      const rect = badge.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = (e.clientX - centerX) * strength
      const distY = (e.clientY - centerY) * strength

      gsap.to(badge, {
        x: distX,
        y: distY,
        duration: 0.15,
        ease: MOTION.ease.primary
      })
    })

    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        x: 0,
        y: 0,
        duration: 0.4,  // Slower, smoother return
        ease: 'power2.out'  // Softer than elastic
      })
    })

    // Hover glow effect
    badge.addEventListener('mouseenter', () => {
      gsap.to(badge, {
        backgroundColor: 'rgba(23, 247, 247, 0.2)',
        borderColor: 'rgba(23, 247, 247, 0.6)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })

    badge.addEventListener('mouseleave', () => {
      gsap.to(badge, {
        backgroundColor: 'rgba(23, 247, 247, 0.1)',
        borderColor: 'rgba(23, 247, 247, 0.3)',
        duration: MOTION.duration.fast,
        ease: MOTION.ease.primary
      })
    })
  })
}

// ===== SCROLL SMOOTHER =====
// Creates buttery smooth scrolling - "It just feels a bit better"
let smoother = null

function initScrollSmoother() {
  // Only on desktop - touch devices have native smooth scroll
  if (window.matchMedia('(pointer: fine)').matches) {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,           // Smoothness level (1 = normal, 2 = very smooth)
      effects: true,         // Enable data-speed and data-lag effects
      smoothTouch: 0.1,      // Light smoothing on touch devices
      normalizeScroll: true, // Prevents address bar issues on mobile
      ignoreMobileResize: true
    })
  }
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress')
  if (!progressBar) return

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  })
}

// ===== CTA BREATHING ANIMATION =====
// Subtle pulse on main CTA to draw attention
function initCtaBreathing() {
  const ctaButton = document.querySelector('#contact .btn-primary')
  if (!ctaButton) return

  // Add class for will-change optimization
  ctaButton.classList.add('cta-breathing')

  // Subtle breathing animation
  gsap.to(ctaButton, {
    scale: 1.02,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    paused: false
  })
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Start Alpine
  window.Alpine = Alpine
  Alpine.start()

  // Initialize ScrollSmoother first (needs to be before other scroll-based animations)
  initScrollSmoother()

  // Initialize scroll progress indicator
  initScrollProgress()

  // Run preloader (which triggers page entrance after)
  initPreloader()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize marquee loops
  initMarqueeLoops()

  // Initialize image load animations
  initImageLoadAnimations()

  // Initialize Material Lab specific animations
  initMaterialLabAnimations()

  // Initialize new animations
  initLineReveals()
  initImageReveals()
  initMagneticButtons()

  // Initialize advanced Capabilities animations
  initCapabilitiesPinReveal()
  initTokenGeneration()

  // Initialize GSAP-only hover handlers (Brand Kit)
  initButtonHovers()
  initNavLinkHovers()
  initElectricLiftHovers()
  initGrainyAuraHovers()
  initFooterLinkHovers()
  initCursorScale()
  initMenuHamburgerAnimation()
  initWorkCardTransitions()
  initCapabilityIndicatorAnimations()
  initDepthCardHovers()
  initHeaderScrollBlur()

  // Initialize Brand Kit v2.0 features
  initTabNavigation()
  initHoverCaptions()
  // initKineticGrid() - Removed for cleaner, warmer feel
  initGrainyCursor()
  initMagneticBadges()

  // Initialize Brand Kit Digital Visual Elements
  initDymaxionGlobe()
  initStaggeredReveal()

  // Initialize warmth/partnership animations
  initCtaBreathing()
})

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
})
