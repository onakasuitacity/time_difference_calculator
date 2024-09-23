import React, { useState, createContext, useContext } from "react";
import { OffsetProp } from "./utils";
import Area from "./Area";
import TimeDifference from "./TimeDifference";

interface LocationContextType {
  hereOffset: OffsetProp | null;
  setHereOffset: React.Dispatch<React.SetStateAction<OffsetProp | null>>;
  thereOffset: OffsetProp | null;
  setThereOffset: React.Dispatch<React.SetStateAction<OffsetProp | null>>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const LocationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [hereOffset, setHereOffset] = useState<OffsetProp | null>(null);
  const [thereOffset, setThereOffset] = useState<OffsetProp | null>(null);
  
  return (
    <LocationContext.Provider value={{ hereOffset, setHereOffset, thereOffset, setThereOffset }}>
      { children }
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

const Location: React.FC = () => {
  return (
    <div className="row">
      <LocationProvider>
        <Area isHere={true} />
        <Area isHere={false} />
        <TimeDifference />
      </LocationProvider>
    </div>
  );
}

export default Location;