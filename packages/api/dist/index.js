"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const businessRoutes_1 = __importDefault(require("./routes/businessRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
dotenv_1.default.config({ path: ".env.local", override: true }); // Override with .env.local
const app = (0, express_1.default)();
let corsOptions = {
    origin: ["http://localhost:3000"],
};
// 1) Global Middlewares
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true })); // parses data sent in HTTP request bodies, especially in web forms
app.use(express_1.default.json()); // parses incoming request bodies that are in JSON format.
// 2) Routes
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/business", (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), businessRoutes_1.default);
app.use("/customer", (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), customerRoutes_1.default);
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
