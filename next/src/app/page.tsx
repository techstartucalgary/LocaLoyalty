"use client";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

export default function Home() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { getToken } = useAuth();

  // async function sessionIDHandler() {
  //   try {
  //     const token = await getToken();
  //     const response = await fetch("http://localhost:5001/protected-route", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //         mode: "cors",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     setData(result);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // }

  const [fetchOnDemand, setFetchOnDemand] = useState(false);
  const { getToken } = useAuth();

  const fetchProtectedData = async () => {
    const token = await getToken();
    const response = await fetch("http://localhost:5001/protected-route", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, error, isLoading } = useQuery(
    ["protectedData"],
    fetchProtectedData,
    { enabled: fetchOnDemand } // This controls when the query is executed
  );

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
          <button
            className="text-md font-bold mt-2 mr-2 py-2 text-grey-500 border-solid border-2 border-black rounded-lg"
            onClick={() => setFetchOnDemand(true)}
          >
            Click me!
          </button>
          {/* <h1>Data from API:</h1> */}
          {/* <p>
            userID: {data ? JSON.stringify(data?.userId, null, 2) : "No data"}
          </p> */}
          {isLoading && <p>Loading...</p>}
          {/* {error && <p>Error: {error.message}</p>} */}
          {data && <div>Data: {JSON.stringify(data)}</div>}
        </div>
      </div>
    </div>
  );
}
