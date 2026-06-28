"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, CardHeader, CardTitle, Badge, Loading } from "@/components/ui";
import { useAuth } from "@/providers/AuthProvider";
import { api } from "@/services/fetchClient";

interface AdminOverview {
  totalUsers: number;
  totalServices: number;
  totalRequests: number;
  totalRevenue: number;
}

interface ServiceRequestItem {
  id: string;
  name: string;
  service: { id: string; title: string };
  status: string;
  workingProgressStatus: string;
  createdAt: string;
}

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" }> = {
  PENDING: { label: "در انتظار", variant: "warning" },
  COMPLETE: { label: "تکمیل شده", variant: "success" },
  FAILED: { label: "رد شده", variant: "danger" },
};

const workStatusMap: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" }> = {
  PENDING: { label: "در حال انجام", variant: "info" },
  DONE: { label: "تکمیل شده", variant: "success" },
  FAILED: { label: "ناقص", variant: "danger" },
};

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: overview, isLoading: overviewLoading } = useQuery<AdminOverview>({
    queryKey: ["analytics", "admin", "overview"],
    queryFn: () => api.get("/api/analytics/admin/overview"),
  });

  const { data: requestsData, isLoading: requestsLoading } = useQuery<{ results: ServiceRequestItem[] }>({
    queryKey: ["service-requests", { limit: 5, offset: 0 }],
    queryFn: () => api.get("/api/service-requests?limit=5&offset=0"),
  });

  if (overviewLoading || requestsLoading) return <Loading fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">
            خوش آمدید{user?.firstName ? `، ${user.firstName}` : ""} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            خلاصه‌ای از فعالیت‌های اخیر شما
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "کل کاربران", value: overview?.totalUsers ?? 0, color: "text-blue-500" },
            { title: "کل خدمات", value: overview?.totalServices ?? 0, color: "text-primary" },
            { title: "کل درخواست‌ها", value: overview?.totalRequests ?? 0, color: "text-success" },
            { title: "درآمد کل", value: `${new Intl.NumberFormat("fa-IR").format(overview?.totalRevenue ?? 0)} تومان`, color: "text-violet-500" },
          ].map((stat) => (
            <Card key={stat.title} hover>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                </div>
                <div className={`mt-2 text-2xl font-black ${stat.color}`}>
                  {typeof stat.value === "number" ? new Intl.NumberFormat("fa-IR").format(stat.value) : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>درخواست‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">شناسه</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">نام</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">خدمت</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت مالی</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت کار</th>
                  </tr>
                </thead>
                <tbody>
                  {requestsData?.results?.map((req) => (
                    <tr key={req.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-foreground">#{req.id}</td>
                      <td className="py-3 px-4 text-foreground font-medium">{req.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{req.service?.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant={statusMap[req.status]?.variant || "info"} dot>
                          {statusMap[req.status]?.label || req.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={workStatusMap[req.workingProgressStatus]?.variant || "info"} dot>
                          {workStatusMap[req.workingProgressStatus]?.label || req.workingProgressStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
