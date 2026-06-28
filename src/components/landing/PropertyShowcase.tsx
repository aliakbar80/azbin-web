"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLandingProperties } from "@/services/use-landing";
import type { LandingProperty } from "@/services/landing-types";

function PropertyImage({ color, type, expertScore }: { color: string; type: string; expertScore: string }) {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}18, ${color}06)` }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="60" width="40" height="140" rx="2" fill={color} opacity="0.08" />
        <rect x="70" y="30" width="35" height="170" rx="2" fill={color} opacity="0.1" />
        <rect x="115" y="50" width="50" height="150" rx="2" fill={color} opacity="0.07" />
        <rect x="175" y="20" width="30" height="180" rx="2" fill={color} opacity="0.12" />
        <rect x="215" y="45" width="45" height="155" rx="2" fill={color} opacity="0.06" />
        <rect x="270" y="55" width="35" height="145" rx="2" fill={color} opacity="0.09" />
        <rect x="315" y="35" width="55" height="165" rx="2" fill={color} opacity="0.08" />

        {Array.from({ length: 6 }, (_, b) => {
          const bx = [25, 75, 120, 180, 220, 275, 320][b];
          const bw = [30, 25, 40, 20, 35, 25, 45][b];
          return Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: Math.floor(bw / 12) }, (_, c) => (
              <rect key={`${b}-${r}-${c}`} x={bx + 4 + c * 12} y={70 + r * 20 + (b % 2) * 10} width="6" height="8" rx="0.5"
                fill={color} opacity={Math.random() > 0.4 ? 0.3 : 0.08} />
            ))
          );
        })}

        <line x1="0" y1="195" x2="400" y2="195" stroke={color} strokeWidth="0.3" opacity="0.15" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full font-[Vazirmatn] backdrop-blur-md"
        style={{ background: `${color}20`, color: color, border: `1px solid ${color}25` }}>
        {type}
      </div>

      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] px-2 py-1 rounded-full backdrop-blur-md bg-black/30 border border-white/10">
        <svg className="w-3 h-3 text-azbin-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-white/80 font-bold font-[Vazirmatn]">{expertScore}</span>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: LandingProperty }) {
  return (
    <div
      data-cursor-hover
      className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${property.color}12`,
        boxShadow: `0 4px 30px ${property.color}08`,
      }}
    >
      <div className="relative">
        <PropertyImage color={property.color} type={property.type} expertScore={property.expertScore} />
        <div
          className="absolute bottom-3 right-3 text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 font-[Vazirmatn]"
          style={{ color: property.color }}
        >
          {property.price} تومان
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 font-[Vazirmatn]">{property.type}</h3>
        <p className="text-xs text-white/30 flex items-center gap-1 mb-4 font-[Vazirmatn]">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {property.location}
        </p>

        <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            {property.area}
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {property.rooms}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {property.features.map((f) => (
            <span
              key={f}
              className="text-[10px] px-2 py-0.5 rounded-full font-[Vazirmatn]"
              style={{ background: `${property.color}10`, color: `${property.color}aa`, border: `1px solid ${property.color}15` }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertySkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-full h-48 bg-white/5 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/5 rounded w-2/3 animate-pulse" />
        <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-3 bg-white/5 rounded w-16 animate-pulse" />
          <div className="h-3 bg-white/5 rounded w-16 animate-pulse" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 bg-white/5 rounded-full w-14 animate-pulse" />
          <div className="h-5 bg-white/5 rounded-full w-14 animate-pulse" />
          <div className="h-5 bg-white/5 rounded-full w-14 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyShowcase() {
  const { data: properties, isLoading } = useLandingProperties();

  return (
    <section className="relative py-32 landing-section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-azbin-gold/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-azbin-teal/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-[2px] bg-gradient-to-l from-azbin-gold to-transparent" />
            <span className="text-azbin-gold text-xs tracking-[0.3em] uppercase font-[Vazirmatn]">نمونه املاک</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-[Vazirmatn]">
            املاک <span className="gold-gradient-text">تحت کارشناسی</span>
          </h2>
          <p className="text-white/35 max-w-lg text-lg font-[Vazirmatn]">
            نمونه‌هایی از املاک ارزیابی شده توسط کارشناسان رسمی آزبین
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {isLoading
            ? Array.from({ length: 3 }, (_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  <PropertySkeleton />
                </SwiperSlide>
              ))
            : properties?.map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
