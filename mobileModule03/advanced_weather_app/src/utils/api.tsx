import { Ionicons } from '@expo/vector-icons';
import { fetchWeatherApi } from 'openmeteo';
import { ReactNode } from 'react';
import { LocationType } from './appContext';

const weatherCode: Record<number, {label: string, icon: (size: number) => ReactNode}> = {
    0: { label: "Clear", icon: (size) => <Ionicons name="sunny-outline" size={size} color='#90D5FF' /> },
    1: { label: "Mainly clear", icon: (size) => <Ionicons name="sunny-outline" size={size} color='#90D5FF' /> },
    2: { label: "Partly cloudy", icon: (size) => <Ionicons name="cloud-outline" size={size} color='#90D5FF' /> },
    3: { label: "Overcast", icon: (size) => <Ionicons name="cloud-outline" size={size} color='#90D5FF' /> },
    45: { label: "Fog", icon: (size) => <Ionicons name="cloud-outline" size={size} color='#90D5FF' /> },
    48: { label: "Rime fog", icon: (size) => <Ionicons name="cloud-outline" size={size} color='#90D5FF' /> },
    51: { label: "Light drizzle", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    53: { label: "Moderate drizzle", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    55: { label: "Heavy drizzle", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    56: { label: "Light freezing drizzle", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    57: { label: "Dense freezing drizzle", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    61: { label: "Light rain", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    63: { label: "Moderate rain", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    65: { label: "Heavy rain", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    66: { label: "Light freezing", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    67: { label: "Heavy freezing", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    71: { label: "Light snow", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    73: { label: "Moderate snow", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    75: { label: "Heavy snow", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    77: { label: "Snow grains", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    80: { label: "Light rain showers", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    81: { label: "Moderate rain showers", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    82: { label: "Violent rain showers", icon: (size) => <Ionicons name="rainy-outline" size={size} color='#90D5FF' /> },
    85: { label: "Light snow showers", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    86: { label: "Heavy snow showers", icon: (size) => <Ionicons name="snow-outline" size={size} color='#90D5FF' /> },
    95: { label: "Thunderstorm", icon: (size) => <Ionicons name="thunderstorm-outline" size={size} color='#90D5FF' /> },
    96: { label: "Thunderstorm + light hail", icon: (size) => <Ionicons name="thunderstorm-outline" size={size} color='#90D5FF' /> },
    99: { label: "Thunderstorm + heavy hail", icon: (size) => <Ionicons name="thunderstorm-outline" size={size} color='#90D5FF' /> },
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
    weather: {label: string, icon: (size: number) => ReactNode},
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
    weather: {label: string, icon: (size: number) => ReactNode},
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
    weather: {label: string, icon: (size: number) => ReactNode},
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
