"use client";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosError } from "axios";

export default function Home() {
  const { getToken } = useAuth();

  const fetchProtectedData = async () => {
    const token = await getToken();

    try {
      const response = await axios.get(
        "http://localhost:5001/protected-route",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // Handle error appropriately
      // Axios wraps the error response in error.response
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", axiosError.response);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received:", axiosError.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", axiosError.message);
      }

      throw error; // You can decide how to handle the error and whether to re-throw it
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["protectedData"],
    queryFn: fetchProtectedData,
  });

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
          {isLoading && <p>Loading...</p>}
          {data && <div>Data: {JSON.stringify(data)}</div>}
        </div>
      </div>
    </div>
  );
}
