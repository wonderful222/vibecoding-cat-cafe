"use client";

import { useState } from "react";
import { Link } from "@/components/common/AppLink";
import { CalendarDays, Clock, ReceiptText } from "lucide-react";
import { formatPrice, getReservationPrice, reservationDates, timeSlots } from "@/data/reservations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReservationPickerProps {
  catId: string;
  catName: string;
}

export function ReservationPicker({ catId, catName }: ReservationPickerProps) {
  const [date, setDate] = useState(reservationDates[0].value);
  const [time, setTime] = useState(timeSlots[2]);
  const selectedDate = reservationDates.find((item) => item.value === date) ?? reservationDates[0];
  const selectedPrice = getReservationPrice(catId, time);
  const confirmParams = new URLSearchParams({ date: selectedDate.date, time }).toString();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-5 w-5" />
            <span className="text-sm">选择日期</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {reservationDates.map((item) => (
              <Button
                key={item.value}
                type="button"
                variant={date === item.value ? "primary" : "secondary"}
                size="compact"
                onClick={() => setDate(item.value)}
                aria-label={`选择${item.label}${item.date}`}
              >
                <span className="flex flex-col leading-5">
                  <span>{item.label}</span>
                  <span className="text-xs font-normal opacity-80">{item.date}</span>
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-sm">选择时间</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {timeSlots.map((item) => (
              <Button
                key={item}
                type="button"
                variant={time === item ? "primary" : "secondary"}
                size="compact"
                onClick={() => setTime(item)}
                aria-label={`选择${item}`}
                className="h-auto min-h-14 flex-col gap-0 px-3 py-2"
              >
                <span className="text-sm leading-5">{item}</span>
                <span className="text-xs font-bold opacity-80">{formatPrice(getReservationPrice(catId, item))}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-primary/40 bg-accent">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-card text-primary-strong">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">本次预约价格</p>
              <p className="mt-1 text-xs leading-5 text-primary-strong">根据猫咪和时段实时计算</p>
            </div>
          </div>
          <p className="shrink-0 text-2xl font-bold text-foreground">{formatPrice(selectedPrice)}</p>
        </CardContent>
      </Card>
      <Button asChild className="w-full" aria-label={`确认预约${catName}`}>
        <Link href={`/reserve/${catId}/confirm?${confirmParams}`}>确认这段陪伴</Link>
      </Button>
    </div>
  );
}
