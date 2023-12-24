"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.router = exports.t = void 0;
const server_1 = require("@trpc/server");
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const svix_1 = require("svix");
const PORT = process.env.port || 5001;
dotenv_1.default.config();
// created for each request
const createContext = ({ req, res, }) => ({
// TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
exports.t = server_1.initTRPC.context().create();
exports.router = exports.t.router;
exports.appRouter = exports.t.router({
    //   getUser: t.procedure.input(z.string()).query((opts) => {
    //     opts.input; // string
    //     return { id: opts.input, name: 'Bilbo' };
    //   }),
    //   createUser: t.procedure
    //     .input(z.object({ name: z.string().min(5) }))
    //     .mutation(async (opts) => {
    //       // use your ORM of choice
    //       return await UserModel.create({
    //         data: opts.input,
    //       });
    //     }),
    getHello: exports.t.procedure.query(() => {
        return [1, 2, 3];
    }),
    // TODO: Make procedures, ideally in another file for organization
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: exports.appRouter,
    createContext,
}));
app.post("/clerk/webhook", (req, res) => {
    const payload = JSON.stringify(req.body);
    const headers = {
        "svix-id": req.header("svix-id") || "",
        "svix-timestamp": req.header("svix-timestamp") || "",
        "svix-signature": req.header("svix-signature") || "",
    };
    const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY;
    const wh = new svix_1.Webhook(clerkWebhookSecret);
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
    }
    catch (err) {
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
