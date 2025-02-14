import { View, Text, StyleSheet } from "react-native";
import { WeatherResponse } from "@/types/weather";
import { useTranslation } from "react-i18next";

type WeatherCardProps = {
  weather: WeatherResponse;
};

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { t } = useTranslation();
  const { description } = weather.weather[0];
  const { name } = weather;
  const { temp, feels_like, temp_max, temp_min, humidity, pressure } =
    weather.main;
  const { speed } = weather.wind;
  const { all: cloudiness } = weather.clouds;
  const { sunrise, sunset, country } = weather.sys;
  const temperature = Math.round(temp - 273.15); // Convert to Celsius
  const feelsLike = Math.round(feels_like - 273.15);

  return (
    <View style={styles.weatherDetails}>
      <Text style={styles.cityName}>
        {name}, {country}
      </Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.tempText}>
        {t("screens.index.temp")} {temperature}°C
      </Text>
      <Text>
        {t("screens.index.feelsLike")} {feelsLike}°C
      </Text>
      <Text>
        {t("screens.index.min")} {Math.round(temp_min - 273.15)}°C |{" "}
        {t("screens.index.max")} {Math.round(temp_max - 273.15)}
        °C
      </Text>
      <Text>
        {t("screens.index.humidity")} {humidity}%
      </Text>
      <Text>
        {t("screens.index.pressure")} {pressure} hPa
      </Text>
      <Text>
        {t("screens.index.windSpeed")} {speed} m/s
      </Text>
      <Text>
        {t("screens.index.cloudiness")} {cloudiness}%
      </Text>
      <Text>
        {t("screens.index.sunrise")}{" "}
        {new Date(sunrise * 1000).toLocaleTimeString()}
      </Text>
      <Text>
        {t("screens.index.sunset")}{" "}
        {new Date(sunset * 1000).toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
