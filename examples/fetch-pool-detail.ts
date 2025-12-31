import "dotenv/config";
import { getPoolDetail } from "../src/meteora/pools.js";

const addr = process.env.EXAMPLE_POOL_ADDRESS;
if (!addr) throw new Error("Set EXAMPLE_POOL_ADDRESS in .env");

const detail = await getPoolDetail(addr);
console.log("pool detail:", detail);
