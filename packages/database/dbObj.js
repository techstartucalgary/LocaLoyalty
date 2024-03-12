"use strict";
/*
Exports a db object that connects to Planetscale
Author: Max Pagels
Jan 11 2024
*/
exports.__esModule = true;
exports.db = void 0;
require("dotenv/config");
var libsql_1 = require("drizzle-orm/libsql");
var client_1 = require("@libsql/client");
var turso = (0, client_1.createClient)({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});
exports.db = (0, libsql_1.drizzle)(turso);
