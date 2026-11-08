import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

describe("Package audience wording", () => {
  it("limits Couple & Friends to groups of 2–3 people", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Couple & Friends")?.audience).toBe(
      "For couples and small groups of 2–3 people",
    );
  });
});
