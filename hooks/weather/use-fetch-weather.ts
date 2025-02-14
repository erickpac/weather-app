import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/services/weather/fetch-weather";

/**
 * Custom hook to fetch weather data for a given city.
 *
 * @param {string} city - The name of the city for which to fetch weather data.
 * @returns {Object} An object containing the weather data, loading status, error status, and error details.
 */
export const useFetchWeather = (city: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });

  return { data, isLoading, isError, error };
};
