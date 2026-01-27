// import Clock from "@/components/Clock";
import Clock from "@/components/Clock";
import dynamic from "next/dynamic";

const AutoCompleteInput = dynamic(() => import("@/components/AutoCompleteInput"), { ssr: false });

function Area({ isHere }: { isHere: boolean }) {
  return (
    <div id={isHere ? "here" : "there"} className="col-12 col-sm-6">
      <h2 className="my-3">{isHere ? "Your Location" : "Your Destination"}</h2>
      <AutoCompleteInput isHere={isHere} />
      <Clock isHere={isHere} />
    </div>
  );
}

export default Area;