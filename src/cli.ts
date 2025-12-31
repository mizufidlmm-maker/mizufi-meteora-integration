#!/usr/bin/env node
import { Command } from "commander";
import { listPools } from "./meteora/pools.js";
import { getPositions } from "./meteora/positions.js";
import { log } from "./utils/logger.js";

const program = new Command();

program
  .name("mizufi-cli")
  .description("MizuFi Meteora DLMM CLI")
  .version("0.1.0");

program
  .command("pools")
  .description("List all Meteora DLMM pools")
  .action(async () => {
    const pools = await listPools();
    console.table(pools);
  });

program
  .command("positions")
  .argument("<wallet>", "Wallet address")
  .description("Get LP positions for a wallet")
  .action(async (wallet) => {
    const positions = await getPositions(wallet);
    log(`Found ${positions.length} positions`);
    console.log(positions);
  });

program.parse();
