"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CatProfile } from "@/types/cat";
import { CatCard } from "@/components/business/CatCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters = ["全部", "安静", "适中", "活泼", "亲近"] as const;

interface CatListClientProps {
  cats: CatProfile[];
}

export function CatListClient({ cats }: CatListClientProps) {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");

  const visibleCats = useMemo(() => {
    return cats.filter((cat) => {
      const keywordValue = keyword.trim();
      const matchesKeyword =
        keywordValue.length === 0 || [cat.name, ...cat.tags].some((item) => item.includes(keywordValue));
      const matchesFilter = filter === "全部" || cat.energy === filter || cat.interaction === filter;
      return matchesKeyword && matchesFilter;
    });
  }, [cats, filter, keyword]);

  return (
    <div>
      <section className="bg-primary px-6 pb-0 pt-5">
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索猫咪昵称或性格"
            aria-label="搜索猫咪昵称或性格"
            className="h-16 w-full rounded-[22px] border border-transparent bg-card pl-14 pr-5 text-base font-normal text-foreground shadow-card outline-none transition duration-150 placeholder:font-normal placeholder:text-muted-foreground focus:border-primary-strong/30 focus:ring-2 focus:ring-primary-strong/15"
          />
        </label>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {filters.map((item) => (
            <Button
              key={item}
              type="button"
              variant="secondary"
              size="compact"
              onClick={() => setFilter(item)}
              aria-label={`筛选${item}猫咪`}
              className={cn(
                "h-9 min-h-9 rounded-full px-0 text-sm font-medium shadow-none",
                filter === item
                  ? "border-white bg-card text-muted-foreground"
                  : "border-2 border-white bg-transparent text-white"
              )}
            >
              {item}
            </Button>
          ))}
        </div>
      </section>

      <div className="h-6 rounded-b-[28px] bg-[#fdca18]" />

      <section className="space-y-4 px-5 pt-3">
        {visibleCats.length > 0 ? (
          visibleCats.map((cat) => <CatCard key={cat.id} cat={cat} />)
        ) : (
          <div className="rounded-[24px] bg-card p-8 text-center shadow-card">
            <p className="text-base font-semibold text-foreground">没有找到合适的小猫</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">换一个关键词，或者先看看全部陪伴猫。</p>
          </div>
        )}
      </section>
    </div>
  );
}
