import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/lib/site-data";

const specialEdition = PACKAGES.find((pkg) => pkg.name === "Special Edition");

describe("Special Edition inclusions", () => {
  it("offers an Exclusive Special Occasion Frame personalised with name, date or message", () => {
    expect(specialEdition?.includes).toContain(
      "Exclusive Special Occasion Frame with your name, date or message",
    );
  });

  it("includes free use of photo props", () => {
    expect(specialEdition?.includes).toContain("Free use of photo props");
  });

  it("includes one digital photo file and one small souvenir", () => {
    expect(specialEdition?.includes).toContain("One digital photo file");
    expect(specialEdition?.includes).toContain("One small souvenir (sticker or photo sleeve)");
  });

  it("covers a photo session for up to four people", () => {
    expect(specialEdition?.includes).toContain("One photo session for up to four people");
  });

  it("keeps the old frame and plain session lines out of the list", () => {
    expect(specialEdition?.includes).not.toContain("A special themed frame");
    expect(specialEdition?.includes).not.toContain("A special themed frame with your name, date, message");
    expect(specialEdition?.includes).not.toContain("One photo session");
  });
});
