import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import businessRoutes from "./routes/businessRoutes";
import customerRoutes from "./routes/customerRoutes";
import { Webhook } from "svix";
import { addVendor } from "../database/db_interface_vendor";
import { addCustomer, editCustomer } from "../database/db_interface_customer";
import Cookies from "cookies";
import express, { Request, Response, Application, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();
const PORT = process.env.PORT || 5001;

dotenv.config({ path: ".env.local", override: true }); // Override with .env.local

const app: Application = express();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

let corsOptions = {
  origin: ["http://localhost:3000"],
};

// 1) Global Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // parses data sent in HTTP request bodies, especially in web forms
app.use(express.json()); // parses incoming request bodies that are in JSON format.

//Custom middleware for authentication
const ClerkAuthMiddleware = (publicKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //const publicKey = process.env.CLERK_WEBSITE_PEM_PUBLIC_KEY;
    const cookies = new Cookies(req, res);
    const sessToken = cookies.get("__session");
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (sessToken === undefined && token === undefined) {
      return res.status(401).json({ error: "Not signed in" });
    }

    try {
      let decoded: string | JwtPayload;
      if (token) {
        decoded = jwt.verify(token, publicKey!);
      } else {
        decoded = jwt.verify(sessToken!, publicKey!);
      }

      (req.userId = decoded.sub as string), // 'sub' is typically used as the user identifier in JWTs
        // You can add more user-related details here if needed

        next();
    } catch (error) {
      console.log(error);

      return res.status(403).json({
        error: "Invalid Token",
        details: "The provided token is not valid or has expired.",
      });
    }
  };
};

// 2) Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  "/business",
  ClerkAuthMiddleware(process.env.CLERK_WEBSITE_PEM_PUBLIC_KEY!),
  businessRoutes
);
app.use(
  "/customer",
  ClerkAuthMiddleware(process.env.CLERK_MOBILE_PEM_PUBLIC_KEY!),
  customerRoutes
);

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
