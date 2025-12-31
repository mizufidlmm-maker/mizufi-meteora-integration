import "dotenv/config";
import { createRpc } from "../src/rpc.js";
import { getWalletPositions } from "../src/meteora/positions.js";

const owner = process.env.EXAMPLE_WALLET_ADDRESS;
if (!owner) throw new Error("Set EXAMPLE_WALLET_ADDRESS in .env");

const rpc = createRpc();
const pos = await getWalletPositions(rpc, owner);
console.log("positions:", pos);
