"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { Card, Badge, Loading } from "@/components/ui";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";
import Link from "next/link";

interface ReportItem {
  id: number;
  name: string;
  service_request: {
    id: number;
    status: string;
    working_progress_status: string;
    service: { id: number; title: string };
    created_at: string;
  };
}

export default function SingleReportPage() {
  const params = useParams();
  const [tab, setTab] = useState<"pending" | "done">("pending");

  const { data, isLoading } = useQuery<{ results: ReportItem[] }>({
    queryKey: ["myreports", params.id],
    queryFn: () =>
      api.get(`/api/service-requests/my-requests?serviceId=${params.id}`),
  });

  if (isLoading) return <Loading fullScreen />;

  const results =
    data?.results?.map((item) => ({
      ...item.service_request,
      name: item.name,
      ser_req_id: item.id,
    })) || [];

  const pending = results.filter((r) => r.working_progress_status === "pending");
  const done = results.filter((r) => r.working_progress_status === "done");

  const activeItems = tab === "pending" ? pending : done;

  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-black text-foreground mb-6">جزئیات گزارش</h1>

          {/* Tabs */}
          <div className="flex gap-1 rounded-xl bg-muted p-1 mb-6">
            <button
              onClick={() => setTab("pending")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                tab === "pending"
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              در حال انجام ({pending.length})
            </button>
            <button
              onClick={() => setTab("done")}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                tab === "done"
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              تکمیل شده ({done.length})
            </button>
          </div>

          {activeItems.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-muted-foreground">
                {tab === "pending" ? "درخواست در حال انجامی وجود ندارد" : "گزارش تکمیل شده‌ای وجود ندارد"}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeItems.map((item) => (
                <Card key={item.ser_req_id || item.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-foreground">{item.name || item.service.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={tab === "done" ? "success" : "info"} dot>
                        {tab === "done" ? "تکمیل شده" : "در حال انجام"}
                      </Badge>
                    </div>
                  </div>
                  {tab === "done" && (
                    <Link
                      href={`/app/result-report/${item.ser_req_id || item.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                    >
                      مشاهده نتیجه
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
