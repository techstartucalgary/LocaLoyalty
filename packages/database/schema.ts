/*
LocaLoyalty database schema
Author: Max Pagels
December 29, 2023

NOTE: "points" and "stamps" mean the same thing. 
*/

import {
  int,
  text,
  mysqlTable,
  serial,
  varchar,
  timestamp,
  decimal,
} from "drizzle-orm/mysql-core";

// Customer
export const customer = mysqlTable("customer", {
  customer_id: serial("customer_id").primaryKey(),
  fname: varchar("fname", { length: 256 }).notNull(),
  lname: varchar("lname", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
  clerk_id: varchar("clerk_id", { length: 16 }),
});

// Vendor
export const vendor = mysqlTable("vendor", {
  vendor_id: serial("vendor_id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
  description: text("description"),
  color: varchar("color", { length: 16 }),
});

// Rewards Program
export const rewards_program = mysqlTable("rewards_program", {
  program_id: serial("program_id").primaryKey(),
  vendor_id: int("vendor_id"),  //references vendor.vendor_id
  details: text("details"),
  spending_per_point: decimal("spending_per_point").notNull(),
  max_points : int("max_points").notNull(),
});

// Loyalty Card
export const loyalty_card = mysqlTable("loyalty_card", {
  loyalty_id: serial("loyalty_id").primaryKey(),
  customer_id: int("customer_id"),  //references customer.customer_id
  program_id: int("program_id"),  //references rewards_program.program_id
  points_amt: int("points_amt").notNull(),
  carry_over_amt: decimal("carry_over_amt").notNull(), //dollars left over not in points
});

// Point Redemption History
export const point_redemption_history = mysqlTable("point_redemption_history", {
  history_id: serial("history_id").primaryKey(),
  loyalty_id: int("loyalty_id"),  //references loyalty_card.loyalty_id
  points_redeemed: int("points_redeemed").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

// Transaction
export const transaction = mysqlTable("transaction", {
  transaction_id: serial("transaction_id").primaryKey(),
  loyalty_id: int("loyalty_id"), //references loyalty_card.loyalty_id
  program_id: int("program_id"), //references rewards_program.program_id
  purchase_amt: decimal("purchase_amt").notNull(),
  points_earned: int("points_earned").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  payment_type: varchar("payment_type", { length: 256 }),
});

// Reward
export const reward = mysqlTable("reward", {
  reward_id: serial("reward_id").primaryKey(),
  program_id: int("program_id"), //references rewards_program.program_id
  name: varchar("name", { length: 256 }),
  description: text("description"),
  points_cost: int("points_cost").notNull(),
});
