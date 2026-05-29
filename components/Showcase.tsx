"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Star, Quote, Code2, ShieldCheck } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AETHER / CO",
    category: "Luxury Fashion-Tech E-Commerce",
    stat: "E-Commerce",
    tech: ["Next.js", "Three.js", "Tailwind CSS"],
    desc: "A bespoke digital showroom featuring interactive 3D product renders, dynamic lighting environments, and millisecond edge loading architectures.",
    link: "#",
    badge: "3D Interactive",
    review: {
      author: "Elena Rostova",
      role: "Director of Product, Aether",
      quote: "Launch Layer designed an incredible 3D showroom that increased user session durations by 42% on week one.",
      rating: 5,
    }
  },
  {
    id: 2,
    title: "KRYPTON AUTOMOTIVE",
    category: "Futuristic EV Dashboard",
    stat: "WebGL Dashboard",
    tech: ["React", "WebGL", "GSAP ScrollTrigger"],
    desc: "A luxury data console displaying active server logs, hardware temperatures, and dynamic transaction nodes utilizing custom WebGL charts.",
    link: "#",
    badge: "SaaS Systems",
    review: {
      author: "Dr. Kenji Tanaka",
      role: "Lead Systems Architect, Krypton Labs",
      quote: "Highly performant Next.js engineering. To render WebGL charts smoothly alongside complex sequences is a masterclass.",
      rating: 5,
    }
  },
  {
    id: 3,
    title: "VERIDIAN HOMES",
    category: "Premium Property Showcase",
    stat: "Cinematic Scroll",
    tech: ["Next.js", "GSAP", "Lenis Scroll"],
    desc: "A story-driven digital experience designed for green-energy technology enterprises, built with customized horizontal scrubbing paths.",
    link: "#",
    badge: "Storytelling",
    review: {
      author: "Marcus Sterling",
      role: "CMO, Veridian Energy",
      quote: "The component assembly sequence is an engineering masterpiece. Users love the Apple-grade scrolling inertia.",
      rating: 5,
    }
  },
  {
    id: 4,
    title: "SPECTRA LABS",
    category: "Industrial Design Platform",
    stat: "Hardware 3D",
    tech: ["React", "Spline Embeds", "Tailwind CSS"],
    desc: "A modern design portfolio showing custom mechanical blueprints and robotics assets integrated with expandable Spline animations.",
    link: "#",
    badge: "Spline Renders",
    review: {
      author: "Sarah Jenkins",
      role: "Lead Designer, Spectra Core",
      quote: "Absolute professional polish. They seamlessly wove heavy WebGL models into a breathable, ultra-fast layout.",
      rating: 5,
    }
  },
];

export default function Showcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-32 w-full bg-[#000F08]">
      
      {/* Background Imperial Red radial glow overlays */}
      <div className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] rounded-full ambient-glow-red -z-20 opacity-20 pointer-events-none filter blur-3xl"></div>
      <div className="absolute left-[-15%] bottom-[10%] w-[45vw] h-[45vw] rounded-full ambient-glow-red -z-20 opacity-15 pointer-events-none filter blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-red/20 bg-brand-red/5 rounded-full w-fit backdrop-blur-sm select-none">
              <Code2 className="w-3.5 h-3.5 text-brand-red animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red">
                Selected Works & Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white select-none uppercase">
              SELECTED <span className="text-gradient-red">ARCHIVES</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50 leading-relaxed font-light">
            Explore our curated work. Hover over each architectural block to reveal operational summaries, engineering configurations, and client outcomes.
          </p>
        </div>

        {/* Unified Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => {
            const isHovered = hoveredId === p.id;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative rounded-2xl border border-white/5 bg-[#000F08]/60 overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out h-[380px] sm:h-[420px] glass-panel group"
                style={{
                  borderColor: isHovered ? "rgba(251, 54, 64, 0.35)" : "rgba(255, 255, 255, 0.05)",
                  boxShadow: isHovered ? "0 25px 50px rgba(251, 54, 64, 0.14), inset 0 0 20px rgba(251, 54, 64, 0.04)" : "none",
                }}
              >
                {/* Visual Glassmorphic Top Split Panel */}
                <div
                  className="absolute inset-x-0 top-0 h-[55%] border-b border-white/5 bg-white/[0.01] transition-all duration-500 ease-out pointer-events-none z-0"
                  style={{
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    backgroundColor: isHovered ? "rgba(251, 54, 64, 0.02)" : "rgba(255, 255, 255, 0.01)",
                  }}
                />

                {/* Bottom Split Panel */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[45%] bg-[#000F08]/85 transition-all duration-500 ease-out pointer-events-none z-0"
                  style={{
                    transform: isHovered ? "translateY(8px)" : "translateY(0)",
                  }}
                />

                {/* Main Card Content */}
                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  
                  {/* Top Row: Category & Stats */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
                      {p.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-red bg-brand-red/5 px-2.5 py-1 border border-brand-red/15 rounded-sm">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {p.stat}
                    </span>
                  </div>

                  {/* Title & Tech Stacks */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-widest text-white mb-3 group-hover:text-brand-red transition-colors">
                      {p.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] font-bold uppercase tracking-widest text-white/40 border border-white/5 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 
                    Unified split expansion details block:
                    Expands seamlessly on hover to reveal descriptive parameters, live anchors,
                    and a verified customer quote block with glowing ratings!
                  */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: isHovered ? "200px" : "0px",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <p className="text-[12px] sm:text-xs text-white/60 leading-relaxed font-light mb-4">
                      {p.desc}
                    </p>

                    {/* Integrated Review Block inside Card */}
                    <div className="p-3.5 rounded-lg border border-brand-red/10 bg-brand-red/5 mb-4 relative">
                      <Quote className="absolute right-3 top-3 w-8 h-8 text-brand-red/5 pointer-events-none" />
                      
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-1.5">
                        {[...Array(p.review.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-brand-red text-brand-red" />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-[11px] text-white/80 leading-relaxed font-light italic mb-1">
                        "{p.review.quote}"
                      </p>
                      
                      {/* Author Bio */}
                      <div className="font-mono text-[7.5px] uppercase tracking-wider text-brand-red/80 font-bold">
                        &mdash; {p.review.author}, {p.review.role}
                      </div>
                    </div>

                    {/* Action live links */}
                    <div className="flex gap-4 items-center">
                      <a
                        href={p.link}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-red hover:text-white transition-colors"
                      >
                        <span>Explore Launch Architecture</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Expand visual guides */}
                  <div
                    className="flex justify-between items-center border-t border-white/5 pt-4 transition-all duration-500 font-mono text-[8px] uppercase tracking-widest text-white/30"
                    style={{
                      opacity: isHovered ? 0 : 1,
                      transform: isHovered ? "translateY(5px)" : "translateY(0)",
                    }}
                  >
                    <span>{p.badge}</span>
                    <span className="flex items-center gap-1 text-brand-red">
                      Reveal parameters
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
