/*
API for back-end programs to add to and retreive data from the database. 
Does not handle deletion. 
Author: Max Pagels
January 18 2024
*/

import { db } from "./dbObj.js";
import * as schema from './schema.js';
import { eq } from 'drizzle-orm';

// Adds a new customer to the database, returns the generated customer_id
async function addCustomer(
    fname: string, 
    lname: string,
    email: string,
    address: string,
    phone: string,
    clerk_id: string
    ) {

        //insert info
        await db.insert(schema.customer).values({ 
            fname: fname, 
            lname: lname, 
            email: email, 
            address: address,
            phone: phone,
            clerk_id: clerk_id
        });

        //get customer id
        const result = await db.select({
            id: schema.customer.customer_id
        }).from(schema.customer).where(eq(schema.customer.email, email)); 

        return result[0].id;
}

// Adds a new vendor to the database, returns the generated vendor_id
// NOTE: must input decimal spending_per_point as a string because Drizzle is weird
async function addVendor(
    name: string,
    email: string,
    address: string,
    phone: string,
    description: string,
    color: string,
    reward_program_details: string,
    spending_per_point: string, //must input decimal as a string
    max_points : number
    ) {
    
        //insert info
        await db.insert(schema.vendor).values({ 
            name: name,
            email: email,
            address: address,
            phone: phone,
            description: description,
            color: color,
            reward_program_details : reward_program_details,
            spending_per_point: spending_per_point,
            max_points : max_points
        });

        //get vendor id
        const result = await db.select({
            id: schema.vendor.vendor_id
        }).from(schema.vendor).where(eq(schema.vendor.email, email)); 

        return result[0].id;
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
async function getVendor(input_id: number){

    const result = await db.select().from(schema.vendor).where(eq(schema.vendor.vendor_id, input_id)); 

    return result[0];
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

//TODO: functions to edit existing entities

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