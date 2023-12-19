import { string, z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Webhook } from "svix";

const PORT = process.env.port || 5001;
dotenv.config();
// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  // TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const appRouter = t.router({
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
  getHello: t.procedure.query(() => {
    return [1, 2, 3];
  }),

  // TODO: Make procedures, ideally in another file for organization
});

// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
