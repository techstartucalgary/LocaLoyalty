/*
An example of how to query the database with test data
Author: Max Pagels
January 11 2024
*/

import { db } from "./dbObj";
import * as schema from './schema.js';
import { eq } from 'drizzle-orm';

const customer = schema.customer;

async function main() {
    
    //await db.insert(customer).values({ fname: 'Max' , lname: "Pagels", email: "mp@gmail.com"});
    
    const result = await db.select().from(customer).where(eq(customer.fname, 'Hilton')); 
    console.log(result);
}

main().catch((error) => console.error(error));