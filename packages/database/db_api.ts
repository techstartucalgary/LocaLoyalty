/*
API for back-end programs to add to and retreive data from the database. 
Does not handle deletion. 
Author: Max Pagels
January 18 2024
*/

import { db } from "./dbObj";
import * as schema from './schema.js';
import { eq } from 'drizzle-orm';

// Adds a new customer to the database
// Parameters: 
async function addCustomer(
    fname: string, 
    lname: string,
    email: string,
    address?: string,
    phone?: string,
    clerk_id?: string
    ) {

        //insert base info
        await db.insert(schema.customer).values({ 
            fname: fname, 
            lname: lname, 
            email: email, 
        });

        //get customer id
        const result = await db.select({
            id: schema.customer.customer_id
        }).from(schema.customer).where(eq(schema.customer.email, email)); 

        //optional data
        if (address){
            //insert addr
        }

        if(phone){
            //insert phone
        }

        if(clerk_id){
            //insert clerk id
        }

    // create new transaction history
}

// Adds a new vendor to the database
// Parameters: 
async function addVendor() {
    // TODO
}

// Adds a new loyalty card to the customer
// Parameters: 
async function addLoyaltyCard() {
    // TODO
    // new point redemption history
}

// Adds a new transaction a customer completed
// Parameters: 
async function addTransaction() {
    // TODO 
}

// Adds a new reward to a vendor program
// Parameters:
async function addReward() {
    // TODO
}

// Gets the customer object
// Input: the customer ID
async function getCustomer(customer_id){
    // TODO
}

// Gets the vendor object
//Input: the vendor ID
async function getVendor(vendor_id){
    // TODO
}

// Gets the loyalty card object
// Input: the loyalty car ID
async function getLoyaltyCard(loyalty_id){
    // TODO
}

// Gets the point redemption history object
// Input: the loyalty card ID
async function getPointRedemptionHistory(loyalty_id){
    // TODO
}

// Gets the transaction object 
// Input: the transaction ID
async function getTransaction(transaction_id){
    // TODO
}

// Gets the reward object
// Input: the reward ID
async function getReward(reward_id){
    // TODO
}

module.exports = {
    addCustomer,
    addVendor,
    addLoyaltyCard,
    addTransaction,
    addReward,
    getCustomer,
    getVendor,
    getLoyaltyCard,
    getPointRedemptionHistory,
    getTransaction,
    getReward
};