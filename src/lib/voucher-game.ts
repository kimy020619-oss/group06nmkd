export const VOUCHER_SESSION_KEY = "memora-voucher-session-v1";
export const REWARDS = [5, 5, 2, 2, 2, 0, 0, 0, 0, 0] as const;
export type Reward = (typeof REWARDS)[number];
export type VoucherResult = { roll: number; reward: Reward; code: string | null };

export function shuffledRewards(): Reward[] {
  const rolls: Reward[] = [...REWARDS];
  for (let i = rolls.length - 1; i > 0; i--) {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    const random = value[0];
    if (random === undefined) throw new Error("Random draw unavailable");
    const j = Math.floor((random / 4294967296) * (i + 1));
    const current = rolls[i];
    const replacement = rolls[j];
    if (current === undefined || replacement === undefined) throw new Error("Invalid reward deck");
    rolls[i] = replacement;
    rolls[j] = current;
  }
  return rolls;
}

export function selectRoll(rolls: readonly Reward[], roll: number, previous: VoucherResult | null): VoucherResult {
  if (previous) return previous;
  if (!Number.isInteger(roll) || roll < 0 || roll >= rolls.length) throw new Error("Invalid film roll");
  const reward = rolls[roll];
  if (reward === undefined) throw new Error("Invalid film roll");
  return { roll, reward, code: reward === 0 ? null : `MEMORA-${reward}-${crypto.randomUUID().toUpperCase()}` };
}

export function readVoucherResult(value: string | null): VoucherResult | null {
  if (!value) return null;
  try {
    const result = JSON.parse(value);
    if (!Number.isInteger(result.roll) || result.roll < 0 || result.roll > 9 || !REWARDS.includes(result.reward)) return null;
    if (result.reward === 0 ? result.code !== null : typeof result.code !== "string" || !result.code.startsWith(`MEMORA-${result.reward}-`)) return null;
    return result;
  } catch { return null; }
}