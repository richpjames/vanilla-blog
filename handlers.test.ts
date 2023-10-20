import { it, expect, describe } from "bun:test";
import { handler } from "./handlers";

describe("handler", () => {
  it("returns a response", async () => {
    expect(handler("" as unknown as Request)).toEqual(new Response("Bun!"));
  });

  it("sets the correct headers", async () => {
    const result = new Response("Bun!");
    result.headers.set("Content-Type", "text/html");

    expect(handler("" as unknown as Request).headers.count).toEqual(
      result.headers.count
    );
    expect(
      handler("" as unknown as Request).headers.get("Content-Type")
    ).toEqual(result.headers.get("Content-Type"));
  });
  // read a file from the filesystem
});
