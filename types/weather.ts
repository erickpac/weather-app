export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface SysInfo {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: SysInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
