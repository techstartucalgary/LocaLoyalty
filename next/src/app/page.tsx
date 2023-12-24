"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/lib/trpc";
import Head from "next/head";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5001/trpc",
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
          <Head>
            <title>Hello Pages Router with Next.js & Clerk</title>
            <meta
              name="description"
              content="A simple Hello World homepage using Next.js and Clerk"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">
              Hello, Pages Router!
            </h1>
            <p className="text-gray-600">
              This is a simple homepage built with Next.js and Clerk
            </p>
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
