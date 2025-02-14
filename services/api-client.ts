import axios from "axios";
import { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_KEY } from "@/config/env.config";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    appid: EXPO_PUBLIC_API_KEY,
  },
});

export default api;
