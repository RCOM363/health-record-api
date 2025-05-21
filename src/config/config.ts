import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  corsOrigin: string;
  databaseUrl: string;
  redisUrl: string;
  rabbitmqUrl: string;
  tokenSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN!,
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,
  rabbitmqUrl: process.env.RABBITMQ_URL!,
  tokenSecret: process.env.TOKEN_SECRET!,
};

export default config;
