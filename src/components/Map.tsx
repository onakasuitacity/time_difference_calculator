// components/Map.tsx
"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useApp } from "@/app/page";

function createCustomIcon(color: string) {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

const redIcon = createCustomIcon("red");
const blueIcon = createCustomIcon("blue");

export default function Map() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { hereLocation, thereLocation } = useApp();

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 1);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle hereLocation marker
  useEffect(() => {
    if (mapRef.current && hereLocation) {
      const marker = L.marker([hereLocation.lat, hereLocation.lng], { icon: redIcon }).addTo(mapRef.current);
      return () => { marker.remove(); };
    }
  }, [hereLocation]);

  // Handle thereLocation marker
  useEffect(() => {
    if (mapRef.current && thereLocation) {
      const marker = L.marker([thereLocation.lat, thereLocation.lng], { icon: blueIcon }).addTo(mapRef.current);
      return () => { marker.remove(); };
    }
  }, [thereLocation]);

  return (
    <div className="row mt-5">
      <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
    </div>
  );
}