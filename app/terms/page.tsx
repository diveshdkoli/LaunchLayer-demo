import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#000F08] text-white py-20 px-6 sm:py-28 md:px-12 flex items-center justify-center overflow-hidden">
      
      {/* Background glowing overlays */}
      <div className="absolute left-0 top-1/4 w-[40vw] h-[40vw] rounded-full ambient-glow-red -z-10 opacity-15"></div>
      <div className="absolute right-0 bottom-0 w-[30vw] h-[30vw] rounded-full ambient-glow-red -z-10 opacity-10"></div>

      <div className="max-w-3xl w-full mx-auto relative z-10 flex flex-col gap-8">
        
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/50 hover:text-brand-red transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Headquarters</span>
        </Link>

        {/* Card wrapper */}
        <div className="rounded-2xl glass-panel p-8 md:p-12 border border-white/5 bg-brand-black/45 glass-card-glow flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-brand-red/20 bg-brand-red/5 rounded-lg flex items-center justify-center text-brand-red">
              <BookOpen className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase select-none">
              SYSTEM <span className="text-gradient-red">PROTOCOLS</span>
            </h1>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-widest text-brand-red border-b border-white/5 pb-4">
            COMPLIANCE_CODE: SYSTEM_AGREEMENT_NODE // MAY_2026
          </p>

          <div className="flex flex-col gap-6 text-[13px] sm:text-sm text-white/77 leading-relaxed font-light">
            <section className="flex flex-col gap-2">
              <h3 className="text-white font-bold tracking-wide uppercase font-mono text-[10px]">
                01 // Architectural Scope
              </h3>
              <p>
                All project scopes, engineering iterations, particle counts, and rendering budgets are mutually agreed upon inside separate electronic project statements of work before core system compilation commences.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-white font-bold tracking-wide uppercase font-mono text-[10px]">
                02 // Intellectual Properties & Code Ownership
              </h3>
              <p>
                Upon complete funding settlements, all compilation files, custom WebGL assets, component blocks, and responsive deployment directories are fully transferred to the client, under strict perpetual global licenses.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-white font-bold tracking-wide uppercase font-mono text-[10px]">
                03 // Systems Stability Limitation
              </h3>
              <p>
                While we deliver completely bulletproof, 60fps cinematic products, we are not responsible for client-side API outages, edge CDN regional server hardware errors, or code configurations altered by external third-party developers.
              </p>
            </section>
          </div>
        </div>

        {/* Footer label */}
        <p className="text-center font-mono text-[8px] uppercase tracking-[0.25em] text-white/20 select-none">
          Launch Layer Secure Node System // ALL_RIGHTS_RESERVED
        </p>

      </div>
    </main>
  );
}
