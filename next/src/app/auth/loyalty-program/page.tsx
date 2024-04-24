"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { PiFlower, PiFlowerFill } from "react-icons/pi";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaSmile,
  FaRegSmile,
  FaCheck,
  FaRegCheckCircle,
} from "react-icons/fa";
import {
  IoLeaf,
  IoLeafOutline,
  IoMoon,
  IoMoonOutline,
  IoPaw,
  IoPawOutline,
  IoRocket,
  IoRocketOutline,
  IoSparkles,
  IoSparklesOutline,
  IoSunny,
  IoSunnyOutline,
} from "react-icons/io5";

import {
  DefineRewardSection,
  EditSection,
  ScaleRewardSection,
  StampCountSection,
  StampLifeSection,
} from "./SettingsSections";
import { fetchAPI } from "@/utils/generalAxios";
import { useLoyaltyProgramStore } from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  LoyaltyProgress,
  RewardsPreview,
  Variant1,
} from "./LoyaltyCardVariations";

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

export default function LoyaltyProgram() {
  const { getToken } = useAuth();
  const {
    refetchIndicator,
    stampCount,
    setBusinessInfo,
    setStampLife,
    setStampCount,
    setScaleAmount,
    setDefinedRewards,
  } = useLoyaltyProgramStore();

  const fetchLoyaltyProgramData = async (): Promise<any> => {
    return fetchAPI(
      process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/business/loyalty-program",
      "GET",
      await getToken(),
      null,
      {}
    );
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["loyaltyProgramData"],
    queryFn: fetchLoyaltyProgramData,
  });

  useEffect(() => {
    if (data) {
      setBusinessInfo(
        data.businessName,
        data.businessLogo,
        data.businessPhone,
        data.businessEmail
      );
      setStampLife(data.stampLife);
      setStampCount(data.stampCount);
      setScaleAmount(data.scaleAmount);
      setDefinedRewards(data.definedRewards);
    }
  }, [
    data,
    refetchIndicator,
    setBusinessInfo,
    setDefinedRewards,
    setScaleAmount,
    setStampCount,
    setStampLife,
  ]);

  const CardLayoutStyleSection = () => {
    const {
      cardLayoutStyle,
      incrementCardLayoutStyle,
      decrementCardLayoutStyle,
    } = useLoyaltyProgramStore();

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
      { value: "star1", label: "Star 1", Icon: FaStar },
      { value: "star2", label: "Star 2", Icon: FaRegStar },
      { value: "heart1", label: "Heart 1", Icon: FaHeart },
      { value: "heart2", label: "Heart 2", Icon: FaRegHeart },
      { value: "smile1", label: "Smile 1", Icon: FaSmile },
      { value: "smile2", label: "Smile 2", Icon: FaRegSmile },
      { value: "check1", label: "Check 1", Icon: FaCheck },
      { value: "check2", label: "Check 2", Icon: FaRegCheckCircle },
      { value: "leaf1", label: "Leaf 1", Icon: IoLeaf },
      { value: "leaf2", label: "Leaf 2", Icon: IoLeafOutline },
      { value: "sun1", label: "Sun 1", Icon: IoSunny },
      { value: "sun2", label: "Sun 2", Icon: IoSunnyOutline },
      { value: "moon1", label: "Moon 1", Icon: IoMoon },
      { value: "moon2", label: "Moon 2", Icon: IoMoonOutline },
      { value: "paw1", label: "Paw 1", Icon: IoPaw },
      { value: "paw2", label: "Paw 2", Icon: IoPawOutline },
      { value: "rocket1", label: "Rocket 1", Icon: IoRocket },
      { value: "rocket2", label: "Rocket 2", Icon: IoRocketOutline },
      { value: "flower1", label: "Flower 1", Icon: PiFlower },
      { value: "flower2", label: "Flower 2", Icon: PiFlowerFill },
      { value: "sparkle1", label: "Sparkle 1", Icon: IoSparkles },
      { value: "sparkle2", label: "Sparkle 2", Icon: IoSparklesOutline },
    ];

    return (
      <div className="border-b-2 border-slate-300 py-5">
        <OptionHeader title="Active stamp" info="..." />

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
          <Input
            id="picture"
            type="file"
            className="w-[220px] border-dashed border-2 border-black"
          />
        </div>
      </div>
    );
  };

  const LogoBackgroundSection = () => {
    return (
      <div className="flex gap-10 border-b-2 border-slate-300 py-5">
        <div>
          <OptionHeader title="Logo" info="..." />

          <div className="mt-3 ml-5">
            <Input
              id="picture"
              type="file"
              className="w-[220px] border-dashed border-2 border-black"
            />
          </div>
        </div>

        <div>
          <OptionHeader title="Background" info="..." />

          <div className="mt-3 ml-5">
            <Input
              id="picture"
              type="file"
              className="w-[220px] border-dashed border-2 border-black"
            />
          </div>
        </div>
      </div>
    );
  };

  const ColorThemeSection = () => {
    const HexColorCodes = [
      {
        value: "theme1",
        id: "t1",
        color1: "#000000",
        color2: "#FFFFFF",
        color3: "#EDEDED",
      },
      {
        value: "theme2",
        id: "t2",
        color1: "#CD6464",
        color2: "#FFC3CB",
        color3: "#FFFFFF",
      },
      {
        value: "theme3",
        id: "t3",
        color1: "#2C5E92",
        color2: "#A9CEF4",
        color3: "#FFFFFF",
      },
      {
        value: "theme4",
        id: "t4",
        color1: "#5952A5",
        color2: "#94A3DB",
        color3: "#FFFFFF",
      },
    ];

    return (
      <div className="py-5">
        <OptionHeader title="Color Theme" info="..." />

        <div className="mt-3 ml-5">
          <RadioGroup defaultValue="theme1">
            {HexColorCodes.map(({ value, id, color1, color2, color3 }) => (
              <div className="flex items-center" key={id}>
                <RadioGroupItem
                  value={value}
                  id={id}
                  className="w-6 h-6 border-2 mr-4"
                />
                <div className="flex gap-2">
                  <div
                    className="h-7 w-7 rounded-md border-2 border-black"
                    style={{ backgroundColor: color1 }}
                  ></div>
                  <div
                    className="h-7 w-7 rounded-md border-2 border-black"
                    style={{ backgroundColor: color2 }}
                  ></div>
                  <div
                    className="h-7 w-7 rounded-md border-2 border-black"
                    style={{ backgroundColor: color3 }}
                  ></div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    );
  };

  return (
    <>
      <p className="text-2xl font-semibold pt-10 pb-5">
        Loyalty Program Builder
      </p>

      {!isLoading && (
        <div className="flex justify-start gap-20">
          <div className="flex flex-col w-3/5">
            <Tabs defaultValue="settings" className="">
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

            <EditSection refetch={refetch} />
          </div>
          <div className="w-3/5">
            <p className="border-b-2 border-black text-lg font-semibold mb-5 pb-4">
              Loyalty Program Preview
            </p>
            <div className="mx-auto flex flex-col gap-5 w-5/6">
              <Variant1 />
              <LoyaltyProgress />
              <RewardsPreview />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
