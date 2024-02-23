import Head from "next/head";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import PublicLanding from "@/components/PublicMainLandingPage";

export default function Home() {
  return (
    <>
      <PublicNavbar />
      <PublicLanding />
      <PublicFooter />
    </>
  );
}