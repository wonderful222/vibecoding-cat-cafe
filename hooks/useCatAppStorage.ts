"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReservationRecord } from "@/types/reservation";

const FAVORITES_KEY = "tan-hao-mao:favorites";
const RESERVATIONS_KEY = "tan-hao-mao:reservations";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("tan-hao-mao-storage"));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setFavoriteIds(readJson<string[]>(FAVORITES_KEY, []));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("tan-hao-mao-storage", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("tan-hao-mao-storage", sync);
    };
  }, []);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback(
    (catId: string) => {
      const next = favoriteSet.has(catId)
        ? favoriteIds.filter((id) => id !== catId)
        : [...favoriteIds, catId];
      setFavoriteIds(next);
      writeJson(FAVORITES_KEY, next);
    },
    [favoriteIds, favoriteSet]
  );

  return {
    favoriteIds,
    isFavorite: (catId: string) => favoriteSet.has(catId),
    toggleFavorite
  };
}

export function useReservations() {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);

  useEffect(() => {
    const sync = () => setReservations(readJson<ReservationRecord[]>(RESERVATIONS_KEY, []));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("tan-hao-mao-storage", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("tan-hao-mao-storage", sync);
    };
  }, []);

  const addReservation = useCallback((record: Omit<ReservationRecord, "id" | "createdAt" | "status">) => {
    const current = readJson<ReservationRecord[]>(RESERVATIONS_KEY, []);
    const next: ReservationRecord = {
      ...record,
      id: `r-${Date.now()}`,
      createdAt: Date.now(),
      status: "待到店"
    };
    const updated = [next, ...current];
    setReservations(updated);
    writeJson(RESERVATIONS_KEY, updated);
    return next.id;
  }, []);

  const cancelReservation = useCallback((id: string) => {
    const current = readJson<ReservationRecord[]>(RESERVATIONS_KEY, []);
    const updated = current.map((item) => (item.id === id ? { ...item, status: "已取消" as const } : item));
    setReservations(updated);
    writeJson(RESERVATIONS_KEY, updated);
  }, []);

  return {
    reservations,
    addReservation,
    cancelReservation
  };
}
