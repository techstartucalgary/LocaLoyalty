"use client";
import { Toaster } from "@/components/ui/toaster";
import SideNavbar from "@/components/SideNavbar";
import NotifAccount from "@/components/NotifAccount";
import { useRouter, usePathname } from "next/navigation";
import { useSideNavBarOptionState } from "@/utils/SideNavBarOptionState";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setActiveButton } = useSideNavBarOptionState();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (pathname.startsWith("/auth/loyalty-program")) {
      setActiveButton("2");
    } else if (pathname.startsWith("/auth/promotions")) {
      setActiveButton("3");
    } else if (pathname.startsWith("/auth/analytics")) {
      setActiveButton("4");
    } else if (pathname.startsWith("/auth/profile")) {
      setActiveButton("5");
    } else if (pathname.startsWith("/auth")) {
      setActiveButton("1");
    }
  }, [router, pathname]);

  return isClient ? (
    <>
      <SideNavbar />
      <div className="flex flex-col">
        <div className="ml-auto">
          <NotifAccount />
        </div>
        <main className="ml-40">{children}</main>
      </div>
      <Toaster />
    </>
  ) : null;
}
