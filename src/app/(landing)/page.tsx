"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/landing/CustomCursor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/landing/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/landing/Hero"), { ssr: false });
const Services = dynamic(() => import("@/components/landing/Services"), { ssr: false });
const Features = dynamic(() => import("@/components/landing/Features"), { ssr: false });
const Stats = dynamic(() => import("@/components/landing/Stats"), { ssr: false });
const Timeline = dynamic(() => import("@/components/landing/Timeline"), { ssr: false });
const AppGallery = dynamic(() => import("@/components/landing/AppGallery"), { ssr: false });
const MarqueeSection = dynamic(() => import("@/components/landing/MarqueeSection"), { ssr: false });
const PropertyShowcase = dynamic(() => import("@/components/landing/PropertyShowcase"), { ssr: false });
const CoverageMap = dynamic(() => import("@/components/landing/CoverageMap"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"), { ssr: false });

export default function LandingPage() {

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeSection />
        <div id="services"><Services /></div>
        <div id="features"><Features /></div>
        <PropertyShowcase />
        <div id="about"><Stats /></div>
        <CoverageMap />
        <Timeline />
        <AppGallery />
        <Testimonials />
        <div id="contact"><FinalCTA /></div>
      </main>
    </>
  );
}
