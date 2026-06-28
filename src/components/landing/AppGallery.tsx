"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingGallery } from "@/services/use-landing";

gsap.registerPlugin(ScrollTrigger);

function PropertyDashboardMockup({ color, title }: { color: string; title: string }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative py-32 " style={{ background: "#080c16" }}>
      <div className="absolute top-0 left-0 right-0 h-7 flex items-center gap-1.5 px-3" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
        <span className="text-[8px] text-white/20 ml-2 tracking-wider">{title}</span>
      </div>
      <div className="pt-9 px-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 rounded" style={{ background: `${color}30` }} />
          <div className="h-1.5 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-6 rounded"
              style={{ background: i === 0 ? `${color}15` : "rgba(255,255,255,0.03)", border: i === 0 ? `1px solid ${color}20` : "1px solid transparent" }} />
          ))}
        </div>
        <div className="flex items-end gap-0.5 mb-3 h-10">
          {[30, 50, 40, 65, 55, 80, 70, 90, 75, 85, 60, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i >= 10 ? color : `${color}40`, opacity: i >= 10 ? 0.6 : 0.3 }} />
          ))}
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 flex-1 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: mockups = [] } = useLandingGallery();

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".gallery-card");
    gsap.fromTo(cards, { opacity: 0, y: 50, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 landing-section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-azbin-teal/50" />
            <span className="text-azbin-teal/70 text-xs tracking-[0.25em] font-medium">پیش‌نمایش پلتفرم</span>
            <div className="w-8 h-[1px] bg-azbin-teal/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            مدیریت هوشمند <span className="teal-gradient-text">املاک شما</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">رابطی بصری برای مشاهده گزارش‌های کارشناسی، مدیریت اسناد و پیگیری درخواست‌ها.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {mockups.map((item) => (
            <div key={item.id} data-cursor-hover
              className="gallery-card group relative rounded-3xl landing-glass overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{ gridColumn: `span ${item.gridColSpan}`, gridRow: `span ${item.gridRowSpan}` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}08, transparent 70%)` }} />
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 p-4">
                  <PropertyDashboardMockup color={item.color} title={item.title} />
                </div>
                <div className="px-6 pb-5">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs text-white/30 mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
