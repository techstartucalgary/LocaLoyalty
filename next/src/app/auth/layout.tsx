import { Toaster } from "@/components/ui/toaster";
import AuthNavbar from "../../components/AuthNavbar";
import SideNavbar from "@/components/SideNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideNavbar />
      <main className="ml-40">{children}</main>
      <Toaster />
    </>
  );
}
