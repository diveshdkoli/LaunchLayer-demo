"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Star, Quote, Code2, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const projectConfig = [
  {
    id: 1,
    key: "aether",
    tech: ["Next.js", "Three.js", "Tailwind CSS"],
    link: "#",
    rating: 5,
  },
  {
    id: 2,
    key: "krypton",
    tech: ["React", "WebGL", "GSAP ScrollTrigger"],
    link: "#",
    rating: 5,
  },
  {
    id: 3,
    key: "veridian",
    tech: ["Next.js", "GSAP", "Lenis Scroll"],
    link: "#",
    rating: 5,
  },
  {
    id: 4,
    key: "spectra",
    tech: ["React", "Spline Embeds", "Tailwind CSS"],
    link: "#",
    rating: 5,
  },
] as const;

export default function Showcase() {
  const t = useTranslations("showcase");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const title = t("title");
  const words = title.split(" ");
  const firstPart = words.slice(0, -1).join(" ");
  const lastPart = words[words.length - 1];

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
                {t("tagline")}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,5.2vw,3rem)] font-bold tracking-tight text-white select-none uppercase text-balance break-words leading-tight">
              {firstPart} <span className="text-gradient-red">{lastPart}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50 leading-relaxed font-light text-pretty break-words">
            {t("description")}
          </p>
        </div>

        {/* Unified Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectConfig.map((p) => {
            const isHovered = hoveredId === p.id;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative rounded-2xl border border-white/5 bg-[#000F08]/60 overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out min-h-[380px] sm:min-h-[420px] h-auto pb-6 glass-panel group"
                style={{
                  borderColor: isHovered ? "rgba(251, 54, 64, 0.35)" : "rgba(255, 255, 255, 0.05)",
                  boxShadow: isHovered
                    ? "0 25px 50px rgba(251, 54, 64, 0.14), inset 0 0 20px rgba(251, 54, 64, 0.04)"
                    : "none",
                }}
              >
                {/* Visual Glassmorphic Top Split Panel */}
                <div
                  className="absolute inset-x-0 top-0 h-[55%] border-b border-white/5 bg-white/[0.01] transition-all duration-500 ease-out pointer-events-none z-0"
                  style={{
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    backgroundColor: isHovered
                      ? "rgba(251, 54, 64, 0.02)"
                      : "rgba(255, 255, 255, 0.01)",
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
                      {t(`projects.${p.key}.category`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-red bg-brand-red/5 px-2.5 py-1 border border-brand-red/15 rounded-sm">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {t(`projects.${p.key}.stat`)}
                    </span>
                  </div>

                  {/* Title & Tech Stacks */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-[0.12em] sm:tracking-widest text-white mb-3 group-hover:text-brand-red transition-colors text-balance break-words leading-snug">
                      {t(`projects.${p.key}.title`)}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.tech.map((techTag, techIdx) => (
                        <span
                          key={techIdx}
                          className="text-[8px] font-bold uppercase tracking-widest text-white/40 border border-white/5 px-2 py-0.5 rounded-full"
                        >
                          {techTag}
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
                      {t(`projects.${p.key}.desc`)}
                    </p>

                    {/* Integrated Review Block inside Card */}
                    <div className="p-3.5 rounded-lg border border-brand-red/10 bg-brand-red/5 mb-4 relative">
                      <Quote className="absolute right-3 top-3 w-8 h-8 text-brand-red/5 pointer-events-none" />

                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-1.5">
                        {[...Array(p.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-brand-red text-brand-red" />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-[11px] text-white/80 leading-relaxed font-light italic mb-1">
                        "{t(`projects.${p.key}.review.quote`)}"
                      </p>

                      {/* Author Bio */}
                      <div className="font-mono text-[7.5px] uppercase tracking-wider text-brand-red/80 font-bold">
                        &mdash; {t(`projects.${p.key}.review.author`)},{" "}
                        {t(`projects.${p.key}.review.role`)}
                      </div>
                    </div>

                    {/* Action live links */}
                    <div className="flex gap-4 items-center">
                      <a
                        href={p.link}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-red hover:text-white transition-colors"
                      >
                        <span>{t("exploreArchitecture")}</span>
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
                    <span>{t(`projects.${p.key}.badge`)}</span>
                    <span className="flex items-center gap-1 text-brand-red">
                      {t("reveal")}
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
