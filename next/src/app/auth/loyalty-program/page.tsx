"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  DefineRewardSection,
  EditSection,
  ScaleRewardSection,
  StampCountSection,
  StampLifeSection,
} from "./SettingsSections";
import {
  CardLayoutStyleSection,
  ActiveStampSection,
  ColorThemeSection,
} from "./DesignSections";
import { activeStampOptions } from "./DesignIcons";
import { fetchAPI } from "@/utils/generalAxios";
import { useLoyaltyProgramStore } from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  LoyaltyProgress,
  RewardsPreview,
  Variant,
} from "./LoyaltyCardVariations";
import { SecretQRSection } from "./QRCodeSections";

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
    setColorTheme,
    setActiveStampValue,
    setActiveStamp,
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
    refetchOnWindowFocus: false, // prevent refetching when the window regains focus
    refetchOnReconnect: false, // prevent refetching when the network status changes
    retry: false,
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
      setStampCount(data.stampCount ? data.stampCount : 5);
      setScaleAmount(data.scaleAmount);
      setDefinedRewards(data.definedRewards);
      setColorTheme(data.color1 ? data.color1 : "#000000", 0);
      setColorTheme(data.color2 ? data.color2 : "#FFFFFF", 1);
      setColorTheme(data.color3 ? data.color3 : "#FFFFFF", 2);

      const selectedOption = activeStampOptions.find(
        (option) => option.value === data.stampValue
      );
      if (selectedOption) {
        setActiveStamp(selectedOption.Icon);
        setActiveStampValue(data.stampValue);
      }
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
                <TabsTrigger value="settings">1. Settings</TabsTrigger>
                <TabsTrigger value="design">2. Design</TabsTrigger>
                <TabsTrigger value="qr-code">3. QR Codes</TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <div className="ml-10">
                  <StampLifeSection />
                  <StampCountSection />
                  <DefineRewardSection />
                </div>
              </TabsContent>
              <TabsContent value="design">
                <div className="ml-10">
                  <CardLayoutStyleSection />
                  <ActiveStampSection />
                  <ColorThemeSection />
                </div>
              </TabsContent>
              <TabsContent value="qr-code">
                <div className="ml-10">
                  <SecretQRSection />
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
              <Variant />
              <RewardsPreview />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
