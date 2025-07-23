import {BASE_URL} from "./constants.js";
const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchWeather(endpoint, params) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    params.appid = API_KEY;
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    );

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
}

export async function getCurrentWeather({ city, lat, lon, units = 'metric' }) {
    const params = { units };
    if (city) {
        params.q = city;
    } else if (lat !== undefined && lon !== undefined) {
        params.lat = lat;
        params.lon = lon;
    } else {
        throw new Error('Нужно указать либо город, либо координаты');
    }
    return fetchWeather('weather', params);
}

export async function get5DayForecast({ city, units = 'metric' }) {
    return fetchWeather('forecast', { q: city, units });
}
