<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Brand marks render from the supplied Memora logo artwork (CDN asset pointers under `src/assets`), never from a hand-drawn text wordmark; derive any new mark from that same artwork so header, footer and favicon stay consistent.
- Home-only editorial presentation stays in the index route and uses the shared package data; this avoids changing business facts or unrelated page layouts.
- Home cover, story and philosophy title typography shares a dedicated semantic font token and route-scoped font loading; this preserves typography on other pages.
- Home header adjustments and reference palette are scoped to Home, and its unframed two-column cover uses the photographic crop from the supplied reference; this preserves unrelated pages and the exact booth artwork.
- Scroll reveals use a small progressive-enhancement IntersectionObserver wrapper; content remains visible without JavaScript or with reduced motion.
- The Products comparison uses an opt-in reference variant of PackageCard and dedicated CSS; other package presentations and shared business data remain unchanged.
- The Promotions game uses browser sessionStorage for its single-draw session lock and UUID voucher codes; it is a presentation-only game, not a server-validated redemption system.
- Voucher reward allocation and session-result validation live in a pure shared module with rule tests; this keeps the animated presentation separate from reward rules.
- The shared footer owns the reference contact grid with scoped typography and semantic contact tokens; this keeps all pages consistent without changing other text styles or contact data.
