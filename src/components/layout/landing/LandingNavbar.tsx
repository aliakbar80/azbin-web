"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "landing-glass-strong py-3" : "py-5"
      }`}
    >
      <div className="landing-section-padding flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="gold-gradient-text">از</span>
            <span className="text-white/90">بین</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <Link href="/pages/about" data-cursor-hover className="group relative overflow-hidden">
            <span className="inline-block transition-all duration-300 group-hover:text-azbin-gold/70 group-hover:-translate-y-0.5 group-hover:scale-105">درباره ما</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-azbin-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="/pages/faq" data-cursor-hover className="group relative overflow-hidden">
            <span className="inline-block transition-all duration-300 group-hover:text-azbin-gold/70 group-hover:-translate-y-0.5 group-hover:scale-105">سوالات متداول</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-azbin-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="/pages/contact" data-cursor-hover className="group relative overflow-hidden">
            <span className="inline-block transition-all duration-300 group-hover:text-azbin-gold/70 group-hover:-translate-y-0.5 group-hover:scale-105">تماس با ما</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-azbin-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            data-cursor-hover
            className="hidden sm:block px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
          >
            ورود
          </Link>
          <Link
            href="/login"
            data-cursor-hover
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-azbin-gold"
            style={{
              background: "linear-gradient(135deg, rgba(212,168,67,0.15), rgba(212,168,67,0.05))",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          >
            شروع رایگان
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 md:hidden"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="landing-glass-strong mx-4 mt-2 grid gap-1 rounded-2xl p-3 text-sm text-white/70 md:hidden">
          {[
            ["/pages/about", "درباره ما"],
            ["/pages/faq", "سوالات متداول"],
            ["/pages/contact", "تماس با ما"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-azbin-gold"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
