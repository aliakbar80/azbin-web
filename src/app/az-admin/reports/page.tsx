"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Badge, Loading } from "@/components/ui";
import { api } from "@/services/fetchClient";

interface Overview {
  totalUsers: number;
  totalServices: number;
  totalRequests: number;
  totalRevenue: number;
}

export default function ReportsPage() {
  const { data: overview, isLoading } = useQuery<Overview>({
    queryKey: ["analytics", "admin", "overview"],
    queryFn: () => api.get("/api/analytics/admin/overview"),
  });

  if (isLoading) return <Loading fullScreen />;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">گزارش‌ها و آمار</h1>
          <p className="mt-1 text-sm text-muted-foreground">نمای کلی عملکرد سیستم</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-r-4 border-r-blue-500">
            <CardContent>
              <div className="text-sm text-muted-foreground">کل کاربران</div>
              <div className="mt-1 text-2xl font-black text-blue-500">
                {new Intl.NumberFormat("fa-IR").format(overview?.totalUsers ?? 0)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-r-4 border-r-primary">
            <CardContent>
              <div className="text-sm text-muted-foreground">کل خدمات</div>
              <div className="mt-1 text-2xl font-black text-primary">
                {new Intl.NumberFormat("fa-IR").format(overview?.totalServices ?? 0)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-r-4 border-r-success">
            <CardContent>
              <div className="text-sm text-muted-foreground">کل درخواست‌ها</div>
              <div className="mt-1 text-2xl font-black text-success">
                {new Intl.NumberFormat("fa-IR").format(overview?.totalRequests ?? 0)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-r-4 border-r-violet-500">
            <CardContent>
              <div className="text-sm text-muted-foreground">درآمد کل</div>
              <div className="mt-1 text-2xl font-black text-violet-500">
                {new Intl.NumberFormat("fa-IR").format(overview?.totalRevenue ?? 0)} تومان
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
