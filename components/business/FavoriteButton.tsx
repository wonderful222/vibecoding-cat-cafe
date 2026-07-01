"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useCatAppStorage";

interface FavoriteButtonProps {
  catId: string;
  name: string;
}

export function FavoriteButton({ catId, name }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const selected = isFavorite(catId);

  return (
    <Button
      type="button"
      variant={selected ? "primary" : "secondary"}
      onClick={() => toggleFavorite(catId)}
      aria-label={selected ? `取消收藏${name}` : `收藏${name}`}
      className="w-full"
    >
      <Heart className="h-4 w-4" fill={selected ? "currentColor" : "none"} />
      {selected ? "已收藏" : "先收藏它"}
    </Button>
  );
}
