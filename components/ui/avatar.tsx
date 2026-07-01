import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClassName: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16"
};

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-full bg-muted", sizeClassName[size], className)}>
      <Image src={src} alt={alt} fill sizes="64px" className="object-cover" />
    </div>
  );
}
