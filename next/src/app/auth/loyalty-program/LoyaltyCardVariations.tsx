import { Progress } from "@/components/ui/progress";
import { useLoyaltyProgramStore } from "@/utils/store";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";

const CurrentStamps = () => {
  const { stampCount } = useLoyaltyProgramStore();
  return (
    <div
      className={`flex justify-center flex-wrap gap-5 mx-auto ${
        stampCount > 7 ? "w-3/4" : ""
      }`}
    >
      {Array.from({ length: stampCount }, (_, i) => i + 1).map((number) => (
        <Image
          key={number}
          alt=""
          width={50}
          height={50}
          src={"/assets/defaultStamp.png"}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="flex justify-evenly">
      <div className="flex gap-2 items-center">
        <FaPhoneAlt />
        <p>000-000-0000</p>
      </div>
      <div className="flex gap-2 items-center">
        <IoMdMail />
        <p>businessname@gmail.com</p>
      </div>
    </div>
  );
};

export const LoyaltyProgress = () => {
  const { scaleAmount } = useLoyaltyProgramStore();

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="font-semibold">Your progress</p>
        <p>$X until your next stamp</p>
      </div>
      <Progress value={50} />
      <p className="text-right font-semibold">${scaleAmount}</p>
    </div>
  );
};

export const RewardsPreview = () => {
  const { definedRewards } = useLoyaltyProgramStore();

  return (
    <div className="flex flex-col gap-3 w-5/6 mx-auto">
      {definedRewards
        .sort((a, b) => a.requiredStamps - b.requiredStamps)
        .map((item) => {
          return (
            <div
              key={item.reward_id}
              className="border-black border-2 rounded-md p-4 flex items-center justify-between"
            >
              <p className="font-semibold text-xl">{item.title}</p>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-xl">{item.requiredStamps}</p>
                <Image
                  alt=""
                  width={40}
                  height={40}
                  src={"/assets/defaultStamp.png"}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const Variant1 = () => {
  return (
    <div className="border-black border-4 rounded-lg p-5 flex flex-col gap-7">
      <div className="flex items-center justify-center gap-10">
        <div className="bg-blue-500 w-20 h-20"></div>
        <p className="text-4xl font-semibold">Business Name</p>
      </div>

      <CurrentStamps />
      <Contact />
    </div>
  );
};
