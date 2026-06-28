import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-azbin-bg to-azbin-panel" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">
                <span className="gold-gradient-text">از</span>
                <span className="text-white/90">بین</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/30">
              پلتفرم هوشمند کارشناسی و معامله املاک با پشتوانه هوش مصنوعی
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-white/50">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li>
                <Link href="/pages/about" className="hover:text-azbin-gold/70 transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/pages/faq" className="hover:text-azbin-gold/70 transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-azbin-gold/70 transition-colors">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-azbin-gold/70 transition-colors">
                  ورود / ثبت‌نام
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-white/50">قوانین</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li>
                <Link href="/pages/terms" className="hover:text-azbin-gold/70 transition-colors">
                  شرایط و قوانین
                </Link>
              </li>
              <li>
                <Link href="/pages/privacy" className="hover:text-azbin-gold/70 transition-colors">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-white/50">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-azbin-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-azbin-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>info@azbin.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-azbin-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>تهران، خیابان ولیعصر</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} ازبین. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-azbin-teal/50 animate-pulse" />
            <span className="text-xs text-white/20">سیستم فعال</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
