import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  'Quick Links': ['Home', 'About Us', 'Shop Directory', 'Media Center', 'Contact'],
  'Categories': ['Electronics', 'Fashion', 'Furniture', 'Food Court', 'Building Materials'],
  'Support': ['Mall Map', 'Careers', 'Feedback', 'Privacy Policy', 'Terms of Service'],
};

const socials = [
  { name: 'Facebook', handle: 'dragoncitybahrain' },
  { name: 'Instagram', handle: 'dragoncitybh' },
  { name: 'YouTube', handle: 'DragonCityBahrain' },
  { name: 'X', handle: 'dragoncitybh' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/5">
      {/* Newsletter CTA */}
      <div className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Chinese pattern background */}
        <div className="absolute inset-0">
          <img
            src="/images/chinese-pattern-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.2]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-[#030303]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-[#030303]/60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 font-chinese text-[200px] text-white/[0.015] select-none pointer-events-none hidden lg:block">
          订阅
        </div>

        <div className="max-w-[1400px] mx-auto relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Stay Updated</h3>
              <span className="font-chinese text-dragon/30 text-lg">保持更新</span>
            </div>
            <p className="text-white/40 text-sm">Get the latest promotions, events, and offers from Dragon City.</p>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 lg:w-80 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white text-sm placeholder-white/25 focus:outline-none focus:border-dragon/50 transition-colors"
            />
            <button className="px-8 py-4 bg-dragon hover:bg-dragon-light text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-dragon/20 flex-shrink-0 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative px-6 md:px-12 lg:px-20 py-16 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/chinese-pattern-bg.jpg" alt="" className="w-full h-full object-cover opacity-[0.25]" />
        </div>
        <div className="absolute inset-0 bg-[#030303]/60" />
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img
                  src="/images/footer-logo.png"
                  alt="Dragon City Bahrain"
                  className="h-14 w-auto object-contain"
                />
              </div>

              <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-sm">
                The largest wholesale and retail trading centre in the Kingdom of Bahrain,
                located in Diyar Al Muharraq.
              </p>
              <p className="font-chinese text-sm text-dragon/20 mb-6">
                巴林王国最大的批发和零售贸易中心
              </p>

              <div className="space-y-3">
                <a href="tel:+97317000000" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-dragon" />
                  +973 1700 0000
                </a>
                <a href="mailto:info@dragoncity.bh" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-dragon" />
                  info@dragoncity.bh
                </a>
                <div className="flex items-start gap-3 text-sm text-white/40">
                  <MapPin className="w-4 h-4 text-dragon flex-shrink-0 mt-0.5" />
                  Diyar Al Muharraq, Kingdom of Bahrain
                </div>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h5 className="text-xs font-semibold text-white/60 tracking-widest uppercase mb-6">{title}</h5>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="group flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors">
                        {link}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative px-6 md:px-12 lg:px-20 py-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/chinese-pattern-bg.jpg" alt="" className="w-full h-full object-cover opacity-[0.2]" />
        </div>
        <div className="absolute inset-0 bg-[#030303]/65" />
        <div className="max-w-[1400px] mx-auto relative flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-white/25">&copy; 2026 Dragon City Bahrain. All Rights Reserved.</p>
            <span className="font-chinese text-xs text-white/10">龙城巴林</span>
          </div>

          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a key={s.name} href="#" className="text-xs text-white/25 hover:text-white transition-colors">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
