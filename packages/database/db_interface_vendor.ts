/*
API for back-end programs to add to and retreive vendor data from the database. 
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
  description: string
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
  stampValue: string,
  color1: string,
  color2: string,
  color3: string
) {
  let result = await db
    .select({
      stamp_design_id: schema.stamp_design.stamp_design_id,
    })
    .from(schema.stamp_design)
    .where(eq(schema.stamp_design.value, stampValue));

  let stampDesignId = result[0].stamp_design_id;

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
      stampValue: schema.stamp_design.value,
      color1: schema.vendor.color,
      color2: schema.vendor.color2,
      color3: schema.vendor.color3,
    })
    .from(schema.vendor)
    .leftJoin(
      schema.stamp_design,
      eq(schema.vendor.stamp_design_id, schema.stamp_design.stamp_design_id)
    )
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

export async function getBusinessQrCode(clerk_id: string) {
  let result = await db
    .select({
      qr_code: schema.vendor.qr_code,
    })
    .from(schema.vendor)
    .where(eq(schema.vendor.clerk_id, clerk_id));

  return result != null ? result[0].qr_code : null;
}

export async function updateBusinessQrCode(
  clerk_id: string,
  new_qr_code: string
) {
  await db
    .update(schema.vendor)
    .set({ qr_code: new_qr_code })
    .where(eq(schema.vendor.clerk_id, clerk_id));
}
