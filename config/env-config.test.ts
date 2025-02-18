import { envSchema } from "./env.config";

describe("envSchema", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("should validate correct environment variables", () => {
    process.env.EXPO_PUBLIC_API_URL = "https://api.example.com";
    process.env.EXPO_PUBLIC_API_KEY = "12345";

    const { success, error } = envSchema.safeParse(process.env);

    expect(success).toBe(true);
    expect(error).toBeUndefined();
  });

  test("should invalidate empty API URL", () => {
    process.env.EXPO_PUBLIC_API_URL = "";
    process.env.EXPO_PUBLIC_API_KEY = "12345";

    const { success, error } = envSchema.safeParse(process.env);

    expect(success).toBe(false);
    expect(error?.format().EXPO_PUBLIC_API_URL?._errors).toContain(
      "API URL must be not empty",
    );
  });

  test("should invalidate empty API KEY", () => {
    process.env.EXPO_PUBLIC_API_URL = "https://api.example.com";
    process.env.EXPO_PUBLIC_API_KEY = "";

    const { success, error } = envSchema.safeParse(process.env);

    expect(success).toBe(false);
    expect(error?.format().EXPO_PUBLIC_API_KEY?._errors).toContain(
      "API KEY must be not empty",
    );
  });

  test("should invalidate missing environment variables", () => {
    process.env.EXPO_PUBLIC_API_URL = undefined;
    process.env.EXPO_PUBLIC_API_KEY = undefined;

    const { success, error } = envSchema.safeParse(process.env);

    expect(success).toBe(false);
    expect(error?.format().EXPO_PUBLIC_API_URL?._errors).toContain("Required");
    expect(error?.format().EXPO_PUBLIC_API_KEY?._errors).toContain("Required");
  });
});
