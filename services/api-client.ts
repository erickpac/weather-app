import axios from "axios";
import { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_KEY } from "../config/env.config";

const api = axios.create({
  baseURL: `${EXPO_PUBLIC_API_URL}?appid=${EXPO_PUBLIC_API_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
