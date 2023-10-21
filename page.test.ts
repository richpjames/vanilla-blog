import { describe, expect, it } from "bun:test";
import { Page } from "./page";

describe("page", () => {
  it("returns a Page object when given a file", async () => {
    const result = new Page(Bun.file("./index.html"));
    expect(result instanceof Page).toBe(true);
  });

  describe("render", () => {
    it("returns a Page object when given a file", async () => {
      const result = new Page(Bun.file("./index.html"));
      expect(result instanceof Page).toBe(true);
    });
  });
});
