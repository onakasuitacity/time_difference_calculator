import React, { useState, createContext, useContext } from "react";
import { LocationProp } from "./utils";
import Location from "./Location";
import Map from "./Map";

export interface AppContextType {
  hereLocation: LocationProp | null;
  setHereLocation: React.Dispatch<React.SetStateAction<LocationProp | null>>;
  thereLocation: LocationProp | null;
  setThereLocation: React.Dispatch<React.SetStateAction<LocationProp | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [hereLocation, setHereLocation] = useState<LocationProp | null>(null);
  const [thereLocation, setThereLocation] = useState<LocationProp | null>(null);

  return (
    <AppContext.Provider value={{ hereLocation, setHereLocation, thereLocation, setThereLocation }}>
      { children }
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within the Provider.");
  }
  return context;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Time Difference Calculator</h1>
        </div>
        <Location />
        <Map />
      </div>
    </AppProvider>
  );
};

export default App;