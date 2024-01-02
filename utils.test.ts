import { it, expect, describe, mock } from "bun:test";
import { handler, qualifiedUrl, view } from "./utils";

const url = "http://url.com";

Bun.file = mock(() => ({ text: async () => "test" } as any));

describe("handler", () => {
  it("returns a response", async () => {
    expect(handler(new Request(url))).toEqual(new Response("Bun!"));
  });

  it("sets the correct headers", async () => {
    const expected = new Response("Bun!");
    expected.headers.set("Content-Type", "text/html");

    expect((await handler(new Request(url))).headers.count).toEqual(
      expected.headers.count
    );
    expect(
      (await handler(new Request(url))).headers.get("Content-Type")
    ).toEqual(expected.headers.get("Content-Type"));
  });
});

describe("router", () => {
  it("defaults to index.html if not path is passed", async () => {
    expect(qualifiedUrl(undefined as unknown as string)).toEqual("index.html");
  });

  it("returns page-2.html if page-2 is passed", async () => {
    expect(qualifiedUrl(new Request({ url: url + "/page-2" }).url)).toEqual(
      "page-2.html"
    );
  });
});

// describe("view", () => {
//   it("returns a BunFile", async () => {
//     expect(view(new Request(url).url)).toEqual({});
//   });
// });
