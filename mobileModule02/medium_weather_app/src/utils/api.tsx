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

export async function fetchApiLocations(query: string): Promise<LocationType[] | null> {
    try {
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + query);
        const response_json = await response.json();
        if (response_json.results) {
            return response_json.results.map((item: any): LocationType => ({
                id: item.id,
                city: item.name,
                region: item.admin1,
                country: item.country,
                latitude: item.latitude,
                longitude: item.longitude,
            }));
        } else {
            return null;
        }
    } catch {
        throw new Error('The service connection is lost, please check your internet connection or try again later');
    }
}

// Current
export type CurrentWeatherType = {
    temperature: number,
    weather: string,
    wind_speed: number,
}

export async function fetchCurrentWeather(location: LocationType): Promise<CurrentWeatherType> {
    try {
        const params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "current": ["temperature_2m", "weather_code", "wind_speed_10m"],
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];
        const current = response.current()!;

        const data: CurrentWeatherType = {
            temperature: current.variables(0)!.value(),
            weather: weatherCode[current.variables(1)!.value()],
            wind_speed: current.variables(2)!.value(),
        };

        return data;
    } catch {
        throw new Error('The service connection is lost, please check your internet connection or try again later');
    }
}

// Today
export type TodayWeatherType = {
    time: string,
    temperature: number,
    weather: string,
    wind_speed: number,
}

export async function fetchTodayWeather(location: LocationType): Promise<TodayWeatherType[]> {
    try {
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
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, // length of array
            (_, i) => {
                const date = new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                return date.toISOString().substring(11, 16);   // format in HH:MM
            }
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
    } catch {
        throw new Error('The service connection is lost, please check your internet connection or try again later');
    }
}

// Weekly
export type WeeklyWeatherType = {
    date: string,
    min_temperature: number,
    max_temperature: number,
    weather: string,
}

function createDate(dayOffset: number): string {
    const date: Date = new Date();
    date.setDate(date.getDate() + dayOffset);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const month_str = (month < 10) ? `0${month}` : `${month}`;
    const day_str = (day < 10) ? `0${day}` : `${day}`;

    return `${year}-${month_str}-${day_str}`;
}

export async function fetchWeeklyWeather(location: LocationType): Promise<WeeklyWeatherType[]> {
    try {
        const params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "daily": ["temperature_2m_max", "temperature_2m_min", "weather_code"],
            "timezone": "auto",
            "start_date": createDate(0),
            "end_date": createDate(6),
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const daily = response.daily()!;

        const dates = Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, // length of array
            (_, i) => {
                const date = new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                return date.toISOString().substring(0, 10);
            }
        );
        const max_temperatures = daily.variables(0)!.valuesArray();
        const min_temperatures = daily.variables(1)!.valuesArray();
        const weather_codes = daily.variables(2)!.valuesArray();

        const data: WeeklyWeatherType[] = dates.map((t, i) => ({
            date: t.toString(),
            max_temperature: max_temperatures![i],
            min_temperature: min_temperatures![i],
            weather: weatherCode[weather_codes![i]],
        }));

        return data;
    } catch {
        throw new Error('The service connection is lost, please check your internet connection or try again later');
    }
}
