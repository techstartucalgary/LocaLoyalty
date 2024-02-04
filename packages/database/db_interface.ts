/*
API for back-end programs to add to and retreive data from the database. 
Does not handle deletion. 
Author: Max Pagels
January 18 2024
*/

import { db } from "./dbObj.js";
import * as schema from "./schema.js";
import { SQLWrapper, and, eq } from "drizzle-orm";

// Adds a new customer to the database, returns the generated customer_id
async function addCustomer(email: string, phone: string, clerk_id: string) {
  //insert info
  await db.insert(schema.customer).values({
    fname: "",
    lname: "",
    email: email,
    phone: phone,
    clerk_id: clerk_id,
  });

  //get customer id
  const result = await db
    .select({
      id: schema.customer.customer_id,
    })
    .from(schema.customer)
    .where(eq(schema.customer.email, email));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}

// Adds a new vendor to the database, returns the generated vendor_id
// NOTE: must input decimal spending_per_point as a string because Drizzle is weird
async function addVendor(
  name: string,
  email: string,
  phone: string,
  clerk_id: string
) {
  //insert info
  await db.insert(schema.vendor).values({
    name: name || "",
    email: email,
    phone: phone,
    clerk_id: clerk_id,
  });

  //get vendor id
  const result = await db
    .select({
      id: schema.vendor.vendor_id,
    })
    .from(schema.vendor)
    .where(eq(schema.vendor.email, email));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}

// Adds a new loyalty card to the customer
/*
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
    carry_over_amt: carry_over_amt,
  });

  // Get loyalty card id
  const result = await db
    .select({
      id: schema.loyalty_card.loyalty_id,
    })
    .from(schema.loyalty_card)
    .where(
      and(
        eq(schema.loyalty_card.customer_id, customer_id),
        eq(schema.loyalty_card.vendor_id, vendor_id)
      )
    );

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}
*/

// Adds a new point redemption
// Timestamp auto generated
/*
async function addPointRedemption(
  loyalty_id, //TODO: enforce types
  points_redeemed
) {
  //take timestamp
  const stamp = new Date();

  //insert data
  await db.insert(schema.point_redemption_history).values({
    loyalty_id: loyalty_id,
    points_redeemed: points_redeemed,
    timestamp: stamp,
  });

  // Get point redemption id
  const result = await db
    .select({
      id: schema.point_redemption_history.history_id,
    })
    .from(schema.point_redemption_history)
    .where(
      and(
        eq(schema.point_redemption_history.loyalty_id, loyalty_id),
        eq(schema.point_redemption_history.timestamp, stamp)
      )
    );

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result;
}
*/

// Adds a new transaction a customer completed
/*
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
    payment_type: payment_type,
  });

  // Get transaction id
  const result = await db
    .select({
      id: schema.transaction.transaction_id,
    })
    .from(schema.transaction)
    .where(
      and(
        eq(schema.transaction.timestamp, timestamp),
        and(
          eq(schema.transaction.loyalty_id, loyalty_id),
          eq(schema.transaction.vendor_id, vendor_id)
        )
      )
    );

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}
*/

