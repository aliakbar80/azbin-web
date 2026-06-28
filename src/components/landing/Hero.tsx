"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BlueprintGrid() {
  const lines = useMemo(() => {
    const h = Array.from({ length: 20 }, (_, i) => ({
      y: i * 50,
      opacity: Math.random() * 0.06 + 0.02,
    }));
    const v = Array.from({ length: 30 }, (_, i) => ({
      x: i * 50,
      opacity: Math.random() * 0.06 + 0.02,
    }));
    return { h, v };
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines.h.map((l, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={l.y}
          x2="100%"
          y2={l.y}
          stroke="#D4A843"
          strokeWidth="0.5"
          opacity={l.opacity}
        />
      ))}
      {lines.v.map((l, i) => (
        <line
          key={`v${i}`}
          x1={l.x}
          y1="0"
          x2={l.x}
          y2="100%"
          stroke="#D4A843"
          strokeWidth="0.5"
          opacity={l.opacity}
        />
      ))}
    </svg>
  );
}

function Cityscape() {
  const buildings = [
    { x: 5, w: 40, h: 180, delay: 0 },
    { x: 55, w: 35, h: 240, delay: 0.1 },
    { x: 100, w: 50, h: 300, delay: 0.2 },
    { x: 160, w: 30, h: 200, delay: 0.15 },
    { x: 200, w: 45, h: 350, delay: 0.3 },
    { x: 255, w: 35, h: 260, delay: 0.25 },
    { x: 300, w: 55, h: 400, delay: 0.35 },
    { x: 365, w: 30, h: 220, delay: 0.2 },
    { x: 405, w: 40, h: 280, delay: 0.3 },
    { x: 455, w: 50, h: 320, delay: 0.28 },
    { x: 515, w: 35, h: 190, delay: 0.18 },
    { x: 560, w: 45, h: 360, delay: 0.32 },
    { x: 615, w: 30, h: 240, delay: 0.22 },
    { x: 655, w: 50, h: 290, delay: 0.26 },
    { x: 715, w: 40, h: 210, delay: 0.24 },
    { x: 765, w: 35, h: 330, delay: 0.3 },
    { x: 810, w: 45, h: 250, delay: 0.21 },
    { x: 865, w: 55, h: 380, delay: 0.34 },
    { x: 930, w: 30, h: 200, delay: 0.19 },
    { x: 970, w: 40, h: 270, delay: 0.27 },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[400px] pointer-events-none overflow-hidden opacity-40">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1050 400"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bldgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0D078" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {buildings.map((b, i) => {
          const y = 400 - b.h;
          const rows = Math.floor(b.h / 25);
          const cols = Math.floor(b.w / 12);
          return (
            <g
              key={i}
              className="city-building"
              style={{ animationDelay: `${b.delay}s` }}
            >
              <rect
                x={b.x}
                y={y}
                width={b.w}
                height={b.h}
                fill="url(#bldgGrad)"
                rx="2"
              />
              <rect
                x={b.x}
                y={y}
                width={b.w}
                height={b.h}
                fill="none"
                stroke="#D4A843"
                strokeWidth="0.5"
                opacity="0.2"
                rx="2"
              />
              {Array.from({ length: rows }, (_, r) =>
                Array.from({ length: cols }, (_, c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={b.x + 4 + c * 12}
                    y={y + 8 + r * 25}
                    width="6"
                    height="10"
                    fill="url(#windowGrad)"
                    opacity={Math.random() > 0.4 ? 0.6 : 0.1}
                    rx="1"
                  />
                ))
              )}
              <line
                x1={b.x + b.w / 2}
                y1={y - 10}
                x2={b.x + b.w / 2}
                y2={y}
                stroke="#D4A843"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle
                cx={b.x + b.w / 2}
                cy={y - 12}
                r="2"
                fill="#D4A843"
                opacity="0.4"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function FloatingPropertyCard({ delay }: { delay: number }) {
  return (
    <div
      className="absolute landing-glass rounded-xl p-3 pointer-events-none"
      style={{
        width: 140,
        animation: `float ${6 + delay * 2}s ease-in-out ${delay}s infinite`,
        opacity: 0.15,
        right: `${10 + delay * 15}%`,
        top: `${20 + delay * 10}%`,
      }}
    >
      <div
        className="w-full h-16 rounded-lg mb-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,168,67,0.2), rgba(20,184,166,0.15))",
        }}
      />
      <div
        className="h-1.5 rounded-full w-3/4 mb-1.5"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />
      <div
        className="h-1.5 rounded-full w-1/2"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </div>
  );
}

function PropertyPin({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
          fill="#D4A843"
          fillOpacity="0.15"
        />
        <circle cx="12" cy="12" r="5" fill="#D4A843" fillOpacity="0.3" />
        <circle cx="12" cy="12" r="2" fill="#D4A843" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

function splitTextToChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headlineRef.current) return;

      const headlineChars = headlineRef.current.querySelectorAll(".char");
      const tl = gsap.timeline({ delay: 0.2 });

      gsap.set(headlineChars, { opacity: 0, y: 40, filter: "blur(8px)" });

      tl.to(headlineChars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
      });

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );

      if (ctaRef.current) {
        tl.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (cityRef.current) {
        const buildings = cityRef.current.querySelectorAll(".city-building");
        gsap.fromTo(
          buildings,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "power3.out",
            delay: 1,
          }
        );
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      scrollTl.to(
        headlineRef.current,
        { scale: 0.85, y: -60, opacity: 0.3 },
        0
      );
      scrollTl.to(cityRef.current, { y: -80, opacity: 0.2 }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <BlueprintGrid />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)",
            top: "5%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.25), transparent 70%)",
            bottom: "10%",
            right: "-5%",
          }}
        />
      </div>

      <PropertyPin x="15%" y="25%" delay={0} />
      <PropertyPin x="80%" y="35%" delay={1.5} />
      <PropertyPin x="70%" y="15%" delay={2.5} />
      <PropertyPin x="25%" y="60%" delay={1} />

      <FloatingPropertyCard delay={0} />
      <FloatingPropertyCard delay={1} />
      <FloatingPropertyCard delay={2} />

      <div ref={cityRef} className="absolute bottom-0 left-0 right-0">
        <Cityscape />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-azbin-bg via-transparent to-azbin-bg/90 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div className="mb-6 inline-flex items-center gap-2 landing-glass rounded-full px-5 py-2 text-xs font-medium tracking-widest text-azbin-gold/80">
          <span className="w-1.5 h-1.5 rounded-full bg-azbin-teal animate-pulse" />
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          کارشناسی رسمی و تخصصی املاک
        </div>

        <h1
          ref={headlineRef}
          className="leading-[0.95] tracking-tight mb-8"
          style={{ willChange: "transform" }}
        >
          <span className="block mb-4 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[900]">
            <span className="gold-gradient-text">از</span>
            <span className="text-white/95">بین</span>
            <span className="text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-6xl mx-1">
              {" "}
              ارزیابی و بررسی{" "}
            </span>
          </span>
          <span className="block text-white/95 text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
            تخصصی ملک شما
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          کارشناسان معتبر برای ارزیابی ساختمان و سند ملکی شما
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            data-cursor-hover
            className="magnetic-btn group relative px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide text-azbin-bg overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4A843, #9A7A2E)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              درخواست کارشناسی ملک
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 7l-5 5m0 0l5 5m-5-5h11"
                />
              </svg>
            </span>
          </button>

          <button
            data-cursor-hover
            className="magnetic-btn group relative px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide landing-glass-gold text-azbin-gold hover:bg-azbin-gold/10 transition-colors"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              بررسی کامل اسناد ملکی
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 7l-5 5m0 0l5 5m-5-5h11"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-4 text-white/20 text-xs">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-azbin-teal/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            <span> ارزیابی دقیق ساختمان و سازه</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-azbin-teal/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            <span>گزارش تفصیلی و قابل‌اعتماد</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-azbin-teal/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            <span> تصمیم‌های مطمئن</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[10px] tracking-[0.3em]">اسکرول کنید</span>
        <div className="w-5 h-9 rounded-full border border-white/15 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-azbin-gold/60 animate-float mt-[16px]" />
        </div>
      </div>
    </section>
  );
}
