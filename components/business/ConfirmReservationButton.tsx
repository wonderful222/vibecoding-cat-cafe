"use client";

import { Link } from "@/components/common/AppLink";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReservations } from "@/hooks/useCatAppStorage";

interface ConfirmReservationButtonProps {
  catId: string;
  catName: string;
  date: string;
  time: string;
  price: number;
  note: string;
}

export function ConfirmReservationButton({ catId, catName, date, time, price, note }: ConfirmReservationButtonProps) {
  const { addReservation } = useReservations();
  const successParams = new URLSearchParams({ date, time, price: String(price) }).toString();

  return (
    <Button asChild className="w-full" aria-label="提交预约">
      <Link
        href={`/reserve/${catId}/success?${successParams}`}
        onClick={() =>
          addReservation({
            catId,
            catName,
            date,
            time,
            price,
            note
          })
        }
      >
        <Check className="h-4 w-4" />
        确认预约
      </Link>
    </Button>
  );
}
