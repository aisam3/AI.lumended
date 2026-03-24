"use client";

import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [year] = useState(currentYear);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const footerLinks = [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = {
    phone: '760 500 84 86',
    email: 'info@aiforhomebuilders.com',
    address: 'San Diego, CA'
  };

  return (
    <footer className="bg-gradient-to-b from-[var(--deep-charcoal)] to-black text-[var(--warm-white)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--warm-navy)]/5 via-transparent to-[var(--amber-gold)]/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--amber-gold)]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div
          className={`py-4 sm:py-6 lg:py-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-6xl mx-auto">
            {/* Tagline - Full width */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
              <div className="inline-block px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg bg-gradient-to-r from-[var(--warm-navy)]/10 to-[var(--amber-gold)]/5 border border-[var(--warm-gray)]/20">
                <p className="text-xs sm:text-sm lg:text-base font-medium text-[var(--warm-white)] leading-tight">
                  You build homes. We build AI that helps you sell and service them.
                </p>
              </div>
            </div>

            {/* Contact Info - ALWAYS 3 COLUMNS - design never changes */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">

              {/* Column 1 - Phone */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-[var(--warm-navy)]/20 to-[var(--amber-gold)]/10 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[var(--amber-gold)]" />
                  </div>
                  <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)]">
                    Call Us
                  </span>
                </div>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="text-[10px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)] hover:text-[var(--amber-gold)] transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
                <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-[var(--warm-gray)] mt-0.5">
                  Available 9AM-5PM PST
                </p>
              </div>

              {/* Column 2 - Email */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-[var(--warm-navy)]/20 to-[var(--amber-gold)]/10 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[var(--amber-gold)]" />
                  </div>
                  <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)]">
                    Email Us
                  </span>
                </div>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[9px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)] hover:text-[var(--amber-gold)] transition-colors duration-300 break-all"
                >
                  {contactInfo.email}
                </a>
                <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-[var(--warm-gray)] mt-0.5">
                  Response within 24 hours
                </p>
              </div>

              {/* Column 3 - Location */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-[var(--warm-navy)]/20 to-[var(--amber-gold)]/10 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[var(--amber-gold)]" />
                  </div>
                  <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)]">
                    Location
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-[var(--warm-white)]">
                  {contactInfo.address}
                </p>
                <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-[var(--warm-gray)] mt-0.5">
                  Serving Homebuilders Nationwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--warm-gray)]/20 my-0 sm:my-2 lg:my-3" />

        {/* Bottom Bar - ALWAYS 3 COLUMNS - design never changes */}
        <div
          className={`py-4 sm:py-5 lg:py-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 items-center">

            {/* Column 1 - Logo & Copyright */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-0.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md overflow-hidden">
                  <img
                    src="/ai-for-homebuilders.jpg"
                    alt="AI for Homebuilders Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[11px] sm:text-xs lg:text-sm font-bold text-[var(--warm-white)]">
                  AI.Lumened
                </h3>
              </div>
              <div className="text-[8px] sm:text-[9px] lg:text-[10px] text-[var(--warm-gray)]">
                © {year} AI.Lumen LLC. All rights reserved.
              </div>
            </div>

            {/* Column 2 - Legal Links - Centered */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] sm:text-[10px] lg:text-[11px] text-[var(--warm-gray)] hover:text-[var(--amber-gold)] transition-all duration-300 group whitespace-nowrap ${hoveredLink === link.name ? 'text-[var(--amber-gold)]' : ''
                    }`}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[var(--amber-gold)] to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              ))}
            </div>

            {/* Column 3 - Back to Top - Right aligned */}
            <div className="flex items-center justify-end">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-3 py-1 sm:py-1.5 rounded-full bg-[var(--deep-charcoal)] border border-[var(--warm-gray)]/30 hover:border-[var(--amber-gold)]/50 hover:bg-[var(--warm-navy)]/20 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-[var(--warm-gray)] group-hover:text-[var(--amber-gold)] transition-colors duration-300">
                  Back to top
                </span>
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-[var(--amber-gold)]/20 to-[var(--soft-gold)]/20 flex items-center justify-center group-hover:from-[var(--amber-gold)]/30 group-hover:to-[var(--soft-gold)]/30 transition-all duration-300">
                  <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--amber-gold)] rotate-[-45deg] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}