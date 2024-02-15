import { Toaster } from "@/components/ui/toaster";
import AuthNavbar from "../../components/AuthNavbar";
import SideNavbar from "@/components/SideNavbar";
import NotifAccount from "@/components/NotifAccount";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
