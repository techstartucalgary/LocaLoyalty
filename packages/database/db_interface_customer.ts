/*
API for back-end programs to add to and retreive customer data from the database. 
*/

import { db } from "./dbObj";
import * as schema from "./schema";
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

