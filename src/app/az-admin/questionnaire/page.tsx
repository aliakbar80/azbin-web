"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { DashboardLayout } from "@/components/layout/dashboard";
import { Card, CardContent, Button, Input, EmptyState } from "@/components/ui";
import { FormBuilder } from "@/components/questionnaire/FormBuilder";
import type { QuestionDataItem, Questionnaire } from "@/services/api";

interface ServiceOption {
  id: string;
  title: string;
}

interface ExpertOption {
  id: string;
  user?: { firstName?: string; lastName?: string };
}

export default function QuestionnairePage() {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();

  const [serviceId, setServiceId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [data, setData] = useState<QuestionDataItem | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const { data: servicesData } = useQuery<{ results: ServiceOption[] }>({
    queryKey: ["services-list"],
    queryFn: () => api.get("/api/services?limit=100"),
  });

  const { data: expertsData } = useQuery<{ results: ExpertOption[] }>({
    queryKey: ["experts-list"],
    queryFn: () => api.get("/api/experts?limit=100"),
  });

  const { data: questionnaireData } = useQuery<{ data: Questionnaire }>({
    queryKey: ["questionnaire", serviceId, roleId],
    queryFn: () => api.get(`/api/service-requests/questions?serviceId=${serviceId}&roleId=${roleId}`),
    enabled: !!serviceId && !!roleId,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: { serviceId: string; roleId: string; data: QuestionDataItem[] }) =>
      api.post("/api/service-requests/questions", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire"] });
      showSnackbar("پرسشنامه با موفقیت ذخیره شد", "success");
      setData(null);
      setShowBuilder(false);
    },
    onError: () => showSnackbar("خطا در ذخیره پرسشنامه", "error"),
  });

  const handleSubmit = () => {
    if (!serviceId) {
      showSnackbar("لطفاً سرویس را انتخاب کنید", "error");
      return;
    }
    if (!roleId) {
      showSnackbar("لطفاً کارشناس را انتخاب کنید", "error");
      return;
    }
    if (!data) {
      showSnackbar("لطفاً یک سوال بسازید", "error");
      return;
    }
    if (!data.previewValue.key) {
      showSnackbar("کلید سوال الزامی است", "error");
      return;
    }
    if (!/^[a-zA-Z0-9@$!%*?&#^_.\- ]+$/.test(data.previewValue.key)) {
      showSnackbar("کلید سوال باید فقط حروف و اعداد انگلیسی باشد", "error");
      return;
    }
    if (!data.previewValue.question) {
      showSnackbar("متن سوال الزامی است", "error");
      return;
    }

    const existData = questionnaireData?.data?.data || [];
    const duplicateKey = existData.some((q) => q.previewValue.key === data.previewValue.key);
    if (duplicateKey && !questionnaireData?.data?.id) {
      showSnackbar("چنین کلیدی قبلاً وجود دارد", "error");
      return;
    }

    const finalData = [...existData, data];

    saveMutation.mutate({
      serviceId,
      roleId,
      data: finalData,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (payload: { id: string; data: QuestionDataItem[] }) =>
      api.post(`/api/service-requests/questions`, { ...payload, serviceId, roleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire"] });
      showSnackbar("سوال حذف شد", "success");
    },
  });

  const handleDelete = (key: string) => {
    const existData = questionnaireData?.data?.data || [];
    const newData = existData.filter((q) => q.previewValue.key !== key);
    if (questionnaireData?.data?.id) {
      deleteMutation.mutate({ id: questionnaireData.data.id, data: newData });
    }
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const existData = [...(questionnaireData?.data?.data || [])];
    const [moved] = existData.splice(fromIndex, 1);
    existData.splice(toIndex, 0, moved);
    if (questionnaireData?.data?.id) {
      deleteMutation.mutate({ id: questionnaireData.data.id, data: existData });
    }
  };

  const existingQuestions = questionnaireData?.data?.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-black text-foreground">پرسشنامه</h1>
          <p className="mt-1 text-sm text-muted-foreground">ایجاد و مدیریت پرسشنامه‌ها</p>
        </div>

        {/* Selectors */}
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">انتخاب سرویس</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  <option value="">انتخاب کنید</option>
                  {servicesData?.results?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">انتخاب کارشناس</label>
                <select
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  className="w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  <option value="">انتخاب کنید</option>
                  {expertsData?.results?.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.user?.firstName} {r.user?.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing questions list */}
        {existingQuestions.length > 0 && (
          <Card>
            <CardContent>
              <h3 className="text-sm font-bold text-foreground mb-3">سوالات موجود</h3>
              <div className="space-y-2">
                {existingQuestions.map((q, i) => (
                  <div key={q.previewValue.key} className="flex items-center justify-between rounded-xl bg-muted px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-6 text-center">{i + 1}</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/15 text-yellow-700 dark:text-yellow-300">
                        {q.type}
                      </span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground" dir="ltr">
                        {q.previewValue.key}
                      </span>
                      <span className="text-sm text-foreground">{q.previewValue.question}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {i > 0 && (
                        <button
                          onClick={() => handleMove(i, i - 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="جابه‌جایی به بالا"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      )}
                      {i < existingQuestions.length - 1 && (
                        <button
                          onClick={() => handleMove(i, i + 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="جابه‌جایی به پایین"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(q.previewValue.key)}
                        className="text-danger hover:text-red-600 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Builder */}
        {showBuilder ? (
          <FormBuilder
            onSave={(d) => {
              setData(d);
              handleSubmitWithData(d);
            }}
          />
        ) : (
          <Button onClick={() => setShowBuilder(true)} variant="secondary" className="w-full">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            ساخت سوال جدید
          </Button>
        )}
      </div>
    </DashboardLayout>
  );

  function handleSubmitWithData(d: QuestionDataItem) {
    if (!serviceId) {
      showSnackbar("لطفاً سرویس را انتخاب کنید", "error");
      return;
    }
    if (!roleId) {
      showSnackbar("لطفاً کارشناس را انتخاب کنید", "error");
      return;
    }
    if (!d.previewValue.key) {
      showSnackbar("کلید سوال الزامی است", "error");
      return;
    }
    if (!/^[a-zA-Z0-9@$!%*?&#^_.\- ]+$/.test(d.previewValue.key)) {
      showSnackbar("کلید سوال باید فقط حروف و اعداد انگلیسی باشد", "error");
      return;
    }
    if (!d.previewValue.question) {
      showSnackbar("متن سوال الزامی است", "error");
      return;
    }

    const existData = questionnaireData?.data?.data || [];
    const duplicateKey = existData.some((q) => q.previewValue.key === d.previewValue.key);
    if (duplicateKey) {
      showSnackbar("چنین کلیدی قبلاً وجود دارد", "error");
      return;
    }

    const finalData = [...existData, d];

    saveMutation.mutate({
      serviceId,
      roleId,
      data: finalData,
    });
  }
}
