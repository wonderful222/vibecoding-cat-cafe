"use client";

import { Link } from "@/components/common/AppLink";
import { Heart } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { CatCard } from "@/components/business/CatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cats } from "@/data/cats";
import { useFavorites } from "@/hooks/useCatAppStorage";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favoriteCats = cats.filter((cat) => favoriteIds.includes(cat.id));

  return (
    <AppShell>
      <main className="space-y-5 px-6 pb-6 pt-6">
        <PageHeader title="我的收藏" backHref="/profile" backLabel="返回我的页面" />

        {favoriteCats.length > 0 ? (
          <div className="space-y-4">
            {favoriteCats.map((cat) => (
              <CatCard key={cat.id} cat={cat} actionLabel="查看详情" />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-accent text-primary-strong">
                <Heart className="h-8 w-8" />
              </div>
              <p className="mt-5 text-base font-semibold text-foreground">还没有收藏的小猫</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">去看看今天有哪些适合陪伴你的猫吧。</p>
              <Button asChild className="mt-5 w-full" aria-label="去认识陪伴猫">
                <Link href="/cats">去认识小猫</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </AppShell>
  );
}
