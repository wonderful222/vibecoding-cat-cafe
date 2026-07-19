"use client";

import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";
import { Link } from "@/components/common/AppLink";
import { AppShell } from "@/components/common/AppShell";
import { CancelReservationButton } from "@/components/business/ReservationActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { formatPrice, getReservationPrice } from "@/data/reservations";
import { useReservations } from "@/hooks/useCatAppStorage";

export default function ReservationsPage() {
  const { reservations, isReady } = useReservations();
  const sortedReservations = useMemo(() => {
    return [...reservations].sort((left, right) => {
      const leftCanceled = left.status === "已取消";
      const rightCanceled = right.status === "已取消";

      if (leftCanceled !== rightCanceled) {
        return leftCanceled ? 1 : -1;
      }

      return right.createdAt - left.createdAt;
    });
  }, [reservations]);

  return (
    <AppShell>
      <main className="px-5 pb-6 pt-5">
        {!isReady ? (
          <div aria-hidden="true" className="h-[220px] rounded-[24px] bg-card shadow-card" />
        ) : sortedReservations.length > 0 ? (
          <div className="space-y-4">
            {sortedReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-[20px] font-medium leading-7 text-foreground">{reservation.catName}</h2>
                      <p className="mt-1 text-[14px] leading-5 text-muted-foreground">
                        {reservation.date} {reservation.time}
                      </p>
                    </div>
                    <Tag
                      tone="neutral"
                      className={reservation.status === "待到店" ? "bg-[#fff5c7] text-primary-strong" : undefined}
                    >
                      {reservation.status}
                    </Tag>
                  </div>
                  <p className="mt-4 text-[14px] leading-5 text-muted-foreground">{reservation.note}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-[16px] bg-accent px-4 py-3">
                    <div className="flex items-center gap-2 text-[14px] font-medium text-primary-strong">
                      <Image src="/images/ui/price-ticket.svg" alt="" aria-hidden="true" width={24} height={24} />
                      本次价格
                    </div>
                    <p className="text-[22px] font-semibold leading-[30px] text-foreground">
                      {formatPrice(reservation.price ?? getReservationPrice(reservation.catId, reservation.time))}
                    </p>
                  </div>
                  <div className="mt-5">
                    <CancelReservationButton reservationId={reservation.id} disabled={reservation.status === "已取消"} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[16px] bg-accent text-[#8a6400]">
                <CalendarDays className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="mt-5 text-[16px] font-medium leading-6 text-foreground">还没有预约</p>
              <p className="mt-2 text-[14px] leading-5 text-muted-foreground">先认识一只适合今天陪伴你的小猫吧。</p>
              <Button asChild className="mt-5 w-full" aria-label="去认识小猫">
                <Link href="/cats">去认识小猫</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </AppShell>
  );
}
