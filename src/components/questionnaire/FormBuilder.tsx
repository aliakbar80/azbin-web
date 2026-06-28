"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CustomFormHandler } from "./CustomFormHandler";
import { PreviewForm } from "./previewform";
import type { QuestionType, QuestionPreviewValue, QuestionDataItem } from "@/services/api";

const questionTypeTabs: { label: string; value: QuestionType }[] = [
  { label: "سوال عادی", value: "normal" },
  { label: "لیست انتخابی", value: "DropDownList" },
  { label: "چند گزینه‌ای", value: "multiChoice" },
  { label: "طیفی", value: "RangeDrag" },
  { label: "رتبه‌بندی", value: "rating" },
  { label: "ماتریس", value: "matrix" },
];

interface FormBuilderProps {
  onSave: (data: QuestionDataItem) => void;
  initialData?: QuestionDataItem;
}

export function FormBuilder({ onSave, initialData }: FormBuilderProps) {
  const [questionType, setQuestionType] = useState<QuestionType>(initialData?.type || "normal");
  const [previewValue, setPreviewValue] = useState<QuestionPreviewValue>(
    initialData?.previewValue || {
      key: "",
      question: "",
      required: false,
      isDiscription: false,
      description: "",
      typeDescription: "info",
    }
  );

  const data: QuestionDataItem = useMemo(
    () => ({ type: questionType, previewValue }),
    [questionType, previewValue]
  );

  const handleSave = () => {
    onSave(data);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-6">
          {/* Type tabs */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">نوع سوال</label>
            <div className="flex flex-wrap gap-2">
              {questionTypeTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setQuestionType(tab.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                    questionType === tab.value
                      ? "bg-primary text-black border-primary shadow-sm"
                      : "bg-surface text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Config + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Config */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-3">تنظیمات</h3>
              <div className="space-y-4">
                <CustomFormHandler
                  questionType={questionType}
                  previewValue={previewValue}
                  onChange={setPreviewValue}
                />
              </div>
            </div>

            {/* Right: Preview */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-3">پیش‌نمایش</h3>
              <div className="rounded-2xl border border-border bg-muted/30 p-5">
                {previewValue.question ? (
                  <PreviewForm
                    data={data}
                    isEditing={true}
                    onChange={() => {}}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    متن سوال را وارد کنید تا پیش‌نمایش نمایش داده شود
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} variant="primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {initialData ? "بروزرسانی سوال" : "افزودن سوال"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
