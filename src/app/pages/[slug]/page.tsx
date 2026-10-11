import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";
import { LandingFooter } from "@/components/layout/landing/LandingFooter";

const pagesContent: Record<string, { title: string; subtitle: string; content: string; icon: string }> = {
  about: {
    title: "درباره ما",
    subtitle: "داستان ازبین و ماموریت ما",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    content: `
      <p>ازبین یک پلتفرم ارائه خدمات تخصصی است که با هدف اتصال متخصصان و مشتریان فعالیت می‌کند.</p>
      <p>ما با تیمی از متخصصان مجرب، بهترین خدمات را با کیفیت بالا و قیمت مناسب ارائه می‌دهیم.</p>
      <p>تیم ما متشکل از کارشناسان خبره در حوزه‌های مختلف است که با استفاده از جدیدترین تکنولوژی‌ها و هوش مصنوعی، خدمات بی‌نظیری ارائه می‌دهند.</p>
    `,
  },
  contact: {
    title: "تماس با ما",
    subtitle: "آماده پاسخگویی به شما هستیم",
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
        <div class="p-6 rounded-2xl border border-white/10 bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-azbin-gold/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-azbin-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          </div>
          <h3 class="font-bold text-white mb-1">تلفن</h3>
          <p class="text-sm text-white/40">۰۲۱-۱۲۳۴۵۶۷۸</p>
        </div>
        <div class="p-6 rounded-2xl border border-white/10 bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-azbin-teal/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-azbin-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          </div>
          <h3 class="font-bold text-white mb-1">ایمیل</h3>
          <p class="text-sm text-white/40">info@azbin.ir</p>
        </div>
        <div class="p-6 rounded-2xl border border-white/10 bg-white/5">
          <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          </div>
          <h3 class="font-bold text-white mb-1">آدرس</h3>
          <p class="text-sm text-white/40">تهران، خیابان ولیعصر</p>
        </div>
      </div>
    `,
  },
  terms: {
    title: "شرایط و قوانین",
    subtitle: "قوانین استفاده از خدمات ازبین",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    content: `<p>استفاده از خدمات ازبین به معنای پذیرش شرایط زیر است. لطفاً قبل از استفاده از خدمات ما، این شرایط را به دقت مطالعه کنید.</p>`,
  },
  privacy: {
    title: "حریم خصوصی",
    subtitle: "حفاظت از اطلاعات شخصی شما",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    content: `<p>حریم خصوصی کاربران برای ما بسیار مهم است. ما متعهد به حفاظت از اطلاعات شخصی شما هستیم و از آن‌ها سوءاستفاده نمی‌کنیم.</p>`,
  },
};

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pagesContent[slug];

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-azbin-bg">
        <div className="text-center">
          <h1 className="text-6xl font-black gold-gradient-text mb-4">۴۰۴</h1>
          <p className="text-white/40">صفحه مورد نظر یافت نشد</p>
        </div>
      </div>
    );
  }

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
              <path strokeLinecap="round" strokeLinejoin="round" d={page.icon} />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {page.title}
          </h1>
          <p className="text-white/40 text-lg">{page.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <main className="pb-24 landing-section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="landing-glass rounded-3xl p-8 md:p-12">
            <div
              className="prose prose-invert max-w-none text-white/60 leading-relaxed
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-3
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-2
                [&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:space-y-2 [&_ul]:my-4
                [&_li]:flex [&_li]:items-start [&_li]:gap-2
                [&_a]:text-azbin-gold [&_a]:no-underline hover:[&_a]:underline"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
