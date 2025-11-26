import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MOTION } from '../App'

interface Capability {
  title: string
  description: string
  features: { label: string; text: string }[]
}

const capabilities: Capability[] = [
  {
    title: 'AUTOMATE with Intelligent Workflows',
    description: 'We tuck LLMs and autonomous agents into the tools you already use so the busywork runs itself and your team focuses on the work that needs judgment.',
    features: [
      { label: 'Custom Copilots', text: 'Focused assistants for your internal teams (ops, sales, support, finance)' },
      { label: 'RAG Systems', text: 'Instant answers from your own docs, tickets, and data. Not the open internet.' },
      { label: 'Decision Agents', text: 'Automated triage, routing, and if-this-then-that logic across tools' },
      { label: 'End-to-End Ops', text: 'Hands-free execution of the messy workflows that currently live in spreadsheets and inboxes' }
    ]
  },
  {
    title: 'BUILD AI-Native Products',
    description: 'Go from "I have an idea" to people actually using it. We build web and mobile apps with AI woven into the experience. Not bolted on as a gimmick.',
    features: [
      { label: 'Rapid Prototyping', text: 'Clickable, usable concepts in days, not months' },
      { label: 'Production Builds', text: 'Architecture that can handle real users, not just demo traffic' },
      { label: 'Deep Integration', text: 'AI shows up where it helps the user, not just where it looks clever' },
      { label: 'Evaluation Loops', text: 'Usage analytics and experiments so adoption doesn\'t stall after launch' }
    ]
  },
  {
    title: 'SCALE with GTM & Revenue Systems',
    description: 'Scale your sales engine without scaling headcount. We automate the path from lead to closed-won and make your funnel actually visible.',
    features: [
      { label: 'CRM Automation', text: 'Smart routing, follow-ups, and personalization in the CRM you already use' },
      { label: 'RevOps Visibility', text: 'Real-time dashboards that show what\'s moving the needle (and what\'s stuck)' },
      { label: 'Sales Engineering', text: 'Automated technical follow-ups, demos, and outreach sequences' },
      { label: 'Growth Experiments', text: 'Ship → Measure → Refine loops baked into your GTM, not tacked on later' }
    ]
  },
  {
    title: 'CONVERT with AI-Assisted Web & Brand Systems',
    description: 'We build websites and brand systems that actually pull their weight: clear story, clean UX, and content that keeps up as you grow.',
    features: [
      { label: 'Strategic Design', text: 'Brand narrative, information architecture, and full-site build in one track' },
      { label: 'Performance', text: 'AI-assisted content and programmatic SEO so pages don\'t sit empty' },
      { label: 'Optimization', text: 'Layouts and flows designed to increase signups, demos, or whatever "conversion" means for you' }
    ]
  }
]

export const Capabilities: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.capability-card')

      cards.forEach((card) => {
        gsap.from(card, {
          y: MOTION.distance.small,
          duration: MOTION.duration.default,
          ease: MOTION.ease.smooth,
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        })
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-12 bg-oled relative overflow-hidden" id="services">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Cyan Accent Divider */}
        <div className="cyan-divider mb-6">
          <div className="cyan-divider-line"></div>
          <span className="cyan-divider-label">What We Do</span>
        </div>

        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.03em] text-white mb-12">
          Our Capabilities
        </h2>

        <div className="grid gap-8">
          {capabilities.map((cap, index) => (
            <div key={index} className="capability-card depth-card p-8 md:p-10 bg-surface rounded-none">
              <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-4">{cap.title}</h3>
              <p className="text-[14px] md:text-[15px] text-white/70 mb-6 leading-relaxed">{cap.description}</p>
              <ul className="space-y-3 text-[13px] text-white/80">
                {cap.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-laser">•</span>
                    <span><strong>{feature.label}:</strong> {feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
