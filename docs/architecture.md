# Architecture

MizuFi Integration Layer

1) Data Sources
- Meteora public endpoints (when available)
- Solana RPC (fallback / verification)

2) Responsibilities
- Normalize pool data into stable types
- Provide RPC wrapper with retries/backoff
- Keep raw payload for debugging

3) Upgrade Path
- Replace placeholders with Meteora DLMM SDK calls:
  - positions parsing
  - fee growth calculations
  - on-chain program account indexing
