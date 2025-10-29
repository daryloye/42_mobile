export type LocationType = {
  id: number,
  name: string,
  admin1: string,
  country: string,
}

export async function fetchLocations(query: string): Promise<LocationType[] | null> {
    try {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        } 
        const response_json = await response.json();
        return response_json.results as LocationType[];
    } catch (error) {
        console.error("Error fetching locations:", error);
        return null;
    }
}