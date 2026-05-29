"use client";

import { ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.5 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-[#000F08] py-12 md:py-20 w-full overflow-hidden">
      {/* Accent Red Line Overlay at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/45 to-transparent"></div>

      {/* Cinematic Red Glow Atmosphere Backdrop */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70vw] h-[35vw] rounded-full ambient-glow-red opacity-25 mix-blend-screen pointer-events-none filter blur-3xl -z-10"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full flex flex-col gap-12 md:gap-16">
        
        {/* Top Section: Logo & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a
              href="#home"
              onClick={handleScrollTop}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="text-[14px] font-bold uppercase tracking-[0.35em] text-white transition-all group-hover:tracking-[0.38em] group-hover:text-brand-red select-none">
                Launch<span className="text-white/60 group-hover:text-white">Layer</span>
              </span>
            </a>
            
            <p className="max-w-xs text-[11px] sm:text-xs text-white/40 leading-relaxed font-light mt-2">
              Launch Layer constructs immersive digital portals, premium 3D structures, and Apple-grade systems layer by layer.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white/40">Navigation Nodes</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#home" onClick={handleScrollTop} className="text-[11px] text-white/60 hover:text-brand-red transition-colors w-fit">
                Home
              </a>
              <a href="#services" onClick={(e) => handleLinkClick(e, "#services")} className="text-[11px] text-white/60 hover:text-brand-red transition-colors w-fit">
                Services
              </a>
              <a href="#work" onClick={(e) => handleLinkClick(e, "#work")} className="text-[11px] text-white/60 hover:text-brand-red transition-colors w-fit">
                Work
              </a>
              <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")} className="text-[11px] text-white/60 hover:text-brand-red transition-colors w-fit">
                Contact
              </a>
            </div>
          </div>

          {/* System Social links */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-white/40">Social Channels</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 border border-white/5 bg-white/[0.01] hover:border-brand-red/45 hover:bg-brand-red/5 rounded-lg flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(251,54,64,0.2)] group"
                aria-label="GitHub Link"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white/60 group-hover:text-brand-red transition-colors" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-white/5 bg-white/[0.01] hover:border-brand-red/45 hover:bg-brand-red/5 rounded-lg flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(251,54,64,0.2)] group"
                aria-label="Twitter Link"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white/60 group-hover:text-brand-red transition-colors" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-white/5 bg-white/[0.01] hover:border-brand-red/45 hover:bg-brand-red/5 rounded-lg flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(251,54,64,0.2)] group"
                aria-label="LinkedIn Link"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white/60 group-hover:text-brand-red transition-colors" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic sub-divider line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Bottom Section: Legal & Copyrights */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-2 gap-6 font-mono text-[9px] uppercase tracking-widest text-white/30">
          
          {/* Copyrights */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-brand-red animate-pulse" />
            <span>&copy; {new Date().getFullYear()} Launch Layer. All Systems operational.</span>
          </div>

          {/* Legal link rows */}
          <div className="flex gap-6 items-center">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            
            {/* Scroll back up anchor */}
            <a
              href="#home"
              onClick={handleScrollTop}
              className="w-8 h-8 rounded-full border border-white/5 hover:border-brand-red/50 hover:bg-brand-red/5 flex items-center justify-center text-white/50 hover:text-brand-red transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
