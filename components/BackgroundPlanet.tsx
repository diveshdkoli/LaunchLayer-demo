"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RedPlanet from "./RedPlanet";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundPlanet() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Elegant, premium deep-space parallax drift
    const anim = gsap.to(el, {
      y: "32vh", // Slow, powerful vertical descent
      x: "-4vw", // Subtle diagonal drift
      scale: 0.92, // Slight size scaling to simulate massive deep space perspective
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.6, // Very smooth, cushioned parallax scrubbing response
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <>
      {/* 
        GLOBAL RED PLANET BACKGROUND ATMOSPHERE:
        Subtly positioned in fixed space, layered deeply behind all content (-z-30),
        and pointer-events-none to prevent any UI mouse click interruptions.
        Uses optimized mix-blend-screen and soft opacity (45%) to ensure text readability.
      */}
      <div
        ref={containerRef}
        className="fixed right-[-12vw] top-[3vh] w-[46vw] h-[46vw] min-w-[360px] max-w-[650px] -z-30 pointer-events-none select-none opacity-45 mix-blend-screen"
      >
        <RedPlanet />
      </div>

      {/* Cinematic Planet Atmosphere Overlay to blend sphere edges into deep space */}
      <div className="fixed right-[-12vw] top-[3vh] w-[46vw] h-[46vw] min-w-[360px] max-w-[650px] -z-25 pointer-events-none rounded-full bg-radial from-transparent via-[#000F08]/30 to-[#000F08]/95 opacity-80 mix-blend-multiply"></div>
      
      {/* Ambient background red lighting accent pulse behind content */}
      <div className="fixed right-[-10vw] top-[5vh] w-[65vw] h-[65vw] rounded-full ambient-glow-red -z-40 opacity-25 mix-blend-screen pointer-events-none filter blur-3xl"></div>
    </>
  );
}
