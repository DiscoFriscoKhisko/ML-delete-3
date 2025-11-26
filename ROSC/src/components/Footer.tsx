import React from 'react'

const socialLinks = [
  { href: 'http://wa.me/918050131733', icon: 'fa-whatsapp', brand: true },
  { href: 'https://www.linkedin.com/company/material-lab-io/', icon: 'fa-linkedin-in', brand: true },
  { href: 'https://x.com/kaushiknaarayan', icon: 'fa-x-twitter', brand: true },
  { href: 'https://github.com/material-lab-io', icon: 'fa-github', brand: true },
  { href: 'https://blog.kaushiknaarayan.me/', icon: 'fa-blog', brand: false }
]

const navLinks = [
  { href: '#services', label: 'Capabilities' },
  { href: '#work', label: 'Work' },
  { href: '#how-we-work', label: 'The Blueprint' },
  { href: '#about', label: 'About' }
]

const founders = [
  { name: 'Damini Rathi', href: 'https://www.linkedin.com/in/daminirathi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Kaushik Naarayan', href: 'https://www.linkedin.com/in/kaushik-naarayan/', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }
]

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 md:px-8 lg:px-12 bg-oled relative overflow-hidden">
      {/* Footer Content */}
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {/* Contact & Socials */}
          <div>
            <h4 className="text-[16px] md:text-[18px] font-medium text-white mb-6">Get in touch</h4>
            <a href="mailto:damini@materiallab.io" className="footer-link text-[14px] text-laser block mb-4 hover:opacity-80 transition-opacity">
              damini@materiallab.io
            </a>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="social-link flex items-center gap-0.5 text-white/60 text-[12px] hover:text-laser transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${link.brand ? 'fa-brands' : 'fa-solid'} ${link.icon}`}></i>
                  <i className="fa-solid fa-arrow-up-right text-[7px]"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <ul className="space-y-3 text-[14px] text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link hover:text-laser transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Founders */}
          <div>
            <h4 className="text-[14px] font-medium text-white/60 mb-4">Founders</h4>
            <div className="space-y-4">
              {founders.map((founder) => (
                <a
                  key={founder.name}
                  href={founder.href}
                  className="footer-nav-link flex items-center gap-3 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-white/10 flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover filter-standard opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[14px] text-white/80 group-hover:text-laser transition-colors">{founder.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="relative mb-8">
          <img
            src="./assets/logos/material-lab-wordmark-white.svg"
            alt="Material Lab"
            className="footer-logo h-[60px] md:h-[100px] lg:h-[140px] xl:h-[160px] w-auto"
          />
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-white/40">
          <span>© 2025 Material Lab. Building delightful things for good people.</span>
        </div>
      </div>
    </footer>
  )
}
