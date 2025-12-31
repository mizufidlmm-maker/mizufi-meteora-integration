# MizuFi x Meteora Integration

Reference integration repository used by **MizuFi** to connect with **Meteora DLMM** on Solana.

This repo is intentionally kept small and readable:
- pool discovery (DLMM + DAMM)
- pool detail + metrics normalization
- wallet positions read (LP positions)
- fee estimation references (pre-claim)
- RPC patterns, retries, and caching notes

Status: beta / actively iterated.  
App: https://app.mizufi.finance  
Org: https://github.com/mizufidlmm-maker

---

## What’s Inside

- `src/meteora/pools.ts`  
  Fetch + normalize Meteora pools for UI (TVL, volume, bin step, fee params)

- `src/meteora/positions.ts`  
  Read user LP positions from on-chain accounts (non-custodial)

- `src/meteora/fees.ts`  
  Fee estimation references and output formatting used by dashboard

- `examples/`  
  Runnable scripts to validate endpoints and RPC health

---

## Quick Start

1) Install
- node >= 20
- npm

2) Configure env

Create `.env` from `.env.example`

3) Run examples

- `npm run example:fetch-pools`
- `npm run example:fetch-positions`

---

## Notes

- This repository documents **how MizuFi integrates** with Meteora DLMM.
- Production app may add additional layers (caching, indexing, UI adapters).
- No private keys are stored. All execution is wallet-signed.

---

## License

MIT
