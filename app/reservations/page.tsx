"use client";

import { Link } from "@/components/common/AppLink";
import { CalendarDays, ReceiptText } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { CancelReservationButton } from "@/components/business/ReservationActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { formatPrice, getReservationPrice } from "@/data/reservations";
import { useReservations } from "@/hooks/useCatAppStorage";

export default function ReservationsPage() {
  const { reservations } = useReservations();

  return (
    <AppShell>
      <main className="space-y-6 px-6 pb-6 pt-8">
        <section>
          <p className="text-sm text-muted-foreground">我的预约</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">确认接下来要见的小猫。</h1>
        </section>

        {reservations.length > 0 ? (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{reservation.catName}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {reservation.date} {reservation.time}
                      </p>
                    </div>
                    <Tag tone={reservation.status === "待到店" ? "orange" : "neutral"}>{reservation.status}</Tag>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{reservation.note}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-[16px] bg-accent px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary-strong">
                      <ReceiptText className="h-4 w-4" />
                      本次价格
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      {formatPrice(reservation.price ?? getReservationPrice(reservation.catId, reservation.time))}
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <Button asChild variant="secondary" className="w-full" aria-label={`查看${reservation.catName}预约详情`}>
                      <Link href={`/reservations/${reservation.id}`}>
                        <CalendarDays className="h-4 w-4" />
                        查看详情
                      </Link>
                    </Button>
                    <CancelReservationButton
                      reservationId={reservation.id}
                      disabled={reservation.status === "已取消"}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-accent text-primary-strong">
                <CalendarDays className="h-8 w-8" />
              </div>
              <p className="mt-5 text-base font-semibold text-foreground">还没有预约</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">先认识一只适合今天陪伴你的小猫吧。</p>
              <Button asChild className="mt-5 w-full" aria-label="去认识更多猫咪">
                <Link href="/cats">去认识小猫</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {reservations.length > 0 ? (
          <Button asChild className="w-full" aria-label="去认识更多猫咪">
            <Link href="/cats">再认识一只小猫</Link>
          </Button>
        ) : null}
      </main>
    </AppShell>
  );
}
