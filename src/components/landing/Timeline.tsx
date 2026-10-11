"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingTimeline } from "@/services/use-landing";

gsap.registerPlugin(ScrollTrigger);

function StepIcon({ icon }: { icon: string }) {
  const common = { stroke: "currentColor", fill: "none", strokeWidth: 1.3 } as const;
  switch (icon) {
    case "form": return (<svg width="24" height="24" viewBox="0 0 24 24" {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h3" strokeLinecap="round" /></svg>);
    case "analyze": return (<svg width="24" height="24" viewBox="0 0 24 24" {...common}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" strokeLinecap="round" /></svg>);
    case "expert": return (<svg width="24" height="24" viewBox="0 0 24 24" {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" strokeLinecap="round" /></svg>);
    case "inspect": return (<svg width="24" height="24" viewBox="0 0 24 24" {...common}><rect x="3" y="5" width="11" height="15" rx="1.5" /><circle cx="17.5" cy="10.5" r="4" /><path d="M20.5 13.5L23 16" strokeLinecap="round" /></svg>);
    case "report": return (<svg width="24" height="24" viewBox="0 0 24 24" {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M7.5 14l3-3 2.5 2.5L18 9" strokeLinecap="round" strokeLinejoin="round" /></svg>);
    default: return null;
  }
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const { data: steps = [] } = useLandingTimeline();
  const [activeSteps, setActiveSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [headerVisible, setHeaderVisible] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(".tl-header", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      onStart: () => setHeaderVisible(true),
    });

    const state = { progress: 0 };
    const n = steps.length;

    gsap.to(state, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 55%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (railFillRef.current) {
            railFillRef.current.style.transform = `scaleY(${p})`;
          }
          setActiveSteps(steps.map((_, i) => {
            const threshold = i / (n - 1);
            return p >= threshold - 0.02;
          }));
        },
      },
    });
  }, { scope: sectionRef, dependencies: [steps.length], revertOnUpdate: true });

  return (
    <section ref={sectionRef} className="relative py-28 landing-section-padding">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="tl-header text-center mb-20" style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
          <div className="inline-flex items-center gap-2 mb-5 text-azbin-gold/80">
            <span className="w-1.5 h-1.5 rounded-full bg-azbin-gold" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase font-[Vazirmatn]">راهنمای کارشناسی</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-[Vazirmatn]">
            از ثبت درخواست تا <span className="gold-gradient-text">گزارش نهایی</span>
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto font-[Vazirmatn]">
            ۵ مرحله شفاف، از درخواست آنلاین تا تحویل گزارش کارشناسی رسمی
          </p>
        </div>

        {/* Desktop: vertical zigzag */}
        <div className="hidden md:block relative">
          {/* Rail */}
          <div className="absolute right-1/2 top-2 bottom-2 w-px translate-x-1/2">
            <div className="absolute inset-0 bg-white/10" />
            <div
              ref={railFillRef}
              className="absolute top-0 left-0 w-full h-full origin-top rounded-full"
              style={{ transform: "scaleY(0)", background: "linear-gradient(180deg, #D4A843, #14B8A6, #06B6D4)" }}
            />
          </div>

          <ol className="relative space-y-16">
            {steps.map((step, index) => {
              const fromRight = index % 2 === 0;
              const isActive = activeSteps[index];
              return (
                <li key={step.id} className={`relative flex items-center gap-10 ${fromRight ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Card */}
                  <div className={`flex-1 ${fromRight ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block max-w-md rounded-2xl border p-6 transition-all duration-700 ${fromRight ? "" : "ml-auto"}`}
                      style={{
                        opacity: isActive ? 1 : 0.2,
                        filter: isActive ? "blur(0px)" : "blur(3px)",
                        borderColor: isActive ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.06)",
                        background: isActive ? "rgb(20 22 27)" : "rgba(255,255,255,0.01)",
                        transform: isActive ? "scale(1)" : "scale(0.97)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3 gap-3">
                        <span className="font-mono text-[11px] tracking-widest text-white/30 font-[Vazirmatn]">
                          مرحله {String(step.id).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.08] text-white/45 font-[Vazirmatn]">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1.5 font-[Vazirmatn]">{step.title}</h3>
                      <p className="text-xs text-azbin-gold/70 font-medium mb-3 font-[Vazirmatn]">{step.subtitle}</p>
                      <p className="text-sm text-white/40 leading-relaxed font-[Vazirmatn]">{step.description}</p>
                    </div>
                  </div>

                  {/* Node */}
                  <div
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-700"
                    style={{
                      borderColor: isActive ? "rgba(212,168,67,0.6)" : "rgba(255,255,255,0.15)",
                      background: isActive ? "rgb(20 22 27)" : "#0a0a0a",
                      color: isActive ? "#D4A843" : "rgba(255,255,255,0.3)",
                      boxShadow: isActive ? "0 0 20px rgba(212,168,67,0.15)" : "none",
                    }}
                  >
                    <StepIcon icon={step.icon} />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: stacked */}
        <ol className="md:hidden relative pr-6 space-y-6">
          <div className="absolute right-[7px] top-1 bottom-1 w-px bg-white/10" />
          {steps.map((step, index) => (
            <li key={step.id} className="relative" style={{ opacity: activeSteps[index] || index === 0 ? 1 : 0.4, transition: "opacity 0.5s" }}>
              <span className="absolute right-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0a0a0a] border border-azbin-gold/60" />
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-2.5 gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-white/30 font-[Vazirmatn]">مرحله {String(step.id).padStart(2, "0")}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/45 font-[Vazirmatn]">{step.duration}</span>
                </div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-azbin-gold/80"><StepIcon icon={step.icon} /></span>
                  <h3 className="text-lg font-bold font-[Vazirmatn]">{step.title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed font-[Vazirmatn]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
