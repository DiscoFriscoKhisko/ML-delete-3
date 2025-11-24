import Alpine from 'alpinejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

// Preloader animation
function initPreloader() {
  const preloader = document.querySelector('.preloader')
  const counter = document.querySelector('.preloader-counter')
  const logo = document.querySelector('.preloader-logo')

  if (!preloader || !counter) return

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          preloader.style.display = 'none'
          pageEntranceAnimation()
        }
      })
    }
  })

  // Fade in logo
  tl.to(logo, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  })

  // Count up animation
  tl.to({}, {
    duration: 2,
    onUpdate: function() {
      const progress = Math.round(this.progress() * 100)
      counter.textContent = progress + '%'
    },
    ease: 'power2.inOut'
  }, '-=0.3')
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
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out',
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
      ease: 'power4.out',
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
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
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

// Page entrance animation - SVG Ellipse Mask Reveal
function pageEntranceAnimation() {
  const ellipse = document.querySelector('.js-reveal-ellipse')
  const heroTitle = document.querySelector('.hero-title')
  const heroSubtitle = document.querySelector('.hero-subtitle')
  const heroCta = document.querySelector('.hero-cta')

  if (!ellipse) return

  const tl = gsap.timeline()

  // Ellipse reveal - exact values from original
  tl.to(ellipse, {
    attr: { rx: 2700, ry: 2150 },
    duration: 1.25,
    ease: 'power2.out'
  })

  // Hero content animations
  if (heroTitle) {
    tl.from(heroTitle, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
  }

  if (heroSubtitle) {
    tl.from(heroSubtitle, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
  }

  if (heroCta) {
    tl.from(heroCta, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3')
  }
}

// Scroll animations with ScrollTrigger
function initScrollAnimations() {
  // Fade in elements on scroll
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // Logo items stagger animation
  const logoItems = document.querySelectorAll('.logo-item')
  if (logoItems.length) {
    gsap.from(logoItems, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.logo-grid',
        start: 'top 80%'
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
      duration: 0.6,
      delay: 1.5,
      ease: 'power3.out'
    })
  }

  // Hero CTAs animation
  const heroCtas = document.querySelectorAll('.hero-cta-btn')
  if (heroCtas.length) {
    gsap.from(heroCtas, {
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      delay: 2,
      ease: 'back.out(1.7)'
    })
  }

  // Capability cards stagger animation
  const capabilityCards = document.querySelectorAll('.capability-card')
  if (capabilityCards.length) {
    gsap.from(capabilityCards, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: capabilityCards[0].parentElement,
        start: 'top 75%'
      }
    })
  }

  // Work items animation
  const workItems = document.querySelectorAll('.work-item')
  if (workItems.length) {
    gsap.from(workItems, {
      x: -30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: workItems[0].parentElement,
        start: 'top 70%'
      }
    })
  }

  // How We Work cards
  const howWeWorkCards = document.querySelectorAll('.how-we-work-card')
  if (howWeWorkCards.length) {
    howWeWorkCards.forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%'
        }
      })
    })
  }

  // Why choose us items
  const whyItems = document.querySelectorAll('.why-item')
  if (whyItems.length) {
    gsap.from(whyItems, {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: whyItems[0].parentElement,
        start: 'top 75%'
      }
    })
  }

  // Fine print cards
  const finePrintCards = document.querySelectorAll('.fine-print-card')
  if (finePrintCards.length) {
    gsap.from(finePrintCards, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
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
      duration: 1,
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Start Alpine
  window.Alpine = Alpine
  Alpine.start()

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
})

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
})
