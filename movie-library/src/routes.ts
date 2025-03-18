import { Elysia } from "elysia";

export const routes = new Elysia()
  .get("/", () => ({
    message: "Добро пожаловать в Movie Library!"
  }))
  .get("/api/health", () => ({
    status: "OK",
    timestamp: new Date().toISOString()
  }));