"use client";

import { Link } from "@/components/common/AppLink";
import { MapPin, ReceiptText } from "lucide-react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/common/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
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
      <main className="space-y-5 px-6 pb-6 pt-6">
        <PageHeader title="预约详情" backHref="/reservations" backLabel="返回预约列表" />

        {reservation ? (
          <>
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
