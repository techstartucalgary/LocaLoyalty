import { Request, Response } from "express";
import {
  addLoyaltyCard,
  getCustomerFromClerkID,
  getAllLoyaltyCardsOfCustomer,
  getRedeemable,
  getAllVendorsExceptWallet,
} from "../../database/db_interface_customer";

// Method to list all vendors
export const getAllVendors = async (req: Request, res: Response) => {
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

    const vendors = await getAllVendorsExceptWallet(customer_id); // Retrieve all list of vendors from the database

    console.log(vendors);

    // Send the vendors back in the response
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

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
    res
      .status(500)
      .json({ message: "Internal server error. Error fetching loyalty cards" });
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

    const loyalty_id = await addLoyaltyCard(
      customer_id,
      req.body.vendor_id,
      0,
      0
    );

    // Send the loyalty id back in the response
    res.status(200).json(loyalty_id);
  } catch (error) {
    console.error("Error adding new card to wallet: ", error);
    res
      .status(500)
      .json({
        message: "Internal server error. Error adding new card to wallet",
      });
  }
};

export const getRedeemables = async (req: Request, res: Response) => {
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

    const redeemables = await getRedeemable(customer_id);

    // Send the redeemables back in the response
    res.status(200).json(redeemables);
  } catch (error) {
    console.error("Error retrieving redeemables: ", error);
    res
      .status(500)
      .json({ message: "Internal server error. Error retrieving redeemables" });
  }
};
