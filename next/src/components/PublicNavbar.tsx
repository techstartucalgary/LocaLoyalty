"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import PublicNavBarOptions from "./PublicNavBarOptions";

const Navbar = () => {

  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white flex flex-row justify-between items-center sticky top-0 h-[110px] px-6">
      {/* Website Logo */}
      <div className="flex items-center gap-10">
        <Link href="" className="flex flex-col items-center">
          <Image
            src="/assets/Logo.png"
            width={60}
            height={60}
            alt="Picture of LocaLoyalty Logo"
          />
          <h1 className="font-extrabold text-xl">LOCALOYALTY</h1>
        </Link>

        {/* Primary Navbar Items */}
        <div className="flex gap-8 ml-6">
          <PublicNavBarOptions 
            title="Home"
            link=""
            id="1"
          />

          <PublicNavBarOptions 
            title="About"
            link=""
            id="2"
          />

          <PublicNavBarOptions 
            title="Contact"
            link=""
            id="3"
          />

          <PublicNavBarOptions 
            title="Pricing"
            link=""
            id="4"
          />
        </div>
      </div>

      {/* Register + Login Buttons */}
      <div className="flex items-center gap-6 text-center">
        <Link
          href="/sign-up"
          className="bg-black w-[105px] text-white py-2 rounded-lg"
        >
          <h1 className="text-lg font-semibold">Register</h1>
        </Link>
        <Link
          href={isSignedIn ? "/auth" : "/sign-in"}
          className="bg-white text-black w-[105px] py-2 rounded-lg outline outline-2"
        >
          <h1 className="text-lg font-semibold">Login</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
