import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useApp } from "./App";

const MapController: React.FC = () => {
  const map = useMap();
  const { hereLocation, setHereLocation, thereLocation, setThereLocation } = useApp();

  const createCustomIcon = (color: string) => {
    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };
  
  const redIcon = createCustomIcon("red");
  const blueIcon = createCustomIcon("blue");

  useEffect(() => {
    if (hereLocation) {
      const marker = L.marker([hereLocation["lat"], hereLocation["lng"]], { icon: redIcon }).addTo(map);
      return () => { marker.remove(); };
    }
  }, [hereLocation]);

  useEffect(() => {
    if (thereLocation) {
      const marker = L.marker([thereLocation["lat"], thereLocation["lng"]], { icon: blueIcon }).addTo(map);
      return () => { marker.remove(); };
    }
  }, [thereLocation]);

  return null;
};

const Map: React.FC = () => {
  return (
    <div className="row mt-5">
      <MapContainer center={[0, 0]} zoom={1} style={{ height: "400px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController />
      </MapContainer>
    </div>
  );
};

export default Map;
