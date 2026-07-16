"use client";

import { Link } from "@/components/common/AppLink";
import Image from "next/image";
import { CalendarDays, ChevronRight, Heart, Settings } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites, useReservations } from "@/hooks/useCatAppStorage";

const profileItems = [
  { href: "/reservations", label: "我的预约", icon: CalendarDays },
  { href: "/profile/favorites", label: "我的收藏", icon: Heart },
  { href: "/profile/settings", label: "基础设置", icon: Settings }
];

export default function ProfilePage() {
  const { favoriteIds, isReady: favoritesReady } = useFavorites();
  const { reservations, isReady: reservationsReady } = useReservations();
  const activeReservationCount = reservations.filter((item) => item.status !== "已取消").length;
  const countsReady = favoritesReady && reservationsReady;
  const summaryItems = [
    { href: "/reservations", value: countsReady ? String(activeReservationCount) : "—", label: "待见面", ariaLabel: "查看我的预约" },
    { href: "/profile/favorites", value: countsReady ? String(favoriteIds.length) : "—", label: "心愿猫咪", ariaLabel: "查看我的收藏" }
  ];

  return (
    <AppShell>
      <main className="pb-8">
        <section className="relative isolate h-[270px] overflow-visible px-5 pt-[56px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[270px] bg-[linear-gradient(180deg,#fdca18_0%,#ffe36a_100%)]"
            style={{ clipPath: "ellipse(120% 100% at 50% 0%)" }}
          />
          <Image
            src="/images/ui/profile-illustration-2.svg"
            alt=""
            aria-hidden="true"
            width={92}
            height={98}
            className="absolute left-7 top-[98px] z-10"
          />
          <Image
            src="/images/ui/profile-illustration-3.svg"
            alt=""
            aria-hidden="true"
            width={38}
            height={37}
            className="absolute left-[236px] top-9 z-10"
          />
          <Image
            src="/images/ui/profile-illustration-1.svg"
            alt=""
            aria-hidden="true"
            width={92}
            height={91}
            className="absolute right-4 top-[114px] z-10"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-card shadow-[0_8px_20px_rgba(58,58,58,0.06)]">
              <Image
                src="/images/ui/profile-avatar-cat.png"
                alt="用户头像"
                width={66}
                height={48}
                className="h-auto w-[66px] object-contain"
                priority
              />
            </div>
            <h1 className="mt-4 text-[20px] font-semibold leading-7 text-foreground">YINLIANG</h1>
          </div>

          <div className="absolute inset-x-5 bottom-[-32px] z-20 grid grid-cols-2 gap-3">
            {summaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                className="block h-[82px] rounded-[16px] bg-card px-5 py-4 shadow-card transition duration-150 active:scale-[0.99]"
              >
                <p className="text-[20px] font-semibold leading-7 text-foreground">{item.value}</p>
                <p className="mt-1 text-[14px] leading-5 text-muted-foreground">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 px-5 pt-[52px]">
          <Card>
            <CardContent className="divide-y divide-border p-0">
              {profileItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex min-h-[62px] items-center justify-between px-5 py-4 transition duration-150 active:scale-[0.99]"
                    aria-label={item.label}
                  >
                    <span className="flex items-center gap-3 text-[16px] font-normal leading-6 text-foreground">
                      <Icon className="h-5 w-5 text-primary-strong" strokeWidth={1.8} />
                      {item.label}
                    </span>
                    <ChevronRight className="h-5 w-5 text-foreground" strokeWidth={1.8} />
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </main>
    </AppShell>
  );
}
