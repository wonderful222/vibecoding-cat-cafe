"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { CatProfile } from "@/types/cat";
import { Button } from "@/components/ui/button";
import { formatPrice, getReservationPrice, timeSlots } from "@/data/reservations";
import { useReservations } from "@/hooks/useCatAppStorage";
import { cn } from "@/lib/utils";

interface ReservationSheetProps {
  cat: CatProfile;
  open: boolean;
  onClose: () => void;
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
  return `${date.getUTCMonth() + 1}.${date.getUTCDate()}`;
}

function createBeijingDateOptions(): ReservationDateOption[] {
  const now = getBeijingNow();
  const baseTime = Date.UTC(now.year, now.month - 1, now.day);
  const labels = ["今天", "明天", "后天"];

  return labels.map((label, index) => {
    const date = new Date(baseTime + index * 24 * 60 * 60 * 1000);
    const value = formatDateValue(date);

    return { value, label, date: value };
  });
}

function isPastTodaySlot(dateValue: string, slot: string, todayValue: string, now: ReturnType<typeof getBeijingNow>) {
  if (dateValue !== todayValue) {
    return false;
  }

  const [hour, minute] = slot.split(":").map(Number);
  return hour * 60 + minute <= now.hour * 60 + now.minute;
}

function UiIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`
      }}
    />
  );
}

function GenderPaw({ gender, size = 22 }: { gender: string; size?: number }) {
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

export function ReservationSheet({ cat, open, onClose }: ReservationSheetProps) {
  const router = useRouter();
  const { addReservation } = useReservations();
  const now = getBeijingNow();
  const reservationDates = createBeijingDateOptions();
  const todayValue = reservationDates[0].value;
  const [date, setDate] = useState(reservationDates[0].value);
  const [time, setTime] = useState<string | null>(() => {
    return timeSlots.find((slot) => !isPastTodaySlot(reservationDates[0].value, slot, todayValue, now)) ?? null;
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const selectedDate = reservationDates.find((item) => item.value === date) ?? reservationDates[0];
  const effectiveTime =
    time && !isPastTodaySlot(date, time, todayValue, now)
      ? time
      : timeSlots.find((slot) => !isPastTodaySlot(date, slot, todayValue, now)) ?? null;
  const selectedPrice = effectiveTime ? getReservationPrice(cat.id, effectiveTime) : null;

  const confirmReservation = () => {
    if (!effectiveTime || selectedPrice === null) {
      return;
    }

    addReservation({
      catId: cat.id,
      catName: cat.name,
      date: selectedDate.date,
      time: effectiveTime,
      price: selectedPrice,
      note: cat.gentleTip
    });

    const params = new URLSearchParams({
      date: selectedDate.date,
      time: effectiveTime,
      price: String(selectedPrice)
    }).toString();

    router.push(`/reserve/${cat.id}/success?${params}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20">
      <button type="button" aria-label="关闭选择时间" className="absolute inset-0 h-full w-full" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[390px]">
        <section className="relative max-h-[calc(100dvh-18px)] overflow-y-auto rounded-t-[24px] bg-background px-5 pb-5 pt-5 shadow-[0_-10px_28px_rgba(58,58,58,0.06)]">
          <div className="relative flex h-10 items-center justify-center">
            <button
              type="button"
              onClick={onClose}
              aria-label="返回猫咪详情"
              className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-card text-foreground shadow-card ring-1 ring-border/70 transition duration-150 active:scale-[0.96]"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} />
            </button>
            <h2 className="text-[20px] font-medium leading-7 text-foreground">选择时间</h2>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] bg-muted">
              <Image src={cat.image} alt={`${cat.name}照片`} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[22px] font-semibold leading-[30px] text-foreground">{cat.name}</h3>
                <span className="text-[14px] leading-5 text-muted-foreground">
                  {cat.age} · {cat.gender}
                </span>
                <GenderPaw gender={cat.gender} />
              </div>
              <p className="mt-3 inline-flex max-w-full rounded-[16px] bg-accent px-4 py-2 text-[14px] leading-5 text-primary-strong">
                {cat.bestFor}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <UiIcon src="/images/ui/date.svg" className="h-5 w-5 text-primary-strong" />
              <span className="text-[16px] font-medium leading-6 text-foreground">日期</span>
              <span className="text-[12px] leading-4 text-muted-foreground">看看哪天有空来玩~</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {reservationDates.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setDate(item.value);
                    const nextTime = timeSlots.find((slot) => !isPastTodaySlot(item.value, slot, todayValue, now)) ?? null;
                    setTime((current) =>
                      current && !isPastTodaySlot(item.value, current, todayValue, now) ? current : nextTime
                    );
                  }}
                  className={cn(
                    "flex h-12 flex-col items-center justify-center rounded-[16px] border text-[14px] leading-5 transition active:scale-[0.98]",
                    date === item.value
                      ? "border-primary bg-primary font-semibold text-foreground"
                      : "border-border bg-card font-medium text-foreground"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-[12px] font-normal leading-4 opacity-80">{item.date}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <UiIcon src="/images/ui/time.svg" className="h-5 w-5 text-primary-strong" />
              <span className="text-[16px] font-medium leading-6 text-foreground">时间</span>
              <span className="text-[12px] leading-4 text-muted-foreground">不同时段价格不同哦~</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {timeSlots.map((item) => {
                const disabled = isPastTodaySlot(date, item, todayValue, now);

                return (
                  <button
                    key={item}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTime(item)}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center rounded-[16px] border text-[14px] leading-5 transition active:scale-[0.98]",
                      effectiveTime === item && !disabled
                        ? "border-primary bg-primary font-semibold text-foreground"
                        : "border-border bg-card font-medium text-foreground",
                      disabled && "bg-muted text-placeholder opacity-70"
                    )}
                  >
                    <span>{item}</span>
                    <span className="text-[12px] font-normal leading-4 opacity-80">{formatPrice(getReservationPrice(cat.id, item))}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-[24px] bg-accent p-4">
            <div className="flex items-center gap-3">
              <Image src="/images/ui/price-ticket.svg" alt="" aria-hidden="true" width={44} height={44} />
              <div>
                <p className="text-[16px] font-medium leading-6 text-foreground">合计费用</p>
                <p className="mt-1 text-[12px] leading-4 text-primary-strong">含预约时段席位</p>
              </div>
            </div>
            <p className="shrink-0 text-[22px] font-semibold leading-[30px] text-foreground">
              {selectedPrice === null ? "--" : formatPrice(selectedPrice)}
            </p>
          </div>

          <Button className="mt-8 w-full" disabled={!effectiveTime} onClick={confirmReservation}>
            确认预约
          </Button>
        </section>
      </div>
    </div>
  );
}
