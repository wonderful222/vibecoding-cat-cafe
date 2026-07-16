"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatProfile } from "@/types/cat";
import { BackIconButton } from "@/components/common/BackIconButton";
import { FavoriteButton } from "@/components/business/FavoriteButton";
import { ReservationSheet } from "@/components/business/ReservationSheet";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

function GenderPaw({ gender, size = 24 }: { gender: string; size?: number }) {
  const color = gender.includes("弟弟") ? "#bffcfa" : "#fde1e1";

  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: "url(/images/ui/paw-accent.svg) center / contain no-repeat",
        mask: "url(/images/ui/paw-accent.svg) center / contain no-repeat"
      }}
    />
  );
}

export function CatDetailClient({ cat }: { cat: CatProfile }) {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen pb-24">
        <section className="relative h-[468px] overflow-hidden bg-muted">
          <Image
            src={cat.heroImage}
            alt={`${cat.name}详情照片`}
            fill
            priority
            sizes="390px"
            className="object-cover object-center"
          />
          {!reservationOpen ? (
            <BackIconButton href="/cats" label="返回陪伴猫列表" className="absolute left-5 top-6" />
          ) : null}
        </section>

        <section className="relative z-10 -mt-6 rounded-t-[24px] bg-background px-5 pb-8 pt-8">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-semibold leading-[30px] text-foreground">{cat.name}</h1>
            <p className="text-[14px] leading-5 text-muted-foreground">
              {cat.age} · {cat.gender}
            </p>
            <GenderPaw gender={cat.gender} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag tone="blue">{cat.status}</Tag>
            {cat.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-border bg-card px-5 py-[14px] shadow-card">
            <h2 className="text-[16px] font-medium leading-6 text-foreground">适合的人</h2>
            <p className="mt-2 text-[14px] leading-5 text-muted-foreground">{cat.bestFor}</p>
          </div>

          <div className="mt-4 rounded-[24px] border border-border bg-card px-5 py-[14px] shadow-card">
            <h2 className="text-[16px] font-medium leading-6 text-foreground">互动建议</h2>
            <p className="mt-2 text-[14px] leading-5 text-muted-foreground">{cat.gentleTip}</p>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[390px] bg-background/95 px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="flex gap-3">
          <FavoriteButton catId={cat.id} name={cat.name} compact />
          <Button className="flex-1" onClick={() => setReservationOpen(true)}>
            预约陪伴
          </Button>
        </div>
      </div>

      <ReservationSheet cat={cat} open={reservationOpen} onClose={() => setReservationOpen(false)} />
    </>
  );
}
