import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

interface CaseStudy {
  name: string
  tag: string
  tagColor?: string
  image: string
  description: string
  badge?: string
  badgeIcon?: string
}

const caseStudies: CaseStudy[] = [
  { name: 'Perhitsiksha', tag: 'Website, CRM, Sales', tagColor: 'text-laser', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', description: 'Website, tailor-made workflows, CRM automation', badge: 'Full Stack', badgeIcon: 'fa-robot' },
  { name: 'White Space Studio', tag: 'AI Automation', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', description: 'AI automation for project costing & docs', badge: 'Architecture', badgeIcon: 'fa-building' },
  { name: 'CargoSphere', tag: 'GTM & Website', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80', description: 'Go-to-market for global cargo-tech expansion' },
  { name: 'TMEN Systems', tag: 'Sales Enablement', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', description: 'Sales enablement and GTM systems' },
  { name: 'Cargomen', tag: 'ERP Automation', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Automated credit control, support workflows, dashboards' },
  { name: 'Alamirap Nutrition', tag: 'Lead Funnels', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', description: 'End-to-end automation for lead funnels & CRM' },
  { name: 'JB Singh & Sons', tag: 'Website + AI', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', description: 'Website and AI automation workflows' },
  { name: 'Numbers', tag: 'Learning App', image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80', description: 'Custom learning app to practice mental maths' },
  { name: 'Birdsong', tag: 'Mobile App', image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80', description: 'Location-aware birding app; collect birds by listening', badge: 'Mobile App', badgeIcon: 'fa-mobile-screen' },
  { name: 'Troupex', tag: 'Coming Soon', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80', description: 'Social network for entertainment professionals', badge: 'Coming Soon', badgeIcon: 'fa-clock' }
]

export const Work: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.work-animate'), {
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
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-oled relative overflow-hidden" id="work">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-6 work-animate">
          <div className="cyan-divider-line"></div>
          <span className="cyan-divider-label">Selected Work</span>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav mb-10 work-animate">
          <button className="tab-trigger active">All Projects</button>
          <button className="tab-trigger">AI & Automation</button>
          <button className="tab-trigger">Web & Apps</button>
          <button className="tab-trigger">GTM & Sales</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Case Studies List */}
          <div className="space-y-2" role="listbox" aria-label="Case studies">
            {caseStudies.map((study, index) => (
              <button
                key={study.name}
                role="option"
                aria-selected={activeCase === index}
                className={`work-item w-full text-left text-[20px] md:text-[24px] font-bold leading-tight cursor-pointer transition-colors duration-200 bg-transparent border-none ${
                  activeCase === index ? 'text-white' : 'text-white/50 hover:text-white/70'
                }`}
                onMouseEnter={() => setActiveCase(index)}
                onFocus={() => setActiveCase(index)}
                onClick={() => setActiveCase(index)}
              >
                {study.name}{' '}
                <span className={`text-[10px] font-normal ml-1 ${study.tagColor || ''}`}>
                  {study.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Right - Featured Card (single visible) */}
          <div className="relative aspect-[4/3]">
            {caseStudies.map((study, index) => (
              <div
                key={study.name}
                className={`work-card depth-card absolute inset-0 rounded-none overflow-hidden transition-opacity duration-300 ${
                  activeCase === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={study.image}
                  alt={study.name}
                  className="absolute inset-0 w-full h-full object-cover filter-standard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oled/80 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-[22px] md:text-[26px] font-bold text-white leading-tight">
                    {study.description}
                  </h3>
                </div>
                {study.badge && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 flex items-center gap-2">
                    <i className={`fa-solid ${study.badgeIcon} text-grey-600 text-[10px]`} />
                    <span className="text-[10px] text-grey-900 font-medium">{study.badge}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
