"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Place } from "@/features/explore/types";
import {
  getSeedPlaces,
  readStoredPlaces,
  writeStoredPlaces,
} from "@/shared/lib/places-storage";

type PlacesContextValue = {
  places: Place[];
  ready: boolean;
  getPlaceById: (id: string) => Place | undefined;
  districts: string[];
  updatePlace: (id: string, patch: Partial<Place>) => void;
  addPlace: (place: Place) => void;
  resetPlaces: () => void;
};

const PlacesContext = createContext<PlacesContextValue | null>(null);

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(() => getSeedPlaces());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const frame = window.requestAnimationFrame(() => {
      if (!active) return;
      const stored = readStoredPlaces();
      if (stored) setPlaces(stored);
      setReady(true);
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStoredPlaces(places);
  }, [places, ready]);

  const getPlaceById = useCallback(
    (id: string) => places.find((place) => place.id === id),
    [places],
  );

  const districts = useMemo(() => {
    return Array.from(new Set(places.map((place) => place.district))).sort(
      (a, b) => a.localeCompare(b),
    );
  }, [places]);

  const updatePlace = useCallback((id: string, patch: Partial<Place>) => {
    setPlaces((current) =>
      current.map((place) => {
        if (place.id !== id) return place;
        return {
          ...place,
          ...patch,
          id: place.id,
          updatedAt: patch.updatedAt ?? new Date().toISOString(),
        };
      }),
    );
  }, []);

  const addPlace = useCallback((place: Place) => {
    setPlaces((current) => {
      if (current.some((item) => item.id === place.id)) {
        return current.map((item) => (item.id === place.id ? place : item));
      }
      return [...current, place];
    });
  }, []);

  const resetPlaces = useCallback(() => {
    const seed = getSeedPlaces();
    setPlaces(seed);
    writeStoredPlaces(seed);
  }, []);

  const value = useMemo(
    () => ({
      places,
      ready,
      getPlaceById,
      districts,
      updatePlace,
      addPlace,
      resetPlaces,
    }),
    [
      places,
      ready,
      getPlaceById,
      districts,
      updatePlace,
      addPlace,
      resetPlaces,
    ],
  );

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}

export function usePlaces() {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error("usePlaces must be used within PlacesProvider");
  }
  return context;
}
