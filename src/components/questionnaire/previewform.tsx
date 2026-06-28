"use client";

import type { QuestionDataItem, QuestionPreviewValue } from "@/services/api";

interface PreviewFormProps {
  data: QuestionDataItem;
  onChange?: (result: { type: string; result: { question: string; answer: unknown; key: string } }) => void;
  isEditing?: boolean;
}

const alertColors = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export function PreviewForm({ data, onChange, isEditing = false }: PreviewFormProps) {
  const pv = data.previewValue;
  const type = data.type;

  const handleChange = (answer: unknown) => {
    onChange?.({
      type,
      result: { question: pv.question, answer, key: pv.key },
    });
  };

  const inputClass =
    "w-full h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50";

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-primary" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">
            {pv.question}
            {!pv.required && <span className="text-muted-foreground mr-1">(اختیاری)</span>}
          </h4>
        </div>
      </div>

      {pv.isDiscription && pv.description && (
        <div className={`rounded-xl border p-3 text-sm ${alertColors[pv.typeDescription || "info"]}`}>
          {pv.description}
        </div>
      )}

      {pv.noTextInside && (
        <p className="text-xs text-muted-foreground">{pv.noTextInside}</p>
      )}

      {type === "normal" && (
        <div className="space-y-2">
          {pv.AnswerTemplate === "textarea" ? (
            <textarea
              placeholder={pv.TextInside || "پاسخ خود را بنویسید"}
              onChange={(e) => handleChange(e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none disabled:opacity-50"
            />
          ) : (
            <input
              type={pv.AnswerTemplate === "number" ? "number" : pv.AnswerTemplate === "date" ? "date" : "text"}
              placeholder={pv.TextInside || "پاسخ خود را وارد کنید"}
              onChange={(e) => handleChange(e.target.value)}
              disabled={!isEditing}
              className={inputClass}
              dir={pv.AnswerTemplate === "number" ? "ltr" : undefined}
            />
          )}
        </div>
      )}

      {type === "DropDownList" && (
        <select
          onChange={(e) => handleChange(e.target.value)}
          disabled={!isEditing}
          className={inputClass}
        >
          <option value="">{pv.TextInside || "انتخاب کنید"}</option>
          {(pv.listItem || []).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}

      {type === "multiChoice" && (
        <div className="space-y-2">
          {(pv.listItem || []).map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`preview-${pv.key}`}
                onChange={() => handleChange(item)}
                disabled={!isEditing}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">{item}</span>
            </label>
          ))}
          {pv.isOther && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`preview-${pv.key}`}
                onChange={() => {}}
                disabled={!isEditing}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">سایر</span>
            </label>
          )}
        </div>
      )}

      {type === "RangeDrag" && (
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={100}
            onChange={(e) => handleChange(Number(e.target.value))}
            disabled={!isEditing}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      )}

      {type === "rating" && (
        <div className="flex items-center gap-1">
          {Array.from({ length: pv.lengthStart || 5 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => isEditing && handleChange(i + 1)}
              className="text-yellow-500 hover:scale-110 transition-transform"
              disabled={!isEditing}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {type === "matrix" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-2 text-right text-muted-foreground" />
                {(pv.row || []).map((r, i) => (
                  <th key={i} className="p-2 text-center text-muted-foreground text-xs">
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(pv.column || []).map((col, ci) => (
                <tr key={ci}>
                  <td className="p-2 text-foreground text-xs">{col}</td>
                  {(pv.row || []).map((_, ri) => (
                    <td key={ri} className="p-2 text-center">
                      <input
                        type="radio"
                        name={`preview-matrix-${pv.key}-${ci}`}
                        onChange={() => handleChange(`${col}-${pv.row?.[ri]}`)}
                        disabled={!isEditing}
                        className="w-4 h-4 text-primary"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
