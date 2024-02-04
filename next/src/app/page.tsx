import Head from "next/head";
import PublicNavbar from "@/components/PublicNavbar";
import Image from "next/image";
import PublicFooter from "@/components/PublicFooter";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <PublicNavbar />
        <div className="">
          <div className="flex items-center justify-center h-40 bg-white-500">
            <h1 className="text-2xl font-bold text-black">LocaLoyalty</h1>
          </div>

          <div className="flex items-center justify-center h-screen bg-white">
            <Image
              src="/assets/17.png"
              alt="LocaLoyalty Logo"
              className="object-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}