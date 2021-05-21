import { config } from "dotenv";

config({ path: "../.env.local" });

export const {
  SECURE_CONNECT_PATH = "",
  CLIENT_ID = "secret",
  CLIENT_SECRET = "secret",
  GOOGLE_APPLICATION_CREDENTIALS = "",
  NEXT_PUBLIC_FIREBASE_DATABASE_URL = "",
} = process.env;
