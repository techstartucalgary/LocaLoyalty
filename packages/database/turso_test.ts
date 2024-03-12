import { db } from "./dbObj";
import * as schema from "./schema.js";


async function func1(){
    const result = await db.select().from(schema.foo).all();
    return result
}

func1().then(
    (data) => console.log(data)
);