"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useUI } from "@/providers/UIProvider";
import { api } from "@/services/fetchClient";
import { Button, Input, Card, Loading } from "@/components/ui";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";

export default function ProfilePage() {
  const { user, refetchUser, isLoading } = useAuth();
  const { showSnackbar } = useUI();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/api/users/profiles/me", {
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        email: form.email || undefined,
        address: form.address || undefined,
        gender: form.gender || undefined,
      });
      await refetchUser();
      showSnackbar("پروفایل با موفقیت به‌روزرسانی شد", "success");
    } catch {
      showSnackbar("خطا در به‌روزرسانی پروفایل", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading fullScreen />;
  if (!user) return <div className="text-center py-20">لطفا ابتدا وارد شوید</div>;

  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-black text-foreground mb-6">پروفایل کاربری</h1>
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="شماره موبایل"
                value={user.phoneNumber}
                disabled
                dir="ltr"
              />
              <Input
                label="نام"
                value={form.firstName || user.firstName || ""}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="نام خود را وارد کنید"
              />
              <Input
                label="نام خانوادگی"
                value={form.lastName || user.lastName || ""}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="نام خانوادگی خود را وارد کنید"
              />
              <Input
                label="ایمیل"
                value={form.email || user.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@gmail.com"
                dir="ltr"
                type="email"
              />
              <Input
                label="آدرس"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="آدرس خود را وارد کنید"
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">جنسیت</label>
                <select
                  value={form.gender || ""}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="MALE">مرد</option>
                  <option value="FEMALE">زن</option>
                </select>
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                تایید
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
