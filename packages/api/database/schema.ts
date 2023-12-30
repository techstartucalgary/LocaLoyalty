/*
LocaLoyalty database schema
Author: Max Pagels
December 29, 2023
*/

import { int, text, mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";

// Customer
export const customer = mysqlTable("customer", {
  customer_id: serial("customer_id").primaryKey(),
  fname: varchar("fname", { length: 256 }).notNull(),
  lname: varchar("lname", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
});

// Vendor
export const vendor = mysqlTable("vendor", {
  vendor_id: serial("vendor_id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }),
  phone: varchar("phone", { length: 16 }),
});

// Rewards Program
export const rewards_program = mysqlTable("rewards_program", {
  program_id: serial("program_id").primaryKey(),
  vendor_id: serial("vendor_id"), //FK to vendor
  details: text('details'),
});

// Loyalty Card
export const loyalty_card = mysqlTable("loyalty_card", {
  loyalty_id: serial("loyalty_id").primaryKey(),
  customer_id: serial("customer_id"), //FK to customer
  program_id: serial("program_id"), //FK to rewards program
  points_amt: int("points_amt").notNull(),
});

// Point Redemption History
export const point_redemption_history = mysqlTable("point_redemption_history", {
  history_id: serial("history_id").primaryKey(),
  loyalty_id: serial("loyalty_id"), //FK to loyalty card
  points_redeemed: int("points_redeemed").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

// Transaction
export const transaction = mysqlTable("transaction", {
  transaction_id: serial("transaction_id").primaryKey(),
  loyalty_id: serial("loyalty_id"), //FK to loyalty card
  program_id: serial("program_id"), //FK to program
  purchase_amt: int("purchase_amt").notNull(),
  points_earned: int("points_earned").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  payment_type: varchar("payment_type", { length: 16 }),
});