import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "search";
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <label className="relative block">
      {icon === "search" ? (
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      ) : null}
      <input
        className={cn(
          "h-12 w-full rounded-[var(--radius-input)] border border-border bg-card px-4 text-base text-foreground outline-none transition duration-150 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15",
          icon === "search" && "pl-11",
          className
        )}
        {...props}
      />
    </label>
  );
}
