export const timeSlots = ["10:30", "11:30", "14:00", "15:30", "17:00"];

export const reservationDates = [
  { value: "today", label: "今天", date: "6月30日" },
  { value: "tomorrow", label: "明天", date: "7月1日" },
  { value: "friday", label: "周五", date: "7月3日" }
];

export const catBasePrices: Record<string, number> = {
  nuomi: 68,
  xueqiu: 78,
  lizi: 88,
  naihuang: 72
};

export const timePriceAdjustments: Record<string, number> = {
  "10:30": 0,
  "11:30": 8,
  "14:00": 12,
  "15:30": 18,
  "17:00": 28
};

export function getReservationPrice(catId: string, time: string) {
  return (catBasePrices[catId] ?? 68) + (timePriceAdjustments[time] ?? 0);
}

export function formatPrice(price: number) {
  return `¥${price}`;
}
