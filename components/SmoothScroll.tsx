"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Avoid running on mobile devices to save performance if it struggles,
    // though Lenis is highly optimized and usually runs great on modern phones.
    const isMobile = window.innerWidth < 768;
    
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Dynamically update GSAP ScrollTrigger on every Lenis smooth scroll step
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize Lenis raf updates with the high-precision GSAP animation ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Disable GSAP lag smoothing to maintain lock-step responsiveness during scrubs
    gsap.ticker.lagSmoothing(0);

    // Global scroll helper to let other components trigger or disable scrolling if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
