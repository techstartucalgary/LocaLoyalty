import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-20">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-5">
          <Image
            src="/assets/Logo.png"
            width={80}
            height={80}
            alt="Picture of LocaLoyalty Logo"
          />
          <p className="text-5xl font-semibold">LocaLoyalty</p>
        </div>
        <Image
          src="/assets/LHS2.png"
          width={400}
          height={400}
          alt="Picture of LocaLoyalty Logo"
        />
      </div>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-black",
          },
        }}
      />
    </div>
  );
}
