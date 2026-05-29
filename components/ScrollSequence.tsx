"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const framesCount = 96;
const textMilestones = [
  {
    text: "01 / ASSEMBLY",
    desc: "Precision-engineered from the foundation. Where raw mathematical logic meets absolute visual perfection.",
    start: 0.12,
    end: 0.28,
  },
  {
    text: "02 / IDENTITY",
    desc: "Form follows intent. A striking digital presence shaped to tell your brand’s true story.",
    start: 0.36,
    end: 0.52,
  },
  {
    text: "03 / MOTION",
    desc: "Visceral speed and fluid grace, making every touchpoint feel alive and effortless.",
    start: 0.60,
    end: 0.76,
  },
  {
    text: "04 / ASCENT",
    desc: "The elements align. Seamlessly deployed to launch your business into the absolute future.",
    start: 0.82,
    end: 0.96,
  },
];

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [activeTextIdx, setActiveTextIdx] = useState<number | null>(null);

  // Preloading image frames into buffer array
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      const progress = Math.min(Math.round((loadedCount / framesCount) * 100), 100);
      setLoadPercent(progress);

      if (loadedCount === framesCount) {
        setImages(tempImages);
        setLoading(false);
      }
    };

    for (let i = 1; i <= framesCount; i++) {
      const img = new Image();
      // Format number to 3-digit (e.g. 001, 054, etc.)
      const frameStr = String(i).padStart(3, "0");
      img.src = `/allframehere/ezgif-frame-${frameStr}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Continue even if one fails
      tempImages.push(img);
    }
  }, []);

  // GSAP scroll trigger scrubbing
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !containerRef.current || !triggerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // GSAP ScrollTrigger setup object (instantiated early to be available in resizeCanvas closure)
    const scrollObj = { frame: 0 };

    // Set canvas sizes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(scrollObj.frame);
    };

    // Draw frame utilizing cover scaling logic (similar to CSS object-fit: cover)
    const drawFrame = (index: number) => {
      const roundedIndex = Math.min(framesCount - 1, Math.max(0, Math.round(index)));
      const img = images[roundedIndex];
      if (!img || !ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Aspect ratios
      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image aspect ratio
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        // Canvas is taller than image aspect ratio
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial resize call
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Scrub counter timeline with EXPLICIT GSAP PINNING to center the frame assembly
    const anim = gsap.to(scrollObj, {
      frame: framesCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current, // Pin the parent section
        start: "top top",
        end: "+=260%", // Pin for 2.6x the screen height
        scrub: 0.4, // Smooth inertial scrub
        pin: true, // Explicit GSAP Pinning
        pinSpacing: true, // Spacing generated naturally by GSAP
        anticipatePin: 1, // Buffers layout jumps on pinning entry
        onUpdate: (self) => {
          drawFrame(scrollObj.frame);
          
          // Track scroll progress to animate overlay text indices
          const progress = self.progress;
          let activeIdx = null;

          for (let i = 0; i < textMilestones.length; i++) {
            const m = textMilestones[i];
            if (progress >= m.start && progress <= m.end) {
              activeIdx = i;
              break;
            }
          }
          setActiveTextIdx(activeIdx);
        },
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [images]);

  return (
    <section ref={triggerRef} className="relative w-full h-screen bg-brand-black overflow-hidden select-none">
      
      {/* Viewport Frame Container */}
      <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {loading ? (
          <div className="absolute inset-0 bg-brand-black flex flex-col items-center justify-center z-30">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Spinning luxury loader rings */}
              <div className="absolute inset-0 border border-white/5 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-brand-red rounded-full animate-spin [animation-duration:1.2s]"></div>
              <span className="text-sm font-semibold tracking-widest text-white">{loadPercent}%</span>
            </div>
            
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-brand-red animate-pulse">
              Buffering Assembly Sequence
            </p>
          </div>
        ) : (
          <>
            {/* Canvas Player */}
            <canvas ref={canvasRef} className="w-full h-full block bg-black sequence-canvas-active" />
            
            {/* Atmospheric Red Glowing Overlays representing Imperial Night theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-transparent to-brand-black/90 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/90 pointer-events-none"></div>
            <div className="absolute left-[-15%] bottom-[-15%] w-[45vw] h-[45vw] rounded-full ambient-glow-red opacity-25 mix-blend-screen pointer-events-none filter blur-3xl"></div>

            {/* Cinematic Captions Overlay Layer (Placed in the bottom-left corner to avoid blocking visual center) */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 flex items-end justify-start pointer-events-none pb-16 sm:pb-24">
              <div className="relative w-full max-w-md h-32 flex items-center">
                {textMilestones.map((m, idx) => {
                  const isActive = activeTextIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute left-0 bottom-0 max-w-md transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col gap-1.5 border-l border-brand-red/50 pl-5 ${
                        isActive
                          ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-red/90 mb-1 block">
                        {m.text}
                      </span>
                      <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed font-light tracking-wide max-w-xs sm:max-w-sm">
                        {m.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top-Right Cinematic Assembly Logger */}
            <div className="absolute top-12 right-6 sm:right-12 pointer-events-none font-mono text-[8px] uppercase tracking-[0.25em] text-white/10 hidden md:block">
              Assembly Node: Operational // FPS_60 // Payloads_OK
            </div>
          </>
        )}
      </div>
    </section>
  );
}
