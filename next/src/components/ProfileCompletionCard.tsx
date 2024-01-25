import Image from "next/image";
import { Button } from "./ui/button";

export const ProfileCompletionCard = () => {
  return (
    <div className="border-2 border-slate-400 p-3 flex flex-col w-1/4 rounded-md gap-2">
      <Image
        src="/assets/tag-icon.png"
        alt="icon indicating what task needs to be done to complete profile"
        width={35}
        height={35}
      />
      <p className="text-lg leading-5 font-bold">Create your loyalty program</p>
      <Button className=" bg-black w-1/2 h-8 hover:bg-white hover:border-2 hover:text-black border-black">
        Create
      </Button>
    </div>
  );
};
