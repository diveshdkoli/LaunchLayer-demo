import Navbar from "@/components/Navbar";
import IntroLoader from "@/components/IntroLoader";
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
      <BackgroundPlanet />
      <Navbar />
      <IntroLoader />

      <main className="flex-1 w-full flex flex-col items-center">
        <Hero />
        <ScrollSequence />
        <Services />
        <Showcase />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
