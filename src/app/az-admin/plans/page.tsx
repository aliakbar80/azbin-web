"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Button, Badge, Input, EmptyState, Loading } from "@/components/ui";

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  priceWithDiscount?: number;
  enable: boolean;
}

export default function PlansPage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    priceWithDiscount: "",
    enable: true,
    cityId: "",
    categoryId: "",
  });

  const { data, isLoading } = useQuery<{ results: Plan[] }>({
    queryKey: ["services"],
    queryFn: () => api.get("/api/services"),
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) =>
      api.post("/api/services", {
        ...data,
        price: Number(data.price),
        priceWithDiscount: data.priceWithDiscount ? Number(data.priceWithDiscount) : undefined,
        cityId: data.cityId || undefined,
        categoryId: data.categoryId || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      showSnackbar("سرویس با موفقیت ایجاد شد", "success");
      setShowForm(false);
      resetForm();
    },
    onError: () => showSnackbar("خطا در ایجاد سرویس", "error"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof form }) =>
      api.patch(`/api/services/${id}`, {
        ...data,
        price: Number(data.price),
        priceWithDiscount: data.priceWithDiscount ? Number(data.priceWithDiscount) : undefined,
        cityId: data.cityId || undefined,
        categoryId: data.categoryId || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      showSnackbar("سرویس با موفقیت ویرایش شد", "success");
      setShowForm(false);
      setEditingId(null);
      resetForm();
    },
    onError: () => showSnackbar("خطا در ویرایش سرویس", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      showSnackbar("سرویس با موفقیت حذف شد", "success");
    },
    onError: () => showSnackbar("خطا در حذف سرویس", "error"),
  });

  const resetForm = () => setForm({ title: "", description: "", price: "", priceWithDiscount: "", enable: true, cityId: "", categoryId: "" });

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setForm({
      title: plan.title,
      description: plan.description,
      price: String(plan.price),
      priceWithDiscount: plan.priceWithDiscount ? String(plan.priceWithDiscount) : "",
      enable: plan.enable,
      cityId: "",
      categoryId: "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const formatPrice = (p: number) => new Intl.NumberFormat("fa-IR").format(p);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-foreground">مدیریت خدمات</h1>
            <p className="mt-1 text-sm text-muted-foreground">ایجاد، ویرایش و حذف خدمات</p>
          </div>
          <Button onClick={() => { setShowForm(true); setEditingId(null); resetForm(); }}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ایجاد سرویس
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <div className="relative z-10 mx-4 w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl animate-scaleIn border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {editingId ? "ویرایش سرویس" : "ایجاد سرویس جدید"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="عنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <Input label="قیمت (تومان)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} dir="ltr" required />
                <Input label="قیمت با تخفیف (اختیاری)" type="number" value={form.priceWithDiscount} onChange={(e) => setForm({ ...form, priceWithDiscount: e.target.value })} dir="ltr" />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">توضیحات</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-foreground">فعال</label>
                  <button type="button" onClick={() => setForm({ ...form, enable: !form.enable })} className={`relative h-6 w-11 rounded-full transition-colors ${form.enable ? "bg-primary" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.enable ? "right-0.5" : "right-[22px]"}`} />
                  </button>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="flex-1">لغو</Button>
                  <Button type="submit" loading={createMutation.isPending || updateMutation.isPending} className="flex-1">
                    {editingId ? "ذخیره تغییرات" : "ایجاد"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Card>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : !data?.results?.length ? (
              <EmptyState title="سرویسی وجود ندارد" description="اولین سرویس خود را ایجاد کنید" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">شناسه</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">عنوان</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">قیمت</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">وضعیت</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.results.map((plan) => (
                      <tr key={plan.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-foreground">#{plan.id}</td>
                        <td className="py-3 px-4 text-foreground font-medium">{plan.title}</td>
                        <td className="py-3 px-4 text-muted-foreground" dir="ltr">{formatPrice(plan.price)} تومان</td>
                        <td className="py-3 px-4">
                          <Badge variant={plan.enable ? "success" : "danger"} dot>
                            {plan.enable ? "فعال" : "غیرفعال"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleEdit(plan)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => { if (confirm("آیا مطمئن هستید؟")) deleteMutation.mutate(plan.id); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger transition-colors">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
