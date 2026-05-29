import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const sections = ["01", "02", "03"] as const;

  return (
    <main className="relative min-h-screen bg-[#000F08] text-white py-20 px-6 sm:py-28 md:px-12 flex items-center justify-center overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[40vw] h-[40vw] rounded-full ambient-glow-red -z-10 opacity-15" />
      <div className="absolute left-0 bottom-0 w-[30vw] h-[30vw] rounded-full ambient-glow-red -z-10 opacity-10" />

      <div className="max-w-3xl w-full mx-auto relative z-10 flex flex-col gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/50 hover:text-brand-red transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-balance break-words">{t("returnBtn")}</span>
        </Link>

        <div className="rounded-2xl glass-panel p-8 md:p-12 border border-white/5 bg-brand-black/45 glass-card-glow flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-brand-red/20 bg-brand-red/5 rounded-lg flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-[clamp(1.35rem,4.2vw,1.9rem)] font-bold tracking-tight text-white uppercase select-none text-balance break-words leading-tight">
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-red">
                {t("title").split(" ").slice(-1)}
              </span>
            </h1>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-widest text-brand-red border-b border-white/5 pb-4 text-balance break-words leading-snug">
            {t("effectiveDate")}
          </p>

          <div className="flex flex-col gap-6 text-[13px] sm:text-sm text-white/70 leading-relaxed font-light">
            {sections.map((id) => (
              <section key={id} className="flex flex-col gap-2 min-w-0">
                <h3 className="text-white font-bold tracking-wide uppercase font-mono text-[10px] text-balance break-words leading-snug">
                  {t(`sections.${id}.title`)}
                </h3>
                <p className="text-pretty break-words leading-relaxed">
                  {t(`sections.${id}.content`)}
                </p>
              </section>
            ))}
          </div>
        </div>

        <p className="text-center font-mono text-[8px] uppercase tracking-[0.25em] text-white/20 select-none text-balance break-words leading-snug">
          {t("footerLabel")}
        </p>
      </div>
    </main>
  );
}
