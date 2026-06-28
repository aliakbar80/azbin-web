"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLandingFeatures } from "@/services/use-landing";

gsap.registerPlugin(ScrollTrigger);

function MatchmakingVisual() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="w-full h-full">
      {/* Left side - Property */}
      <rect x="15" y="20" width="50" height="80" rx="6" fill="#D4A84310" stroke="#D4A84330" strokeWidth="0.5" />
      <rect x="22" y="30" width="36" height="20" rx="2" fill="#D4A84315" />
      <rect x="22" y="55" width="16" height="8" rx="1" fill="#D4A84320" />
      <rect x="42" y="55" width="16" height="8" rx="1" fill="#D4A84320" />
      <rect x="22" y="68" width="36" height="2" rx="1" fill="#D4A84315" />
      <rect x="22" y="74" width="24" height="2" rx="1" fill="#D4A84310" />
      <text x="40" y="100" textAnchor="middle" fill="#D4A843" fontSize="6" opacity="0.5">ملک شما</text>

      {/* Right side - Expert */}
      <circle cx="140" cy="50" r="25" fill="#14B8A610" stroke="#14B8A630" strokeWidth="0.5" />
      <circle cx="140" cy="42" r="8" fill="#14B8A620" />
      <path d="M128 60 Q140 52 152 60" stroke="#14B8A630" strokeWidth="0.5" fill="#14B8A615" />
      <text x="140" y="85" textAnchor="middle" fill="#14B8A6" fontSize="6" opacity="0.5">کارشناس</text>

      {/* Connection lines */}
      <path d="M65 50 Q100 30 115 50" stroke="url(#matchGrad)" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-14" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M65 55 Q100 75 115 55" stroke="url(#matchGrad2)" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-14" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Match icon */}
      <circle cx="90" cy="50" r="10" fill="#0B0F19" stroke="#14B8A640" strokeWidth="1" />
      <path d="M86 50 L89 53 L95 47" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <defs>
        <linearGradient id="matchGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id="matchGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4A843" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrackingVisual() {
  const steps = [
    { x: 15, label: "ثبت", done: true },
    { x: 50, label: "بررسی", done: true },
    { x: 85, label: "ارزیابی", done: true },
    { x: 120, label: "گزارش", done: false },
    { x: 155, label: "تحویل", done: false },
  ];

  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="w-full h-full">
      {/* Timeline line */}
      <line x1="15" y1="55" x2="165" y2="55" stroke="white" strokeWidth="0.5" opacity="0.1" />
      <line x1="15" y1="55" x2="95" y2="55" stroke="url(#trackGrad)" strokeWidth="1.5" opacity="0.6" />

      {/* Steps */}
      {steps.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy="55" r={s.done ? "8" : "6"}
            fill={s.done ? "#06B6D420" : "#ffffff08"}
            stroke={s.done ? "#06B6D4" : "#ffffff20"}
            strokeWidth={s.done ? "1.5" : "0.5"} />
          {s.done && (
            <path d={`M${s.x - 3} 55 L${s.x - 1} 57.5 L${s.x + 3} 52.5`} stroke="#06B6D4" strokeWidth="1.2" strokeLinecap="round" />
          )}
          {!s.done && (
            <circle cx={s.x} cy="55" r="2" fill="#06B6D440" />
          )}
          <text x={s.x} y="75" textAnchor="middle" fill={s.done ? "#06B6D4" : "#ffffff30"} fontSize="5.5" fontFamily="Vazirmatn">{s.label}</text>
        </g>
      ))}

      {/* Live indicator */}
      <circle cx="85" cy="40" r="12" fill="#06B6D408" stroke="#06B6D420" strokeWidth="0.5" />
      <circle cx="85" cy="40" r="3" fill="#06B6D4" opacity="0.6">
        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="85" y="42" textAnchor="middle" fill="#06B6D4" fontSize="3" fontWeight="bold">زنده</text>

      {/* Progress bar */}
      <rect x="15" y="95" width="150" height="4" rx="2" fill="#ffffff06" />
      <rect x="15" y="95" width="80" height="4" rx="2" fill="url(#trackGrad2)">
        <animate attributeName="width" values="60;80;60" dur="3s" repeatCount="indefinite" />
      </rect>

      <defs>
        <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="trackGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="w-full h-full">
      {/* Shield */}
      <path d="M90 15 L130 30 L130 60 Q130 90 90 105 Q50 90 50 60 L50 30 Z"
        fill="#D4A84308" stroke="#D4A84325" strokeWidth="0.8" />
      <path d="M90 25 L120 37 L120 58 Q120 82 90 95 Q60 82 60 58 L60 37 Z"
        fill="#D4A84305" stroke="#D4A84318" strokeWidth="0.5" />

      {/* Lock icon */}
      <rect x="78" y="50" width="24" height="20" rx="3" fill="#D4A84315" stroke="#D4A84340" strokeWidth="0.8" />
      <path d="M84 50 L84 44 Q84 38 90 38 Q96 38 96 44 L96 50" stroke="#D4A84350" strokeWidth="1" fill="none" />
      <circle cx="90" cy="58" r="3" fill="#D4A84330" />
      <line x1="90" y1="61" x2="90" y2="66" stroke="#D4A84340" strokeWidth="1" />

      {/* Data blocks floating */}
      {[0, 1, 2, 3, 4]?.map((i) => (
        <g key={i} opacity={0.15 + i * 0.05}>
          <rect x={20 + i * 30} y={20 + (i % 2) * 70} width="18" height="10" rx="2"
            fill="#D4A84310" stroke="#D4A84320" strokeWidth="0.3" />
          <rect x={23 + i * 30} y={23 + (i % 2) * 70} width="8" height="2" rx="0.5" fill="#D4A84325" />
          <rect x={23 + i * 30} y={27 + (i % 2) * 70} width="12" height="1" rx="0.5" fill="#D4A84315" />
        </g>
      ))}

      {/* Encryption lines */}
      <text x="90" y="115" textAnchor="middle" fill="#D4A843" fontSize="4" opacity="0.3" fontFamily="monospace">
        AES-256 • SHA-512 • RSA-4096
      </text>
    </svg>
  );
}

