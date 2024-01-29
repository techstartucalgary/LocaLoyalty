import { Request, Response } from "express";
import {
  getCustomerFromClerkID,
  getAllLoyaltyCardsOfCustomer,
} from "../../database/db_interface";

export const getAllCards = async (req: Request, res: Response) => {
  // get the clerk id of the user
  const clerk_id: string = req.auth.userId;

  try {
    // get the customer id from clerk id
    const customer_id = await getCustomerFromClerkID(clerk_id);
    if (customer_id === null) {
      throw new Error("The customer does not exist!");
    }
    // retrieve of the vendors associated with this user
    const results = await getAllLoyaltyCardsOfCustomer(customer_id);

    // If the retrieval was successful, send back all of the vendor information
    res.status(201).json(results);
  } catch (error) {
    // If there's an error, send back a 500 server error response
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      // Handle the case where the error is not an Error object
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
