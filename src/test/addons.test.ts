import { describe, expect, it } from "vitest";
import { ADDONS, PACKAGES } from "@/lib/site-data";

const addonOf = (name: string) => ADDONS.find((a) => a.name === name);

describe("Optional add-ons", () => {
  it("lists exactly the four add-ons shown on the page", () => {
    expect(ADDONS.map((a) => a.name)).toEqual([
      "Extra Photo Strip",
      "Custom Name Frame",
      "Digital Photo File",
      "Photo Sleeve",
    ]);
  });

  it("prices each add-on", () => {
    expect(addonOf("Extra Photo Strip")?.price).toBe(10000);
    expect(addonOf("Custom Name Frame")?.price).toBe(15000);
    expect(addonOf("Digital Photo File")?.price).toBe(10000);
    expect(addonOf("Photo Sleeve")?.price).toBe(5000);
  });

  it("keeps the retired add-on names out of the list", () => {
    expect(addonOf("Custom Photo Frame")).toBeUndefined();
    expect(addonOf("Photo Holder / Sleeve")).toBeUndefined();
  });
});

describe("Basic Package small print", () => {
  it("says photo props are not included and the digital file is an add-on", () => {
    expect(PACKAGES.find((pkg) => pkg.name === "Basic Package")?.note).toBe(
      "Photo props not included. Digital file available as an add-on.",
    );
  });
});
