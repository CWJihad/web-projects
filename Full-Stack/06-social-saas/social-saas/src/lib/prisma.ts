// import "server-only";

import "dotenv/config";
import "temporal-polyfill/global";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../../prisma/contract";
import contractJson from "../../prisma/contract.json" with { type: "json" };

// export function getPrisma() {
//   return postgres<Contract>({
//     contractJson,
//     url: process.env.DATABASE_URL!,
//   });
// }

export const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
})