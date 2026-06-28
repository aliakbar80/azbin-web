"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useUI } from "@/providers/UIProvider";
import { api } from "@/services/fetchClient";

type Step = "phone" | "password" | "otp" | "set-password";

export default function LoginPage() {
  const { login } = useAuth();
  const { showSnackbar } = useUI();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRetype, setNewPasswordRetype] = useState("");
  const [loading, setLoading] = useState(false);

  const btnStyle = {
    background: "linear-gradient(135deg, rgba(212,168,67,0.9), rgba(212,168,67,0.7))",
    color: "#0a0a0a",
    boxShadow: "0 0 30px rgba(212,168,67,0.2)",
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-azbin-gold/30 focus:ring-1 focus:ring-azbin-gold/20 transition-all";

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/otp/create", { phoneNumber: phone });
      showSnackbar("کد تایید ارسال شد", "success");
      setStep("otp");
    } catch {
      showSnackbar("خطا در ارسال کد", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP → get tokens
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post<{
        data: {
          verified: boolean;
          accessToken: string;
          refreshToken: string;
          message: string;
        };
      }>("/api/auth/otp/verify", { phoneNumber: phone, code: Number(otpCode) });

      const d = res.data;
      api.setTokens(d.accessToken, d.refreshToken);

      const isNewUser = d.message.includes("تعیین کنید");
      if (isNewUser) {
        showSnackbar("کد تایید شد، رمز عبور تعیین کنید", "success");
        setStep("set-password");
      } else {
        window.location.href = "/app";
      }
    } catch {
      showSnackbar("کد نامعتبر یا منقضی شده", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set password → login
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== newPasswordRetype) {
      showSnackbar("تکرار رمز عبور برابر نیست", "error");
      return;
    }
    if (newPassword.length < 8) {
      showSnackbar("رمز عبور باید حداقل ۸ کاراکتر باشد", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post<{
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>("/api/auth/set-password", {
        phoneNumber: phone,
        password: newPassword,
        passwordRetype: newPasswordRetype,
      });

      api.setTokens(res.data.accessToken, res.data.refreshToken);
      window.location.href = "/app";
    } catch {
      showSnackbar("خطا در تنظیم رمز عبور", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Login with password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(phone, password);
      showSnackbar("ورود موفقیت‌آمیز بود", "success");
      window.location.href = "/app";
    } catch {
      showSnackbar("شماره تلفن یا رمز عبور اشتباه است", "error");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep("phone");
    setPassword("");
    setOtpCode("");
    setNewPassword("");
    setNewPasswordRetype("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">
          {step === "phone" && "ورود / ثبت‌نام"}
          {step === "password" && "ورود با رمز عبور"}
          {step === "otp" && "تایید کد"}
          {step === "set-password" && "تنظیم رمز عبور"}
        </h1>
        <p className="mt-2 text-sm text-white/30">
          {step === "phone" && "شماره تلفن خود را وارد کنید"}
          {step === "password" && "رمز عبور خود را وارد کنید"}
          {step === "otp" && `کد ۶ رقمی ارسال شده به ${phone} را وارد کنید`}
          {step === "set-password" && "رمز عبور جدید خود را تنظیم کنید"}
        </p>
      </div>

      <div className="landing-glass rounded-3xl p-8">
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">شماره تلفن</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                dir="ltr"
                required
                pattern="^09\d{9}$"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-cursor-hover
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={btnStyle}
            >
              {loading ? "در حال ارسال..." : "ارسال کد تایید"}
            </button>
            <button
              type="button"
              onClick={() => setStep("password")}
              className="w-full py-2 text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              رمز عبور دارید؟ ورود با رمز
            </button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">شماره تلفن</label>
              <div className={`${inputClass} flex items-center justify-between`}>
                <span dir="ltr">{phone}</span>
                <button type="button" onClick={goBack} className="text-xs text-azbin-gold/60 hover:text-azbin-gold">
                  تغییر
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                required
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-cursor-hover
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={btnStyle}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">شماره تلفن</label>
              <div className={`${inputClass} flex items-center justify-between`}>
                <span dir="ltr">{phone}</span>
                <button type="button" onClick={goBack} className="text-xs text-azbin-gold/60 hover:text-azbin-gold">
                  تغییر
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">کد تایید</label>
              <input
                type="text"
                inputMode="numeric"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="۱۲۳۴۵۶"
                dir="ltr"
                required
                maxLength={6}
                className={`${inputClass} text-center text-lg tracking-[0.5em]`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              data-cursor-hover
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={btnStyle}
            >
              {loading ? "در حال تایید..." : "تایید کد"}
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await api.post("/api/auth/otp/create", { phoneNumber: phone });
                  showSnackbar("کد مجددا ارسال شد", "success");
                } catch {
                  showSnackbar("خطا در ارسال مجدد", "error");
                }
              }}
              className="w-full py-2 text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              ارسال مجدد کد
            </button>
          </form>
        )}

        {step === "set-password" && (
          <form onSubmit={handleSetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">شماره تلفن</label>
              <div className={`${inputClass} flex items-center justify-between`}>
                <span dir="ltr">{phone}</span>
                <button type="button" onClick={goBack} className="text-xs text-azbin-gold/60 hover:text-azbin-gold">
                  تغییر
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">رمز عبور جدید</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="حداقل ۸ کاراکتر"
                required
                minLength={8}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-2">تکرار رمز عبور</label>
              <input
                type="password"
                value={newPasswordRetype}
                onChange={(e) => setNewPasswordRetype(e.target.value)}
                placeholder="رمز عبور را مجددا وارد کنید"
                required
                minLength={8}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-cursor-hover
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={btnStyle}
            >
              {loading ? "در حال ثبت..." : "ثبت‌نام و ورود"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
