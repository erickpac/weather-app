import { AxiosError } from "axios";
import apiClient from "../api-client";
import { fetchWeather } from "./fetch-weather";
import { WeatherResponse } from "../../types/weather";
import { AxiosHeaders } from "axios";

jest.mock("../api-client");

describe("fetchWeather", () => {
  test("should return weather data when API call is successful", async () => {
    const mockData: WeatherResponse = {
      coord: { lon: 0, lat: 0 },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      base: "stations",
      main: {
        temp: 25,
        feels_like: 25,
        temp_min: 20,
        temp_max: 30,
        pressure: 1013,
        humidity: 80,
      },
      visibility: 10000,
      wind: { speed: 1.5, deg: 350 },
      clouds: { all: 0 },
      dt: 1605182400,
      sys: {
        type: 1,
        id: 1414,
        country: "GB",
        sunrise: 1605160800,
        sunset: 1605193200,
      },
      timezone: 0,
      id: 2643743,
      name: "London",
      cod: 200,
    };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchWeather("London");

    expect(result).toEqual(mockData);
    expect(apiClient.get).toHaveBeenCalledWith("/weather", {
      params: { q: "London" },
    });
  });

  test("should throw an error with message when API call fails with AxiosError", async () => {
    const mockError = new AxiosError(
      "Request failed",
      undefined,
      undefined,
      undefined,
      {
        data: { message: "city not found" },
        status: 404,
        statusText: "Not Found",
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
      },
    );
    (apiClient.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchWeather("InvalidCity")).rejects.toThrow(
      "Failed to fetch weather data: city not found",
    );
  });

  test("should throw an error with message when API call fails with generic error", async () => {
    const mockError = new Error("Network Error");
    (apiClient.get as jest.Mock).mockRejectedValue(mockError);

    await expect(fetchWeather("London")).rejects.toThrow(
      "Failed to fetch weather data: Network Error",
    );
  });

  test("should throw an error with unknown message when API call fails with unknown error", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue("Unknown error");

    await expect(fetchWeather("London")).rejects.toThrow(
      "Failed to fetch weather data: Unknown error",
    );
  });
});
