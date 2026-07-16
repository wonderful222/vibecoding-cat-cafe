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
        keywordValue.length === 0 || [cat.name, cat.status, ...cat.tags].some((item) => item.includes(keywordValue));
      const matchesFilter = filter === "全部" || cat.energy === filter || cat.interaction === filter;
      return matchesKeyword && matchesFilter;
    });
  }, [cats, filter, keyword]);

  return (
    <div>
      <section className="h-[140px] rounded-b-[24px] bg-primary px-5 pt-6">
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-placeholder"
          />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索猫咪昵称或性格"
            aria-label="搜索猫咪昵称或性格"
            className="h-12 w-full rounded-[24px] border border-transparent bg-card pl-12 pr-5 text-[14px] font-normal text-foreground shadow-sm outline-none transition duration-150 placeholder:font-normal placeholder:text-placeholder focus:border-primary-strong/30 focus:ring-2 focus:ring-primary-strong/15"
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
                "h-8 min-h-8 rounded-[16px] px-0 text-[14px] font-medium shadow-none",
                filter === item
                  ? "border-white bg-card text-primary"
                  : "border-2 border-white bg-transparent text-white"
              )}
            >
              {item}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4 px-5 pt-4">
        {visibleCats.length > 0 ? (
          visibleCats.map((cat) => <CatCard key={cat.id} cat={cat} />)
        ) : (
          <div className="rounded-[24px] bg-card p-8 text-center shadow-card">
            <p className="text-[16px] font-medium leading-6 text-foreground">没有找到合适的小猫</p>
            <p className="mt-2 text-[14px] leading-5 text-muted-foreground">换一个关键词，或者先看看全部陪伴猫。</p>
          </div>
        )}
      </section>
    </div>
  );
}
