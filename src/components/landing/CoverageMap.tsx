"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingCities } from "@/services/use-landing";
import type { LandingCity } from "@/services/landing-types";

gsap.registerPlugin(ScrollTrigger);

// Simplified real outline of Iran (derived from province border data), fitted to a 520x480 viewBox
const IRAN_OUTLINE =
  "M30.0,41.4 L34.3,48.6 L36.4,69.3 L40.4,70.6 L34.5,83.3 L43.8,88.2 L43.3,96.2 L48.7,100.1 L50.6,107.8 L49.1,113.7 L54.3,117.2 L55.1,124.5 L59.2,125.4 L61.0,136.2 L71.3,141.8 L85.0,141.7 L77.4,145.1 L80.7,161.2 L75.3,161.7 L69.6,169.2 L70.1,176.4 L65.5,175.3 L66.4,188.4 L62.4,193.1 L81.1,213.8 L77.9,217.5 L79.5,221.9 L110.9,237.6 L120.9,254.4 L117.0,276.9 L125.1,277.3 L125.1,291.9 L134.3,298.5 L135.8,305.0 L147.2,303.6 L146.8,294.2 L161.8,304.4 L174.0,299.2 L175.8,306.4 L187.8,319.9 L187.8,328.9 L194.4,331.3 L191.5,334.7 L197.4,339.9 L202.7,357.8 L210.1,365.1 L231.3,371.4 L235.8,376.1 L234.2,378.9 L253.9,389.4 L260.9,397.2 L275.0,397.1 L282.3,402.8 L303.5,395.3 L307.4,389.3 L319.1,384.4 L332.6,384.8 L339.5,393.3 L346.7,423.2 L366.6,429.8 L381.7,429.4 L387.9,434.0 L397.8,431.7 L421.7,437.6 L422.9,432.6 L425.3,437.4 L445.5,443.4 L454.3,410.6 L464.1,407.2 L468.2,401.4 L485.7,399.2 L490.0,386.0 L486.2,381.1 L476.6,381.7 L476.3,353.8 L455.6,345.1 L431.2,308.3 L453.5,281.1 L454.3,275.8 L450.4,265.6 L430.4,262.5 L430.5,241.2 L424.3,218.9 L432.6,205.8 L422.9,202.2 L422.3,188.6 L431.9,183.8 L427.6,177.6 L435.8,169.8 L441.2,149.3 L438.0,118.1 L418.0,117.9 L411.0,107.3 L397.9,102.1 L394.4,93.4 L382.0,88.5 L371.6,90.2 L367.2,85.9 L347.9,80.7 L343.4,71.9 L325.7,72.6 L320.4,77.8 L301.4,77.5 L287.6,86.6 L283.1,95.3 L265.2,98.0 L266.7,110.0 L217.8,119.3 L196.6,114.1 L181.5,104.4 L177.2,96.8 L152.4,90.5 L146.1,67.5 L139.9,68.5 L125.4,56.0 L132.5,52.1 L128.1,44.6 L133.8,41.6 L124.7,31.9 L89.9,54.9 L64.9,51.9 L44.2,30.0 L39.0,40.2 L30.0,41.4 Z";

function MapPin({ city }: { city: LandingCity }) {
  const r = city.size === "lg" ? 6 : city.size === "md" ? 4.5 : 3.5;
  const pingR = city.size === "lg" ? 18 : city.size === "md" ? 14 : 10;

  return (
    <g className="group cursor-pointer">
      {/* Pulse ring */}
      <circle cx={city.x} cy={city.y} r={pingR} fill="none" stroke={city.color} strokeWidth="1" opacity="0.15">
        <animate attributeName="r" from={r} to={pingR} dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Glow */}
      <circle cx={city.x} cy={city.y} r={r + 4} fill={city.color} opacity="0.15" />

      {/* Pin dot */}
      <circle cx={city.x} cy={city.y} r={r} fill={city.color} stroke="#0a0a0f" strokeWidth="2" />

      {/* Inner highlight */}
      <circle cx={city.x} cy={city.y} r={r * 0.4} fill="white" opacity="0.5" />

      {/* Tooltip on hover */}
      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <rect x={city.x - 55} y={city.y - 55} width="110" height="42" rx="10" fill="#111118" stroke="white" strokeWidth="0.5" opacity="0.95" />
        <text x={city.x} y={city.y - 38} textAnchor="middle" fill={city.color} fontSize="11" fontWeight="bold" fontFamily="Vazirmatn">{city.name}</text>
        <text x={city.x} y={city.y - 22} textAnchor="middle" fill="white" opacity="0.4" fontSize="9" fontFamily="Vazirmatn">{city.count} ملک تحت پوشش</text>
      </g>
    </g>
  );
}

