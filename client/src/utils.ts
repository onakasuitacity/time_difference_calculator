export interface LocationProp {
  lat: number;
  lng: number;
}

export interface CitiesProp {
  [cityname: string]: LocationProp
}

export interface OffsetProp {
  offset: number;
  timezone: string;
}