export type PublicKeyString = string;

export type PoolListItem = {
  address: PublicKeyString;
  name: string;
  tokenA?: { mint: PublicKeyString; symbol?: string; decimals?: number };
  tokenB?: { mint: PublicKeyString; symbol?: string; decimals?: number };
  tvlUsd?: number;
  volume24hUsd?: number;
  apy?: number;
  feeBps?: number;
  binStep?: number;
  type?: "DLMM" | "DAMM" | "AMM" | "UNKNOWN";
  createdAt?: string;
};

export type PoolDetail = PoolListItem & {
  currentPrice?: number;
  programId?: PublicKeyString;
  raw?: unknown; // keep original payload for debugging
};

export type WalletPosition = {
  poolAddress: PublicKeyString;
  positionAddress?: PublicKeyString;
  owner: PublicKeyString;
  liquidityUsd?: number;
  unclaimedFeesUsd?: number;
  raw?: unknown;
};

export type FeeEstimate = {
  poolAddress: PublicKeyString;
  owner: PublicKeyString;
  unclaimedFeeA?: string;
  unclaimedFeeB?: string;
  raw?: unknown;
};
