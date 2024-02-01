"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { CompletionCardProps } from "@/utils/store";
import { useRouter } from "next/navigation";

export const ProfileCompletionCard = ({
  icon,
  title,
  directory,
  buttonText,
}: CompletionCardProps) => {
  const router = useRouter();

  return (
    <div className="border-2 border-slate-400 p-3 flex flex-col w-1/4 rounded-md gap-2">
      <Image
        src={icon}
        alt="icon indicating what task needs to be done to complete profile"
        width={35}
        height={35}
      />
      <p className="text-lg leading-5 font-bold">{title}</p>
      <Button
        onClick={() => {
          router.push(directory);
        }}
        className=" bg-black w-1/2 h-8 hover:bg-white hover:border-2 hover:text-black border-black"
      >
        {buttonText}
      </Button>
    </div>
  );
};
