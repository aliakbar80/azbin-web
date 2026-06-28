"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/services/fetchClient";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";
import { LandingFooter } from "@/components/layout/landing/LandingFooter";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceWithDiscount?: number;
  enable: boolean;
  image?: string;
  createdAt?: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const { data: service, isLoading } = useQuery<Service>({
    queryKey: ["service", params.id],
    queryFn: () => api.get(`/api/services/${params.id}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-azbin-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-azbin-gold/30 border-t-azbin-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-azbin-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black gold-gradient-text mb-4">۴۰۴</h1>
          <p className="text-white/40">سرویس یافت نشد</p>
        </div>
      </div>
    );
  }

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("fa-IR").format(p) + " تومان";

  return (
    <div className="min-h-screen bg-azbin-bg">
      <LandingNavbar />

      {/* Hero area */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-azbin-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-azbin-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 landing-section-padding max-w-4xl mx-auto">
          {service.image && (
            <div className="mb-8 overflow-hidden rounded-3xl landing-glass">
              <img
                src={service.image}
                alt={service.title}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h1>
            <span className={`text-xs px-3 py-1.5 rounded-full ${service.enable ? "bg-azbin-teal/10 text-azbin-teal border border-azbin-teal/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {service.enable ? "فعال" : "غیرفعال"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold" style={{ color: "#D4A843" }}>{formatPrice(service.price)}</span>
            {service.priceWithDiscount && service.priceWithDiscount < service.price && (
              <span className="text-lg text-white/20 line-through">
                {formatPrice(service.priceWithDiscount)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="pb-24 landing-section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="landing-glass rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-azbin-gold" />
              توضیحات
            </h2>
            <div
              className="prose prose-invert max-w-none text-white/50 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/sr/${service.id}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                color: "#0a0a0a",
                boxShadow: "0 0 30px rgba(212,168,67,0.2)",
              }}
            >
              ثبت درخواست
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
            <Link
              href="/"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/60 transition-colors border border-white/10 hover:border-white/20"
            >
              بازگشت
            </Link>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
