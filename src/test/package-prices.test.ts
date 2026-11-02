import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

describe("Package prices", () => {
  it("prices Basic Package at 50,000 VND", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Basic Package")?.price).toBe(50000);
  });
  it("prices Couple & Friends at 70,000 VND", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Couple & Friends")?.price).toBe(70000);
  });
  it("prices Bestie Package at 90,000 VND", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Bestie Package")?.price).toBe(90000);
  });
  it("prices Special Edition at 120,000 VND", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Special Edition")?.price).toBe(120000);
  });
});