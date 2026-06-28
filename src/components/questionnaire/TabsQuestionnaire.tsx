"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PreviewForm } from "./previewform";
import type { QuestionDataItem, QuestionAnswerItem } from "@/services/api";

interface TabsQuestionnaireProps {
  questions: QuestionDataItem[];
  serviceRequestId: string;
  roleName?: string;
  roleId?: string;
}

export function TabsQuestionnaire({
  questions,
  serviceRequestId,
  roleName,
  roleId,
}: TabsQuestionnaireProps) {
  const { showSnackbar } = useUI();
  const queryClient = useQueryClient();
  const [result, setResult] = useState<QuestionAnswerItem[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const { data: existingAnswers } = useQuery<{ data: { data: QuestionAnswerItem[] } }>({
    queryKey: ["sr-answers", serviceRequestId],
    queryFn: () => api.get(`/api/service-requests/${serviceRequestId}/answer`),
    enabled: !!serviceRequestId,
  });

  useEffect(() => {
    if (existingAnswers?.data?.data) {
      setResult(existingAnswers.data.data);
    }
  }, [existingAnswers]);

  const saveMutation = useMutation({
    mutationFn: (data: QuestionAnswerItem[]) =>
      api.post(`/api/service-requests/${serviceRequestId}/answer`, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sr-answers"] });
      showSnackbar("پاسخ‌ها با موفقیت ذخیره شد", "success");
    },
    onError: () => showSnackbar("خطا در ذخیره پاسخ‌ها", "error"),
  });

  const handleResult = (resData: { type: string; result: { question: string; answer: unknown; key: string } }) => {
    const findIndex = result.findIndex((item) => item.result.key === resData.result.key);
    const newItem: QuestionAnswerItem = {
      type: resData.type as QuestionAnswerItem["type"],
      result: resData.result,
      role_name: roleName,
      role_id: roleId,
    };

    if (findIndex === -1) {
      setResult([...result, newItem]);
    } else {
      const updated = [...result];
      updated[findIndex] = newItem;
      setResult(updated);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      {questions.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {questions.map((q, i) => (
            <button
              key={q.previewValue.key}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                activeTab === i
                  ? "bg-primary text-black border-primary shadow-sm"
                  : "bg-surface text-foreground border-border hover:border-primary/50"
              }`}
            >
              {q.previewValue.question}
            </button>
          ))}
        </div>
      )}

      {/* Current question */}
      {questions[activeTab] && (
        <Card>
          <CardContent>
            <PreviewForm
              data={questions[activeTab]}
              isEditing={true}
              onChange={handleResult}
            />
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
          disabled={activeTab === 0}
        >
          قبلی
        </Button>
        <span className="text-xs text-muted-foreground">
          {activeTab + 1} از {questions.length}
        </span>
        {activeTab < questions.length - 1 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(Math.min(questions.length - 1, activeTab + 1))}
          >
            بعدی
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => saveMutation.mutate(result)}
            loading={saveMutation.isPending}
          >
            ذخیره پاسخ‌ها
          </Button>
        )}
      </div>

      {/* Result display */}
      {result.length > 0 && (
        <Card>
          <CardContent>
            <h4 className="text-sm font-bold text-foreground mb-3">پاسخ‌های ثبت‌شده</h4>
            <div className="space-y-2">
              {result.map((r) => (
                <div key={r.result.key} className="flex items-center justify-between rounded-xl bg-muted px-4 py-2">
                  <span className="text-sm text-muted-foreground">{r.result.question}</span>
                  <span className="text-sm font-medium text-foreground">{String(r.result.answer)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
