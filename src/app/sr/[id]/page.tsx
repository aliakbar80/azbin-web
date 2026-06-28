"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";
import { LandingFooter } from "@/components/layout/landing/LandingFooter";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

const steps = ["انتخاب خدمت", "اطلاعات شخصی", "پرداخت", "تایید نهایی"];

export default function ServiceRequestPage() {
  const params = useParams();
  const { showSnackbar } = useUI();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    description: "",
  });

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: ["service", params.id],
    queryFn: () => api.get(`/api/services/${params.id}`),
  });

  const handleSubmit = async () => {
    try {
      await api.post("/api/service-requests/buy", {
        serviceId: params.id,
        phoneNumber: formData.phone_number,
        name: formData.name,
        address: formData.address,
        orginalDeedNumber: "",
        subDeedNumber: "",
      });
      setCurrentStep(3);
      showSnackbar("درخواست شما با موفقیت ثبت شد", "success");
    } catch {
      showSnackbar("خطا در ثبت درخواست", "error");
    }
  };

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

      <main className="pt-32 pb-24 landing-section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                      i <= currentStep
                        ? "text-[#0a0a0a]"
                        : "bg-white/5 text-white/30 border border-white/10"
                    }`}
                    style={i <= currentStep ? {
                      background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                      boxShadow: "0 0 20px rgba(212,168,67,0.2)",
                    } : {}}
                  >
                    {i < currentStep ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-12 sm:w-20 transition-all duration-300 ${
                        i < currentStep ? "bg-azbin-gold/50" : "bg-white/5"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {steps.map((step, i) => (
                <span key={i} className={`text-xs hidden sm:block transition-colors ${i <= currentStep ? "text-white/50" : "text-white/20"}`}>
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* Step 0: Service Confirmation */}
          {currentStep === 0 && (
            <div className="landing-glass rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">{service.title}</h2>
              <p className="text-sm text-white/40 mb-6">{service.description}</p>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                <span className="text-sm text-white/40">هزینه:</span>
                <span className="text-lg font-bold" style={{ color: "#D4A843" }}>{formatPrice(service.price)}</span>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                data-cursor-hover
                className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                  color: "#0a0a0a",
                }}
              >
                ادامه
              </button>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="landing-glass rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">اطلاعات شخصی</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">نام و نام خانوادگی</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="نام خود را وارد کنید"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-azbin-gold/30 focus:ring-1 focus:ring-azbin-gold/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">شماره تماس</label>
                  <input
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="0912XXXXXXX"
                    dir="ltr"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-azbin-gold/30 focus:ring-1 focus:ring-azbin-gold/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">آدرس</label>
                  <input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="آدرس خود را وارد کنید"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-azbin-gold/30 focus:ring-1 focus:ring-azbin-gold/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">توضیحات</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="توضیحات اضافی..."
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-azbin-gold/30 focus:ring-1 focus:ring-azbin-gold/20 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setCurrentStep(0)}
                  data-cursor-hover
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/60 transition-colors border border-white/10 hover:border-white/20"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  data-cursor-hover
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                    color: "#0a0a0a",
                  }}
                >
                  ادامه
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="landing-glass rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">پرداخت</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm text-white/40">خدمت:</span>
                  <span className="font-medium text-white">{service.title}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm text-white/40">نام:</span>
                  <span className="font-medium text-white">{formData.name}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border" style={{ background: "rgba(212,168,67,0.05)", borderColor: "rgba(212,168,67,0.15)" }}>
                  <span className="text-sm text-white/40">مبلغ قابل پرداخت:</span>
                  <span className="text-lg font-bold" style={{ color: "#D4A843" }}>{formatPrice(service.price)}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  data-cursor-hover
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/60 transition-colors border border-white/10 hover:border-white/20"
                >
                  بازگشت
                </button>
                <button
                  onClick={handleSubmit}
                  data-cursor-hover
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                    color: "#0a0a0a",
                    boxShadow: "0 0 30px rgba(212,168,67,0.2)",
                  }}
                >
                  پرداخت و ثبت نهایی
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="landing-glass rounded-3xl p-8 text-center py-16">
              <div className="mb-6 inline-flex rounded-2xl p-4" style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                <svg className="h-10 w-10 text-azbin-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">درخواست شما ثبت شد!</h2>
              <p className="text-sm text-white/40 mb-8">
                درخواست شما با موفقیت ثبت شد و به زودی بررسی خواهد شد.
              </p>
              <Link
                href="/"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
                  color: "#0a0a0a",
                }}
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          )}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
