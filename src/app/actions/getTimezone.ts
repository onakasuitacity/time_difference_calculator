"use server";

import { OffsetProp } from "@/lib/utils";

const ENV = process.env.NODE_ENV;
const TIMEZONE_DB_API_KEY = process.env.TIMEZONE_DB_API_KEY;

// Get Timezone Action
export async function getTimezone(lat: number, lng: number) {
  if (ENV === "production") {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_DB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch from TimezoneDB API");
    }

    const data = (await res.json()) as any;

    return {
      offset: data.gmtOffset,
      timezone: data.zoneName,
    } as OffsetProp;
  } else {
    // Development mock data
    if (lat > 35 && lat < 36 && lng > 139 && lng < 140) {
      return {
        offset: 32400,
        timezone: "Asia/Tokyo",
      };
    } else if (lat > 34 && lat < 35 && lng > 125 && lng < 126) {
      return {
        offset: 32400,
        timezone: "Asia/Tokyo",
      };
    } else if (lat > 51 && lat < 52 && lng > -1 && lng < 0) {
      return {
        offset: 3600,
        timezone: "Europe/London",
      };
    } else if (lat > 42 && lat < 43 && lng > -82 && lng < -81) {
      return {
        offset: -14400,
        timezone: "America/Toronto",
      };
    } else {
      throw new Error("TimezoneDB API - No mock data for this location");
    }
  }
}