"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const [pulseActive, setPulseActive] = useState(false);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Periodic energy wave pulse from background planet (every 9 seconds)
  useEffect(() => {
    const triggerPulse = () => {
      setPulseActive(true);

      const buttons = document.querySelectorAll(".pulse-glow-button");
      buttons.forEach((btn) => {
        btn.classList.add("animate-pulse-fast");
      });

      setTimeout(() => {
        setPulseActive(false);
        buttons.forEach((btn) => {
          btn.classList.remove("animate-pulse-fast");
        });
      }, 3500);
    };

    const firstTimeout = setTimeout(triggerPulse, 3500);
    const interval = setInterval(triggerPulse, 10000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  // Performance-optimized Background Particle Canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const maxParticles = isMobile ? 35 : 75;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      isRed: boolean;
    }> = [];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.25 + 0.1),
        speedX: Math.random() * 0.15 - 0.075,
        alpha: Math.random() * 0.45 + 0.15,
        isRed: Math.random() < 0.28, // Stable elegant red embers (28%)
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let animationId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible || !ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Night Black Base
      ctx.fillStyle = "#000F08";
      ctx.fillRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
          p.alpha = Math.random() * 0.4 + 0.2;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isRed) {
          ctx.fillStyle = `rgba(251, 54, 64, ${p.alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.45})`; // Soften white particles for depth
        }

        ctx.fill();
      });

      // Subtle, breathable dark cyber grid
      ctx.strokeStyle = "rgba(251, 54, 64, 0.015)";
      ctx.lineWidth = 0.5;
      const gridSize = 140;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden md:py-28"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full object-cover -z-30 pointer-events-none"
      />

      {/* Dynamic Background Red Glow (Radial Overlay) */}
      <div className="absolute right-[-10%] top-[-10%] w-[60vw] h-[60vw] rounded-full ambient-glow-red -z-20 opacity-40 mix-blend-screen pointer-events-none"></div>
      <div className="absolute left-[-20%] bottom-[-10%] w-[50vw] h-[50vw] rounded-full ambient-glow-red -z-20 opacity-20 pointer-events-none"></div>

      {/* Energy Wave Pulse Animation Ring */}
      <div
        className={`wave-pulse-overlay transition-all duration-[3500ms] ease-out ${
          pulseActive
            ? "scale-[25] opacity-100 border-brand-red/30"
            : "scale-100 opacity-0 border-brand-red/0"
        }`}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Column: Premium Human Copywriting */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-left relative pr-0 lg:pr-8">
          {/* Subtle Minimal Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-red/20 bg-brand-red/5 rounded-full w-fit backdrop-blur-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              {t("tagline")}
            </span>
          </div>

          {/* Simple, Confident, Human Headline */}
          <h1 className="text-[clamp(1.85rem,5.2vw,3.75rem)] font-bold tracking-tight text-white leading-[1.15] select-none uppercase text-balance break-words">
            {t("titleLine1")} <br />
            {t("titleLine2")} <br />
            <span className="text-gradient-red drop-shadow-[0_0_25px_rgba(251,54,64,0.15)]">
              {t("titleLine3")}
            </span>
          </h1>

          {/* Confident, Professional description of business value */}
          <p className="max-w-xl text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-light">
            {t("description")}
          </p>

          {/* Premium Action CTAs */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#contact"
              onClick={(e) => handleCTA(e, "#contact")}
              className="pulse-glow-button px-8 py-4 border border-brand-red bg-brand-red/90 hover:bg-transparent rounded-full text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_4px_30px_rgba(251,54,64,0.3)] hover:shadow-[0_4px_30px_rgba(251,54,64,0.1)] hover:border-white/25 transition-all duration-300 select-none group"
            >
              {t("btnBuild")}
            </a>

            <a
              href="#work"
              onClick={(e) => handleCTA(e, "#work")}
              className="px-8 py-4 border border-white/10 hover:border-brand-red/40 bg-white/5 hover:bg-brand-red/5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 select-none flex items-center gap-2 group"
            >
              <span>{t("btnExplore")}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Properly Scaled and Repositioned Spline Accordion */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-md h-[460px] sm:h-[500px] md:h-[530px] rounded-2xl overflow-hidden glass-panel border border-brand-red/10 shadow-[0_20px_50px_rgba(251,54,64,0.08)] backdrop-blur-md flex flex-col p-1.5 group transition-all duration-500 hover:border-brand-red/25 hover:shadow-[0_20px_50px_rgba(251,54,64,0.15)] animate-float-slow">
            {/* Ambient inner card glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="w-full h-full rounded-xl overflow-hidden relative spline-embed-container bg-[#050505] border border-white/5">
              <iframe
                src="https://my.spline.design/verticallayoutaccordioncopycopy-FQt5QSeP7ERlIhT1qpdBWKPQ-4dm/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="w-full h-full block"
                allow="autoplay; fullscreen"
              ></iframe>

              {/* Masking telemetry panel overlay to cover external Spline watermarks */}
              <div className="absolute bottom-2.5 right-2.5 bg-[#000F08] border border-brand-red/25 px-2 py-0.5 rounded text-[8px] font-mono text-brand-red uppercase tracking-widest z-20 select-none flex items-center gap-1.5 shadow-[0_0_8px_rgba(251,54,64,0.3)]">
                <span className="w-1 h-1 rounded-full bg-brand-red animate-ping"></span>
                CORE_SYS // LNCH-LYR
              </div>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center pointer-events-none font-mono text-[8px] text-white/30 tracking-widest uppercase">
              <span>{t("interactiveSpecs")}</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-ping"></span>
                {t("systemOperational")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Prompt */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/20 cursor-pointer hover:text-brand-red transition-colors z-10"
        onClick={(e) => handleCTA(e as any, "#services")}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.25em]">
          {t("exploreSystem")}
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
