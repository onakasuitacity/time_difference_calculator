"use server";

const ENV = process.env.NODE_ENV;
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

export type CitySearchResult = {
  [key: string]: {
    lat: number;
    lng: number;
  };
};

// Search City Action
export async function searchCity(query: string): Promise<CitySearchResult> {
  if (query.length < 2) {
    return {};
  }

  if (ENV === "production") {
    const url = `http://api.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(query)}&featureClass=P&maxRows=5&username=${GEONAMES_USERNAME}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch from Geonames API");
    }

    const data = (await res.json()) as any;
    const response: CitySearchResult = {};

    for (const item of data.geonames) {
      const key = `${item.name}, ${item.countryName}`;
      if (key in response) {
        continue;
      }
      response[key] = {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
      };
    }

    return response;
  } else {
    // Development mock data
    if (query.toLowerCase().startsWith("to")) {
      return {
        "Tokyo, Japan": {
          lat: 35.6895,
          lng: 139.19171,
        },
        "Tokyojito-ri, South Korea": {
          lat: 34.23806,
          lng: 125.93944,
        },
      };
    } else if (query.toLowerCase().startsWith("lo")) {
      return {
        "London, United Kingdom": {
          lat: 51.50853,
          lng: -0.12574,
        },
        "London, Canada": {
          lat: 42.98339,
          lng: -81.23304,
        },
      };
    } else {
      throw new Error("Geonames API - No mock data for this query");
    }
  }
}