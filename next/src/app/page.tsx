// import Head from "next/head";
// import PublicNavbar from "@/components/PublicNavbar";

// export default function Home() {
//   return (
//     <>
//       <PublicNavbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
//         <Head>
//           <title>Hello Pages Router with Next.js & Clerk</title>
//           <meta
//             name="description"
//             content="A simple Hello World homepage using Next.js and Clerk"
//           />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg">
//           <div>
//             <h1 className="text-2xl font-bold mb-4 text-blue-500">
//               Landing page
//             </h1>
//             <p className="text-gray-600">
//               This is a simple landing page built with Next.js and Clerk
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import AuthNavbar from "@/components/AuthNavbar";
import SideNavBar from "@/components/SideNavbar";
import { fetchAPI } from "@/utils/generalAxios";
import { useAuthStore } from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect } from "react";

export default function AuthHome() {
  const { getToken } = useAuth();
  const { token, setToken } = useAuthStore();

  useEffect(() => {
    async function fetchToken() {
      const toFetch = await getToken();
      setToken(toFetch);
    }

    fetchToken();
  }, [getToken, setToken]);

  const fetchProtectedData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/sample",
      "GET",
      token,
      null,
      {}
    );
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["protectedData"],
    queryFn: fetchProtectedData,
    enabled: !!token,
  });

  return (
    <>
      <div className="flex flex-row">
        <SideNavBar />
        <div className="flex items-center justify-center flex-grow bg-gradient-to-br from-blue-500 to-purple-500">
          <div className="flex-col bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">
              Authenticated page
            </h1>
            {isLoading && <p>Loading...</p>}
            {data && <div>Data: {JSON.stringify(data)}</div>}
          </div>
        </div>
      </div>
    </>
  );
}