import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

const coupleAndFriends = PACKAGES.find((pkg) => pkg.name === "Couple & Friends");

describe("Couple & Friends inclusions", () => {
  it("lists exactly the session, four strips and free photo props", () => {
    expect(coupleAndFriends?.includes).toEqual([
      "One photo session",
      "Four printed photo strips",
      "Free use of photo props",
    ]);
  });

  it("no longer offers a choice of themed frame", () => {
    expect(coupleAndFriends?.includes).not.toContain("Choice of an available themed frame");
    expect(coupleAndFriends?.includes.some((i) => i.toLowerCase().includes("frame"))).toBe(false);
  });

  it("still says the digital file is an add-on", () => {
    expect(coupleAndFriends?.note).toBe("Digital file available as an add-on.");
  });
});
