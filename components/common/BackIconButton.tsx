import { Link } from "@/components/common/AppLink";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

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
        "inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-card text-foreground shadow-card transition duration-150 active:scale-[0.96]",
        className
      )}
    >
      <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
    </Link>
  );
}
