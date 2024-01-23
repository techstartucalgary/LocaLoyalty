import Head from "next/head";
import PublicNavbar from "@/components/PublicNavbar";

export default function Home() {
  return (
    <>
      <PublicNavbar />
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
              Landing page
            </h1>
            <p className="text-gray-600">
              This is a simple landing page built with Next.js and Clerk
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
