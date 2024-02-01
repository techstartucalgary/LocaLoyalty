import dotenv from "dotenv";
import { ClerkExpressRequireAuth, StrictAuthProp } from "@clerk/clerk-sdk-node";
import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import businessRoutes from "./routes/businessRoutes";
import customerRoutes from "./routes/customerRoutes";
import { Webhook } from "svix";
import { addCustomer, addVendor, editCustomer } from "../database/db_interface";

const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();
const PORT = process.env.PORT || 5001;

dotenv.config({ path: ".env.local", override: true }); // Override with .env.local

const app: Application = express();

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

let corsOptions = {
  origin: ["http://localhost:3000"],
};

// 1) Global Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // parses data sent in HTTP request bodies, especially in web forms
app.use(express.json()); // parses incoming request bodies that are in JSON format.

// 2) Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/business", ClerkExpressRequireAuth(), businessRoutes);
app.use("/customer", ClerkExpressRequireAuth(), customerRoutes);

// 3) webhooks for login
app.post("/mobile-webhook", async (req, res) => {
  const payload = JSON.stringify(req.body);
  const headers = {
    "svix-id": req.header("svix-id") || "",
    "svix-timestamp": req.header("svix-timestamp") || "",
    "svix-signature": req.header("svix-signature") || "",
  };

  const clerkWebhookSecret = process.env.CLERK_MOBILE_WEBHOOK_SECRET_KEY;
  const wh = new Webhook(clerkWebhookSecret!);

  try {
    const verified = wh.verify(payload, headers);

    if (verified) {
      let data = req.body.data;
      switch (req.body.type) {
        case "user.updated":
          await editCustomer(data.id, data.first_name, data.last_name);

          break;
        case "user.created":
          await addCustomer(
            data.email_address,
            data.phone_numbers[0].phone_number,
            data.id
          );

          break;
      }

      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res
      .status(400)
      .json({ success: false, message: "Webhook could not be processed" });
  }
});

app.post("/website-webhook", async (req, res) => {
  const payload = JSON.stringify(req.body);
  const headers = {
    "svix-id": req.header("svix-id") || "",
    "svix-timestamp": req.header("svix-timestamp") || "",
    "svix-signature": req.header("svix-signature") || "",
  };

  const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
  const wh = new Webhook(clerkWebhookSecret!);

  try {
    const verified = wh.verify(payload, headers);

    if (verified) {
      let data = req.body.data;
      switch (req.body.type) {
        case "user.updated":
          break;
        case "user.created":
          await addVendor(
            data.first_name,
            data.email_addresses[0].email_address,
            data.phone_numbers[0].phone_number,
            data.id
          );
          break;
      }

      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res
      .status(400)
      .json({ success: false, message: "Webhook could not be processed" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
