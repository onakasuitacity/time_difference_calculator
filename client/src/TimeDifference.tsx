import React, { useState, useEffect } from "react";
import { useLocation } from "./Location";

const TimeDifference: React.FC = () => {
  const [ timediff, setTimediff ] = useState<number | null>(null);
  const { hereOffset, setHereOffset, thereOffset, setThereOffset } = useLocation();

  useEffect(() => {
    if(hereOffset && thereOffset) {
      setTimediff(thereOffset.offset - hereOffset.offset);
    } else {
      setTimediff(null);
    }
  }, [hereOffset, thereOffset]);

  return (
    <div className="col-12">
      <p>Time Difference: {timediff != null ? timediff / 3600 + " hours" : ""}</p>
    </div>
  );
};

export default TimeDifference;