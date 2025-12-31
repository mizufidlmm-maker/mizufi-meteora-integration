import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  SOLANA_RPC_URL: z.string().url(),
  SOLANA_RPC_KEY: z.string().optional(),
  RPC_TIMEOUT_MS: z.string().optional(),
  RPC_MAX_RETRIES: z.string().optional()
});

const envParsed = EnvSchema.safeParse(process.env);
if (!envParsed.success) {
  console.error(envParsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables (.env).");
}

export const ENV = {
  SOLANA_RPC_URL: envParsed.data.SOLANA_RPC_URL,
  SOLANA_RPC_KEY: envParsed.data.SOLANA_RPC_KEY,
  RPC_TIMEOUT_MS: Number(envParsed.data.RPC_TIMEOUT_MS ?? 20000),
  RPC_MAX_RETRIES: Number(envParsed.data.RPC_MAX_RETRIES ?? 3)
};
