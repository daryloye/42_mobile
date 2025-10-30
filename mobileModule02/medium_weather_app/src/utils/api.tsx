import { fetchWeatherApi } from 'openmeteo';
import { LocationType } from './appContext';

const weatherCode: Record<number, string> = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm + light hail",
    99: "Thunderstorm + heavy hail",
};

export async function fetchLocations(query: string): Promise<LocationType[] | null> {
    try {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query);
        if (!response.ok) {
            throw new Error(`Erorr fetching for query ${query}: ${response.status}`);
        } 
        const response_json = await response.json();
        if (response_json.results) {
            return response_json.results.map((item: any): LocationType => ({
                city: item.name,
                region: item.admin1,
                country: item.country,
                latitude: item.latitude,
                longitude: item.longitude,
            }))
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching locations:", error);
        return null;
    }
}

// Current
export type CurrentWeatherType = {
    temperature: number,
    weather: string,
    wind_speed: number,
}

export async function fetchCurrentWeather(location: LocationType): Promise<CurrentWeatherType> {
    const params = {
        "latitude": location.latitude,
        "longitude": location.longitude,
        "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const current = responses[0].current()!;

    const data: CurrentWeatherType = {
        temperature: current.variables(0)!.value(),
        weather: weatherCode[current.variables(1)!.value()],
        wind_speed: current.variables(2)!.value(),
    };

    return data;
}

// Today
export type TodayWeatherType = {
    time: string,
    temperature: number,
    weather: string,
    wind_speed: number,
}

export async function fetchTodayWeather(location: LocationType) {
    const params = {
        "latitude": location.latitude,
        "longitude": location.longitude,
        "hourly": ["", "temperature_2m", "weather_code", "wind_speed_10m"],
        "timezone": "auto",
        "forecast_days": 1,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    const times = Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    );
    const temperatures = hourly.variables(0)!.valuesArray();
    const weather_codes = hourly.variables(1)!.valuesArray();
    const wind_speeds = hourly.variables(2)!.valuesArray();

    const data: TodayWeatherType[] = times.map((t, i) => ({
        time: t.toString(),
        temperature: temperatures![i],
        weather: weatherCode[weather_codes![i]],
        wind_speed: wind_speeds![i],
    }));

    return data;
}