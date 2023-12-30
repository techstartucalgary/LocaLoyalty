/*
Database migration script. Run this to push schema to Planetscale. 
Author: Max Pagels
December 28, 2023
*/

import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import * as schema from "./schema";

// create the connection
const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// export connection for use in other files
export const db = drizzle(connection, { schema });

async function main() {
  console.log("Migration started...");
  await migrate(db, { migrationsFolder: "drizzle-migrations" });
  console.log("Migration ended.");
  process.exit(0);
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
  });

