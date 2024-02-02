"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from 'next/image';

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white h-[100px] text-black shadow-lg py-5 flex flex-row sticky top-0 justify-between items-center">
      
      {/* Website Logo */}
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            width={40}
            height={40}
            alt="Picture of LocaLoyalty Logo"
          />
          <Link href="/" className="text-xl">
            <h1 className="font-extrabold text-xl pl-4">LOCALOYALTY</h1>
          </Link>
        </div>

        {/* Primary Navbar items */}
        <div className="space-x-4">
          <a href="#" className="">Home</a>
          <a href="#" className="">About</a>
          <a href="#" className="">Contact</a>
          <a href="#" className="">Pricing</a>
        </div>
      </div>

      <div className="flex items-center bg-white gap-2 mr-5">    
        <button className="bg-black w-24 text-white px-4 py-2 rounded-md mr-4">
          Register
        </button>

        <button className="bg-white w-24 text-black px-4 py-2 rounded-md border border-2 border-black">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;