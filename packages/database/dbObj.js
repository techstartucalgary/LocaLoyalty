"use strict";
/*
Exports a db object that connects to Planetscale
Author: Max Pagels
Jan 11 2024
*/
exports.__esModule = true;
exports.db = void 0;
require("dotenv/config");
var planetscale_serverless_1 = require("drizzle-orm/planetscale-serverless");
var database_1 = require("@planetscale/database");
var schema = require("./schema.js");
// create the connection
var connection = (0, database_1.connect)({
    host: process.env["DATABASE_HOST"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"]
});
exports.db = (0, planetscale_serverless_1.drizzle)(connection, { schema: schema, mode: 'planetscale' });
