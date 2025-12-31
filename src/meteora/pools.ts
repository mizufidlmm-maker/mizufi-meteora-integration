import { PoolDetail, PoolListItem } from "./types.js";

/**
 * NOTE:
 * Replace METEORA_API_BASE with the endpoint you actually use internally.
 * This wrapper is intentionally minimal & safe.
 */
const METEORA_API_BASE = "https://api.meteora.ag"; // placeholder base

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "content-type": "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} - ${url}`);
  return (await res.json()) as T;
}

export async function getPools(): Promise<PoolListItem[]> {
  // Try common pool list patterns; if not available, return empty (no crash).
  const candidates = [
    `${METEORA_API_BASE}/pools`,
    `${METEORA_API_BASE}/dlmm/pools`,
    `${METEORA_API_BASE}/v1/pools`
  ];

  for (const url of candidates) {
    try {
      const data = await fetchJson<any>(url);
      const list = Array.isArray(data) ? data : data?.data ?? data?.pools ?? [];
      if (Array.isArray(list)) {
        return list.map(normalizePool);
      }
    } catch {
      // continue
    }
  }

  return [];
}

export async function getPoolDetail(poolAddress: string): Promise<PoolDetail> {
  const candidates = [
    `${METEORA_API_BASE}/pools/${poolAddress}`,
    `${METEORA_API_BASE}/dlmm/pools/${poolAddress}`,
    `${METEORA_API_BASE}/v1/pools/${poolAddress}`
  ];

  for (const url of candidates) {
    try {
      const raw = await fetchJson<any>(url);
      const obj = raw?.data ?? raw;
      return { ...normalizePool(obj), raw, address: poolAddress };
    } catch {
      // continue
    }
  }

  // Fallback minimal
  return {
    address: poolAddress,
    name: poolAddress.slice(0, 6) + "..." + poolAddress.slice(-4),
    type: "UNKNOWN"
  };
}

function normalizePool(p: any): PoolListItem {
  return {
    address: p.address ?? p.poolAddress ?? p.id ?? "",
    name: p.name ?? p.symbol ?? `${p.tokenA?.symbol ?? "TOKENA"}-${p.tokenB?.symbol ?? "TOKENB"}`,
    tokenA: p.tokenA ? { mint: p.tokenA.mint ?? p.tokenAMint, symbol: p.tokenA.symbol, decimals: p.tokenA.decimals } : undefined,
    tokenB: p.tokenB ? { mint: p.tokenB.mint ?? p.tokenBMint, symbol: p.tokenB.symbol, decimals: p.tokenB.decimals } : undefined,
    tvlUsd: num(p.tvlUsd ?? p.tvl),
    volume24hUsd: num(p.volume24hUsd ?? p.volume24h),
    apy: num(p.apy),
    feeBps: num(p.feeBps ?? p.fee),
    binStep: num(p.binStep),
    type: (p.type ?? p.poolType ?? "UNKNOWN") as any,
    createdAt: p.createdAt ?? p.created_at
  };
}

function num(v: any): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
