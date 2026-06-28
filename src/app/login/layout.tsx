import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-azbin-bg relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-azbin-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-azbin-teal/5 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="gold-gradient-text">از</span>
            <span className="text-white/90">بین</span>
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors rounded-xl border border-white/10 px-4 py-2 hover:border-white/20"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
          </svg>
          بازگشت به صفحه اصلی
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-12" style={{ minHeight: "calc(100vh - 64px)" }}>
        {children}
      </div>
    </div>
  );
}
