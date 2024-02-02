import Head from "next/head";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

export default function Home() {
  return (
    <>
      <PublicNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Head>
          <title>Hello Pages Router with Next.js & Clerk</title>
          <meta
            name="description"
            content="A simple Hello World homepage using Next.js and Clerk"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <PublicFooter />
    </>
  );
}
