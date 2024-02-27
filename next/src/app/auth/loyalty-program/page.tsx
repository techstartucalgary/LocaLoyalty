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
import { fetchAPI } from "@/utils/generalAxios";
import { useAuthStore, useLoyaltyProgramStore } from "@/utils/store";
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
  const { token, setToken } = useAuthStore();
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
      "http://localhost:5001/business/loyalty-program",
      "GET",
      token,
      null,
      {}
    );
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["loyaltyProgramData"],
    queryFn: fetchLoyaltyProgramData,
    enabled: !!token,
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

  useEffect(() => {
    async function fetchToken() {
      const toFetch = await getToken();
      setToken(toFetch);
    }

    fetchToken();
  }, [getToken, setToken]);

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
                Change your password here.
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
