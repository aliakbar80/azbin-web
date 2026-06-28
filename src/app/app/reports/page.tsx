"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/services/fetchClient";
import { Card, Loading } from "@/components/ui";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";

interface ReportCount {
  service: number;
  service__title: string;
  num_requests: number;
}

export default function ReportsPage() {
  const { data, isLoading } = useQuery<ReportCount[]>({
    queryKey: ["myreports-count"],
    queryFn: () => api.get("/api/service-requests/my-requests-count"),
  });

  if (isLoading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-black text-foreground mb-2">گزارش‌های من</h1>
          <p className="text-sm text-muted-foreground mb-6">لیست درخواست‌های خدمات شما</p>

          {!data || data.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-muted-foreground">هنوز درخواستی ثبت نکرده‌اید</p>
              <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-hover">
                مشاهده خدمات
              </Link>
            </Card>
          ) : (
            <div className="space-y-2">
              {data.map((item) => (
                <Link key={item.service} href={`/app/reports/sr/${item.service}`}>
                  <Card hover className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-foreground">
                        {item.num_requests} مورد {item.service__title}
                      </span>
                    </div>
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
