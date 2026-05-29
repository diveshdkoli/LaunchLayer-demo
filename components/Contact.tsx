"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Rocket, CheckCircle2, ShieldAlert } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", agree: false });
  const [sliderUnlocked, setSliderUnlocked] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rocketLaunched, setRocketLaunched] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Custom Slider Spam Shield Mouse/Touch event handlers
  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!isDragging.current || !sliderRef.current || !handleRef.current) return;
      
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const sliderWidth = rect.width;
      const handleWidth = handleRef.current.offsetWidth;
      
      // Calculate offset inside the slider container
      let offsetX = clientX - rect.left - (handleWidth / 2);
      const maxOffset = sliderWidth - handleWidth - 6; // padding offsets
      
      if (offsetX < 0) offsetX = 0;
      if (offsetX > maxOffset) offsetX = maxOffset;
      
      const percentage = Math.round((offsetX / maxOffset) * 100);
      setSliderVal(percentage);
      
      // Snap to unlock at 95%
      if (percentage >= 96) {
        setSliderUnlocked(true);
        setSliderVal(100);
        isDragging.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      // Reset if not unlocked
      if (!sliderUnlocked) {
        setSliderVal(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [sliderUnlocked]);

  const startDrag = () => {
    if (sliderUnlocked) return;
    
    // Lock captcha until all text fields are filled out and checkbox is ticked
    const isFormValid = form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "" && form.agree;
    if (!isFormValid) {
      setErrorMsg("Please complete all form fields and agree to the privacy protocol before launching.");
      return;
    }
    
    isDragging.current = true;
    setErrorMsg("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill out all transmission fields.");
      return;
    }
    if (!form.agree) {
      setErrorMsg("Please agree to the privacy protocol.");
      return;
    }
    if (!sliderUnlocked) {
      setErrorMsg("Please slide the rocket captcha to verify your transmission.");
      return;
    }

    setIsSubmitting(true);
    setRocketLaunched(true);

    // Simulate encrypted data submission delays
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setRocketLaunched(false);
      setForm({ name: "", email: "", message: "", agree: false });
    }, 2200);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 w-full bg-brand-black">
      {/* Background ambient red glow */}
      <div className="absolute right-[-10%] bottom-0 w-[50vw] h-[50vw] rounded-full ambient-glow-red -z-10 opacity-15"></div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Direct Pitch & Corporate Info */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-red/20 bg-brand-red/5 rounded-full w-fit">
              <Send className="w-3.5 h-3.5 text-brand-red" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red">
                SECURE TRANSMISSION NODE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white select-none">
              INITIALIZE <span className="text-gradient-red">LAUNCH</span>
            </h2>
          </div>

          <p className="text-sm text-white/50 leading-relaxed font-light">
            Ready to deploy your digital architecture? Construct your project guidelines, transmit your system values, and our engineering unit will formulate a luxury framework within 24 hours.
          </p>

          {/* Corporate Details */}
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-brand-red">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-wider text-white/40">Secure Email</h4>
                <a href="mailto:construct@launchlayer.agency" className="text-[13px] font-medium text-white hover:text-brand-red transition-colors">
                  construct@launchlayer.agency
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-brand-red">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-wider text-white/40">Direct Hotlink</h4>
                <a href="tel:+18885055297" className="text-[13px] font-medium text-white hover:text-brand-red transition-colors">
                  +1 (888) 505-LAYR
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/5 bg-white/5 rounded-lg flex items-center justify-center text-brand-red">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-wider text-white/40">Headquarters</h4>
                <span className="text-[13px] font-medium text-white">
                  Orbiting Earth, System Node 01
                </span>
              </div>
            </div>

            {/* Corporate verification & direct phone trust block */}
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-2.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-red font-bold">
                Operational Authentication
              </span>
              <p className="text-[12px] text-white/50 leading-relaxed font-light">
                Launch Layer Ltd. is an established, registered digital engineering collective. Full operations are active Monday &mdash; Friday, 09:00 &mdash; 18:00 EST. 
                Direct secure voice authorization line: <a href="tel:+18885055297" className="text-brand-red hover:underline font-medium">+1 (888) 505-5297</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Encrypted Form Container */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-2xl glass-panel p-8 md:p-10 border border-white/5 bg-brand-black/45 glass-card-glow min-h-[460px] flex flex-col justify-center overflow-hidden">
            
            {/* Form Success Panel */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-10 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-brand-red/10 border border-brand-red/40 flex items-center justify-center text-brand-red">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold tracking-wider text-white uppercase">
                    TRANSMISSION COMPLETE
                  </h3>
                  <p className="max-w-md text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    Project Launch Request Initialized! Our core engineering unit has secured your data layers. We will link up with you shortly.
                  </p>
                </div>
                
                {/* Reset button to resubmit if needed */}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSliderUnlocked(false);
                    setSliderVal(0);
                  }}
                  className="mt-4 px-6 py-2.5 border border-white/10 hover:border-brand-red rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  New Submission
                </button>
              </div>
            ) : isSubmitting ? (
              /* Encypting/Loading Panel */
              <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/5 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-brand-red rounded-full animate-spin"></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold tracking-[0.25em] text-brand-red uppercase animate-pulse">
                    ENCRYPTING INQUIRY
                  </h3>
                  <p className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                    Securing transmission payload layers...
                  </p>
                </div>
              </div>
            ) : (
              /* Core Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                      Operator Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexis Carter"
                      className="w-full bg-[#000F08] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 focus:border-brand-red/50 focus:outline-none transition-colors"
                      required
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                      Transmission Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alexis@company.com"
                      className="w-full bg-[#000F08] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 focus:border-brand-red/50 focus:outline-none transition-colors"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                    Project Architecture Spec
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Describe your design, development, and launch parameters..."
                    className="w-full bg-[#000F08] border border-white/5 rounded-lg px-4 py-3 text-xs text-white placeholder-white/20 focus:border-brand-red/50 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 border border-brand-red/20 bg-brand-red/5 rounded-lg text-brand-red text-[11px] font-medium leading-none">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Captcha Slider Spam Shield */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                    Transmission Captcha Shield
                  </span>
                  
                  {/* Slider Slot */}
                  <div
                    ref={sliderRef}
                    className={`relative w-full h-11 border rounded-lg bg-[#000F08] flex items-center px-1 overflow-hidden select-none transition-colors ${
                      sliderUnlocked
                        ? "border-brand-red/40 bg-brand-red/5"
                        : "border-white/5"
                    }`}
                  >
                    {/* Background slide bar fill */}
                    <div
                      className="absolute inset-y-0 left-0 bg-brand-red/10 border-r border-brand-red/20 pointer-events-none"
                      style={{ width: `${sliderVal}%` }}
                    />

                    {/* Drag Handle block */}
                    <div
                      ref={handleRef}
                      onMouseDown={startDrag}
                      onTouchStart={startDrag}
                      className={`relative z-10 w-9 h-9 rounded-md border flex items-center justify-center cursor-grab active:cursor-grabbing ${
                        sliderUnlocked
                          ? "border-brand-red bg-brand-red text-white scale-95 shadow-[0_0_12px_rgba(251,54,64,0.45)]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      } ${rocketLaunched ? "animate-rocket-launch" : "transition-all duration-75"}`}
                      style={{
                        left: sliderUnlocked ? "auto" : `calc(${sliderVal}% - ${(sliderVal / 100) * 36}px)`,
                        right: sliderUnlocked ? "6px" : "auto",
                      }}
                    >
                      <Rocket className={`w-4.5 h-4.5 ${sliderUnlocked ? "animate-pulse" : ""}`} />
                      {rocketLaunched && (
                        <>
                          <div className="smoke-particle" style={{ "--smoke-drift-x": "-40px", animationDelay: "0.1s" } as any}></div>
                          <div className="smoke-particle" style={{ "--smoke-drift-x": "-60px", animationDelay: "0.2s" } as any}></div>
                          <div className="smoke-particle" style={{ "--smoke-drift-x": "-20px", animationDelay: "0.3s" } as any}></div>
                          <div className="smoke-particle" style={{ "--smoke-drift-x": "-50px", animationDelay: "0.4s" } as any}></div>
                          <div className="smoke-particle" style={{ "--smoke-drift-x": "-30px", animationDelay: "0.5s" } as any}></div>
                        </>
                      )}
                    </div>

                    {/* Text guide */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                        sliderVal > 30 ? "opacity-0" : "opacity-100 text-white/30"
                      }`}
                    >
                      {sliderUnlocked ? "Systems Ready" : "Slide Rocket to Launch"}
                    </span>
                  </div>
                </div>

                {/* Privacy agreement checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={form.agree}
                    onChange={handleInputChange}
                    className="w-3.5 h-3.5 rounded border border-white/15 bg-black/40 mt-0.5 accent-brand-red focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-[11px] text-white/40 leading-relaxed font-light">
                    I agree to the secure privacy guidelines and technical transmission protocols.
                  </label>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-lg border font-bold uppercase tracking-widest text-xs select-none flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    sliderUnlocked
                      ? "border-brand-red bg-brand-red text-white shadow-[0_4px_20px_rgba(251,54,64,0.3)] hover:shadow-[0_4px_30px_rgba(251,54,64,0.15)]"
                      : "border-white/5 bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                  suppressHydrationWarning
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Spec</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
