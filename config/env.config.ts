import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().nonempty("API URL must be not empty"),
  EXPO_PUBLIC_API_KEY: z.string().nonempty("API KEY must be not empty"),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Invalid environment variables:", error.format());
  process.exit(1);
}

export const { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_KEY } = data;
