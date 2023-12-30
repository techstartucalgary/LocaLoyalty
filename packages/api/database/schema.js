"use strict";
/*
LocalLoyalty database schema
Author: Max Pagels
December 29, 2023
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var mysql_core_1 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)("users", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    fullName: (0, mysql_core_1.text)("full_name"),
    phone: (0, mysql_core_1.varchar)("phone", { length: 256 }),
    address: (0, mysql_core_1.varchar)("address", { length: 256 }),
});
//TODO...
