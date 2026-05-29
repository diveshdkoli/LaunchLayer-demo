"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mr", name: "मराठी" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLocaleChange = (nextLocale: "en" | "hi" | "mr") => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const activeLang = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left select-none transition-all duration-300 ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4.5 py-2 border border-white/10 hover:border-brand-red/40 bg-brand-black/50 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-red/5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] focus:outline-none focus:border-brand-red/50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-white/50 transition-colors" />
        <span>{activeLang.name}</span>
        <ChevronDown
          className={`w-3 h-3 text-white/40 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-red" : ""
          }`}
        />
      </button>

      {/* Glassmorphic Dropdown List */}
      <div
        className={`absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 mt-3 w-36 origin-top-right rounded-xl border border-brand-red/10 bg-brand-black/95 backdrop-blur-xl shadow-[0_15px_40px_rgba(251,54,64,0.08)] py-1.5 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        {languages.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <button
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-[10px] font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-brand-red bg-brand-red/5 font-bold shadow-[inset_3px_0_0_#FB3640]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {lang.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
