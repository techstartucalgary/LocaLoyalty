
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

const foo = sqliteTable("foo", {
  bar: text("bar").notNull().default("Hey!"),
});


const foo2 = sqliteTable("foo2", {
  bar: text("bar").notNull().default("Hey!"),
});


