"use client";
import Link from "next/link";
import Image from "next/image";
import SideNavBarOptions from "@/components/SideNavBarOptions";

import { UserButton, SignedOut } from "@clerk/nextjs";
import { useSideNavBarStore } from "../utils/SideNavBarState";

import { FiMenu } from "react-icons/fi";
import { TbLayoutDashboard, TbSpeakerphone } from "react-icons/tb";
import { BiGift } from "react-icons/bi";
import { MdBarChart, MdOutlineHelpOutline } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { useEffect, useState } from "react";

const SideNavbar = () => {
  const { open, setOpen } = useSideNavBarStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div
        className={`z-50 fixed text-black h-screen flex flex-col px-3 pt-10 shadow-[5.0px_0px_15px_rgba(0,0,0,5%)] duration-300 ${
          open ? "w-[280px]" : "w-[80px]"
        }`}
      >
        {/* LocaLoyalty Logo + Hamburger Button */}
        <div
          className={`flex flex-row items-center gap-4 duration-300 ${
            !open && "justify-center"
          }`}
        >
          <Image
            src="/assets/Logo.png"
            alt="LocaLoyalty Logo"
            className={`${!open && "hidden"}`}
            width={50}
            height={50}
          />
          <h1
            className={`font-extrabold text-xl duration-300 ${
              !open && "hidden"
            }`}
          >
            LOCALOYALTY
          </h1>
          <button className={`${!open && "pt-[13px]"}`}>
            <FiMenu size={24} onClick={() => setOpen(!open)} />
          </button>
        </div>

        {/* STORE */}
        <div className={`${open ? "pt-10" : "pt-[77.1px]"}`}>
          <h2 className={`font-extrabold pl-4 ${!open && "hidden"}`}>STORE</h2>
          <div className="space-y-3 pt-3">
            <SideNavBarOptions
              title="Dashboard"
              icon={TbLayoutDashboard}
              link=""
              id="1"
            />

            <SideNavBarOptions
              title="Loyalty Program"
              icon={BiGift}
              link=""
              id="2"
            />

            <SideNavBarOptions
              title="Promotions"
              icon={TbSpeakerphone}
              link=""
              id="3"
            />

            <SideNavBarOptions
              title="Analytics"
              icon={MdBarChart}
              link=""
              id="4"
            />

            <SideNavBarOptions
              title="Settings"
              icon={LuSettings}
              link=""
              id="5"
            />
          </div>
        </div>

        {/* SUPPORT */}
        <div className={`${open ? "pt-8" : "pt-[56px]"}`}>
          <h2 className={`font-extrabold pl-4 ${!open && "hidden"}`}>
            SUPPORT
          </h2>
          <div className="space-y-3 pt-3">
            <SideNavBarOptions
              title="Help Center"
              icon={MdOutlineHelpOutline}
              link=""
              id="6"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default SideNavbar;
