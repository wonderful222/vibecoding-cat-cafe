"use client";

import { useMemo, useState } from "react";
import { Link } from "@/components/common/AppLink";
import { CalendarDays, Clock, ReceiptText } from "lucide-react";
import { formatPrice, getReservationPrice, timeSlots } from "@/data/reservations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ReservationPickerProps {
  catId: string;
  catName: string;
}

interface ReservationDateOption {
  value: string;
  label: string;
  date: string;
}

function getBeijingNow() {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(new Date());

  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute")
  };
}

function formatDateValue(date: Date) {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${month}.${day}`;
}

function createBeijingDateOptions(): ReservationDateOption[] {
  const now = getBeijingNow();
  const baseTime = Date.UTC(now.year, now.month - 1, now.day);
  const labels = ["今天", "明天", "后天"];

  return labels.map((label, index) => {
    const date = new Date(baseTime + index * 24 * 60 * 60 * 1000);
    const value = formatDateValue(date);

    return {
      value,
      label,
      date: value
    };
  });
}

function isPastTodaySlot(dateValue: string, slot: string, todayValue: string, now: ReturnType<typeof getBeijingNow>) {
  if (dateValue !== todayValue) {
    return false;
  }

  const [hour, minute] = slot.split(":").map(Number);
  return hour * 60 + minute <= now.hour * 60 + now.minute;
}

export function ReservationPicker({ catId, catName }: ReservationPickerProps) {
  const now = useMemo(() => getBeijingNow(), []);
  const reservationDates = useMemo(() => createBeijingDateOptions(), []);
  const todayValue = reservationDates[0].value;
  const [date, setDate] = useState(reservationDates[0].value);
  const [time, setTime] = useState<string | null>(() => {
    return timeSlots.find((slot) => !isPastTodaySlot(reservationDates[0].value, slot, todayValue, now)) ?? null;
  });
  const selectedDate = reservationDates.find((item) => item.value === date) ?? reservationDates[0];
  const effectiveTime =
    time && !isPastTodaySlot(date, time, todayValue, now)
      ? time
      : timeSlots.find((slot) => !isPastTodaySlot(date, slot, todayValue, now)) ?? null;
  const selectedPrice = effectiveTime ? getReservationPrice(catId, effectiveTime) : null;
  const confirmParams = new URLSearchParams({ date: selectedDate.date, time: effectiveTime ?? "" }).toString();

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
            {timeSlots.map((item) => {
              const disabled = isPastTodaySlot(date, item, todayValue, now);

              return (
                <Button
                  key={item}
                  type="button"
                  variant={effectiveTime === item ? "primary" : "secondary"}
                  size="compact"
                  disabled={disabled}
                  onClick={() => setTime(item)}
                  aria-label={disabled ? `${item}已过时` : `选择${item}`}
                  className={cn(
                    "h-auto min-h-14 flex-col gap-0 px-3 py-2",
                    disabled && "border-border bg-muted text-muted-foreground opacity-70"
                  )}
                >
                  <span className="text-sm leading-5">{item}</span>
                  <span className="text-xs font-bold opacity-80">{formatPrice(getReservationPrice(catId, item))}</span>
                </Button>
              );
            })}
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
          <p className="shrink-0 text-2xl font-bold text-foreground">
            {selectedPrice === null ? "--" : formatPrice(selectedPrice)}
          </p>
        </CardContent>
      </Card>
      {effectiveTime ? (
        <Button asChild className="w-full" aria-label={`确认预约${catName}`}>
          <Link href={`/reserve/${catId}/confirm?${confirmParams}`}>确认这段陪伴</Link>
        </Button>
      ) : (
        <Button className="w-full" disabled aria-label="今天暂无可预约时段">
          今天暂无可预约时段
        </Button>
      )}
    </div>
  );
}
