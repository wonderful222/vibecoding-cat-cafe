"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useCatAppStorage";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  catId: string;
  name: string;
  compact?: boolean;
  className?: string;
}

export function FavoriteButton({ catId, name, compact = false, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const selected = isFavorite(catId);

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => toggleFavorite(catId)}
        aria-label={selected ? `取消收藏${name}` : `收藏${name}`}
        aria-pressed={selected}
        className={cn(
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border bg-card transition duration-150 active:scale-[0.96]",
          selected ? "border-primary text-primary shadow-card" : "border-primary-strong/45 text-primary-strong",
          className
        )}
      >
        <Heart aria-hidden="true" className={cn("h-5 w-5", selected && "fill-primary")} strokeWidth={1.9} />
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant={selected ? "primary" : "secondary"}
      onClick={() => toggleFavorite(catId)}
      aria-label={selected ? `取消收藏${name}` : `收藏${name}`}
      className={cn("w-full", className)}
    >
      <Image src="/images/ui/favorite.svg" alt="" aria-hidden="true" width={24} height={24} />
      {selected ? "已收藏" : "先收藏它"}
    </Button>
  );
}
