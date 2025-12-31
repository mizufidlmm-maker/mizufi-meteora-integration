import { Connection, Commitment } from "@solana/web3.js";
import { ENV } from "./config.js";

export type RpcClient = {
  connection: Connection;
  commitment: Commitment;
  request<T>(fn: () => Promise<T>): Promise<T>;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function createRpc(params?: {
  rpcUrl?: string;
  commitment?: Commitment;
  maxRetries?: number;
}) : RpcClient {
  const commitment: Commitment = params?.commitment ?? "confirmed";
  const rpcUrl = params?.rpcUrl ?? ENV.SOLANA_RPC_URL;
  const maxRetries = params?.maxRetries ?? ENV.RPC_MAX_RETRIES;

  const connection = new Connection(rpcUrl, {
    commitment,
    disableRetryOnRateLimit: true
  });

  async function request<T>(fn: () => Promise<T>): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await fn();
      } catch (e) {
        lastErr = e;
        // simple backoff
        await sleep(250 * (i + 1));
      }
    }
    throw lastErr;
  }

  return { connection, commitment, request };
}
