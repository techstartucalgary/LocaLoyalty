"use strict";
/*
LocaLoyalty database schema
Author: Max Pagels
December 29, 2023
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.reward = exports.transaction = exports.point_redemption_history = exports.loyalty_card = exports.rewards_program = exports.vendor = exports.customer = void 0;
var mysql_core_1 = require("drizzle-orm/mysql-core");
// Customer
exports.customer = (0, mysql_core_1.mysqlTable)("customer", {
    customer_id: (0, mysql_core_1.serial)("customer_id").primaryKey(),
    fname: (0, mysql_core_1.varchar)("fname", { length: 256 }).notNull(),
    lname: (0, mysql_core_1.varchar)("lname", { length: 256 }).notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 256 }).notNull(),
    address: (0, mysql_core_1.varchar)("address", { length: 256 }),
    phone: (0, mysql_core_1.varchar)("phone", { length: 16 }),
    clerk_id: (0, mysql_core_1.varchar)("clerk_id", { length: 16 }),
});
// Vendor
exports.vendor = (0, mysql_core_1.mysqlTable)("vendor", {
    vendor_id: (0, mysql_core_1.serial)("vendor_id").primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 256 }).notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 256 }).notNull(),
    address: (0, mysql_core_1.varchar)("address", { length: 256 }),
    phone: (0, mysql_core_1.varchar)("phone", { length: 16 }),
    description: (0, mysql_core_1.text)("description"),
});
// Rewards Program
exports.rewards_program = (0, mysql_core_1.mysqlTable)("rewards_program", {
    program_id: (0, mysql_core_1.serial)("program_id").primaryKey(),
    vendor_id: (0, mysql_core_1.int)("vendor_id"), //references vendor.vendor_id
    details: (0, mysql_core_1.text)("details"),
    spending_per_point: (0, mysql_core_1.decimal)("spending_per_point"),
});
// Loyalty Card
exports.loyalty_card = (0, mysql_core_1.mysqlTable)("loyalty_card", {
    loyalty_id: (0, mysql_core_1.serial)("loyalty_id").primaryKey(),
    customer_id: (0, mysql_core_1.int)("customer_id"), //references customer.customer_id
    program_id: (0, mysql_core_1.int)("program_id"), //references rewards_program.program_id
    points_amt: (0, mysql_core_1.int)("points_amt").notNull(),
    carry_over_amt: (0, mysql_core_1.decimal)("carry_over_amt").notNull(), //dollars left over not in points
});
// Point Redemption History
exports.point_redemption_history = (0, mysql_core_1.mysqlTable)("point_redemption_history", {
    history_id: (0, mysql_core_1.serial)("history_id").primaryKey(),
    loyalty_id: (0, mysql_core_1.int)("loyalty_id"), //references loyalty_card.loyalty_id
    points_redeemed: (0, mysql_core_1.int)("points_redeemed").notNull(),
    timestamp: (0, mysql_core_1.timestamp)("timestamp").notNull(),
});
// Transaction
exports.transaction = (0, mysql_core_1.mysqlTable)("transaction", {
    transaction_id: (0, mysql_core_1.serial)("transaction_id").primaryKey(),
    loyalty_id: (0, mysql_core_1.int)("loyalty_id"), //references loyalty_card.loyalty_id
    program_id: (0, mysql_core_1.int)("program_id"), //references rewards_program.program_id
    purchase_amt: (0, mysql_core_1.decimal)("purchase_amt").notNull(),
    points_earned: (0, mysql_core_1.int)("points_earned").notNull(),
    timestamp: (0, mysql_core_1.timestamp)("timestamp").notNull(),
    payment_type: (0, mysql_core_1.varchar)("payment_type", { length: 256 }),
});
// Reward
exports.reward = (0, mysql_core_1.mysqlTable)("reward", {
    reward_id: (0, mysql_core_1.serial)("reward_id").primaryKey(),
    program_id: (0, mysql_core_1.int)("program_id"), //references rewards_program.program_id
    name: (0, mysql_core_1.varchar)("name", { length: 256 }),
    description: (0, mysql_core_1.text)("description"),
    points_cost: (0, mysql_core_1.int)("points_cost").notNull(),
});