/*
API for back-end programs to add to and retreive data from the database. 
Does not handle deletion. 
Author: Max Pagels
January 18 2024
*/

import { db } from "./dbObj.js";
import * as schema from './schema.js';
import { and, eq } from 'drizzle-orm';

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
async function addLoyaltyCard(
    customer_id, //TODO: enforce types
    vendor_id, 
    points_amt, 
    carry_over_amt
    ) {
    
    // Insert loyalty card information
    await db.insert(schema.loyalty_card).values({
        customer_id: customer_id,
        vendor_id: vendor_id,
        points_amt: points_amt,
        carry_over_amt: carry_over_amt
    });

    // Get loyalty card id
    const result = await db.select({
        id: schema.loyalty_card.loyalty_id
    }).from(schema.loyalty_card).where(and(
        eq(schema.loyalty_card.customer_id, customer_id),
        eq(schema.loyalty_card.vendor_id, vendor_id)
    ));

    return result[0].id;
}

// Adds a new point redemption
// Timestamp auto generated
async function addPointRedemption(
    loyalty_id, //TODO: enforce types
    points_redeemed,
    ) {
        await db.insert(schema.point_redemption_history).values({
            loyalty_id: loyalty_id,
            points_redeemed: points_redeemed,
            timestamp: new Date()
        });

        //TODO: figure out how to return id??
}

// Adds a new transaction a customer completed
async function addTransaction(
    loyalty_id, //TODO: enforce types
    vendor_id, 
    purchase_amt, 
    points_earned, 
    timestamp, 
    payment_type
    ) {
    
    // Insert transaction information
    await db.insert(schema.transaction).values({
        loyalty_id: loyalty_id,
        vendor_id: vendor_id,
        purchase_amt: purchase_amt,
        points_earned: points_earned,
        timestamp: timestamp,
        payment_type: payment_type
    });

    // Get transaction id
    const result = await db.select({
        id: schema.transaction.transaction_id
    }).from(schema.transaction).where(
        and(
            eq(schema.transaction.timestamp, timestamp),
            and(
                eq(schema.transaction.loyalty_id, loyalty_id),
                eq(schema.transaction.vendor_id, vendor_id)
            )
        )
    );

    return result[0].id;
}

// Adds a new reward to a vendor program
async function addReward(
    vendor_id, //TODO: enforce types
    name, 
    description, 
    points_cost
    ) {
    
    // Insert reward information
    await db.insert(schema.reward).values({
        vendor_id: vendor_id,
        name: name,
        description: description,
        points_cost: points_cost
    });

    // Get reward id
    const result = await db.select({
        id: schema.reward.reward_id
    }).from(schema.reward).where(and(
        eq(schema.reward.vendor_id, vendor_id),
        eq(schema.reward.name, name)
    ));

    return result[0].id;
}


// Gets the customer object
// Input: the customer ID
async function getCustomer(customer_id){
    const result = await db.select().from(schema.customer).where(eq(schema.customer.customer_id, customer_id)); 
    return result[0];
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
    const result = await db.select().from(schema.loyalty_card).where(eq(schema.loyalty_card.loyalty_id, loyalty_id)); 
    return result[0];
}

// Gets the point redemption history object
// Input: the loyalty card ID
async function getPointRedemptionHistory(loyalty_id){
    const result = await db.select().from(schema.point_redemption_history).where(eq(schema.point_redemption_history.loyalty_id, loyalty_id)); 
    return result[0];
}

// Gets the transaction object 
// Input: the transaction ID
async function getTransaction(transaction_id){
    const result = await db.select().from(schema.transaction).where(eq(schema.transaction.transaction_id, transaction_id)); 
    return result[0];
}

// Gets the reward object
// Input: the reward ID
async function getReward(reward_id){
    const result = await db.select().from(schema.reward).where(eq(schema.reward.reward_id, reward_id)); 
    return result[0];
}

//TODO: functions to edit existing entities

module.exports = {
    addCustomer,
    addVendor,
    addLoyaltyCard,
    addTransaction,
    addReward,
    addPointRedemption,
    getCustomer,
    getVendor,
    getLoyaltyCard,
    getPointRedemptionHistory,
    getTransaction,
    getReward
};