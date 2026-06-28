"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";

type InputType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "time"
  | "select"
  | "autocomplete"
  | "checkbox"
  | "switch"
  | "multiChip"
  | "multiChoice"
  | "RangeDrag"
  | "rating"
  | "NumberCounter"
  | "matrix"
  | "imges"
  | "text-editor";

interface Option {
  label: string;
  value: string;
}

interface FormInputProps {
  type: InputType;
  value?: unknown;
  onChange?: (val: unknown) => void;
  placeholder?: string;
  label?: string;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
}

export function FormInput({
  type,
  value,
  onChange,
  placeholder,
  label,
  options = [],
  min = 0,
  max = 100,
  step = 1,
  disabled,
  required,
}: FormInputProps) {
  const baseClass =
    "w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  switch (type) {
    case "text":
      return (
        <Input
          label={label}
          value={(value as string) || ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
      );

    case "textarea":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <textarea
            value={(value as string) || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={4}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
          />
        </div>
      );

    case "number":
      return (
        <Input
          label={label}
          type="number"
          value={(value as number) ?? ""}
          onChange={(e) => onChange?.(Number(e.target.value))}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          dir="ltr"
        />
      );

    case "date":
      return (
        <Input
          label={label}
          type="date"
          value={(value as string) || ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          dir="ltr"
        />
      );

    case "time":
      return (
        <Input
          label={label}
          type="time"
          value={(value as string) || ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          dir="ltr"
        />
      );

    case "checkbox":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange?.(e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
            />
            <span className="text-sm text-foreground">{placeholder}</span>
          </label>
        </div>
      );

    case "switch":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange?.(e.target.checked)}
              disabled={disabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-full" />
          </label>
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <select
            value={(value as string) || ""}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className={baseClass}
          >
            <option value="">{placeholder || "انتخاب کنید"}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "autocomplete":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <input
            type="text"
            list={`list-${label}`}
            value={(value as string) || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={baseClass}
          />
          <datalist id={`list-${label}`}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </datalist>
        </div>
      );

    case "multiChip": {
      const selected = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onChange?.(selected.filter((v) => v !== opt.value));
                    } else {
                      onChange?.([...selected, opt.value]);
                    }
                  }}
                  disabled={disabled}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? "bg-primary text-black border-primary"
                      : "bg-surface text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case "multiChoice":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={label}
                  checked={value === opt.value}
                  onChange={() => onChange?.(opt.value)}
                  disabled={disabled}
                  className="w-4 h-4 border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case "RangeDrag":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <input
            type="range"
            value={(value as number) ?? min}
            onChange={(e) => onChange?.(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{min}</span>
            <span className="font-medium text-foreground">{(value as number) ?? min}</span>
            <span>{max}</span>
          </div>
        </div>
      );

    case "rating": {
      const count = (value as number) || 5;
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="flex items-center gap-1">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange?.(i + 1)}
                className="text-yellow-500 hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      );
    }

    case "NumberCounter": {
      const cnt = (value as number) || 0;
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChange?.(Math.max(min, cnt - step))}
              disabled={disabled || cnt <= min}
              className="w-8 h-8 rounded-lg border border-border bg-surface text-foreground flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-all"
            >
              -
            </button>
            <span className="w-12 text-center text-sm font-medium text-foreground">{cnt}</span>
            <button
              type="button"
              onClick={() => onChange?.(Math.min(max, cnt + step))}
              disabled={disabled || cnt >= max}
              className="w-8 h-8 rounded-lg border border-border bg-surface text-foreground flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-all"
            >
              +
            </button>
          </div>
        </div>
      );
    }

    case "matrix": {
      const matrixVal = (value as { columns: string[]; rows: string[] }) || { columns: [], rows: [] };
      return (
        <div className="space-y-3">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-right text-muted-foreground">ستون‌ها</th>
                  {matrixVal.rows.map((_, i) => (
                    <th key={i} className="p-2 text-center text-muted-foreground">{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixVal.columns.map((col, ci) => (
                  <tr key={ci}>
                    <td className="p-2 text-foreground">{col}</td>
                    {matrixVal.rows.map((_, ri) => (
                      <td key={ri} className="p-2 text-center">
                        <input
                          type="radio"
                          name={`matrix-${ci}`}
                          className="w-4 h-4 text-primary"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case "imges":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-all cursor-pointer">
            <svg className="w-8 h-8 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-xs text-muted-foreground">کلیک کنید یا فایل را بکشید</p>
          </div>
        </div>
      );

    case "text-editor":
      return (
        <div className="space-y-1.5">
          {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
          <textarea
            value={(value as string) || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={6}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
          />
        </div>
      );

    default:
      return null;
  }
}
