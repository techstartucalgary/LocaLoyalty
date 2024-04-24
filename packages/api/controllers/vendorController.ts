import { Request, Response } from "express";
import {
  getAllRewardsOfVendor,
  getAllVendorsExceptWallet,
  getCustomerFromClerkID,
} from "../../database/db_interface_vendor";

// export const addCard = async (req: Request, res: Response) => {
//   try {
//     // Destructure the required fields from the request body
//     const {
//       name,
//       email,
//       address,
//       phone,
//       description,
//       color,
//       reward_program_details,
//       spending_per_point, // ensure this is passed as a string
//       max_points,
//     } = req.body;

//     // Call the addVendor function from your controller
//     const vendor_id = await addVendor(
//       name,
//       email,
//       address,
//       phone,
//       description,
//       color,
//       reward_program_details,
//       spending_per_point,
//       max_points
//     );

//     // If the vendor was added successfully, send back the new vendor ID
//     res.status(201).json({ vendor_id });
//   } catch (error) {
//     // If there's an error, send back a 500 server error response
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       // Handle the case where the error is not an Error object
//       res.status(500).json({ error: "An unknown error occurred" });
//     }
//   }
// };

// Method to list all vendors
export const index = async (req: Request, res: Response) => {
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

// Method to get all rewards for a given vendor
export const getRewards = async (req: Request, res: Response) => {
  try {
    // Retrieve Clerk user ID from the authentication information
    const clerkId = req.auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Use the helper function to get all rewards for a given vendor
    const rewards = await getAllRewardsOfVendor(parseInt(req.params.vendorID));

    if (!rewards) {
      return res.status(404).json({ message: "Rewards not found" });
    }

    // Send the rewards back in the response
    res.status(200).json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Error fetching rewards." });
  }
};
