"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Morph navbar past 60px
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for indicator
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top is in upper half of viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        // High-end smooth scroll using Lenis
        lenis.scrollTo(element, {
          offset: -80,
          duration: 1.5,
        });
      } else {
        // Standard smooth scroll fallback
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "top-4 px-4 sm:px-6 md:px-8"
            : "top-0 px-0"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ease-out ${
            scrolled
              ? "rounded-full bg-brand-black/60 border border-brand-red/10 backdrop-blur-md px-6 py-2.5 shadow-[0_10px_35px_rgba(0,15,8,0.7)] hover:border-brand-red/25 hover:shadow-[0_10px_40px_rgba(251,54,64,0.1)] md:py-3 max-w-4xl"
              : "border-b border-white/5 bg-transparent px-6 py-5 md:px-12 md:py-6"
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="text-[14px] font-bold uppercase tracking-[0.35em] text-white transition-all group-hover:tracking-[0.38em] group-hover:text-brand-red select-none">
                Launch<span className="text-white/60 group-hover:text-white">Layer</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative text-[11px] font-medium uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {/* Tiny active bottom glow */}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-brand-red rounded-full shadow-[0_0_8px_#FB3640]"></span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Premium CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="relative overflow-hidden group inline-flex items-center gap-1.5 px-4.5 py-2 border border-brand-red/40 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-brand-red hover:bg-brand-red/5 bg-brand-red/5"
              >
                <span className="relative z-10">Start Launch</span>
                <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {/* Button inner glow overlay */}
                <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white/70 hover:text-white p-1 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black/98 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full justify-center px-10 py-20">
          <div className="flex flex-col gap-8">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-2xl font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive ? "text-brand-red pl-4 border-l-2 border-brand-red" : "text-white/50 hover:text-white"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${idx * 75}ms` : "0ms",
                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(-30px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
          
          <div
            className="mt-16 border-t border-white/10 pt-8"
            style={{
              transitionDelay: mobileMenuOpen ? "450ms" : "0ms",
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(30px)",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="w-full flex items-center justify-between px-6 py-4 border border-brand-red/50 bg-brand-red/5 text-xs uppercase tracking-widest font-bold rounded-lg text-white"
            >
              <span>Initialize Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
