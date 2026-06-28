"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { FormInput } from "./FormInputs";
import type { QuestionType, QuestionPreviewValue } from "@/services/api";

interface CustomFormHandlerProps {
  questionType: QuestionType;
  previewValue: QuestionPreviewValue;
  onChange: (pv: QuestionPreviewValue) => void;
}

const questionTypeTabs: { label: string; value: QuestionType }[] = [
  { label: "سوال عادی", value: "normal" },
  { label: "لیست انتخابی", value: "DropDownList" },
  { label: "چند گزینه‌ای", value: "multiChoice" },
  { label: "طیفی", value: "RangeDrag" },
  { label: "رتبه‌بندی", value: "rating" },
  { label: "ماتریس", value: "matrix" },
];

export function CustomFormHandler({ questionType, previewValue, onChange }: CustomFormHandlerProps) {
  const [local, setLocal] = useState<QuestionPreviewValue>(previewValue);

  useEffect(() => {
    setLocal(previewValue);
  }, [previewValue]);

  const update = (patch: Partial<QuestionPreviewValue>) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange(next);
  };

  const inputClass =
    "w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  return (
    <div className="space-y-4">
      {/* Common fields */}
      <Input
        label="کلید سوال (انگلیسی)"
        value={local.key || ""}
        onChange={(e) => update({ key: e.target.value })}
        placeholder="my_question_key"
        dir="ltr"
        required
      />
      <Input
        label="متن سوال"
        value={local.question || ""}
        onChange={(e) => update({ question: e.target.value })}
        placeholder="متن سوال را وارد کنید"
        required
      />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!local.required}
            onChange={(e) => update({ required: e.target.checked })}
            className="w-4 h-4 rounded text-primary"
          />
          <span className="text-sm text-foreground">الزامی</span>
        </label>
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!local.isDiscription}
            onChange={(e) => update({ isDiscription: e.target.checked })}
            className="w-4 h-4 rounded text-primary"
          />
          <span className="text-sm text-foreground">اضافه کردن توضیحات</span>
        </label>
      </div>

      {local.isDiscription && (
        <>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">متن توضیحات</label>
            <textarea
              value={local.description || ""}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="توضیحات..."
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">نوع توضیحات</label>
            <select
              value={local.typeDescription || "info"}
              onChange={(e) => update({ typeDescription: e.target.value as QuestionPreviewValue["typeDescription"] })}
              className={inputClass}
            >
              <option value="info">اطلاعاتی</option>
              <option value="success">موفقیت</option>
              <option value="warning">هشدار</option>
              <option value="error">خطا</option>
            </select>
          </div>
        </>
      )}

      {/* Type-specific fields */}
      {questionType === "normal" && (
        <>
          {local.noTextInside !== undefined || true ? (
            <Input
              label="متن بالای فیلد"
              value={local.noTextInside || ""}
              onChange={(e) => update({ noTextInside: e.target.value })}
              placeholder="متن توضیحی بالای فیلد"
            />
          ) : null}
          <Input
            label="متن داخل فیلد"
            value={local.TextInside || ""}
            onChange={(e) => update({ TextInside: e.target.value })}
            placeholder="متن پیش‌فرض داخل فیلد"
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">نوع فیلد پاسخ</label>
            <select
              value={local.AnswerTemplate || "text"}
              onChange={(e) => update({ AnswerTemplate: e.target.value as QuestionPreviewValue["AnswerTemplate"] })}
              className={inputClass}
            >
              <option value="text">متن</option>
              <option value="textarea">متن بلند</option>
              <option value="number">عدد</option>
              <option value="date">تاریخ</option>
            </select>
          </div>
        </>
      )}

      {questionType === "DropDownList" && (
        <>
          <Input
            label="متن بالای فیلد"
            value={local.noTextInside || ""}
            onChange={(e) => update({ noTextInside: e.target.value })}
            placeholder="متن توضیحی"
          />
          <Input
            label="متن داخل فیلد"
            value={local.TextInside || ""}
            onChange={(e) => update({ TextInside: e.target.value })}
            placeholder="انتخاب کنید"
          />
          <ChipInput
            label="گزینه‌ها"
            value={local.listItem || []}
            onChange={(val) => update({ listItem: val })}
          />
        </>
      )}

      {questionType === "multiChoice" && (
        <>
          <ChipInput
            label="گزینه‌ها"
            value={local.listItem || []}
            onChange={(val) => update({ listItem: val })}
          />
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!local.isOther}
              onChange={(e) => update({ isOther: e.target.checked })}
              className="w-4 h-4 rounded text-primary"
            />
            <span className="text-sm text-foreground">گزینه سایر</span>
          </div>
          {local.isOther && (
            <Input
              label="متن گزینه سایر"
              value={local.TextInsideOther || ""}
              onChange={(e) => update({ TextInsideOther: e.target.value })}
              placeholder="سایر"
            />
          )}
        </>
      )}

      {questionType === "RangeDrag" && (
        <p className="text-xs text-muted-foreground">این نوع سوال فیلد اضافی ندارد. فقط فیلدهای مشترک نمایش داده می‌شود.</p>
      )}

      {questionType === "rating" && (
        <>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">تعداد آیتم‌ها (۵ تا ۲۰)</label>
            <FormInput
              type="NumberCounter"
              value={local.lengthStart || 5}
              onChange={(val) => update({ lengthStart: val as number })}
              min={5}
              max={20}
              step={1}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">نوع آیکون</label>
            <select
              value={local.iconType || "star"}
              onChange={(e) => update({ iconType: e.target.value as QuestionPreviewValue["iconType"] })}
              className={inputClass}
            >
              <option value="star">ستاره</option>
              <option value="heart">قلب</option>
              <option value="thumb">لایک</option>
            </select>
          </div>
        </>
      )}

      {questionType === "matrix" && (
        <>
          <ChipInput
            label="ستون‌ها ( ردیف‌های جدول)"
            value={local.column || []}
            onChange={(val) => update({ column: val })}
          />
          <ChipInput
            label="ردیف‌ها (گزینه‌های جدول)"
            value={local.row || []}
            onChange={(val) => update({ row: val })}
          />
        </>
      )}
    </div>
  );
}

function ChipInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };

  const remove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="افزودن و Enter"
          className="flex-1 h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <button
          type="button"
          onClick={add}
          className="h-10 px-4 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
        >
          +
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
            >
              {item}
              <button type="button" onClick={() => remove(item)} className="hover:text-red-500 transition-colors">
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
