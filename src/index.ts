import {Elysia} from "elysia";
import {getSecretBySlug, createSecret} from "./routers/secret";

const PORT = 8080;

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .get("/secret/:slug", ({set, params: {slug}}) => getSecretBySlug(set, slug))
    .post("/secret", ({set, body}) => createSecret(set, body))
    .listen(PORT);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
