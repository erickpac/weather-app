import {
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFetchWeather } from "@/hooks/weather/use-fetch-weather";
import { WeatherResponse } from "@/types/weather";

export default function Index() {
  const { t } = useTranslation("screens.index");
  const [city, setCity] = useState("");
  const [queriedCity, setQueriedCity] = useState("");
  const { data, isLoading, isError, error } = useFetchWeather(queriedCity);

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setQueriedCity(trimmedCity);
  };

  const renderWeatherDetails = (weather: WeatherResponse) => {
    const temperature = Math.round(weather.main.temp - 273.15); // Convert to Celsius
    const feelsLike = Math.round(weather.main.feels_like - 273.15);

    return (
      <View style={styles.weatherDetails}>
        <Text style={styles.cityName}>
          {weather.name}, {weather.sys.country}
        </Text>
        <Text style={styles.weatherDescription}>
          {weather.weather[0].description}
        </Text>
        <Text style={styles.tempText}>Temp: {temperature}°C</Text>
        <Text style={styles.feelsLikeText}>Feels like: {feelsLike}°C</Text>
        <Text>
          Min: {Math.round(weather.main.temp_min - 273.15)}°C | Max:{" "}
          {Math.round(weather.main.temp_max - 273.15)}°C
        </Text>
        <Text>Humidity: {weather.main.humidity}%</Text>
        <Text>Pressure: {weather.main.pressure} hPa</Text>
        <Text>Wind Speed: {weather.wind.speed} m/s</Text>
        <Text>Cloudiness: {weather.clouds.all}%</Text>
        <Text>
          Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </Text>
        <Text>
          Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
        style={styles.input}
      />
      <Button title="Get Weather" onPress={handleSearch} />

      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {isError && error && (
        <Text style={styles.errorText}>{error.message}</Text>
      )}

      {data && renderWeatherDetails(data)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  weatherDetails: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  weatherDescription: {
    fontSize: 18,
    color: "#555",
  },
  tempText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  feelsLikeText: {
    fontSize: 18,
    color: "#777",
  },
});
