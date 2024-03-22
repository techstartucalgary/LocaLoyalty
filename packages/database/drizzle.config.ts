import "dotenv/config";
import type {Config} from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
  },
} satisfies Config;