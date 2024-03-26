/*
API for back-end programs to add to and retreive data from the database. 
Does not handle deletion. 
Author: Max Pagels
January 18 2024
*/

import { SocketAddress } from "net";
import { db } from "./dbObj.ts";
import * as schema from "./schema.ts";
import { SQLWrapper, and, eq, notInArray, sql } from "drizzle-orm";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

// Adds a new customer to the database, returns the generated customer_id
export async function addCustomer(
  email: string,
  phone: string,
  clerk_id: string
) {
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
export async function addVendor(
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
export async function addLoyaltyCard(
  customer_id: number, //TODO: enforce types
  vendor_id: number,
  points_amt: number,
  carry_over_amt: number
) {
  // Insert loyalty card information
  await db.insert(schema.loyalty_card).values({
    customer_id: customer_id,
    program_id: vendor_id,
    points_amt: points_amt,
    carry_over_amt: carry_over_amt.toString(),
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
        eq(schema.loyalty_card.program_id, vendor_id)
      )
    );

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result[0].id;
}

// Adds a new point redemption
// Timestamp auto generated
async function addPointRedemption(
  loyalty_id, //TODO: enforce types
  history_id,
  points_redeemed
) {
  //take timestamp
  const stamp = new Date().toDateString();

  //insert data
  await db.insert(schema.point_redemption_history).values({
    history_id: history_id,
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

// Gets the customer object
// Input: the customer ID
export async function getCustomer(customer_id: number) {
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
export async function getVendor(clerk_id: string) {
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

export async function deleteVendorReward(reward_id: number) {
  await db.delete(schema.reward).where(eq(schema.reward.reward_id, reward_id));
}

export async function editVendor(
  clerk_id: string,
  name: string,
  business_email: string,
  phone: string,
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
      business_email: business_email,
      business_phone: phone,
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

export async function editVendorLoyaltyProgram(
  vendor_id: number,
  stampLife: number | null,
  stampCount: number,
  scaleAmount: string,
  cardLayout: number,
  stampDesignId: number,
  color1: string,
  color2: string,
  color3: string
) {
  await db
    .update(schema.vendor)
    .set({
      stamp_life: stampLife,
      max_points: stampCount,
      spending_per_point: scaleAmount,
      card_layout: cardLayout,
      stamp_design_id: stampDesignId,
      color: color1,
      color2: color2,
      color3: color3,
    })
    .where(eq(schema.vendor.vendor_id, vendor_id));
}

export async function editVendorReward(
  reward_id: number,
  title: string,
  requiredStamps: number
) {
  await db
    .update(schema.reward)
    .set({
      name: title,
      points_cost: requiredStamps,
    })
    .where(eq(schema.reward.reward_id, reward_id));
}

export async function addVendorReward(
  vendor_id: number,
  title: string,
  requiredStamps: number
) {
  await db.insert(schema.reward).values({
    vendor_id: vendor_id,
    name: title,
    points_cost: requiredStamps,
  });
}

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

// Gets the point redemption history object
// Input: the loyalty card ID
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

// Gets the reward object
// Input: the reward ID
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

// Get all customers has no use case for now...

// Gets all vendors that aren't in a user's wallet in the database
export async function getAllVendorsExceptWallet(customer_id: number) {
  const vendorsAlreadyInWallet = await db
    .select({
      vendor_id: schema.loyalty_card.program_id,
    })
    .from(schema.loyalty_card)
    .where(eq(schema.loyalty_card.customer_id, customer_id));

  let results: {
    vendor_id: number;
    name: string;
    business_image: string | null;
    description: string | null;
  }[] = [];
  // if the customer has no vendors in wallet then just get all vendors to display
  if (vendorsAlreadyInWallet.length === 0) {
    results = await db
      .select({
        vendor_id: schema.vendor.vendor_id,
        name: schema.vendor.name,
        business_image: schema.vendor.business_image,
        description: schema.vendor.description,
      })
      .from(schema.vendor);
  } else {
    const vendor_idAlreadyInWallet = vendorsAlreadyInWallet.map(
      (vendor) => vendor.vendor_id!
    );

    results = await db
      .select({
        vendor_id: schema.vendor.vendor_id,
        name: schema.vendor.name,
        business_image: schema.vendor.business_image,
        description: schema.vendor.description,
      })
      .from(schema.vendor)
      .where(notInArray(schema.vendor.vendor_id, vendor_idAlreadyInWallet));
  }

  type Vendor = {
    vendor_id: number;
    name: string;
    business_image: string | null;
    description: string | null;
  };

  const vendorList: Vendor[] = [];

  for (let i = 0; i < results.length; i++) {
    // Get s3 image url based on the key stored in the db
    const { business_image, ...remainder } = results[i];

    // Make s3 connection
    const s3 = new S3Client({
      region: process.env.BUCKET_REGION || "",
      credentials: {
        accessKeyId: process.env.BUCKET_LOCAL_ACCESS_KEY || "",
        secretAccessKey: process.env.BUCKET_LOCAL_SECRET_ACCESS_KEY || "",
      },
    });

    // Get the url for s3 image
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: business_image || "", //this is the imageName that will be stored into the database, ideally have a default image if the business doesn't have one set
      }),
      { expiresIn: 3600 }
    );

    vendorList.push({
      business_image: url,
      ...remainder,
    });
  }

  return vendorList;
}

// Gets all loyalty cards for a given customer
// Input: the customers customer_id
export async function getAllLoyaltyCardsOfCustomer(customer_id: number) {
  const results = await db
    .select()
    .from(schema.loyalty_card)
    .where(eq(schema.loyalty_card.customer_id, customer_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  type LoyaltyCard = {
    name: string;
    email: string;
    address: string | null;
    phone: string | null;
    color: string | null;
    max_points: number | null;
    spending_per_point: string | null;
    business_logo: string | null;
    desc: string | null;

    points_amt: number;
    carry_over_amt: number;
    vendor_id: number;
  };

  let loyaltyCardInfo: LoyaltyCard[] = [];

  for (let i = 0; i < results.length; i++) {
    const card = results[i];

    if (card.program_id) {
      // Get the vendor information from the vendor table based on the card for the user
      const vendorResults = await db
        .select({
          name: schema.vendor.name,
          email: schema.vendor.email,
          address: schema.vendor.address,
          phone: schema.vendor.phone,
          color: schema.vendor.color,
          max_points: schema.vendor.max_points,
          spending_per_point: schema.vendor.spending_per_point,
          business_logo: schema.vendor.business_logo,
          desc: schema.vendor.description,
        })
        .from(schema.vendor)
        .where(eq(schema.vendor.vendor_id, card.program_id));

      // Check for db query fail
      if (Object.keys(vendorResults).length === 0) {
        console.log("Database query failed");
        return null;
      }

      // Gather all vendor info into an object and push to array

      // Get s3 image url based on the key stored in the db
      const { business_logo, ...remainder } = vendorResults[0];

      // Make s3 connection
      const s3 = new S3Client({
        region: process.env.BUCKET_REGION || "",
        credentials: {
          accessKeyId: process.env.BUCKET_LOCAL_ACCESS_KEY || "",
          secretAccessKey: process.env.BUCKET_LOCAL_SECRET_ACCESS_KEY || "",
        },
      });

      // Get the url for s3 image
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: business_logo || "", //this is the imageName that will be stored into the database, ideally have a default image if the business doesn't have one set
        }),
        { expiresIn: 3600 }
      );

      loyaltyCardInfo.push({
        ...remainder,
        business_logo: url,
        points_amt: card.points_amt,
        carry_over_amt: parseFloat(card.carry_over_amt),
        vendor_id: card.program_id,
      });
    }
  }

  return loyaltyCardInfo;
}

export async function getRedeemable(customer_id: number) {
  const results =
    await db.run(sql`SELECT c.name as vendor_name, c.business_logo, r.name as reward_name, r.points_cost, r.reward_id
        FROM reward r
        INNER JOIN (SELECT v.name, v.business_logo, b.vendor_id, b.points_amt
        FROM vendor v
        INNER JOIN (SELECT vendor_id, points_amt 
        FROM loyalty_card lc
        WHERE customer_id = ${customer_id}) AS b ON b.vendor_id = v.vendor_id) AS c ON r.vendor_id = c.vendor_id
        WHERE c.points_amt >= r.points_cost;`);

  type Redeemables = {
    business_logo: string;
    points_cost: number;
    reward_id: number;
    reward_name: string;
    vendor_name: string;
  }[];

  const redeemables = results.rows as unknown as Redeemables; // Shitty typescript casting

  const redeemablesWithURL: Redeemables = [];

  for (let i = 0; i < redeemables.length; i++) {
    // Get s3 image url based on the key stored in the db
    const { business_logo, ...remainder } = redeemables[i];

    // Make s3 connection
    const s3 = new S3Client({
      region: process.env.BUCKET_REGION || "",
      credentials: {
        accessKeyId: process.env.BUCKET_LOCAL_ACCESS_KEY || "",
        secretAccessKey: process.env.BUCKET_LOCAL_SECRET_ACCESS_KEY || "",
      },
    });

    // Get the url for s3 image
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: business_logo || "", //this is the imageName that will be stored into the database, ideally have a default image if the business doesn't have one set
      }),
      { expiresIn: 3600 }
    );

    redeemablesWithURL.push({
      business_logo: url,
      ...remainder,
    });
  }

  return redeemablesWithURL;
}

// Gets all point redemption history for a given loyalty card
// Input: the loyalty_id of the loyalty card
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

// Gets all previous transactions for a given loyalty card
// Input: the loyalty_id of the loyalty card
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

export async function getVendorLoyaltyProgramInfo(vendor_id: number) {
  const results = await db
    .select({
      businessName: schema.vendor.name,
      businessLogo: schema.vendor.business_logo,
      businessPhone: schema.vendor.business_phone,
      businessEmail: schema.vendor.business_email,
      stampLife: schema.vendor.stamp_life,
      stampCount: schema.vendor.max_points,
      scaleAmount: schema.vendor.spending_per_point,
      cardLayout: schema.vendor.card_layout,
      stampDesignId: schema.vendor.stamp_design_id,
      color1: schema.vendor.color,
      color2: schema.vendor.color2,
      color3: schema.vendor.color3,
    })
    .from(schema.vendor)
    .where(eq(schema.vendor.vendor_id, vendor_id));

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}

export async function getStampDesigns() {
  const results = await db.select().from(schema.stamp_design);
  return results;
}

// Gets all rewards in the program of a given vendor
// Input: the vendor_id of the vendor
export async function getAllRewardsOfVendor(vendor_id: number) {
  const results = await db
    .select({
      reward_id: schema.reward.reward_id,
      title: schema.reward.name,
      requiredStamps: schema.reward.points_cost,
    })
    .from(schema.reward)
    .where(eq(schema.reward.vendor_id, vendor_id))
    .orderBy(schema.reward.points_cost);

  //if there is an error return null
  if (Object.keys(results).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return results;
}

// Gets a customer_id based on a clerk_id
// Input: a clerk id as a string
export async function getCustomerFromClerkID(clerk_id: string) {
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

// Gets a customer_id based on a clerk_id
// Input: a clerk id as a string
export async function getVendorFromClerkID(clerk_id: string) {
  const result = await db
    .select()
    .from(schema.vendor)
    .where(eq(schema.vendor.clerk_id, clerk_id));

  //if there is an error return null
  if (Object.keys(result).length === 0) {
    console.log("Database query failed");
    return null;
  }

  return result;
}

export async function editCustomer(
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

export async function displayOnboardingCards(vendor_id: number) {
  const results =
    await db.run(sql`SELECT o.onboarding_id, o.icon, o.title, o.priority, o.directory, o.buttonText, ov.isCompleted
        FROM vendor v
        JOIN onboarding_vendor ov ON v.vendor_id = ov.vendor_id
        JOIN onboarding o ON ov.onboarding_id = o.onboarding_id
        WHERE v.vendor_id = ${vendor_id}
        ORDER BY o.priority ASC;`);

  type CompletionCardsData = {
    id: number;
    icon: string;
    title: string;
    priority: number;
    isCompleted: boolean;
    directory: string;
    buttonText: string;
  }[];

  const onboardingCards = results.rows as unknown as CompletionCardsData; // Shitty typescript casting

  console.log("Here are the results", onboardingCards);
  return onboardingCards;
}

export async function setOnboardingStatusComplete(
  vendor_id: number,
  oboarding_id: number
) {
  // Logic to update the onboarding_vendor table
  // Set `isCompleted` to true where `vendor_id` and `onboarding_id` match

  await db.run(
    sql`UPDATE onboarding_vendor SET isCompleted = 1 WHERE vendor_id = ${vendor_id} AND onboarding_id = ${oboarding_id};`
  );
}

type BusinessProfileData = {
  name: string;
  business_email: string;
  address: string;
  business_phone: string;
  description: string;
  city: string;
  province: string;
  postal_code: string;
};

export function checkIsBusinessInformationComplete(
  profileData: BusinessProfileData
) {
  // Here, you'd check that all required profile fields are filled in
  // Return true if the profile is complete
  return [
    profileData.name,
    profileData.business_email,
    profileData.address,
    profileData.business_phone,
    profileData.description,
    profileData.city,
    profileData.province,
    profileData.postal_code,
  ].every((field) => field !== undefined && field !== "");
}

// Edits one attribute of a loyalty card
// Input: The loyalty_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
async function editLoyaltyCard(loyalty_id, attribute, newValue) {
  // Update value
  await db
    .update(schema.loyalty_card)
    .set({ [attribute]: [newValue] })
    .where(eq(schema.loyalty_card.loyalty_id, loyalty_id));

  // Test if the query was successful
  const result = await db
    .select({
      r: schema.loyalty_card[attribute],
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

// Edits one attribute of a point redemption history
// Input: The history_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
async function editPointRedemptionHistory(history_id, attribute, newValue) {
  // Update value
  await db
    .update(schema.point_redemption_history)
    .set({ [attribute]: [newValue] })
    .where(eq(schema.point_redemption_history.history_id, history_id));

  // Test if the query was successful
  const result = await db
    .select({
      r: schema.point_redemption_history[attribute],
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

// Edits one attribute of a transaction
// Input: The transaction_id, the attribute name, and the new attribute value
// Returns 1 if successfull, or null if the query failed
async function editTransaction(transaction_id, attribute, newValue) {
  // Update value
  await db
    .update(schema.transaction)
    .set({ [attribute]: [newValue] })
    .where(eq(schema.transaction.transaction_id, transaction_id));

  // Test if the query was successful
  const result = await db
    .select({
      r: schema.transaction[attribute],
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
  await db
    .update(schema.reward)
    .set({ [attribute]: [newValue] })
    .where(eq(schema.reward.reward_id, reward_id));

  // Test if the query was successful
  const result = await db
    .select({
      r: schema.reward[attribute],
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
