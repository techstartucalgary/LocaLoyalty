/*
To test db_interface
*/

import * as interfac from "./db_interface";

const customer_id = 34783478; //hardcoded id

async function myFunction() {
  const result = interfac.getCustomer(customer_id);
  return result;
}

myFunction().then((data) => console.log(data));
