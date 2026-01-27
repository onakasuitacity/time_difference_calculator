import { useEffect, useRef, useCallback } from "react";
import { CitiesProp } from "@/lib/utils"
import Awesomplete from "awesomplete";
import "awesomplete/awesomplete.css";
import { useApp } from "@/app/page";
import { useLocation } from "./Location";
import { searchCity } from "@/app/actions/searchCity";
import { getTimezone } from "@/app/actions/getTimezone";

export default function AutoCompleteInput({ isHere }: { isHere: boolean }) {
  const awesompleteRef = useRef<Awesomplete | null>(null);
  const suggestionsRef = useRef<CitiesProp>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { setHereLocation, setThereLocation } = useApp();
  const { setHereOffset, setThereOffset } = useLocation();

  const onInput = useCallback((query: string) => {
    debounceTimer.current && clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      const cities = await searchCity(query);
      suggestionsRef.current = cities;
      awesompleteRef.current && (awesompleteRef.current.list = Object.keys(suggestionsRef.current));
    }, 500);
  }, []);

  const onComplete = useCallback((city: string) => {
    // location
    const location = suggestionsRef.current[city];
    (isHere ? setHereLocation : setThereLocation)(location);
    // offset
    getTimezone(location["lat"], location["lng"])
      .then(data => (isHere ? setHereOffset : setThereOffset)(data));
  }, [isHere, setHereLocation, setThereLocation, setHereOffset, setThereOffset]);

  useEffect(() => {
    if (!inputRef.current) return;
    const inputEl = inputRef.current;
    awesompleteRef.current = new Awesomplete(inputEl, {
      list: [],
      minChars: 2,
      autoFirst: true,
      filter: Awesomplete.FILTER_STARTSWITH,
    });

    const handleInput = () => { onInput(inputEl.value); };
    const handleSelectComplete = () => { onComplete(inputEl.value); };

    inputEl.addEventListener("input", handleInput);
    inputEl.addEventListener("awesomplete-selectcomplete", handleSelectComplete);

    return () => {
      inputEl.removeEventListener("input", handleInput);
      inputEl.removeEventListener("awesomplete-selectcomplete", handleSelectComplete);
      awesompleteRef.current?.destroy();
    };
  }, [onInput, onComplete]);

  return <input type="text" ref={inputRef} className="awesomplete" />;
};