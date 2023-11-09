import { z } from 'zod';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

const PORT = process.env.port || 5000;

// created for each request
const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({

    // TODO: CREATE context for each request where we provide the auth session and the db connection

  }); // no context
  type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router

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
    getHello: t.procedure.query( () => {
        return [1,2,3];
    })

    // TODO: Make procedures, ideally in another file for organization
});

// export type definition of API
export type AppRouter = typeof appRouter;

const app = express();

app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/', (req, res) => {
    res.send("Hello")
});

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
    
});
