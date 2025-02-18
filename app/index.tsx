import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useFetchWeather } from "@/hooks/weather/use-fetch-weather";
import { WeatherButton } from "@/components/weather/button";

export default function Weather() {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [queriedCity, setQueriedCity] = useState("");
  const { data, isLoading, isError, error } = useFetchWeather(queriedCity);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [city]);

  const handleSearch = () => {
    if (!debouncedCity) return;

    setQueriedCity(debouncedCity);
  };

  const weatherIcon = data
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : "";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t("screens.weather.title")}</Text>

        <TextInput
          style={styles.input}
          placeholder={t("screens.weather.enterCityName")}
          placeholderTextColor="#777"
          value={city}
          onChangeText={setCity}
        />

        <WeatherButton
          title={t("screens.weather.getWeather")}
          disabled={!debouncedCity}
          onPress={handleSearch}
        />

        {isLoading && <ActivityIndicator size="small" style={styles.loader} />}

        {isError && error && (
          <Text style={styles.errorMessage}>{error.message}</Text>
        )}

        {data && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{data.name}</Text>
            <Image source={{ uri: weatherIcon }} style={styles.icon} />
            <Text style={styles.temperature}>
              {Math.round(data.main.temp - 273.15)}°C
            </Text>
            <Text style={styles.description}>
              {data.weather[0].description}
            </Text>
            <Text style={styles.wind}>
              {t("screens.weather.windSpeed")} {data.wind.speed} m/s
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(90deg, #0f9b0f 0%, #00b4db 100%)",
  },
  loader: {
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  card: {
    width: "90%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#008000",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 80,
    height: 80,
  },
  temperature: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    marginVertical: 5,
  },
  wind: {
    fontSize: 16,
    color: "red",
  },
});
