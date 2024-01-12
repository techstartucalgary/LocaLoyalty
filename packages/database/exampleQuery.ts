/*
An example of how to query the database with test data
Author: Max Pagels
January 11 2023
*/

import { db } from "./dbObj";
import * as schema from './schema.js';

const customer = schema.customer;

async function main() {
    await db.insert(customer).values({ fname: 'Max' });
}

main().catch((error) => console.error(error));