"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ size = "md", fullScreen = false, className }: LoadingProps) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-primary/30 border-t-primary",
        sizes[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">{spinner}</div>
  );
}

export function LoadingOverlay() {
  return <Loading fullScreen />;
}
