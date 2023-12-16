import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT : process.env.PORT || 3000,
  postgresqlSettings: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dbname: process.env.DB_NAME || "schipholflightsdb",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
  },
  APPLICATION_ID: process.env.APPLICATION_ID,
  APPLICATION_KEY: process.env.APPLICATION_KEY,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
} as const;

export default config;
