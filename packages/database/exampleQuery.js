"use strict";
/*
An example of how to query the database with test data
Author: Max Pagels
January 11 2023
*/
exports.__esModule = true;
var dbObj_1 = require("./dbObj");
var schema_1 = require("./schema");
var result = await dbObj_1.db.select({
    field1: schema_1.customer.fname,
    field2: schema_1.customer.lname
}).from(schema_1.customer);
for (var key in result) {
    if (result.hasOwnProperty(key)) {
        console.log(key + ": " + result[key]);
    }
}
