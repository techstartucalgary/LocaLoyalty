import { Toaster } from "@/components/ui/toaster";
import AuthNavbar from "../../components/AuthNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavbar />
      <main>{children}</main>
      <Toaster />
    </>
  );
}
