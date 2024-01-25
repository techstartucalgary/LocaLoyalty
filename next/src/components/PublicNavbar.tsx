"use client";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white text-black shadow-lg pl-9 py-8 flex flex-row sticky top-0 z-50">
      {/* Website Logo */}
      <Link href="/" className="text-xl ml-100">
        LocaLoyalty
      </Link>

      <Link href={isSignedIn ? "/auth" : "/sign-in"} className="text-xl">
        Login
      </Link>

      {/* Primary Navbar items */}
    </nav>
  );
};

export default Navbar;
