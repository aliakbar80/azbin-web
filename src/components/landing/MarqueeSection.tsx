"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingPropertyTypes } from "@/services/use-landing";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21",
  "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819",
  "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
];

function PropertyMarqueeItem({ word, icon }: { word: string; icon: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-4 mx-8">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-azbin-gold/20 bg-azbin-gold/5">
        <svg className="w-5 h-5 text-azbin-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-white/10 whitespace-nowrap">{word}</span>
      <div className="w-2 h-2 rounded-full bg-azbin-gold/20" />
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { data: propertyTypes = [] } = useLandingPropertyTypes();
  const words = [...propertyTypes.map(t => t.name), ...propertyTypes.map(t => t.name)];

  useGSAP(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-azbin-bg via-transparent to-azbin-bg z-10 pointer-events-none" />

      <div ref={trackRef} className="flex items-center" style={{ width: "max-content" }}>
        {[...words, ...words].map((word, i) => (
          <PropertyMarqueeItem key={i} word={word} icon={icons[i % icons.length]} />
        ))}
      </div>

      <div className="mt-6 text-center relative z-20">
        <p className="text-xs text-white/20">
          بیش از <span className="text-azbin-gold/60 font-bold">۵۰ نوع ملک</span> تحت پوشش
        </p>
      </div>
    </section>
  );
}
