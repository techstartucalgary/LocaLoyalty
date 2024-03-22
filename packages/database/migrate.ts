/*
Database migration script. Run this to push schema to Turso. 
Author: Max Pagels
December 28, 2023
*/

import "dotenv/config";
import { db } from "./dbObj.js";
import { migrate } from "drizzle-orm/libsql/migrator";


async function main() {
  console.log("Migration started...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migration ended.");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
