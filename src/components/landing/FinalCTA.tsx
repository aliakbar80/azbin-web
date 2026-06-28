"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function PropertyBackground() {
  const buildings = useMemo(() => [
    { x: 5, w: 50, h: 120 }, { x: 65, w: 40, h: 180 }, { x: 115, w: 60, h: 220 },
    { x: 185, w: 35, h: 150 }, { x: 230, w: 55, h: 280 }, { x: 295, w: 40, h: 200 },
    { x: 345, w: 65, h: 300 }, { x: 420, w: 35, h: 160 }, { x: 465, w: 50, h: 240 },
    { x: 525, w: 45, h: 190 }, { x: 580, w: 55, h: 260 }, { x: 645, w: 40, h: 170 },
  ], []);

  return (
    <svg className="absolute bottom-0 left-0 w-full h-[200px] opacity-10" viewBox="0 0 700 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#D4A843" opacity={0.2 + (i % 3) * 0.05} rx="2" />
          {Array.from({ length: Math.floor(b.h / 20) }, (_, r) =>
            Array.from({ length: Math.floor(b.w / 10) }, (_, c) => (
              <rect key={`${r}-${c}`} x={b.x + 3 + c * 10} y={300 - b.h + 5 + r * 20} width="5" height="8" fill="#D4A843" opacity={Math.random() > 0.5 ? 0.4 : 0.1} rx="0.5" />
            ))
          )}
        </g>
      ))}
    </svg>
  );
}

function FloatingHouse({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, animation: `float ${7 + delay}s ease-in-out ${delay}s infinite`, opacity: 0.08 }}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 5L5 25V55H55V25L30 5Z" stroke="#D4A843" strokeWidth="1" fill="none" />
        <rect x="22" y="35" width="16" height="20" stroke="#D4A843" strokeWidth="0.5" fill="rgba(212,168,67,0.1)" />
        <rect x="10" y="30" width="10" height="10" stroke="#D4A843" strokeWidth="0.5" fill="rgba(212,168,67,0.05)" />
        <rect x="40" y="30" width="10" height="10" stroke="#D4A843" strokeWidth="0.5" fill="rgba(212,168,67,0.05)" />
      </svg>
    </div>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" },
    });
    tl.fromTo(".cta-headline", { opacity: 0, y: 60, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" });
    tl.fromTo(".cta-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
    tl.fromTo(".cta-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
    tl.fromTo(".cta-footer", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <PropertyBackground />
      <FloatingHouse delay={0} x="10%" y="20%" />
      <FloatingHouse delay={1.5} x="75%" y="15%" />
      <FloatingHouse delay={2.5} x="85%" y="55%" />
      <FloatingHouse delay={1} x="5%" y="60%" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.4), transparent 70%)", top: "20%", left: "30%" }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-azbin-bg via-transparent to-azbin-bg pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="cta-headline mb-8">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            <span className="block text-white/95">آماده‌اید</span>
            <span className="block mt-2 gold-gradient-text">ملک خود را</span>
            <span className="block text-white/95 mt-2">ارزیابی کنید؟</span>
          </h2>
        </div>

        <p className="cta-sub text-base sm:text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-12 leading-relaxed">
          کارشناسان معتبر ما آماده ارزیابی تخصصی ساختمان و سند ملکی شما هستند.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button data-cursor-hover className="magnetic-btn group px-10 py-5 rounded-2xl font-bold text-base tracking-wide text-azbin-bg relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4A843, #9A7A2E)" }}>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
              </svg>
              سفارش کارشناسی ملک
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 7l-5 5m0 0l5 5m-5-5h11" />
              </svg>
            </span>
          </button>
          <button data-cursor-hover className="magnetic-btn group px-10 py-5 rounded-2xl font-bold text-base tracking-wide landing-glass-gold text-azbin-gold hover:bg-azbin-gold/10 transition-colors font-[Vazirmatn]">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              مشاوره رایگان
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 7l-5 5m0 0l5 5m-5-5h11" />
              </svg>
            </span>
          </button>
        </div>

        <div className="cta-footer">
          <div className="inline-flex items-center gap-6 landing-glass rounded-full px-8 py-3 text-xs text-white/30">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-azbin-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>امنیت بانکی</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-azbin-teal/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>کارشناسان مجرب</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-azbin-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>پشتیبانی ۲۴ ساعته</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/5">
        <div className="landing-section-padding flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              <span className="gold-gradient-text">Az</span>
              <span className="text-white/70">bin</span>
            </span>
            <span className="text-xs text-white/15">&copy; 2026</span>
          </div>
          <div className="flex items-center gap-8 text-xs text-white/25">
            <Link href="/pages/privacy" data-cursor-hover className="hover:text-azbin-gold/60 transition-colors">حریم خصوصی</Link>
            <Link href="/pages/terms" data-cursor-hover className="hover:text-azbin-gold/60 transition-colors">شرایط استفاده</Link>
            <Link href="/pages/contact" data-cursor-hover className="hover:text-azbin-gold/60 transition-colors">تماس با ما</Link>
            <Link href="/pages/faq" data-cursor-hover className="hover:text-azbin-gold/60 transition-colors">سوالات متداول</Link>
          </div>
          <div className="flex items-center gap-3">
            {["T", "L", "I"].map((social) => (
              <a key={social} href="#" data-cursor-hover
                className="w-9 h-9 rounded-full landing-glass flex items-center justify-center text-white/25 hover:text-azbin-gold/60 hover:border-azbin-gold/20 transition-all text-xs">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
