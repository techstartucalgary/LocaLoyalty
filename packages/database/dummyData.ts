/*
Fills the db with some dummy data
Author: Max Pagels
January 16 2024
*/

import { db } from "./dbObj";
import * as schema from './schema.js';

async function insert() {
    
    await db.insert(schema.customer).values({ fname: "Hilton", lname: "Luuuu", email: "hl@gmail.com", address: "123 Street, Calgary", phone: "4035557777"});
    console.log("Inserted customers");

    await db.insert(schema.vendor).values({ name: "Bobs Burgers", email: "bobb@gmail.com", address: "123 Main Street, Calgary", phone: "4031234444", description: "We make the best burgers!"});
    console.log("Inserted vendors");

    await db.insert(schema.rewards_program).values({details: "Bob's rewards program.", spending_per_point: "10.0"});
    console.log("Inserted rewards program");

    await db.insert(schema.loyalty_card).values({points_amt:0, carry_over_amt:"0.0"});
    console.log("Inserted loyalty card");

    await db.insert(schema.reward).values({name: "Free Burger", description: "Redeem 5 punches for a free burger! ", points_cost: 5});
    console.log("Inserted reward");
}

insert().catch((error) => console.error(error));
