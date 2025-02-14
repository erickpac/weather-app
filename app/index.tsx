import {
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useFetchWeather } from "@/hooks/weather/use-fetch-weather";
import { WeatherCard } from "@/components/weather/card";

export default function Index() {
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

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder={t("screens.index.enterCity")}
        style={styles.input}
      />
      <Button
        title={t("screens.index.getWeather")}
        onPress={handleSearch}
        disabled={isLoading || (!debouncedCity && !isError)}
      />

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {isError && error && (
        <Text style={styles.errorText}>{error.message}</Text>
      )}

      {data && <WeatherCard weather={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
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
});