export default function CoverageMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: cities = [] } = useLandingCities();

  useGSAP(() => {
    if (!sectionRef.current) return;
    const pins = sectionRef.current.querySelectorAll(".map-pin-g");
    gsap.fromTo(pins, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)",
      transformOrigin: "center center",
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" },
    });

    // Animate connection lines
    const lines = sectionRef.current.querySelectorAll(".conn-line");
    gsap.fromTo(lines, { strokeDashoffset: 200 }, {
      strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut",
      scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 landing-section-padding" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Info panel: sits on the left in RTL via order-1 */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-gradient-to-l from-azbin-gold to-transparent" />
              <span className="text-azbin-gold text-xs tracking-[0.3em] font-[Vazirmatn]">پوشش سراسری</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-[Vazirmatn]">
              در <span className="gold-gradient-text">سراسر ایران</span>
              <br />
              در خدمت شما
            </h2>
            <p className="text-white/35 text-lg mb-10 leading-relaxed font-[Vazirmatn]">
              شبکه گسترده کارشناسان ما در تمامی شهرهای ایران آماده ارائه خدمات تخصصی املاک هستند.
            </p>

            {/* City stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {cities.map((city) => (
                <div key={city.name}
                  className="group p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer hover:bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: city.color }} />
                    <span className="text-xs font-bold font-[Vazirmatn]">{city.name}</span>
                  </div>
                  <div className="text-[10px] text-white/25 font-[Vazirmatn]">{city.count} ملک</div>
                </div>
              ))}
            </div>

            {/* Total counter */}
            <div className="mt-8 p-4 rounded-2xl border border-azbin-gold/10 bg-azbin-gold/[0.03]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-azbin-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-azbin-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold gold-gradient-text font-[Vazirmatn]">۳۸,۰۲۰+</div>
                  <div className="text-xs text-white/30 font-[Vazirmatn]">ملک تحت پوشش در سراسر کشور</div>
                </div>
              </div>
            </div>
          </div>
          {/* Map: sits on the right in RTL via order-2 in the LTR-flow grid */}
          <div className="relative w-full max-w-lg mx-auto aspect-square order-1 lg:order-2">
            <div className="absolute inset-0 rounded-3xl overflow-hidden landing-glass p-4">
              <svg viewBox="0 0 520 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Grid background */}
                {Array.from({ length: 25 }, (_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 20} x2="520" y2={i * 20} stroke="white" strokeWidth="0.15" opacity="0.04" />
                ))}
                {Array.from({ length: 27 }, (_, i) => (
                  <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="480" stroke="white" strokeWidth="0.15" opacity="0.04" />
                ))}

                {/* Iran map outline - real simplified borders */}
                <path d={IRAN_OUTLINE} fill="none" stroke="white" strokeWidth="1.5" opacity="0.15" />
                <path d={IRAN_OUTLINE} fill="url(#mapGrad)" opacity="0.08" />

                {/* Gradient definition */}
                <defs>
                  <radialGradient id="mapGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Connection lines from Tehran to other cities */}
                {cities.filter((c) => c.name !== "تهران").map((city, i) => (
                  <line key={`conn-${i}`}
                    className="conn-line"
                    x1={cities[0].x} y1={cities[0].y}
                    x2={city.x} y2={city.y}
                    stroke={city.color} strokeWidth="0.5" opacity="0.15"
                    strokeDasharray="4 4" strokeDashoffset="200"
                  />
                ))}

                {/* City pins */}
                {cities.map((city) => (
                  <g key={city.name} className="map-pin-g">
                    <MapPin city={city} />
                  </g>
                ))}
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}