export type ReservationStatus = "待到店" | "已取消";

export interface ReservationRecord {
  id: string;
  catId: string;
  catName: string;
  date: string;
  time: string;
  price: number;
  status: ReservationStatus;
  note: string;
  createdAt: number;
}
