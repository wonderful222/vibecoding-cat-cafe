"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReservationRecord } from "@/types/reservation";

const FAVORITES_KEY = "yue-hao-mao:favorites";
const RESERVATIONS_KEY = "yue-hao-mao:reservations";
const LEGACY_FAVORITES_KEY = "tan-hao-mao:favorites";
const LEGACY_RESERVATIONS_KEY = "tan-hao-mao:reservations";
const STORAGE_EVENT = "yue-hao-mao-storage";

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
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function migrateJson<T>(key: string, legacyKey: string, fallback: T): T {
  const current = readJson<T | null>(key, null);
  if (current !== null) {
    return current;
  }

  const legacy = readJson<T | null>(legacyKey, null);
  if (legacy !== null) {
    window.localStorage.setItem(key, JSON.stringify(legacy));
    return legacy;
  }

  return fallback;
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setFavoriteIds(migrateJson<string[]>(FAVORITES_KEY, LEGACY_FAVORITES_KEY, []));
      setIsReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(STORAGE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(STORAGE_EVENT, sync);
    };
  }, []);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback(
    (catId: string) => {
      const next = favoriteSet.has(catId) ? favoriteIds.filter((id) => id !== catId) : [...favoriteIds, catId];
      setFavoriteIds(next);
      writeJson(FAVORITES_KEY, next);
    },
    [favoriteIds, favoriteSet]
  );

  return {
    favoriteIds,
    isReady,
    isFavorite: (catId: string) => favoriteSet.has(catId),
    toggleFavorite
  };
}

export function useReservations() {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setReservations(migrateJson<ReservationRecord[]>(RESERVATIONS_KEY, LEGACY_RESERVATIONS_KEY, []));
      setIsReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(STORAGE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(STORAGE_EVENT, sync);
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
    isReady,
    addReservation,
    cancelReservation
  };
}
