import { Request, Response } from "express";
import { addVendor } from "../../database/db_interface";

export const addCard = async (req: Request, res: Response) => {
  try {
    // Destructure the required fields from the request body
    const {
      name,
      email,
      address,
      phone,
      description,
      color,
      reward_program_details,
      spending_per_point, // ensure this is passed as a string
      max_points,
    } = req.body;

    // Call the addVendor function from your controller
    const vendor_id = await addVendor(
      name,
      email,
      address,
      phone,
      description,
      color,
      reward_program_details,
      spending_per_point,
      max_points
    );

    // If the vendor was added successfully, send back the new vendor ID
    res.status(201).json({ vendor_id });
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
