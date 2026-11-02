import { describe, expect, it } from "vitest";
import { REWARDS, readVoucherResult, selectRoll, shuffledRewards } from "@/lib/voucher-game";

describe("Film roll rewards", () => {
  it("has exactly ten rolls", () => { expect(REWARDS).toHaveLength(10); });
  it("has two 5% rewards", () => { expect(shuffledRewards().filter(r => r === 5)).toHaveLength(2); });
  it("has three 2% rewards", () => { expect(shuffledRewards().filter(r => r === 2)).toHaveLength(3); });
  it("has five empty rewards", () => { expect(shuffledRewards().filter(r => r === 0)).toHaveLength(5); });
  it("allows only one selection per session, including after restoring it", () => {
    const first = selectRoll(REWARDS, 0, null);
    const restored = readVoucherResult(JSON.stringify(first));
    expect(restored).toEqual(first);
    expect(selectRoll(REWARDS, 2, restored)).toEqual(first);
  });
  it("issues unique redemption codes for winners", () => {
    const first = selectRoll(REWARDS, 0, null);
    const second = selectRoll(REWARDS, 0, null);
    expect(first.code).toMatch(/^MEMORA-5-/);
    expect(first.code).not.toBe(second.code);
    expect(selectRoll(REWARDS, 2, null).code).toMatch(/^MEMORA-2-/);
  });
  it("does not issue a code for an empty roll", () => { expect(selectRoll(REWARDS, 5, null).code).toBeNull(); });
});