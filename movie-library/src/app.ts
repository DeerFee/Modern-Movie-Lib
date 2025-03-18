import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';
import { routes } from "./routes";
import type { BunFile } from "bun";

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'public',
    prefix: '/'
  }))
  .get("/", () => Bun.file("public/index.html"))
  .use(routes)
  .listen(3000);

console.log(
  `🦊 Сервер запущен на http://${app.server?.hostname}:${app.server?.port}`
);