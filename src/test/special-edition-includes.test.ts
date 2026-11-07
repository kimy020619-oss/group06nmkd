import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

const specialEdition = PACKAGES.find((pkg) => pkg.name === "Special Edition");

describe("Special Edition inclusions", () => {
  it("offers a themed frame personalised with name, date and message", () => {
    expect(specialEdition?.includes).toContain(
      "A special themed frame with your name, date, message",
    );
  });

  it("includes free use of photo props", () => {
    expect(specialEdition?.includes).toContain("Free use of photo props");
  });

  it("keeps the plain frame line out of the list", () => {
    expect(specialEdition?.includes).not.toContain("A special themed frame");
  });
});
