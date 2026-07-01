"use client";

import { Button } from "@/components/ui/button";
import { useReservations } from "@/hooks/useCatAppStorage";

interface CancelReservationButtonProps {
  reservationId: string;
  disabled?: boolean;
}

export function CancelReservationButton({ reservationId, disabled }: CancelReservationButtonProps) {
  const { cancelReservation } = useReservations();

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      disabled={disabled}
      onClick={() => cancelReservation(reservationId)}
      aria-label="取消预约"
    >
      {disabled ? "已取消" : "取消预约"}
    </Button>
  );
}
