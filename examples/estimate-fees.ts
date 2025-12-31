import "dotenv/config";
import { createRpc } from "../src/rpc.js";
import { estimateUnclaimedFees } from "../src/meteora/fees.js";

const owner = process.env.EXAMPLE_WALLET_ADDRESS;
const pool = process.env.EXAMPLE_POOL_ADDRESS;
if (!owner || !pool) throw new Error("Set EXAMPLE_WALLET_ADDRESS and EXAMPLE_POOL_ADDRESS in .env");

const rpc = createRpc();
const fees = await estimateUnclaimedFees(rpc, { owner, poolAddress: pool });
console.log("fee estimate:", fees);
