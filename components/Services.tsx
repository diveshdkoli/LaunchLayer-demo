"use client";

import { Paintbrush, Code, Send, Layers } from "lucide-react";

const services = [
  {
    phase: "Phase 01",
    title: "Design Layer",
    icon: Paintbrush,
    desc: "A striking, custom digital design that commands attention. We shape an immersive visual identity that speaks to your target audience, establishing premium credibility and making a powerful first impression.",
    features: ["Premium Visual Strategy", "Bespoke Digital Design", "Audience Engagement", "High-End Brand Authority"],
  },
  {
    phase: "Phase 02",
    title: "Development Layer",
    icon: Code,
    desc: "Flawless engineering that drives results. We transform visual concepts into fast, fluid, and robust web applications designed to convert visitors into loyal clients, ensuring smooth performance on all devices.",
    features: ["High-Performance Architecture", "Intuitive User Journeys", "Fluid Cross-Device Experience", "Conversion-Focused Code"],
  },
  {
    phase: "Phase 03",
    title: "Deployment Layer",
    icon: Send,
    desc: "Seamless launching and search engine dominance. We optimize your platform for blistering loading speeds and ensure high search visibility, positioning your brand for immediate growth and long-term security.",
    features: ["Blistering Page Speeds", "Search Engine Dominance", "Secure Edge Infrastructure", "Analytics & Growth Ready"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 w-full bg-brand-black/95">
      {/* Background ambient red glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full ambient-glow-red -z-10 opacity-15"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-red/20 bg-brand-red/5 rounded-full w-fit">
              <Layers className="w-3.5 h-3.5 text-brand-red" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red">
                Operational Framework
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white select-none">
              THE LAUNCH <span className="text-gradient-red">SYSTEM</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50 leading-relaxed font-light">
            We operate through a highly unified construction process, building your digital presence layer by layer. From cinematic drafts to performant deployment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="relative group rounded-2xl glass-panel p-8 glass-panel-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative background red flash on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-red/5 filter blur-3xl group-hover:bg-brand-red/10 transition-colors duration-500"></div>

                <div>
                  {/* Phase & Icon Row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 group-hover:text-brand-red/80 transition-colors">
                      {s.phase}
                    </span>
                    <div className="w-10 h-10 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-brand-red/35 group-hover:bg-brand-red/5 group-hover:shadow-[0_0_15px_rgba(251,54,64,0.15)]">
                      <IconComponent className="w-4 h-4 text-white/70 group-hover:text-brand-red transition-colors" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white tracking-tight mb-4 group-hover:text-brand-red transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[12px] sm:text-sm text-white/50 leading-relaxed font-light mb-8">
                    {s.desc}
                  </p>
                </div>

                {/* Features List */}
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <ul className="flex flex-col gap-2">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-[11px] font-medium tracking-wide text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red/60 group-hover:bg-brand-red transition-all"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
