"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLandingTestimonials } from "@/services/use-landing";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#D4A843">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function PropertyTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-azbin-gold/10 text-azbin-gold/60 border border-azbin-gold/10">
      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
      {type}
    </span>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { data: testimonials = [] } = useLandingTestimonials();
  const doubled = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  useGSAP(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth / 2;
    gsap.to(trackRef.current, { x: totalWidth, duration: 30, ease: "none", repeat: -1 });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="landing-section-padding mb-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-azbin-gold/50" />
            <span className="text-azbin-gold/70 text-xs tracking-[0.25em] font-medium">نظرات مشتریان</span>
            <div className="w-8 h-[1px] bg-azbin-gold/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="gold-gradient-text">مشتریان</span> ما چه می‌گویند
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-azbin-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-azbin-bg to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-6" style={{ width: "max-content" }}>
          {doubled.map((t) => (
            <div key={`${t.id}-${t.name}`} data-cursor-hover
              className="flex-shrink-0 w-[340px] landing-glass rounded-3xl p-6 group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] blur-xl rounded-full" style={{ background: "#D4A843" }} />
              <div className="flex items-center justify-between mb-4">
                <StarRating count={t.rating} />
                <PropertyTypeBadge type={t.propertyType} />
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(20,184,166,0.15))", color: "#D4A843" }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-azbin-gold/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
