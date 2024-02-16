"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLoyaltyProgramStore } from "@/utils/store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  CreateRewardDialog,
  DeleteRewardDialog,
  EditRewardDialog,
} from "./RewardDialogs";

export const OptionHeader = ({
  title,
  info,
}: {
  title: string;
  info: string;
}) => {
  return (
    <div className="flex gap-3 items-center">
      <p className="text-xl font-semibold">{title}</p>
      <Popover>
        <PopoverTrigger>
          <IoIosInformationCircleOutline size={25} />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={10}
          alignOffset={10}
          align="end"
        >
          {info}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const StampLifeSection = () => {
  const { stampLife, setStampLife } = useLoyaltyProgramStore();

  const determineStyle = (value: number | null) => {
    return stampLife === value
      ? "bg-black"
      : "bg-green-500 text-black border-2 border-black bg-white hover:text-white";
  };

  const stampLifeValues = [
    { value: null, label: "Forever" },
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "1 Year" },
  ];

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp life"
        info="Choose how long your customer's stamps will last if they don't shop at your store for a certain duration"
      />

      <div className="flex gap-3 mt-3 ml-5">
        {stampLifeValues.map((item) => {
          return (
            <Button
              key={item.value}
              size="sm"
              className={determineStyle(item.value)}
              onClick={() => {
                setStampLife(item.value);
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const StampCountSection = () => {
  const { stampCount, incrementStampCount, decrementStampCount } =
    useLoyaltyProgramStore();

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp count"
        info="Choose the max amount of stamps your customer can have at a time"
      />
      <div className="flex items-center gap-5 mt-3 ml-5">
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => decrementStampCount()}
        >
          -
        </Button>
        <p className="text-lg font-semibold">{stampCount}</p>
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => incrementStampCount()}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const ScaleRewardSection = () => {
  const { scaleAmount, setScaleAmount } = useLoyaltyProgramStore();
  const [invalidInput, setInvalidInput] = useState(false);

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Scale reward"
        info="Define how much customers must spend to earn a stamp"
      />
      <div className="flex items-center gap-2 mt-3 ml-5">
        <p className="font-semibold text-lg">$</p>
        <Input
          type="text"
          value={scaleAmount}
          className={`border-2 border-slate-400 w-20 ${
            invalidInput ? "border-red-500" : ""
          }`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const input = event.target.value;

            // Allow clearing the input
            if (input === "") {
              setScaleAmount("");
              setInvalidInput(true); // Consider empty input as valid or manage separately
            } else {
              const newValue = Number(input);
              if (!isNaN(newValue) && newValue > 0) {
                setInvalidInput(false);
                setScaleAmount(input); // Ensure scaleAmount is a string for consistency
              } else {
                setInvalidInput(true);
              }
            }
          }}
        />

        {invalidInput ? <p>Invalid Value!</p> : null}
      </div>
    </div>
  );
};

const DefineRewardSection = () => {
  const { definedRewards, setDefinedRewards } = useLoyaltyProgramStore();

  useEffect(() => {
    setDefinedRewards([
      {
        title: "Free Pineapple Bun",
        requiredStamps: 3,
      },
      {
        title: "Free BBQ Pork Bun",
        requiredStamps: 3,
      },
    ]);
  }, [setDefinedRewards]);

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <div className="flex justify-between">
        <OptionHeader
          title="Define reward"
          info="Create rewards that your customers can cash their stamps out for!"
        />
        <CreateRewardDialog />
      </div>

      <div className="flex flex-col gap-3 mt-3 ml-5">
        {definedRewards.map((item) => {
          return (
            <div key="item.title" className="flex items-center gap-5">
              <div className="flex items-center border-2 p-5 justify-between font-semibold text-lg border-black rounded-md w-2/3">
                <p>{item.title}</p>
                <p className="text-xl">{item.requiredStamps} stamps</p>
              </div>
              <EditRewardDialog
                initialTitle={item.title}
                initialRequiredStamps={item.requiredStamps}
              />
              <DeleteRewardDialog
                title={item.title}
                requiredStamps={item.requiredStamps}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function LoyaltyProgram() {
  return (
    <>
      <p className="text-2xl font-semibold pt-20 pb-5">
        Loyalty Program Builder
      </p>

      <div className="flex justify-start gap-40">
        <Tabs defaultValue="settings" className="w-1/2">
          <TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <div className="ml-10">
              <StampLifeSection />
              <StampCountSection />
              <ScaleRewardSection />
              <DefineRewardSection />
            </div>
          </TabsContent>
          <TabsContent value="design">Change your password here.</TabsContent>
        </Tabs>
        <p className="bg-pink-500 w-1/3">live preview will go here</p>
      </div>
    </>
  );
}
