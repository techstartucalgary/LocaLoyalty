/*
LocaLoyalty database schema
Author: Max Pagels
December 29, 2023

NOTE: "points" and "stamps" mean the same thing. 
*/

// New SQLite imports
import {
  sqliteTable,
  integer as int, 
  text, 
  integer as serial, 
  text as varchar, 
  text as timestamp, 
  numeric as decimal,
  //NOTE: SQLite does not have boolean data type, use int set to {1,0}
} from "drizzle-orm/sqlite-core";

// Customer
export const customer = sqliteTable("customer", {
  customer_id: serial("customer_id").primaryKey(),
  fname: varchar("fname", { length: 256 }).notNull(),
  lname: varchar("lname", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
  clerk_id: varchar("clerk_id", { length: 32 }),
});

// Vendor
export const vendor = sqliteTable("vendor", {
  vendor_id: serial("vendor_id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  business_email: varchar("business_email", { length: 256 }),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
  business_phone: varchar("business_phone", { length: 16 }),
  description: text("description"),
  color: varchar("color", { length: 16 }),
  reward_program_details: text("reward_program_details"),
  spending_per_point: decimal("spending_per_point"),
  max_points: int("max_points"),
  clerk_id: varchar("clerk_id", { length: 32 }),
  city: varchar("city", { length: 50 }),
  province: varchar("province", { length: 30 }),
  postal_code: varchar("postal_code", { length: 6 }),
  business_image: text("business_image"),
  business_logo: text("business_logo"),
  merchant_id: varchar("merchant_id", { length: 13 }),
  clover_api_key: varchar("clover_api_key", { length: 200 }),
  stamp_life: int("stamp_life"),
});

// Loyalty Card
export const loyalty_card = sqliteTable("loyalty_card", {
  loyalty_id: serial("loyalty_id").primaryKey(),
  customer_id: int("customer_id"), //references customer.customer_id
  program_id: int("vendor_id"), //references vendor.vendor_id
  points_amt: int("points_amt").notNull(),
  carry_over_amt: decimal("carry_over_amt").notNull(), //dollars left over not in points
});

// Point Redemption History
export const point_redemption_history = sqliteTable("point_redemption_history", {
  history_id: serial("history_id").primaryKey(),
  loyalty_id: int("loyalty_id"), //references loyalty_card.loyalty_id
  points_redeemed: int("points_redeemed").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

// Transaction
export const transaction = sqliteTable("transaction", {
  transaction_id: serial("transaction_id").primaryKey(),
  loyalty_id: int("loyalty_id"), //references loyalty_card.loyalty_id
  vendor_id: int("vendor_id"), //references vendor.vendor_id
  purchase_amt: decimal("purchase_amt").notNull(),
  points_earned: int("points_earned").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  payment_type: varchar("payment_type", { length: 256 }),
});

// Reward
export const reward = sqliteTable("reward", {
  reward_id: serial("reward_id").primaryKey(),
  vendor_id: int("vendor_id"), //references vendor.vendor_id
  name: varchar("name", { length: 256 }),
  description: text("description"),
  points_cost: int("points_cost").notNull(),
});

// Onboarding Completion Cards
export const onboarding = sqliteTable("onboarding", {
  id: serial("onboarding_id").primaryKey(),
  icon: varchar("icon", { length: 255 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  priority: int("priority").notNull(),
  directory: varchar("directory", { length: 256 }).notNull(),
  buttonText: varchar("buttonText", { length: 32 }).notNull(),
});

// onboarding_vendor
export const onboarding_vendor = sqliteTable("onboarding_vendor", {
  id: serial("onboarding_vendor").primaryKey(),
  onboarding_id: int("onboarding_id").notNull(),
  vendor_id: int("vendor_id").notNull(),
  isCompleted: int("isCompleted").notNull(), //boolean (set to 1 or 0)
});
