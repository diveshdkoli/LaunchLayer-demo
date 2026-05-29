"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already seen the intro this session
    const hasSeenIntro = sessionStorage.getItem("launchlayer_intro_seen");

    if (hasSeenIntro === "true") {
      setVisible(false);
      return;
    }

    // Disable scrolling during loader play
    document.body.style.overflow = "hidden";

    // Hide the actual navbar logo initially so it can fade in during the transition
    const destEl = document.querySelector("#navbar-logo");
    if (destEl) {
      gsap.set(destEl, { opacity: 0 });
    }

    // Start GSAP Animation context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("launchlayer_intro_seen", "true");
          document.body.style.overflow = "";
          setVisible(false);
        },
      });

      // 1. Initial logo fade and scale in
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      })
      // 2. Pulse scanner laser line
      .to(
        ".scanner-line",
        {
          scaleY: 1.5,
          opacity: 1,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
        },
        "-=0.4"
      )
      // 3. FLIP position matching to Navbar Logo
      .add(() => {
        const destLogo = document.querySelector("#navbar-logo");
        if (destLogo && logoRef.current) {
          const srcRect = logoRef.current.getBoundingClientRect();
          const destRect = destLogo.getBoundingClientRect();

          // Calculate exact offsets
          const deltaX = destRect.left - srcRect.left;
          const deltaY = destRect.top - srcRect.top;
          const scale = destRect.width / srcRect.width;

          gsap
            .timeline({
              onComplete: () => {
                // Instantly display actual navbar logo and remove overlay
                gsap.set(destLogo, { opacity: 1 });
              },
            })
            .to(logoRef.current, {
              x: deltaX,
              y: deltaY,
              scale: scale,
              duration: 1.0,
              ease: "power4.inOut",
            })
            .to(
              containerRef.current,
              {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              "-=0.7"
            );
        } else {
          // Standard fade transition fallback (e.g. subpages where header logo differs)
          gsap
            .timeline()
            .to(logoRef.current, {
              opacity: 0,
              scale: 0.8,
              duration: 0.6,
              ease: "power2.in",
            })
            .to(containerRef.current, { opacity: 0, duration: 0.4 }, "-=0.3");
        }
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      id="intro-overlay"
      className="fixed inset-0 z-[999] bg-[#000F08] flex items-center justify-center select-none"
    >
      <div
        ref={logoRef}
        className="flex items-center gap-3.5 opacity-0 scale-75 filter blur-[10px] origin-center px-6"
      >
        {/* Premium Emitter Mark */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-brand-red/50 rounded-sm rotate-45"></div>
          <div className="absolute w-4 h-4 bg-white rounded-xs rotate-45 shadow-[0_0_15px_#fff]"></div>
          <div className="scanner-line absolute top-0 bottom-0 left-1/2 w-[2px] bg-brand-red opacity-0 scale-y-0 origin-center shadow-[0_0_10px_#FB3640]"></div>
        </div>

        {/* Logo Text */}
        <span className="text-[clamp(1.35rem,6vw,2rem)] font-black uppercase tracking-[clamp(0.18em,2.2vw,0.4em)] text-white text-balance break-words leading-tight">
          Launch<span className="text-gradient-red drop-shadow-[0_0_15px_rgba(251,54,64,0.35)]">Layer</span>
        </span>
      </div>
    </div>
  );
}
