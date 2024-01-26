import { UserButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import SideNavBarOptions from "@/components/SideNavBarOptions";
import SideNavBar from "@/components/SideNavbar";

import { FiMenu } from "react-icons/fi";
import { TbLayoutDashboard, TbSpeakerphone } from "react-icons/tb";
import { BiGift } from "react-icons/bi";
import { MdBarChart, MdOutlineHelpOutline } from "react-icons/md";
import { LuSettings } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="bg-white text-black flex flex-col h-screen px-3 pt-10 shadow-[5.0px_0px_15px_rgba(0,0,0,5%)]">
      {/* LocaLoyalty Logo + Hamburger Button */}
      <div className="flex flex-row items-center">
        <Image
          src="/assets/logo.png"
          alt="LocaLoyalty Logo"
          width={50}
          height={50}
        />
        <h1 className="font-extrabold text-xl pl-4">LOCALOYALTY</h1>
        <button className="pl-4">
          <FiMenu size={25}/>
        </button>
      </div>

      {/* STORE */}
      <div className="pt-10">
        <h2 className="font-extrabold pl-4">STORE</h2>
        <div className="space-y-3 pt-3">
          <Link href="" className="flex flex-row items-center p-4 rounded-md border-2 border-black border-500">
            <TbLayoutDashboard size={25}/>
            <h3 className="font-semibold pl-4 text-sm">Dashboard</h3>
          </Link>

          <SideNavBarOptions title="Loyalty Program" icon={BiGift} link="" />

          <SideNavBarOptions title="Promotions" icon={TbSpeakerphone} link="" />

          <SideNavBarOptions title="Analytics" icon={MdBarChart} link="" />

          <SideNavBarOptions title="Settings" icon={LuSettings} link="" />
        </div>
      </div>

      {/* SUPPORT */}
      <div className="pt-8">
        <h2 className="font-extrabold pl-4">SUPPORT</h2>
        <div className="space-y-3 pt-3">
          <SideNavBarOptions title="Help Center" icon={MdOutlineHelpOutline} link="" />
        </div>
      </div>

      {/* SIGNOUT */}
      <div className="pt-10 pl-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
