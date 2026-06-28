"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingServices } from "@/services/use-landing";

gsap.registerPlugin(ScrollTrigger);

function MiniBuilding({ floors, color }: { floors: number; color: string }) {
  return (
    <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
      <rect x="8" y={60 - floors * 5} width="32" height={floors * 5} rx="2" fill={`${color}15`} stroke={color} strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: floors }, (_, i) => (
        <g key={i}>
          <rect x="13" y={55 - i * 5} width="6" height="3" rx="0.5" fill={color} opacity={0.3 + (i % 3) * 0.1} />
          <rect x="23" y={55 - i * 5} width="6" height="3" rx="0.5" fill={color} opacity={0.2 + (i % 2) * 0.15} />
          <rect x="33" y={55 - i * 5} width="6" height="3" rx="0.5" fill={color} opacity={0.25 + (i % 3) * 0.1} />
        </g>
      ))}
      <rect x="20" y="55" width="8" height="5" rx="1" fill={color} opacity="0.4" />
    </svg>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { data: services = [] } = useLandingServices();

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth + 200;

    gsap.to(track, {
      x: totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden py-32">
      <div className="absolute top-0 left-0 w-full z-10 pt-12 px-6 md:px-16">
        <div className="flex items-center gap-3 mb-2">
          
          <div className="w-8 h-[1px] bg-azbin-gold/50" />
          <span className="text-azbin-gold/70 text-xs tracking-[0.25em] font-[Vazirmatn] font-medium">خدمات کارشناسی</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[Vazirmatn]">
          <span className="gold-gradient-text">ارزیابی تخصصی</span> ملک شما
        </h2>
      </div>

      <div className="absolute top-[110px]! left-6 md:left-16 z-10 text-white/20 text-xs tracking-wider font-[Vazirmatn]">
        ← <span className="text-azbin-gold/50">اسکرول</span> کنید
      </div>

      <div ref={trackRef} className="flex items-center gap-6 h-full pt-32 pb-16 px-16" style={{ width: "max-content" }}>
        {services?.map((service, index) => (
          <div
            key={service.id}
            data-cursor-hover
            className="group relative flex-shrink-0 w-[360px] h-[460px] rounded-3xl landing-glass p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            style={{ border: `1px solid ${service.color}10` }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}10, transparent 70%)` }}
            />

            <div className="absolute top-4 left-4 text-6xl font-black opacity-[0.03] select-none font-[Vazirmatn]" style={{ color: service.color }}>
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="relative z-10">
              <MiniBuilding floors={service.buildingFloors} color={service.color} />

              <h3 className="text-lg font-bold mb-2 font-[Vazirmatn]">{service.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-[Vazirmatn]">{service.description}</p>
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] px-3 py-1.5 rounded-full font-[Vazirmatn]"
                    style={{ background: `${service.color}10`, color: `${service.color}cc`, border: `1px solid ${service.color}20` }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium font-[Vazirmatn]" style={{ color: service.color }}>
                <span>بیشتر بدانید</span>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 7l-5 5m0 0l5 5m-5-5h11" />
                </svg>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full opacity-[0.04] blur-xl" style={{ background: service.color }} />
          </div>
        ))}

        <div className="flex-shrink-0 w-80 h-[460px] rounded-3xl border border-dashed border-white/10 flex items-center justify-center">
          <div className="text-center text-white/20">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-sm font-[Vazirmatn]">خدمات بیشتر به زودی</span>
          </div>
        </div>
      </div>
    </section>
  );
}
