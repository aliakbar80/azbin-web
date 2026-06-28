"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/services/fetchClient";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardHeader, CardContent, Badge, EmptyState, Loading } from "@/components/ui";

interface User {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
}

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<{ results: User[] }>({
    queryKey: ["users", "profiles", search],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const qs = params.toString();
      return api.get(`/api/users/profiles${qs ? `?${qs}` : ""}`);
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">مدیریت کاربران</h1>
          <p className="mt-1 text-sm text-muted-foreground">لیست تمام کاربران ثبت‌نام شده</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="جستجوی کاربر..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted py-2 pr-10 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  dir="rtl"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : !data?.results?.length ? (
              <EmptyState title="کاربری یافت نشد" description="هیچ کاربری با این مشخصات پیدا نشد" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">شناسه</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">نام</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">تلفن</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">ایمیل</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">جنسیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.results.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-foreground">#{user.id}</td>
                        <td className="py-3 px-4 text-foreground font-medium">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground" dir="ltr">{user.phoneNumber}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.email || "-"}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.gender === "MALE" ? "info" : user.gender === "FEMALE" ? "warning" : "default"} dot>
                            {user.gender === "MALE" ? "مرد" : user.gender === "FEMALE" ? "زن" : "نامشخص"}
                          </Badge>
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
