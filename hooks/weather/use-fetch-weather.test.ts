import { renderHook } from "@testing-library/react-hooks";
import { useQuery } from "@tanstack/react-query";
import { useFetchWeather } from "./use-fetch-weather";

// filepath: /Users/erickpac/Desktop/weather-app/hooks/weather/use-fetch-weather.test.ts

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/weather/fetch-weather");

describe("useFetchWeather", () => {
  it("should return weather data when city is provided", async () => {
    const mockData = { temp: 25 };
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useFetchWeather("London"));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should return error when there is an error fetching data", async () => {
    const mockError = new Error("Failed to fetch");
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
    });

    const { result } = renderHook(() => useFetchWeather("London"));

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
  });

  it("should not fetch data when city is not provided", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useFetchWeather(""));

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
