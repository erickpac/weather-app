import { AxiosError } from "axios";
import apiClient from "../api-client";
import { WeatherResponse } from "@/types/weather";

/**
 * Asynchronously fetches weather information for the specified city using the API client.
 *
 * @param {string} city - The city's name to fetch the weather data for.
 * @returns {Promise<WeatherResponse>} - A Promise that resolves to the weather data.
 * @throws Will throw an error if the HTTP request fails.
 */
export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    const { data } = await apiClient.get<WeatherResponse>("/weather", {
      params: { q: city },
    });

    return data;
  } catch (error) {
    let message = error instanceof Error ? error.message : "Unknown error";

    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }

    throw new Error(`Failed to fetch weather data: ${message}`);
  }
};
