import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "blue" | "orange" | "green" | "neutral";
}

const toneClassName: Record<NonNullable<TagProps["tone"]>, string> = {
  blue: "bg-accent text-primary-strong",
  orange: "bg-secondary/20 text-secondary-foreground",
  green: "bg-success/15 text-success",
  neutral: "bg-muted text-muted-foreground"
};

export function Tag({ className, tone = "neutral", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-full px-3 text-sm leading-none",
        toneClassName[tone],
        className
      )}
      {...props}
    />
  );
}
