"use client";

import React, { useState, createContext, useContext } from "react";
import { LocationProp } from "@/lib/utils";
import Location from "@/components/Location";
import Map from "@/components/MapWrapper";

const AppContext = createContext<{
	hereLocation: LocationProp | null;
	setHereLocation: React.Dispatch<React.SetStateAction<LocationProp | null>>;
	thereLocation: LocationProp | null;
	setThereLocation: React.Dispatch<React.SetStateAction<LocationProp | null>>;
} | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
	const [hereLocation, setHereLocation] = useState<LocationProp | null>(null);
	const [thereLocation, setThereLocation] = useState<LocationProp | null>(null);

	return (
		<AppContext.Provider value={{ hereLocation, setHereLocation, thereLocation, setThereLocation }}>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useApp must be used within the Provider.");
	}
	return context;
}

export default function App() {
	return (
		<AppProvider>
			<div className="container">
				<div className="row">
					<h1 className="mt-3">Time Difference Calculator</h1>
				</div>
				<Location />
				<Map />
				<footer style={{ textAlign: "center", marginTop: "20px" }}>
					GitHub: <a href="https://github.com/g-ogaki/time-difference-calculator">g-ogaki/time-difference-calculator</a>
				</footer>
			</div>
		</AppProvider>
	);
}