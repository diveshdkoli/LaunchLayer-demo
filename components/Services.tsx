"use client";

import { Paintbrush, Code, Send, Layers } from "lucide-react";
import { useTranslations } from "next-intl";

const servicesConfig = [
  {
    key: "phase01",
    icon: Paintbrush,
  },
  {
    key: "phase02",
    icon: Code,
  },
  {
    key: "phase03",
    icon: Send,
  },
] as const;

export default function Services() {
  const t = useTranslations("services");

  const title = t("title");
  const words = title.split(" ");
  const firstPart = words.slice(0, -1).join(" ");
  const lastPart = words[words.length - 1];

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
                {t("tagline")}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,5.2vw,3rem)] font-bold tracking-tight text-white select-none text-balance break-words leading-tight">
              {firstPart} <span className="text-gradient-red">{lastPart}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50 leading-relaxed font-light text-pretty break-words">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesConfig.map((s, idx) => {
            const IconComponent = s.icon;
            const features = t.raw(`phases.${s.key}.features`) as string[];

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
                      {t(`phases.${s.key}.label`)}
                    </span>
                    <div className="w-10 h-10 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-brand-red/35 group-hover:bg-brand-red/5 group-hover:shadow-[0_0_15px_rgba(251,54,64,0.15)]">
                      <IconComponent className="w-4 h-4 text-white/70 group-hover:text-brand-red transition-colors" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4 group-hover:text-brand-red transition-colors text-balance break-words leading-snug">
                    {t(`phases.${s.key}.title`)}
                  </h3>
                  <p className="text-[12px] sm:text-sm text-white/50 leading-relaxed font-light mb-8 text-pretty break-words">
                    {t(`phases.${s.key}.desc`)}
                  </p>
                </div>

                {/* Features List */}
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <ul className="flex flex-col gap-3">
                    {features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-[11px] font-medium tracking-wide text-white/60 leading-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red/60 group-hover:bg-brand-red transition-all mt-1.5 shrink-0"></span>
                        <span className="break-words">{feat}</span>
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
