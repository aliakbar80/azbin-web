"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/fetchClient";
import { useUI } from "@/providers/UIProvider";
import { Card, CardContent, Button } from "@/components/ui";
import { PreviewForm } from "./previewform";
import type { QuestionDataItem, Questionnaire } from "@/services/api";

interface QuestionnaireEditorProps {
  serviceRequestId: string;
}

export function QuestionnaireEditor({ serviceRequestId }: QuestionnaireEditorProps) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useUI();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: questionnaireData, isLoading } = useQuery<{ data: Questionnaire }>({
    queryKey: ["questionnaire", serviceRequestId],
    queryFn: () => api.get(`/api/service-requests/${serviceRequestId}/questions`),
    enabled: !!serviceRequestId,
  });

  const deleteMutation = useMutation({
    mutationFn: (newData: QuestionDataItem[]) =>
      api.post(`/api/service-requests/questions`, {
        serviceId: questionnaireData?.data?.serviceId,
        roleId: questionnaireData?.data?.roleId,
        data: newData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire"] });
      showSnackbar("سوال حذف شد", "success");
    },
  });

  const moveMutation = useMutation({
    mutationFn: (newData: QuestionDataItem[]) =>
      api.post(`/api/service-requests/questions`, {
        serviceId: questionnaireData?.data?.serviceId,
        roleId: questionnaireData?.data?.roleId,
        data: newData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire"] });
    },
  });

  const data = questionnaireData?.data?.data || [];

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">هنوز سوالی تعریف نشده است</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentItem = data[currentIndex];

  const handleDelete = () => {
    const key = currentItem.previewValue.key;
    const newData = data.filter((q) => q.previewValue.key !== key);
    if (currentIndex >= newData.length) {
      setCurrentIndex(Math.max(0, newData.length - 1));
    }
    deleteMutation.mutate(newData);
  };

  const handleMove = (dir: -1 | 1) => {
    const newIndex = currentIndex + dir;
    if (newIndex < 0 || newIndex >= data.length) return;
    const newData = [...data];
    const [moved] = newData.splice(currentIndex, 1);
    newData.splice(newIndex, 0, moved);
    setCurrentIndex(newIndex);
    moveMutation.mutate(newData);
  };

  return (
    <div className="space-y-4">
      {/* Chip list */}
      <div className="flex flex-wrap gap-2">
        {data.map((q, i) => (
          <button
            key={q.previewValue.key}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              i === currentIndex
                ? "bg-primary text-black border-primary shadow-sm"
                : "bg-surface text-foreground border-border hover:border-primary/50"
            }`}
          >
            {q.previewValue.question}
          </button>
        ))}
      </div>

      {/* Delete bar */}
      <div className="flex items-center justify-between rounded-xl bg-danger/10 px-4 py-2">
        <span className="text-xs text-danger">حذف سوال فعلی</span>
        <button
          onClick={handleDelete}
          className="text-danger hover:text-red-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Preview */}
      {currentItem && (
        <Card>
          <CardContent>
            <PreviewForm data={currentItem} isEditing={false} />
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleMove(-1)}
          disabled={currentIndex === 0}
        >
          قبلی
        </Button>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} از {data.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleMove(1)}
          disabled={currentIndex === data.length - 1}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
