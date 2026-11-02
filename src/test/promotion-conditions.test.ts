import { describe, expect, it } from "vitest";
import { PROMOTIONS } from "@/lib/site-data";

const conditionOf = (name: string) => PROMOTIONS.find((p) => p.name === name)?.condition;

describe("promotion conditions", () => {
  it("keeps Birthday Treat tied to any package from 70,000 VND in the birthday month", () => {
    expect(conditionOf("Birthday Treat")).toBe(
      "With any package from 70,000 VND during your birthday month.",
    );
  });

  it("keeps Bring Your Bestie tied to groups of 3 or more on the Bestie Package or above", () => {
    expect(conditionOf("Bring Your Bestie")).toBe(
      "For groups of 3 or more choosing the Bestie Package or above.",
    );
  });

  it("keeps Student Day tied to a valid student ID", () => {
    expect(conditionOf("Student Day")).toBe("When you present a valid student ID.");
  });
});