function ReportVisual() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="w-full h-full">
      {/* Document */}
      <rect x="50" y="10" width="80" height="100" rx="4" fill="#14B8A608" stroke="#14B8A620" strokeWidth="0.5" />

      {/* Header */}
      <rect x="58" y="18" width="40" height="4" rx="1" fill="#14B8A625" />
      <rect x="58" y="26" width="64" height="2" rx="1" fill="#14B8A612" />
      <rect x="58" y="32" width="48" height="2" rx="1" fill="#14B8A610" />

      {/* Chart in document */}
      <polyline points="58,75 70,68 82,72 94,60 106,65 118,55"
        stroke="#14B8A6" strokeWidth="1" fill="none" opacity="0.5" />
      <polyline points="58,75 70,68 82,72 94,60 106,65 118,55 118,85 58,85"
        fill="url(#reportFill)" opacity="0.1" />

      {/* Data rows */}
      {[0, 1, 2, 3]?.map((i) => (
        <g key={i}>
          <rect x="58" y={38 + i * 6} width="20" height="2" rx="0.5" fill="#14B8A620" />
          <rect x="82" y={38 + i * 6} width="36" height="2" rx="0.5" fill="#14B8A612" />
        </g>
      ))}

      {/* Stamp */}
      <circle cx="115" cy="95" r="8" fill="none" stroke="#14B8A630" strokeWidth="0.8" strokeDasharray="2 1" />
      <text x="115" y="94" textAnchor="middle" fill="#14B8A6" fontSize="3.5" opacity="0.6">تأیید</text>
      <text x="115" y="98" textAnchor="middle" fill="#14B8A6" fontSize="2.5" opacity="0.4">رسمی</text>

      {/* Side indicators */}
      {[0, 1, 2]?.map((i) => (
        <g key={i}>
          <circle cx={25} cy={30 + i * 25} r="4" fill="#14B8A610" stroke="#14B8A625" strokeWidth="0.3" />
          <circle cx={25} cy={30 + i * 25} r="1.5" fill="#14B8A640" />
        </g>
      ))}

      <defs>
        <linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const FEATURE_COLORS: Record<string, { color: string; gradient: string; border: string }> = {
  report: { color: "#14B8A6", gradient: "from-teal-500/20 to-green-600/5", border: "rgba(212,168,67,0.08)" },
  match: { color: "#14B8A6", gradient: "from-teal-500/20 to-emerald-600/5", border: "rgba(20,184,166,0.08)" },
  track: { color: "#06B6D4", gradient: "from-cyan-500/20 to-blue-600/5", border: "rgba(6,182,212,0.08)" },
  secure: { color: "#D4A843", gradient: "from-amber-500/20 to-orange-600/5", border: "rgba(212,168,67,0.08)" },
};

