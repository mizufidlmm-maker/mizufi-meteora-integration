import { getPools } from "../src/meteora/pools.js";

const pools = await getPools();
console.log("pools:", pools.slice(0, 10));
