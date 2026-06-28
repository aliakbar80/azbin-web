"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";
import { LandingFooter } from "@/components/layout/landing/LandingFooter";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    title: "چگونه می‌توانم پروفایل بسازم؟",
    content: `در وب‌سایت روی گزینه "ورود ثبت نام" کلیک کنید. می‌توانید با استفاده از شماره موبایل، ثبت‌نام خود را انجام دهید. (کد فعال‌سازی برایتان پیامک می‌شود.) بعد از وارد کردن کد فعال‌سازی، ثبت‌نام انجام می‌شود. سپس روی گزینه تکمیل اطلاعات، کلیک و اطلاعات خود را تکمیل کنید.`,
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  },
  {
    title: "چگونه یک کلمه عبور امن ایجاد کنیم؟",
    content: `یکی از راه‌هایی که از نفوذ هکرها و مجرمان سایبری به حساب‌های کاربری و حریم شخصی شما جلوگیری می‌کند، ساخت و استفاده از یک گذرواژه قوی و غیرقابل حدس است.`,
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "به چه حساب کاربری جدید گفته می‌شود؟",
    content: `مالک آن مشتری جدید ازبین باشد و حساب کاربری دیگری نداشته باشد.`,
    icon: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z",
  },
  {
    title: "رمز عبور خود را فراموش کردم، چطور می‌توانم بازیابی کنم؟",
    content: `از قسمت ورود و ثبت نام با شماره موبایل وارد شوید و گزینه فراموشی رمز عبور را انتخاب کنید.`,
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  },
  {
    title: "آیا امکان لغو سفارش وجود دارد؟",
    content: `بله، در صورتی که سفارش شما هنوز شروع نشده باشد، امکان لغو آن وجود دارد. با پشتیبانی تماس بگیرید.`,
    icon: "M6 18L18 6M6 6l12 12",
  },
  {
    title: "زمان تحویل سفارش چقدر است؟",
    content: `زمان تحویل بسته به نوع خدمت متفاوت است. این اطلاعات در صفحه جزئیات هر خدمت درج شده است.`,
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".faq-item");
    gsap.fromTo(items, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <div className="min-h-screen bg-azbin-bg">
      <LandingNavbar />

      {/* Hero area */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-azbin-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-azbin-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 landing-section-padding max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 landing-glass" style={{ border: "1px solid rgba(212,168,67,0.2)" }}>
            <svg className="w-8 h-8 text-azbin-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            سوالات <span className="gold-gradient-text">متداول</span>
          </h1>
          <p className="text-white/40 text-lg">پاسخ سوالات رایج شما</p>
        </div>
      </div>

      {/* FAQ items */}
      <main ref={sectionRef} className="pb-24 landing-section-padding">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faq-item landing-glass rounded-2xl overflow-hidden transition-all duration-300"
              style={{ border: openIndex === index ? "1px solid rgba(212,168,67,0.2)" : "1px solid rgba(255,255,255,0.05)" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center gap-4 w-full px-6 py-5 text-right"
                data-cursor-hover
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300" style={{ background: openIndex === index ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.05)" }}>
                  <svg className="w-5 h-5 transition-colors duration-300" style={{ color: openIndex === index ? "#D4A843" : "rgba(255,255,255,0.3)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="flex-1 text-sm font-bold text-white">{item.title}</span>
                <svg
                  className={`h-5 w-5 text-white/30 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 pl-16 text-sm text-white/40 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
