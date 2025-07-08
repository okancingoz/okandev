declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    DATABASE_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
