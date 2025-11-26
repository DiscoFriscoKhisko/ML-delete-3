import React from 'react'

const clients = [
  'Perhitsiksha',
  'White Space Studio',
  'CargoSphere',
  'TMEN Systems',
  'Cargomen',
  'Alamirap Nutrition',
  'JB Singh & Sons',
  'Numbers App',
  'Birdsong',
  'Troupex'
]

export const ClientMarquee: React.FC = () => {
  return (
    <section className="py-8 bg-oled border-y border-white/10 overflow-hidden">
      <div className="client-marquee-wrapper">
        <div className="client-marquee flex gap-12 animate-marquee">
          {/* Double the items for seamless loop */}
          {[...clients, ...clients].map((client, index) => (
            <span key={index} className="client-marquee-item text-[14px] font-medium text-white/60 whitespace-nowrap">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
