import { LocationType } from './appContext';

export async function fetchLocations(query: string): Promise<LocationType[] | null> {
    try {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query);
        if (!response.ok) {
            throw new Error(`Erorr fetching for query ${query}: ${response.status}`);
        } 
        const response_json = await response.json();
        return response_json.results as LocationType[];
    } catch (error) {
        console.error("Error fetching locations:", error);
        return null;
    }
}