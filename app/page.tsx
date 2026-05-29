import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollSequence from "@/components/ScrollSequence";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundPlanet from "@/components/BackgroundPlanet";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#000F08] overflow-x-hidden selection:bg-brand-red selection:text-white">
      {/* Global Cinematic Environmental Planet Atmosphere Backdrop */}
      <BackgroundPlanet />

      {/* Dynamic Sticky Floating Navbar */}
      <Navbar />

      {/* Main Container Assembly */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Cinematic Hero Emitter & 3D WebGL Canvas */}
        <Hero />

        {/* Cinematic High-Performance Canvas Image Sequencer */}
        <ScrollSequence />

        {/* Operational Framework (Design, Dev, Deploy) */}
        <Services />

        {/* masonry / grid creative portfolio projects archive */}
        <Showcase />

        {/* Secured Inquiry Capture Node & slide capcha spam shield */}
        <Contact />
      </main>

      {/* Majestic Closing & Legal quick links */}
      <Footer />
    </div>
  );
}
