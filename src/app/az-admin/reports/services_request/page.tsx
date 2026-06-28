"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Button, Badge, Loading } from "@/components/ui";

interface ServiceRequest {
  id: string;
  address: string;
  name: string;
  phoneNumber: string;
  service: { id: string; title: string };
  status: string;
  workingProgressStatus: string;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" }> = {
  PENDING: { label: "پرداخت نشده", variant: "warning" },
  COMPLETE: { label: "پرداخت شده", variant: "success" },
  FAILED: { label: "رد شده", variant: "danger" },
};

const workLabels: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" }> = {
  PENDING: { label: "در حال انجام", variant: "info" },
  DONE: { label: "تکمیل شده", variant: "success" },
  FAILED: { label: "ناقص", variant: "danger" },
};

export default function AdminReportsPage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusForm, setStatusForm] = useState({ status: "", workingProgressStatus: "" });
  const limit = 10;

  const offset = useMemo(() => (page - 1) * limit, [page]);

  const { data, isLoading } = useQuery<{ results: ServiceRequest[]; count: number }>({
    queryKey: ["service-requests", limit, offset],
    queryFn: () => api.get(`/api/service-requests?limit=${limit}&offset=${offset}`),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: d }: { id: string; data: any }) =>
      api.patch(`/api/service-requests/${id}`, d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      showSnackbar("وضعیت با موفقیت تغییر کرد", "success");
      setEditingId(null);
    },
    onError: () => showSnackbar("خطا در تغییر وضعیت", "error"),
  });

  const totalPages = data ? Math.ceil(data.count / limit) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">درخواست‌های خدمات</h1>
          <p className="mt-1 text-sm text-muted-foreground">مدیریت و بررسی درخواست‌های مشتریان</p>
        </div>

        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingId(null)} />
            <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl animate-scaleIn border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">تغییر وضعیت درخواست #{editingId}</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">وضعیت مالی</label>
                  <select value={statusForm.status} onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })} className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                    <option value="PENDING">پرداخت نشده</option>
                    <option value="COMPLETE">پرداخت شده</option>
                    <option value="FAILED">رد شده</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">وضعیت گزارش</label>
                  <select value={statusForm.workingProgressStatus} onChange={(e) => setStatusForm({ ...statusForm, workingProgressStatus: e.target.value })} className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                    <option value="PENDING">در حال انجام</option>
                    <option value="DONE">تکمیل شده</option>
                    <option value="FAILED">ناقص</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="ghost" onClick={() => setEditingId(null)} className="flex-1">لغو</Button>
                <Button onClick={() => updateMutation.mutate({ id: editingId, data: statusForm })} loading={updateMutation.isPending} className="flex-1">تایید</Button>
              </div>
            </div>
          </div>
        )}

        <Card>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">شناسه</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">نام</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">تلفن</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">سرویس</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت مالی</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت کار</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.results?.map((req) => (
                        <tr key={req.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 text-foreground">#{req.id}</td>
                          <td className="py-3 px-4 text-foreground font-medium">{req.name}</td>
                          <td className="py-3 px-4 text-muted-foreground" dir="ltr">{req.phoneNumber}</td>
                          <td className="py-3 px-4 text-muted-foreground">{req.service?.title}</td>
                          <td className="py-3 px-4">
                            <Badge variant={statusLabels[req.status]?.variant || "info"} dot>
                              {statusLabels[req.status]?.label || req.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={workLabels[req.workingProgressStatus]?.variant || "info"} dot>
                              {workLabels[req.workingProgressStatus]?.label || req.workingProgressStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setEditingId(req.id);
                                setStatusForm({ status: req.status, workingProgressStatus: req.workingProgressStatus });
                              }}
                              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <Button variant="ghost" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                      قبلی
                    </Button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                            page === p ? "bg-primary text-black" : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                    <Button variant="ghost" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                      بعدی
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
