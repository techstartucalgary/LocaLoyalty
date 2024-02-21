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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const { setStampLife, setStampCount, setScaleAmount, setDefinedRewards } =
    useLoyaltyProgramStore();

  const fetchLoyaltyProgramData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/profile",
      "GET",
      token,
      null,
      {}
    );
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["loyaltyProgramData"],
    queryFn: fetchLoyaltyProgramData,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setStampLife(data.stampLife);
      setStampCount(data.stampCount);
      setScaleAmount(data.scaleAmount);
      setDefinedRewards(data.definedRewards);
    }
  }, [data, setDefinedRewards, setScaleAmount, setStampCount, setStampLife]);

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

      <div className="flex justify-start gap-40">
        <div className="flex flex-col w-1/2">
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
            <TabsContent value="design">Change your password here.</TabsContent>
          </Tabs>

          <EditSection />
        </div>
        <p className="bg-pink-500 w-1/3">live preview will go here</p>
      </div>
    </>
  );
}
