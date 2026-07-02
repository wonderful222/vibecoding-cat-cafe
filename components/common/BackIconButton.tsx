import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/common/AppLink";
import { cn } from "@/lib/utils";

interface BackIconButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function BackIconButton({ href, label, className }: BackIconButtonProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-card text-foreground shadow-card ring-1 ring-border/70 transition duration-150 active:scale-[0.96]",
        className
      )}
    >
      <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
    </Link>
  );
}
