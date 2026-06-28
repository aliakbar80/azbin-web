import type { Metadata } from "next";
import { AllProviders } from "@/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "آزبین | خدمات تخصصی",
    template: "%s | آزبین",
  },
  description: "پلتفرم ارائه خدمات تخصصی با کیفیت بالا",
  keywords: ["خدمات", "تخصصی", "مشاوره", "آزبین"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
