import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-5 flex flex-row sticky top-0 z-50">
      {/* Website Logo */}
      <Link href="/auth" className="text-xl">
        LocaLoyalty
      </Link>

      <UserButton afterSignOutUrl="/" />

      {/* Primary Navbar items */}
    </nav>
  );
};

export default Navbar;
