import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../packages/api/index"

export const trpc = createTRPCReact<AppRouter>();
