import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

const coupleAndFriends = PACKAGES.find((pkg) => pkg.name === "Couple & Friends");

describe("Couple & Friends inclusions", () => {
  it("lists exactly the session, four strips, standard frames and free photo props", () => {
    expect(coupleAndFriends?.includes).toEqual([
      "One photo session",
      "Four printed photo strips",
      "Choice of standard frames",
      "Free use of photo props",
    ]);
  });

  it("shows the standard-frames line as the third bullet", () => {
    expect(coupleAndFriends?.includes[2]).toBe("Choice of standard frames");
  });

  it("no longer offers the old themed-frame wording", () => {
    expect(coupleAndFriends?.includes).not.toContain("Choice of an available themed frame");
    expect(coupleAndFriends?.includes.some((i) => i.toLowerCase().includes("themed"))).toBe(false);
  });

  it("still says the digital file is an add-on", () => {
    expect(coupleAndFriends?.note).toBe("Digital file available as an add-on.");
  });
});