// Adds a new reward to a vendor program
/*
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
    points_cost: points_cost,
  });

  // Get reward id
  const result = await db
    .select({
      id: schema.reward.reward_id,
    })
    .from(schema.reward)
    .where(
      and(eq(schema.reward.vendor_id, vendor_id), eq(schema.reward.name, name))
    );

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}
*/
// Gets the customer object
// Input: the customer ID
async function getCustomer(customer_id: number) {
  const result = await db
    .select()
    .from(schema.customer)
    .where(eq(schema.customer.customer_id, customer_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}

// Gets the vendor object
//Input: the vendor ID

async function getVendor(clerk_id: string) {
  const result = await db
    .select()
    .from(schema.vendor)
    .where(eq(schema.vendor.clerk_id, clerk_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}

async function editVendor(
  clerk_id: string,
  name: string,
  address: string,
  city: string,
  province: string,
  postal_code: string,
  business_image: string,
  business_logo: string,
  description: string,
  merchant_id: string,
  clover_api_key: string
) {
  await db
    .update(schema.vendor)
    .set({
      name: name,
      address: address,
      city: city,
      province: province,
      postal_code: postal_code,
      description: description,
      merchant_id: merchant_id,
      clover_api_key: clover_api_key,
    })
    .where(eq(schema.vendor.clerk_id, clerk_id));

  //if statements are needed to ensure that already existing images and logos are not overidden
  if (business_image != "") {
    await db
      .update(schema.vendor)
      .set({
        business_image: business_image,
      })
      .where(eq(schema.vendor.clerk_id, clerk_id));
  }

  if (business_logo != "") {
    await db
      .update(schema.vendor)
      .set({
        business_logo: business_logo,
      })
      .where(eq(schema.vendor.clerk_id, clerk_id));
  }
}

/*
// Gets the loyalty card object
// Input: the loyalty car ID
async function getLoyaltyCard(loyalty_id) {
  const result = await db
    .select()
    .from(schema.loyalty_card)
    .where(eq(schema.loyalty_card.loyalty_id, loyalty_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}
*/

// Gets the point redemption history object
// Input: the loyalty card ID
/*
async function getPointRedemptionHistory(loyalty_id) {
  const result = await db
    .select()
    .from(schema.point_redemption_history)
    .where(eq(schema.point_redemption_history.loyalty_id, loyalty_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}

// Gets the transaction object
// Input: the transaction ID
async function getTransaction(transaction_id) {
  const result = await db
    .select()
    .from(schema.transaction)
    .where(eq(schema.transaction.transaction_id, transaction_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}
*/

// Gets the reward object
// Input: the reward ID
/*
async function getReward(reward_id) {
  const result = await db
    .select()
    .from(schema.reward)
    .where(eq(schema.reward.reward_id, reward_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0];
}
*/

// Get all customers has no use case for now...

// Gets all vendors in the database
/*
async function getAllVendors() {
  const results = await db.select().from(schema.vendor);

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}
*/

// Gets all loyalty cards for a given customer
// Input: the customers customer_id
async function getAllLoyaltyCardsOfCustomer(customer_id: number) {
  const results = await db
    .select()
    .from(schema.loyalty_card)
    .where(eq(schema.loyalty_card.customer_id, customer_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}

// Gets all point redemption history for a given loyalty card
// Input: the loyalty_id of the loyalty card
/*
async function getAllPointRedemptionHistoryOfCard(loyalty_id) {
  const results = await db
    .select()
    .from(schema.point_redemption_history)
    .where(eq(schema.point_redemption_history.loyalty_id, loyalty_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}
*/

// Gets all previous transactions for a given loyalty card
// Input: the loyalty_id of the loyalty card
/*
async function getAllTransactionsOfCard(loyalty_id) {
  const results = await db
    .select()
    .from(schema.transaction)
    .where(eq(schema.transaction.loyalty_id, loyalty_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}
*/

// Gets all rewards in the program of a given vendor
// Input: the vendor_id of the vendor
/*
async function getAllRewardsOfVendor(vendor_id) {
  const results = await db
    .select()
    .from(schema.reward)
    .where(eq(schema.reward.vendor_id, vendor_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}
*/

// Gets a customer_id based on a clerk_id
// Input: a clerk id as a string
async function getCustomerFromClerkID(clerk_id: string) {
  const result = await db
    .select()
    .from(schema.customer)
    .where(eq(schema.customer.clerk_id, clerk_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result;
}

async function editCustomer(
  clerk_id: string,
  first_name: string,
  last_name: string
) {
  //update value
  await db
    .update(schema.customer)
    .set({ fname: first_name || "", lname: last_name || "" })
    .where(eq(schema.customer.clerk_id, clerk_id));

  /*
        //test to see if the query was successfull
        const result = await db.select({
            r: schema.customer[attribute]
            })
            .from(schema.customer)
            .where(eq(schema.customer.customer_id, customer_id));

        //return 1 if successfull, or null if failure
        if(result[0].r == newValue){
            return 1
        }else{
            return null
        }     
        */
}

// Edits one attribute of a loyalty card
// Input: The loyalty_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
/*
async function editLoyaltyCard(loyalty_id, attribute, newValue) {
    // Update value
    await db.update(schema.loyalty_card)
        .set({ [attribute]: [newValue] })
        .where(eq(schema.loyalty_card.loyalty_id, loyalty_id));

    // Test if the query was successful
    const result = await db.select({
        r: schema.loyalty_card[attribute]
    })
        .from(schema.loyalty_card)
        .where(eq(schema.loyalty_card.loyalty_id, loyalty_id));

    // Return 1 if successful, or null if failure
    if (result[0].r == newValue) {
        return 1;
    } else {
        return null;
    }
}
*/

// Edits one attribute of a point redemption history
// Input: The history_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
/*
async function editPointRedemptionHistory(history_id, attribute, newValue) {
    // Update value
    await db.update(schema.point_redemption_history)
        .set({ [attribute]: [newValue] })
        .where(eq(schema.point_redemption_history.history_id, history_id));

    // Test if the query was successful
    const result = await db.select({
        r: schema.point_redemption_history[attribute]
    })
        .from(schema.point_redemption_history)
        .where(eq(schema.point_redemption_history.history_id, history_id));

    // Return 1 if successful, or null if failure
    if (result[0].r == newValue) {
        return 1;
    } else {
        return null;
    }
}
*/

// Edits one attribute of a transaction
// Input: The transaction_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
/*
async function editTransaction(transaction_id, attribute, newValue) {
    // Update value
    await db.update(schema.transaction)
        .set({ [attribute]: [newValue] })
        .where(eq(schema.transaction.transaction_id, transaction_id));

    // Test if the query was successful
    const result = await db.select({
        r: schema.transaction[attribute]
    })
        .from(schema.transaction)
        .where(eq(schema.transaction.transaction_id, transaction_id));

    // Return 1 if successful, or null if failure
    if (result[0].r == newValue) {
        return 1;
    } else {
        return null;
    }
}

// Edits one attribute of a reward
// Input: The reward_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
async function editReward(reward_id, attribute, newValue) {
    // Update value
    await db.update(schema.reward)
        .set({ [attribute]: [newValue] })
        .where(eq(schema.reward.reward_id, reward_id));

    // Test if the query was successful
    const result = await db.select({
        r: schema.reward[attribute]
    })
        .from(schema.reward)
        .where(eq(schema.reward.reward_id, reward_id));

    // Return 1 if successful, or null if failure
    if (result[0].r == newValue) {
        return 1;
    } else {
        return null;
    }
}
*/

export {
  addCustomer,
  addVendor,
  getCustomerFromClerkID,
  getAllLoyaltyCardsOfCustomer,
  getCustomer,
  editCustomer,
  getVendor,
  editVendor,
  /*
  addLoyaltyCard,
  addTransaction,
  addReward,
  addPointRedemption,
  getLoyaltyCard,
  getPointRedemptionHistory,
  getTransaction,
  getReward,
  getAllVendors,
  getAllPointRedemptionHistoryOfCard,
  getAllTransactionsOfCard,
  getAllRewardsOfVendor,
  */
};
