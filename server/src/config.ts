import { config } from "dotenv";

config({ path: ".env.local" });

export const {
  SECURE_CONNECT_PATH = "",
  CLIENT_ID = "secret",
  CLIENT_SECRET = "secret",
} = process.env;
