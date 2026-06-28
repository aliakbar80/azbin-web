"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Button, Input, EmptyState, Loading } from "@/components/ui";

interface Service { id: string; title: string; }
interface MediaItem {
  id: string;
  url: string;
  type: string;
}

export default function MediaServicesPage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();
  const [serviceId, setServiceId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: servicesData } = useQuery<{ results: Service[] }>({
    queryKey: ["services"],
    queryFn: () => api.get("/api/services"),
  });

  const { data: mediaData, isLoading } = useQuery<{ results: MediaItem[] }>({
    queryKey: ["service-medias", serviceId],
    queryFn: () => api.get(`/api/services/${serviceId}/medias`),
    enabled: !!serviceId,
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile || !serviceId) throw new Error("Missing data");
      return api.upload(`/api/media/service/${serviceId}`, imageFile, "file");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-medias"] });
      showSnackbar("تصویر با موفقیت آپلود شد", "success");
      setImageFile(null);
    },
    onError: () => showSnackbar("خطا در آپلود تصویر", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/media/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-medias"] });
      showSnackbar("تصویر حذف شد", "success");
    },
    onError: () => showSnackbar("خطا در حذف تصویر", "error"),
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">مدیریت تصاویر خدمات</h1>
          <p className="mt-1 text-sm text-muted-foreground">آپلود و مدیریت تصاویر هر سرویس</p>
        </div>

        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">انتخاب سرویس</label>
                <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  <option value="">انتخاب کنید</option>
                  {servicesData?.results?.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">فایل تصویر</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground file:ml-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:text-sm file:font-medium file:text-primary" />
              </div>
            </div>
            <Button onClick={() => uploadMutation.mutate()} loading={uploadMutation.isPending} disabled={!serviceId || !imageFile}>
              آپلود تصویر
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            {!serviceId ? (
              <div className="text-center py-8 text-muted-foreground">ابتدا سرویس را انتخاب کنید</div>
            ) : isLoading ? (
              <Loading />
            ) : !mediaData?.results?.length ? (
              <EmptyState title="تصویری وجود ندارد" description="اولین تصویر را آپلود کنید" />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaData.results.map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-xl border border-border">
                    <img src={item.url} alt={item.type} className="h-40 w-full object-cover" />
                    <button
                      onClick={() => { if (confirm("آیا مطمئن هستید؟")) deleteMutation.mutate(item.id); }}
                      className="absolute top-2 right-2 rounded-lg p-1.5 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger/80"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
