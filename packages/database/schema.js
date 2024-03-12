"use strict";
exports.__esModule = true;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
var foo = (0, sqlite_core_1.sqliteTable)("foo", {
    bar: (0, sqlite_core_1.text)("bar").notNull()["default"]("Hey!")
});
