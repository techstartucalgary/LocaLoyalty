/*
To test db_interface
*/

import * as interfac from "./db_interface";

async function myFunction() {
  const result = interfac.getCustomer(customer_id);
  return result;
}


async function func2(){
    interfac.editCustomer(3, "address", "696969");
}

myFunction().then(
    (data) => console.log(data)
);

func2().then(
    (data) => console.log(data)
)
