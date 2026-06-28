"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<SVGSVGElement>(null);
  const glassRef = useRef<SVGSVGElement>(null);
  const meterRef = useRef<SVGSVGElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
            onComplete();
          },
        });
      },
    });

    const counter = { val: 0 };

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    );

    // House blueprint draw-in
    tl.fromTo(
      houseRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );

    // Animate house SVG rects
    if (houseRef.current) {
      const rects = houseRef.current.querySelectorAll("rect.bp-rect, rect.bp-win, rect.bp-door");
      const roof = houseRef.current.querySelector("path.bp-roof");

      rects.forEach((el, i) => {
        const origW = parseFloat(el.getAttribute("width") || "0");
        gsap.fromTo(
          el,
          { opacity: 0, attr: { width: 0 } },
          { opacity: 0.5, attr: { width: origW }, duration: 0.4, delay: 0.8 + i * 0.06, ease: "power2.out" }
        );
      });

      if (roof) {
        const roofLength = (roof as SVGPathElement).getTotalLength?.() || 200;
        gsap.fromTo(
          roof,
          { strokeDasharray: roofLength, strokeDashoffset: roofLength, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.5, duration: 0.8, delay: 1.0, ease: "power2.inOut" }
        );
      }
    }

    // Magnifying glass sweep
    tl.fromTo(
      glassRef.current,
      { opacity: 0, x: -20, y: 20 },
      { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.8"
    );

    // Glass scanning motion
    tl.to(glassRef.current, {
      x: 30, y: -15, duration: 0.8, ease: "power1.inOut", yoyo: true, repeat: 1,
    }, "-=0.2");

    // Meter entrance + needle swing
    tl.fromTo(
      meterRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=1.2"
    );

    if (meterRef.current) {
      const needle = meterRef.current.querySelector(".meter-needle");
      const fill = meterRef.current.querySelector(".meter-fill");
      if (needle) {
        tl.fromTo(needle,
          { attr: { transform: "rotate(-90, 70, 70)" } },
          { attr: { transform: "rotate(45, 70, 70)" }, duration: 1.2, ease: "power2.out" },
          "-=0.8"
        );
      }
      if (fill) {
        tl.to(fill, { attr: { strokeDashoffset: 20 }, duration: 1.2, ease: "power2.out" }, "<");
      }
    }

    // Floating icons entrance
    tl.fromTo(
      iconsRef.current?.children ? Array.from(iconsRef.current.children) : [],
      { opacity: 0, y: 15 },
      { opacity: 0.4, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      "-=1"
    );

    // Progress bar
    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: "power2.inOut" },
      "-=1.4"
    );

    tl.to(
      counter,
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.val)),
      },
      "<"
    );

    // Floating animation for icons
    if (iconsRef.current) {
      Array.from(iconsRef.current.children).forEach((icon, i) => {
        gsap.to(icon, {
          y: -4, duration: 1.5 + i * 0.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3,
        });
      });
    }
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      <div className="absolute inset-0 landing-mesh-bg opacity-60" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          {Array.from({ length: 40 }, (_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 2.5}%`} y1="0" x2={`${(i + 1) * 2.5}%`} y2="100%" stroke="#D4A843" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 25 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 4}%`} x2="100%" y2={`${(i + 1) * 4}%`} stroke="#D4A843" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
          <span className="gold-gradient-text">از</span>
          <span className="text-white/90">بین</span>
        </h1>

        {/* Animated elements row */}
        <div className="flex items-center gap-6 mb-4">
          {/* Building Blueprint */}
          <svg ref={houseRef} className="w-20 h-20 md:w-28 md:h-28" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="bp-rect" x="50" y="40" width="100" height="140" rx="2" stroke="#D4A843" strokeWidth="1" opacity="0.5" />
            <path className="bp-roof" d="M45 40 L100 10 L155 40" stroke="#D4A843" strokeWidth="1" opacity="0.5" />
            <rect className="bp-win" x="65" y="60" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-win" x="91" y="60" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-win" x="117" y="60" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-win" x="65" y="100" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-win" x="91" y="100" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-win" x="117" y="100" width="18" height="22" rx="1" stroke="#14B8A6" strokeWidth="0.8" opacity="0.5" />
            <rect className="bp-door" x="88" y="145" width="24" height="35" rx="1" stroke="#D4A843" strokeWidth="0.8" opacity="0.5" />
            <circle cx="107" cy="163" r="2" fill="#D4A843" opacity="0.4" />
            <line x1="45" y1="185" x2="155" y2="185" stroke="#D4A843" strokeWidth="0.3" opacity="0.3" />
            <line x1="45" y1="183" x2="45" y2="187" stroke="#D4A843" strokeWidth="0.3" opacity="0.3" />
            <line x1="155" y1="183" x2="155" y2="187" stroke="#D4A843" strokeWidth="0.3" opacity="0.3" />
            {Array.from({ length: 8 }, (_, r) =>
              Array.from({ length: 8 }, (_, c) => (
                <circle key={`${r}-${c}`} cx={30 + c * 20} cy={20 + r * 25} r="0.5" fill="#D4A843" opacity="0.15" />
              ))
            )}
          </svg>

          {/* Magnifying Glass */}
          <svg ref={glassRef} className="w-14 h-14 md:w-18 md:h-18" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="32" stroke="#D4A843" strokeWidth="2" opacity="0.6" />
            <circle cx="50" cy="50" r="28" stroke="#D4A843" strokeWidth="0.5" opacity="0.3" />
            <line x1="73" y1="73" x2="100" y2="100" stroke="#D4A843" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M38 34 C38 34, 42 30, 50 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>

          {/* Value Meter */}
          <svg ref={meterRef} className="w-24 h-14 md:w-32 md:h-18" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 70 A50 50 0 0 1 120 70" stroke="#14B8A6" strokeWidth="2" opacity="0.4" />
            <path className="meter-fill" d="M20 70 A50 50 0 0 1 120 70" stroke="url(#meterGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" strokeDasharray="157" strokeDashoffset="157" />
            <line className="meter-needle" x1="70" y1="70" x2="70" y2="28" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" style={{ transformOrigin: "70px 70px" }} />
            <circle cx="70" cy="70" r="3" fill="#D4A843" opacity="0.5" />
            <text x="18" y="78" fill="#D4A843" fontSize="6" opacity="0.3">&#x661;</text>
            <text x="112" y="78" fill="#D4A843" fontSize="6" opacity="0.3">&#x660;&#x660;</text>
            {Array.from({ length: 11 }, (_, i) => {
              const angle = Math.PI + (i / 10) * Math.PI;
              const x1 = 70 + 50 * Math.cos(angle);
              const y1 = 70 + 50 * Math.sin(angle);
              const x2 = 70 + 46 * Math.cos(angle);
              const y2 = 70 + 46 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4A843" strokeWidth={i % 5 === 0 ? "0.8" : "0.3"} opacity="0.3" />;
            })}
            <defs>
              <linearGradient id="meterGrad" x1="20" y1="70" x2="120" y2="70">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#D4A843" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating property icons */}
        <div ref={iconsRef} className="flex items-center gap-5 mb-4">
          <svg className="w-5 h-5 text-azbin-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <svg className="w-5 h-5 text-azbin-teal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <svg className="w-5 h-5 text-azbin-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <svg className="w-5 h-5 text-azbin-teal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <svg className="w-5 h-5 text-azbin-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
          </svg>
          <svg className="w-5 h-5 text-azbin-teal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="w-56 md:w-72">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full origin-left rounded-full"
              style={{ background: "linear-gradient(90deg, #D4A843, #14B8A6)" }}
            />
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-3">
          <span className="loader-digit text-sm font-mono tracking-[0.3em] text-white/40">
            {String(count).padStart(3, "0")}
          </span>
          <span className="text-[10px] text-white/20 font-[Vazirmatn]">بررسی املاک...</span>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? "rgba(212,168,67,0.25)" : "rgba(20,184,166,0.25)",
            animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
