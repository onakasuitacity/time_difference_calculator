import React from "react";
import Clock from "./Clock";
import AutoCompleteInput from "./AutoCompleteInput";

const Area: React.FC<{isHere: boolean}> = ({ isHere }) => {
  return (
    <div id={isHere ? "here" : "there"} className="col-12 col-sm-6">
      <h2 className="my-3">{isHere ? "Your Location" : "Your Destination"}</h2>
      <AutoCompleteInput isHere={isHere} />
      <Clock isHere={isHere} />
    </div>
  );
}

export default Area;