import { Request, Response } from "express";
import {
  getCustomerFromClerkID,
  getAllLoyaltyCardsOfCustomer,
  addLoyaltyCard
} from "../../database/db_interface";

export const getAllCards = async (req: Request, res: Response) => {
  try {
    // Retrieve Clerk user ID from the authentication information
    const clerkId = req.auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Use the helper function to get the customer ID based on Clerk ID
    const customer = await getCustomerFromClerkID(clerkId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Assuming the customer object contains a customer_id field
    const customer_id = customer[0].customer_id;

    // Use the helper function to get all loyalty cards for the customer
    const loyaltyCards = await getAllLoyaltyCardsOfCustomer(customer_id);

    if (!loyaltyCards) {
      return res.status(404).json({ message: "Loyalty cards not found" });
    }

    console.log(loyaltyCards);

    // Send the loyalty cards back in the response
    res.status(200).json(loyaltyCards);
  } catch (error) {
    console.error("Error fetching loyalty cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCard = async (req: Request, res: Response) => {

  try {

    // Retrieve Clerk user ID from the authentication information
    const clerkId = req.auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Use the helper function to get the customer ID based on Clerk ID
    const customer = await getCustomerFromClerkID(clerkId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Assuming the customer object contains a customer_id field
    const customer_id = customer[0].customer_id;

    const loyalty_id = await addLoyaltyCard(customer_id, req.body.vendor_id, 0, 0)

    // Send the loyalty id back in the response
    res.status(200).json(loyalty_id);
  } catch (error) {
    console.error("Error adding new card to wallet: ", error)
    res.status(500).json({ message: "Internal server error" });
  }
}