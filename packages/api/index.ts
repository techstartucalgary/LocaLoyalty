import dotenv from "dotenv";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { Webhook } from "svix";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import businessRoutes from "./routes/businessRoutes";
import customerRoutes from "./routes/customerRoutes";

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

/*
app.post("/clerk/webhook", (req, res) => {
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

    // If verification succeeds, process the webhook event
    console.log("Webhook verified:", verified);

    let body = req.body;
    switch (body.type) {
      case "session.created":
        //console.log("session id for the started session: " + payload.data.id);
        //console.log("user id for the started session: " + payload.data.user_id);
        break;
      case "session.ended":
        //when a user logs out or closes the tab
        break;
      case "session.removed":
        //when a session expires??? or something like that idk
        break;
      case "user.created":
        //when a new user signs up for active living through clerk
        break;
    }

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res
      .status(400)
      .json({ success: false, message: "Webhook could not be processed" });
  }
});
*/

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
