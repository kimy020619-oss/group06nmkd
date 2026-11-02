import { useEffect, useRef, useState } from "react";
import { Check, Copy, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import film from "@/assets/voucher-film-roll.png.asset.json";
import ticket5 from "@/assets/voucher-ticket-5.png.asset.json";
import ticket2 from "@/assets/voucher-ticket-2.png.asset.json";
import { REWARDS, VOUCHER_SESSION_KEY, readVoucherResult, selectRoll, shuffledRewards, type Reward, type VoucherResult } from "@/lib/voucher-game";

export function VoucherGame() {
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<VoucherResult | null>(null);
  const [opening, setOpening] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const rolls = useRef<Reward[]>([]);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    rolls.current = shuffledRewards();
    try {
      const saved = readVoucherResult(sessionStorage.getItem(VOUCHER_SESSION_KEY));
      if (saved) { setResult(saved); locked.current = true; }
      setReady(true);
    } catch { setReady(false); }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  function choose(roll: number) {
    if (!ready || locked.current) return;
    // Persist the lock before any animation, so rapid clicks or reloads cannot redraw.
    const selected = selectRoll(rolls.current, roll, result);
    try { sessionStorage.setItem(VOUCHER_SESSION_KEY, JSON.stringify(selected)); }
    catch { setReady(false); return; }
    locked.current = true;
    setResult(selected);
    setOpening(true);
    timer.current = setTimeout(() => { setOpening(false); setOpen(true); }, 850);
  }

  async function copyCode() {
    if (!result?.code) return;
    try { await navigator.clipboard.writeText(result.code); setCopied(true); setCopyFailed(false); }
    catch { setCopyFailed(true); }
  }

  const message = result?.reward === 5 ? "LUCKY YOU! 5% OFF!" : result?.reward === 2 ? "CONGRATULATIONS! 2% OFF!" : "CHÚC MAY MẮN LẦN SAU!";

  return (
    <section className="voucher-section" aria-labelledby="voucher-heading">
      <div className="voucher-board">
        <div className="voucher-intro">
          <span className="voucher-star voucher-star-left" aria-hidden="true">✦</span>
          <p>MINI GAME</p>
          <h2 id="voucher-heading">PICK YOUR<br />VOUCHER!</h2>
          <p className="voucher-subtitle">Choose a film roll and get<br />a surprise discount!</p>
          <span className="voucher-star voucher-star-right" aria-hidden="true">✦</span>
        </div>
        <div className="voucher-rolls" aria-label="Ten film rolls">
          <span className="voucher-rays" aria-hidden="true">╲│╱</span>
          <span className="voucher-star voucher-grid-star-one" aria-hidden="true">✦</span>
          <span className="voucher-star voucher-grid-star-two" aria-hidden="true">✦</span>
          {REWARDS.map((_, index) => (
            <Button key={index} variant="ghost" className={`voucher-roll ${result?.roll === index ? "voucher-selected" : ""} ${opening && result?.roll === index ? "voucher-opening" : ""}`}
              aria-label={`Select film roll ${index + 1}`} aria-pressed={result?.roll === index}
              disabled={!ready || result !== null} onClick={() => choose(index)}>
              <img src={film.url} alt="" draggable={false} />
              {result?.roll === index && !opening && <span className="voucher-roll-result">{result.reward ? `${result.reward}%` : "✧"}</span>}
            </Button>
          ))}
        </div>
        <div className="voucher-prizes">
          <p>You can get:</p>
          <div><img src={ticket5.url} alt="5% OFF" /><span>(2 rolls)</span></div>
          <div><img src={ticket2.url} alt="2% OFF" /><span>(3 rolls)</span></div>
        </div>
      </div>
      {result && !opening && <div className="voucher-session-result"><Button variant="link" onClick={() => setOpen(true)}><Ticket /> View my result</Button></div>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="voucher-popup">
          {result?.reward !== 0 && <div className="voucher-celebration" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} />)}</div>}
          <div className="voucher-popup-icon">{result?.reward ? <Sparkles /> : <img src={film.url} alt="" />}</div>
          <p className="voucher-popup-eyebrow">MEMORA · MINI GAME</p>
          <DialogTitle className="voucher-result-title">{message}</DialogTitle>
          <DialogDescription className="voucher-result-description">{result?.reward ? "Your little surprise, for your next memories." : "Cảm ơn bạn đã tham gia cùng Memora!"}</DialogDescription>
          {result?.reward ? <>
            <div className="voucher-winning-ticket"><span>{result.reward}% OFF</span><Sparkles aria-hidden="true" /></div>
            <div className="voucher-code"><p>VOUCHER REDEMPTION CODE</p><code>{result.code}</code><Button variant="outline" onClick={copyCode}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy code"}</Button>{copyFailed && <p role="status">Please select and copy the code above.</p>}</div>
          </> : null}
          <Button className="voucher-close" onClick={() => setOpen(false)}>{result?.reward ? "Lovely, thank you!" : "Đóng"}</Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}