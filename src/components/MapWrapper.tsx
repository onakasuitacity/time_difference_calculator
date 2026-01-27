// components/MapWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="row mt-5">
      <div style={{ height: "400px", width: "100%", background: "#e0e0e0" }}>
        Loading map...
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  return <Map />;
}