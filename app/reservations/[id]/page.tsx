"use client";

import { Link } from "@/components/common/AppLink";
import { ArrowLeft, MapPin, ReceiptText } from "lucide-react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { CancelReservationButton } from "@/components/business/ReservationActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { formatPrice, getReservationPrice } from "@/data/reservations";
import { useReservations } from "@/hooks/useCatAppStorage";

export default function ReservationDetailPage() {
  const params = useParams<{ id: string }>();
  const { reservations } = useReservations();
  const reservation = reservations.find((item) => item.id === params.id);

  return (
    <AppShell>
      <main className="space-y-6 px-6 pb-6 pt-6">
        <Button asChild variant="ghost" className="px-0" aria-label="返回预约列表">
          <Link href="/reservations">
            <ArrowLeft className="h-5 w-5" />
            返回预约
          </Link>
        </Button>

        {reservation ? (
          <>
            <section>
              <p className="text-sm text-muted-foreground">预约详情</p>
              <h1 className="mt-2 text-2xl font-bold text-foreground">这次要见 {reservation.catName}。</h1>
            </section>
            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    {reservation.date} {reservation.time}
                  </span>
                  <Tag tone={reservation.status === "待到店" ? "orange" : "neutral"}>{reservation.status}</Tag>
                </div>
                <p className="border-t border-border pt-4 text-base leading-7 text-muted-foreground">{reservation.note}</p>
                <div className="flex items-center justify-between gap-3 rounded-[16px] bg-accent p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary-strong">
                    <ReceiptText className="h-4 w-4" />
                    本次价格
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatPrice(reservation.price ?? getReservationPrice(reservation.catId, reservation.time))}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-[16px] bg-muted p-4 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary-strong" />
                  到店后向店员报猫咪昵称即可
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-3">
              <Button asChild className="w-full" aria-label={`查看${reservation.catName}资料`}>
                <Link href={`/cats/${reservation.catId}`}>查看猫咪资料</Link>
              </Button>
              <CancelReservationButton
                reservationId={reservation.id}
                disabled={reservation.status === "已取消"}
              />
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-base font-semibold text-foreground">没有找到这条预约</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">它可能已经被清理了，返回预约列表看看吧。</p>
              <Button asChild className="mt-5 w-full" aria-label="返回预约列表">
                <Link href="/reservations">返回预约</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </AppShell>
  );
}