function FeatureVisual({ id }: { id: string }) {
  switch (id) {
    case "report": return <ReportVisual />;
    case "match": return <MatchmakingVisual />;
    case "track": return <TrackingVisual />;
    case "secure": return <SecurityVisual />;
    default: return null;
  }
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: features = [] } = useLandingFeatures();

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(".features-title", { opacity: 0, y: 40, filter: "blur(8px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
    });

    const cards = sectionRef.current.querySelectorAll(".feature-card");
    gsap.fromTo(cards, { opacity: 0, y: 50, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 landing-section-padding overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-azbin-teal/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-azbin-gold/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="features-title mb-20 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-[2px] bg-gradient-to-l from-azbin-teal to-transparent" />
            <span className="text-azbin-teal text-xs tracking-[0.3em] font-medium uppercase">چرا آزبین</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            ارزیابی
            <span className="block mt-1 bg-gradient-to-l from-azbin-teal via-azbin-cyan to-azbin-teal bg-clip-text text-transparent">
              دقیق و مطمئن
            </span>
          </h2>
          <p className="text-white/35 text-lg leading-relaxed">
            هر ویژگی برای ارائه خدمات کارشناسی رسمی، دقیق و قابل اعتماد در حوزه املاک طراحی شده است.
          </p>
        </div>

        {/* Feature cards - Masonry style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1 - Large */}
          <div className="md:col-span-7 feature-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.04), rgba(212,168,67,0.01))", border: "1px solid rgba(212,168,67,0.08)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 20% 50%, rgba(212,168,67,0.08), transparent 60%)" }} />
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-azbin-gold animate-pulse" />
                <span className="text-azbin-gold/60 text-xs tracking-widest uppercase">{features[0]?.subtitle}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{features[0]?.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-6 flex-1">{features[0]?.description}</p>
              <div className="h-32 rounded-xl overflow-hidden bg-azbin-bg/50 border border-white/5">
                <FeatureVisual id={features[0]?.id} />
              </div>
            </div>
          </div>

          {/* Card 2 - Tall */}
          <div className="md:col-span-5 md:row-span-2 feature-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{ background: "linear-gradient(180deg, rgba(20,184,166,0.04), rgba(20,184,166,0.01))", border: "1px solid rgba(20,184,166,0.08)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 50% 20%, rgba(20,184,166,0.08), transparent 60%)" }} />
            <div className="relative z-10 p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-azbin-teal animate-pulse" />
                <span className="text-azbin-teal/60 text-xs tracking-widest uppercase">{features[1]?.subtitle}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{features[1]?.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-6">{features[1]?.description}</p>
              <div className="flex-1 min-h-[200px] rounded-xl overflow-hidden bg-azbin-bg/50 border border-white/5 flex items-center justify-center">
                <FeatureVisual id={features[1]?.id} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-4 feature-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.04), rgba(6,182,212,0.01))", border: "1px solid rgba(6,182,212,0.08)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 80% 50%, rgba(6,182,212,0.08), transparent 60%)" }} />
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400/60 text-xs tracking-widest uppercase">{features[2]?.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{features[2]?.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-4 flex-1">{features[2]?.description}</p>
              <div className="h-28 rounded-xl overflow-hidden bg-azbin-bg/50 border border-white/5">
                <FeatureVisual id={features[2]?.id} />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-3 feature-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.04), rgba(212,168,67,0.01))", border: "1px solid rgba(212,184,67,0.08)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 50% 80%, rgba(212,168,67,0.08), transparent 60%)" }} />
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-azbin-gold animate-pulse" />
                <span className="text-azbin-gold/60 text-xs tracking-widest uppercase">{features[3]?.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{features[3]?.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-4 flex-1">{features[3]?.description}</p>
              <div className="h-24 rounded-xl overflow-hidden bg-azbin-bg/50 border border-white/5 flex items-center justify-center">
                <FeatureVisual id={features[3]?.id} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
