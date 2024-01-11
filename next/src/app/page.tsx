"use client";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import Head from "next/head";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  async function sessionIDHandler() {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:5001/protected-route", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          mode: "cors",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
      <Head>
        <title>Hello Pages Router with Next.js & Clerk</title>
        <meta
          name="description"
          content="A simple Hello World homepage using Next.js and Clerk"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-blue-500">
            Hello, Pages Router!
          </h1>
          <p className="text-gray-600">
            This is a simple homepage built with Next.js and Clerk
          </p>
        </div>
        <div className="flex flex-col items-center mt-3">
          <SignedOut>
            <b>You are not logged in yet!</b>
          </SignedOut>
          <SignedIn>
            <b>You are logged in now!</b>
            <br />
            <button
              className="text-md font-bold mt-2 mr-2 py-2 text-grey-500 border-solid border-2 border-black rounded-lg"
              onClick={sessionIDHandler}
            >
              Click me!
            </button>
            <h1>Data from API:</h1>
            {/* <p>SessionID:{data.sessionId}</p> */}
            <p>sessionID: {JSON.stringify(data.sessionId, null, 2)}</p>
            <p>userID: {JSON.stringify(data.userId, null, 2)}</p>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
