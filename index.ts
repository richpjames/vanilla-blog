import { handler } from "./handlers";

Bun.serve({
  fetch: handler,
});
