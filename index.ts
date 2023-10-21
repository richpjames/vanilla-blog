import { handler } from "./utils";

Bun.serve({
  fetch: handler,
});
