"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingStats } from "@/services/use-landing";
import type { LandingStat } from "@/services/landing-types";

gsap.registerPlugin(ScrollTrigger);

function StatIcon({ icon, color }: { icon: string; color: string }) {
  switch (icon) {
    case "building":
      return (
        <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      );
    case "expert":
      return (
        <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    case "satisfaction":
      return (
        <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      );
    case "city":
      return (
        <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    default:
      return null;
  }
}

function AnimatedCounter({ target, suffix, color, inView }: { target: number; suffix: string; color: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target, duration: 2.5, ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.val)),
    });
  }, [inView, target]);

  return (
    <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { data: stats = [], isLoading } = useLandingStats();

  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => setInView(true),
      onLeaveBack: () => setInView(false),
    });

    const cards = sectionRef.current.querySelectorAll(".stat-card");
    gsap.fromTo(cards, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 landing-section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-azbin-gold/50" />
            <span className="text-azbin-gold/70 text-xs tracking-[0.25em] font-medium">آمار و عملکرد</span>
            <div className="w-8 h-[1px] bg-azbin-gold/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            کارشناسان <span className="gold-gradient-text">معتبر</span> در سراسر کشور
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} data-cursor-hover className="stat-card group relative landing-glass rounded-3xl p-8 text-center overflow-hidden transition-all duration-500 hover:scale-[1.03]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}10, transparent 70%)` }} />
              <div className="relative z-10 flex flex-col items-center">
                <StatIcon icon={stat.icon} color={stat.color} />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} color={stat.color} inView={inView} />
                <p className="text-white/50 text-sm mt-3 font-medium">{stat.label}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
            </div>
          ))}
        </div>

        <div className="mt-16 landing-glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full opacity-[0.04] blur-3xl" style={{ background: "#D4A843" }} />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-azbin-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
              </svg>
              <h3 className="text-xl md:text-2xl font-bold">آماده‌اید ملک خود را کارشناسی کنید؟</h3>
            </div>
            <p className="text-white/40 text-sm">همین الان درخواست کارشناسی رسمی خود را ثبت کنید و از خدمات تخصصی ما بهره‌مند شوید.</p>
          </div>
          <button data-cursor-hover className="magnetic-btn flex-shrink-0 px-8 py-4 rounded-2xl font-semibold text-sm text-azbin-bg relative z-10"
            style={{ background: "linear-gradient(135deg, #D4A843, #9A7A2E)" }}>
            ثبت درخواست کارشناسی
          </button>
        </div>
      </div>
    </section>
  );
}
