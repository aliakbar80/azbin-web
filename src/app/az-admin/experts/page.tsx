"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Button, EmptyState, Input, Loading } from "@/components/ui";

interface Expert {
  id: string;
  expertise: string[];
  bio?: string;
  experience?: number;
  serviceAreas: string[];
  isApproved?: boolean;
  user?: { firstName?: string; lastName?: string; phoneNumber?: string };
}

export default function ExpertsPage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ expertise: "", bio: "", experience: "", serviceAreas: "" });

  const { data, isLoading } = useQuery<Expert[]>({
    queryKey: ["experts"],
    queryFn: () => api.get("/api/experts"),
  });

  const { data: pendingData } = useQuery<{ results: Expert[] }>({
    queryKey: ["experts", "pending"],
    queryFn: () => api.get("/api/experts/pending"),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experts"] });
      showSnackbar("کارشناس با موفقیت تایید شد", "success");
    },
    onError: () => showSnackbar("خطا در تایید کارشناس", "error"),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experts"] });
      showSnackbar("کارشناس رد شد", "success");
    },
    onError: () => showSnackbar("خطا در رد کارشناس", "error"),
  });

  const suspendMutation = useMutation({
    mutationFn: (id: string) => api.patch(`/api/experts/${id}/suspend`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experts"] });
      showSnackbar("کارشناس تعلیق شد", "success");
    },
    onError: () => showSnackbar("خطا در تعلیق کارشناس", "error"),
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">مدیریت کارشناسان</h1>
          <p className="mt-1 text-sm text-muted-foreground">مشاهده و مدیریت کارشناسان</p>
        </div>

        {pendingData?.results && pendingData.results.length > 0 && (
          <Card>
            <CardContent>
              <h2 className="text-lg font-bold text-foreground mb-4">کارشناسان در انتظار تایید</h2>
              <div className="space-y-3">
                {pendingData.results.map((expert) => (
                  <div key={expert.id} className="flex items-center justify-between rounded-xl bg-muted p-4">
                    <div>
                      <span className="font-medium text-foreground">
                        {expert.user?.firstName} {expert.user?.lastName}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        تخصص: {expert.expertise?.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => approveMutation.mutate(expert.id)} loading={approveMutation.isPending}>
                        تایید
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => rejectMutation.mutate(expert.id)} loading={rejectMutation.isPending}>
                        رد
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : !data?.length ? (
              <EmptyState title="کارشناسی وجود ندارد" description="هنوز کارشناسی ثبت‌نام نکرده است" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">شناسه</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">نام</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">تخصص</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">تجربه</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((expert) => (
                      <tr key={expert.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-foreground">#{expert.id}</td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          {expert.user?.firstName} {expert.user?.lastName}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">
                          {expert.expertise?.join(", ")}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {expert.experience ? `${expert.experience} سال` : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            expert.isApproved ? "bg-success/15 text-green-700 dark:text-green-300" : "bg-warning/15 text-yellow-700 dark:text-yellow-300"
                          }`}>
                            {expert.isApproved ? "تایید شده" : "در انتظار"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {!expert.isApproved && (
                              <button onClick={() => approveMutation.mutate(expert.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-success/10 hover:text-success transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button onClick={() => suspendMutation.mutate(expert.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger transition-colors">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
