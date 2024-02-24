"use client";

import Image from "next/image";
import { useLoyaltyProgramStore } from "@/utils/store";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiFlower, PiFlowerFill } from "react-icons/pi";
import { FaStar, FaRegStar, FaHeart, FaRegHeart, FaSmile, FaRegSmile, FaCheck, FaRegCheckCircle } from "react-icons/fa";
import { IoLeaf, IoLeafOutline, IoMoon, IoMoonOutline, IoPaw, IoPawOutline, IoRocket, IoRocketOutline, IoSparkles, IoSparklesOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";

const OptionHeader = ({ title, info }: { title: string; info: string }) => {
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
        description: "placeholder text",
        requiredStamps: 3,
      },
      {
        title: "Free BBQ Pork Bun",
        description: "placeholder text",
        requiredStamps: 3,
      },
    ]);
  }, [setDefinedRewards]);

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Define reward"
        info="Create rewards that your customers can cash their stamps out for!"
      />

      {definedRewards.map((item) => {
        return (
          <div
            key="item.title"
            className="flex border-2 p-5 border-black rounded-md"
          >
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

const CardLayoutStyleSection = () => {
  const { cardLayoutStyle, incrementCardLayoutStyle, decrementCardLayoutStyle } = useLoyaltyProgramStore();

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Card layout style"
        info="Choose the card layout style for your loyalty program, this is what customers will see"
      />
      <div className="flex items-center gap-5 mt-3 ml-5">
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => decrementCardLayoutStyle()}
        >
          &#60;
        </Button>
        <p className="text-lg font-semibold">{cardLayoutStyle}</p>
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => incrementCardLayoutStyle()}
        >
          &#62;
        </Button>
      </div>
    </div>
  );
};

const ActiveStampSection = () => {

  const activeStampOptions = [
    { value: 'star1', label: 'Star 1', Icon: FaStar },
    { value: 'star2', label: 'Star 2', Icon: FaRegStar },
    { value: 'heart1', label: 'Heart 1', Icon: FaHeart },
    { value: 'heart2', label: 'Heart 2', Icon: FaRegHeart },
    { value: 'smile1', label: 'Smile 1', Icon: FaSmile },
    { value: 'smile2', label: 'Smile 2', Icon: FaRegSmile },
    { value: 'check1', label: 'Check 1', Icon: FaCheck },
    { value: 'check2', label: 'Check 2', Icon: FaRegCheckCircle },
    { value: 'leaf1', label: 'Leaf 1', Icon: IoLeaf },
    { value: 'leaf2', label: 'Leaf 2', Icon: IoLeafOutline },
    { value: 'sun1', label: 'Sun 1', Icon: IoSunny },
    { value: 'sun2', label: 'Sun 2', Icon: IoSunnyOutline },
    { value: 'moon1', label: 'Moon 1', Icon: IoMoon },
    { value: 'moon2', label: 'Moon 2', Icon: IoMoonOutline },
    { value: 'paw1', label: 'Paw 1', Icon: IoPaw },
    { value: 'paw2', label: 'Paw 2', Icon: IoPawOutline },
    { value: 'rocket1', label: 'Rocket 1', Icon: IoRocket },
    { value: 'rocket2', label: 'Rocket 2', Icon: IoRocketOutline },
    { value: 'flower1', label: 'Flower 1', Icon: PiFlower },
    { value: 'flower2', label: 'Flower 2', Icon: PiFlowerFill },
    { value: 'sparkle1', label: 'Sparkle 1', Icon: IoSparkles },
    { value: 'sparkle2', label: 'Sparkle 2', Icon: IoSparklesOutline },
  ];

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Active stamp"
        info="..."
      />

      <div className="mt-3 ml-5">
        <Select>
          <SelectTrigger className="w-[220px] border-2 border-black">
            <SelectValue placeholder="Select a stamp" />
          </SelectTrigger>
          <SelectContent className="max-h-44 overflow-y-auto">
            <SelectGroup>
              {activeStampOptions.map(({ value, label, Icon }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 mr-2" />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 ml-5">
        <Input id="picture" type="file" className="w-[220px] border-dashed border-2 border-black"/>
      </div>
    </div>
  );
};

const LogoBackgroundSection = () => {

  return (
    <div className="flex gap-10 border-b-2 border-slate-300 py-5">
      <div>
        <OptionHeader
          title="Logo"
          info="..."
        />

        <div className="mt-3 ml-5">
          <Input id="picture" type="file" className="w-[220px] border-dashed border-2 border-black"/>
        </div>
      </div>

      <div>
        <OptionHeader
          title="Background"
          info="..."
        />

        <div className="mt-3 ml-5">
          <Input id="picture" type="file" className="w-[220px] border-dashed border-2 border-black"/>
        </div>
      </div>
    </div>
  );
};

const ColorThemeSection = () => {

  const HexColorCodes = [
    { value: "theme1", id: "t1", color1: "#000000", color2: "#FFFFFF", color3: "#EDEDED"},
    { value: "theme2", id: "t2", color1: "#CD6464", color2: "#FFC3CB", color3: "#FFFFFF"},
    { value: "theme3", id: "t3", color1: "#2C5E92", color2: "#A9CEF4", color3: "#FFFFFF"},
    { value: "theme4", id: "t4", color1: "#5952A5", color2: "#94A3DB", color3: "#FFFFFF"},
  ];

  return (
    <div className="py-5">
      <OptionHeader
        title="Color Theme"
        info="..."
      />

      <div className="mt-3 ml-5">
        <RadioGroup defaultValue="theme1">
          {HexColorCodes.map(({ value, id, color1, color2, color3 }) => (
            <div className="flex items-center">
              <RadioGroupItem value={value} id={id} className="w-6 h-6 border-2 mr-4"/>
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-md border-2 border-black" style={{ backgroundColor: color1 }}></div>
                <div className="h-7 w-7 rounded-md border-2 border-black" style={{ backgroundColor: color2 }}></div>
                <div className="h-7 w-7 rounded-md border-2 border-black" style={{ backgroundColor: color3 }}></div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default function LoyaltyProgram() {
  return (
    <>
      <p className="text-2xl font-semibold pt-10 pb-5">
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
          <TabsContent value="design">
            <div className="ml-10">
              <CardLayoutStyleSection />
              <ActiveStampSection />
              <LogoBackgroundSection />
              <ColorThemeSection />
            </div>
          </TabsContent>
        </Tabs>
        <p className="bg-pink-500 w-1/3">live preview will go here</p>
      </div>
    </>
  );
}
