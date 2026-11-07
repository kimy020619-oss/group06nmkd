import { describe, expect, it } from "vitest";
import { BESTIE_VOUCHER_RULE, PROMOTIONS, PROMOTION_COMBINING_RULE } from "@/lib/site-data";

const promotionOf = (name: string) => PROMOTIONS.find((p) => p.name === name);

describe("promotions", () => {
  it("keeps Student Day at 10% off on weekdays with a valid student ID", () => {
    expect(promotionOf("Student Day")?.headline).toBe("10% off");
    expect(promotionOf("Student Day")?.condition).toBe(
      "On weekdays (Mon-Thu) with a valid student ID.",
    );
  });

  it("keeps Birthday Treat at one free photo strip, ID required, once per year", () => {
    expect(promotionOf("Birthday Treat")?.headline).toBe("1 free photo strip");
    expect(promotionOf("Birthday Treat")?.condition).toBe(
      "With any package from 70,000 VND during your birthday month. Valid ID required. Once per year.",
    );
  });

  it("keeps Bring Your Bestie at a 10,000 VND voucher valid for the next visit within 30 days", () => {
    expect(promotionOf("Bring Your Bestie")?.headline).toBe("10,000 VND voucher");
    expect(promotionOf("Bring Your Bestie")?.condition).toBe(
      "For groups of 3 or more choosing the Bestie Package or above. Valid for your next visit within 30 days.",
    );
  });

  it("states the Bring Your Bestie voucher is one per group and not issued on voucher visits", () => {
    expect(BESTIE_VOUCHER_RULE).toBe(
      "Bring Your Bestie voucher: one per group, not issued on visits that use a voucher.",
    );
  });

  it("keeps the no-combining rule wording", () => {
    expect(PROMOTION_COMBINING_RULE).toBe(
      "If more than one promotion could apply, only one promotion may be used per transaction. Please confirm the applicable offer before purchase.",
    );
  });
});
