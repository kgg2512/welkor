# welkor-assistant (Cloudflare Worker)

Privacy-first navigation helper for WelKor. Takes a plain-language question and
returns a short answer + 1–3 recommended internal WelKor routes, so foreigners
reach the page that actually has the information they need.

## Why a Worker + Workers AI

- **Self-controlled LLM at $0.** Runs `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
  (with 8B/3B fallbacks) via the native Workers AI binding — no API key, no
  third-party data sharing, on our own Cloudflare account.
- **Routing is grounded, not hallucinated.** Server-side bilingual keyword
  matching is the authoritative router; the LLM only writes the prose answer and
  may *augment* the route list with slugs from a fixed allow-list. Invalid slugs
  are dropped.

## Privacy & safety (see docs/workorders/20260709_welkor_nav_assistant.md)

- **Zero conversation storage/logging.** The message and answer are never
  persisted or logged. The only state is an anonymous hourly rate-limit counter
  keyed by `SHA-256(RL_SALT : CF-Connecting-IP)` — the raw IP is never stored,
  and the key auto-expires after 1 hour.
- Input capped at 500 chars; inputs that look like personal data (passport, RRN,
  card, phone) are refused **before** they reach the model.
- CORS allow-list: `https://welkor.vercel.app` + localhost.
- Rate limit: 20 requests / IP / hour.
- System prompt: information & navigation only — not legal/immigration/tax
  advice; never brokers or guarantees employment (E-9/EPS is government-only).

## Endpoint

`POST /chat` — body `{ "message": string, "locale": "en" | "ko" }`
→ `{ "answer": string, "routes": [{ "path": string, "label": string }], "refused": boolean }`

Live: `https://welkor-assistant.kgg2512.workers.dev/chat`

## Deploy

```sh
cd workers/welkor-assistant
npx wrangler deploy
# one-time: set the IP-hashing salt (kept out of git)
echo "<random-hex>" | npx wrangler secret put RL_SALT
```

Bindings (see `wrangler.toml`): `AI` (Workers AI), `RL` (KV, rate-limit counter),
secret `RL_SALT`.
