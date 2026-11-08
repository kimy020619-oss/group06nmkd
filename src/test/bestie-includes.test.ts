import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

const bestie = PACKAGES.find((pkg) => pkg.name === "Bestie Package");

describe("Bestie Package inclusions", () => {
  it("lists the session, four strips, two frames, digital file and free props", () => {
    expect(bestie?.includes).toEqual([
      "One photo session for up to four people",
      "Four printed photo strips",
      "Choice of 2 frames design",
      "One digital photo file",
      "Free use of photo props",
    ]);
  });

  it("shows the two-frames line as the third bullet", () => {
    expect(bestie?.includes[2]).toBe("Choice of 2 frames design");
  });

  it("keeps the audience line and price untouched", () => {
    expect(bestie?.audience).toBe("For friend groups of 3–4 people");
    expect(bestie?.price).toBe(90000);
  });
});
