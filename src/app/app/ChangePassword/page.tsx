"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "@/providers/UIProvider";
import { api } from "@/services/fetchClient";
import { Button, Input, Card } from "@/components/ui";
import { LandingNavbar } from "@/components/layout/landing/LandingNavbar";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { showSnackbar } = useUI();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_retype: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.new_password_retype) {
      showSnackbar("تکرار رمز عبور برابر نیست", "error");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(form.new_password)) {
      showSnackbar("رمزعبور باید حداقل 8 رقم، شامل اعداد، حروف بزرگ، کوچک و حروف خاص باشد", "error");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/users/change-password", {
        currentPassword: form.current_password,
        newPassword: form.new_password,
        newPasswordRetype: form.new_password_retype,
      });
      showSnackbar("رمز عبور با موفقیت تغییر کرد", "success");
      router.push("/");
    } catch {
      showSnackbar("خطا در تغییر رمز عبور", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-black text-foreground mb-6">تغییر رمز عبور</h1>
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="رمزعبور فعلی"
                type="password"
                value={form.current_password}
                onChange={(e) => setForm({ ...form, current_password: e.target.value })}
                placeholder="رمزعبور فعلی خود را وارد کنید"
                dir="ltr"
                required
              />
              <Input
                label="رمزعبور جدید"
                type="password"
                value={form.new_password}
                onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                placeholder="رمزعبور جدید را وارد کنید"
                dir="ltr"
                required
              />
              <Input
                label="تکرار رمزعبور جدید"
                type="password"
                value={form.new_password_retype}
                onChange={(e) => setForm({ ...form, new_password_retype: e.target.value })}
                placeholder="تکرار رمزعبور را وارد کنید"
                dir="ltr"
                required
              />
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
